import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

import { downloadMediaMessage } from 'baileys';
import { Sticker } from 'wa-sticker-formatter';


export async function photo(message, client) {

    try {

        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        const target = quoted?.stickerMessage;

        if (!target) return await client.sendMessage(message.key.remoteJid, { text: "No sticker found." })

        const buffer = await downloadMediaMessage({ message: quoted, client }, "buffer");

        const filename = `./temp/sticker-${Date.now()}.png`

        if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')

        fs.writeFileSync(filename, buffer)

        await client.sendMessage(message.key.remoteJid, { image: fs.readFileSync(filename), caption: "> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐃𝐑𝐔𝐙𝐙 𝐃𝐄𝐕" })

        fs.unlinkSync(filename)

    } catch (e) {

        console.log(e)

        await client.sendMessage(message.key.remoteJid, { text: "❌ Error converting sticker to image." })
    }
}

export async function tomp3(message, client) {

    try {
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        const target = quoted?.videoMessage;

        if (!target) return await client.sendMessage(message.key.remoteJid, { text: "No video found." })

        const buffer = await downloadMediaMessage({ message: quoted, client }, "buffer");

        const inputPath = `./temp/video-${Date.now()}.mp4`

        const outputPath = `./temp/audio-${Date.now()}.mp3`

        if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
            
        fs.writeFileSync(inputPath, buffer)

        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i ${inputPath} -vn -ab 128k -ar 44100 -y ${outputPath}`, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })

        await client.sendMessage(message.key.remoteJid, { audio: fs.readFileSync(outputPath), mimetype: 'audio/mp4', ptt: false })

        fs.unlinkSync(inputPath)
        fs.unlinkSync(outputPath)

    } catch (e) {
        console.log(e)
        await client.sendMessage(message.key.remoteJid, { text: "❌ Error converting video to audio." })
    }
}

export async function sticker(message, client) {
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const source = quoted?.imageMessage || quoted?.videoMessage ||
        message.message?.imageMessage || message.message?.videoMessage;
    const wrapped = quoted ? { message: quoted } : { message: message.message };
    if (!source) return client.sendMessage(message.key.remoteJid, { text: '❌ Reply to an image/video or send one with .sticker.' }, { quoted: message });

    try {
        const buffer = await downloadMediaMessage(wrapped, 'buffer', {}, { reuploadRequest: client.reuploadRequest });
        const sticker = new Sticker(buffer, {
            pack: 'DRUZZ',
            author: 'WhatsApp Bot',
            type: source.mimetype?.includes('video') ? 'full' : 'default'
        });
        await client.sendMessage(message.key.remoteJid, { sticker: await sticker.toBuffer() }, { quoted: message });
    } catch (e) {
        console.error('sticker:', e);
        await client.sendMessage(message.key.remoteJid, { text: `❌ Sticker error: ${e.message}` }, { quoted: message });
    }
}

export async function getProfilePicture(message, client) {
    const jid = message.message?.extendedTextMessage?.contextInfo?.participant || message.key.remoteJid;
    try {
        const url = await client.profilePictureUrl(jid, 'image');
        await client.sendMessage(message.key.remoteJid, { image: { url }, caption: '🖼️ Profile picture' }, { quoted: message });
    } catch {
        await client.sendMessage(message.key.remoteJid, { text: '❌ Profile picture not available.' }, { quoted: message });
    }
}

export async function setProfilePicture(message, client) {
    const remoteJid = message.key.remoteJid;
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const source = quoted?.imageMessage || message.message?.imageMessage;
    const wrapped = quoted ? { message: quoted } : { message: message.message };
    if (!source) return client.sendMessage(remoteJid, { text: '❌ Reply to an image with .setpp.' }, { quoted: message });

    try {
        const buffer = await downloadMediaMessage(wrapped, 'buffer', {}, { reuploadRequest: client.reuploadRequest });
        const me = client.user?.id?.split(':')[0] + '@s.whatsapp.net';
        await client.updateProfilePicture(me, buffer);
        await client.sendMessage(remoteJid, { text: '✅ Profile picture updated.' }, { quoted: message });
    } catch (e) {
        await client.sendMessage(remoteJid, { text: `❌ Could not update profile picture: ${e.message}` }, { quoted: message });
    }
}

export default { photo, tomp3, sticker, getProfilePicture, setProfilePicture }
