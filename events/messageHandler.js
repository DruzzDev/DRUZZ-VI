import group from '../commands/group.js';
import pingCommand from '../commands/ping.js';
import info from '../commands/info.js';
import viewonce from '../commands/viewonce.js';
import sudo from '../commands/sudo.js';
import tag from '../commands/tag.js';
import tourl from '../commands/tourl.js';
import owner from '../commands/owner.js';
import media from '../commands/media.js';
import fancy from '../commands/fancy.js';
import save from '../commands/save.js';
import reactCommand from '../commands/react.js';
import presence from '../commands/online.js';
import reactions from '../commands/reactions.js';
import statusLike from '../commands/statuslike.js';
import auto from '../commands/auto.js';
import configCommands from '../commands/configCommands.js';
import search from '../commands/search.js';
import fs from 'fs';
import configManager from '../utils/manageConfigs.js';
import { OWNER_NUM } from '../config.js';
import { channelClient } from '../utils/channelBranding.js';

export let creator = [`${OWNER_NUM}@s.whatsapp.net`];
export let premium = [`${OWNER_NUM}@s.whatsapp.net`];

function getText(message) {
    return (
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        message.message?.imageMessage?.caption ||
        message.message?.videoMessage?.caption ||
        ''
    );
}

async function handleIncomingMessage(event, client) {
    const commandClient = channelClient(client);
    const number = client.user?.id?.split(':')[0] || '';
    let userLid = '';

    try {
        const data = JSON.parse(fs.readFileSync(`sessions/${number}/creds.json`, 'utf8'));
        userLid = data?.me?.lid || client.user?.lid || '';
    } catch {
        userLid = client.user?.lid || '';
    }

    const lid = userLid ? [userLid.split(':')[0] + '@lid'] : [];
    const userConfig = configManager.config?.users?.[number] || {};
    const prefix = userConfig.prefix || '.';
    const approvedUsers = Array.isArray(userConfig.sudoList) ? userConfig.sudoList : [];

    for (const message of (event.messages || [])) {
        try {
            const remoteJid = message.key?.remoteJid;
            const rawText = getText(message);
            if (!remoteJid || !rawText) continue;

            // Automatic features are isolated from the command router.
            // A failure in an optional feature must never prevent .menu or any command.
            const safeAuto = async (name, fn) => {
                try { await fn(); }
                catch (err) { console.warn(`[auto:${name}]`, err?.message || err); }
            };
            await safeAuto('autotype', () => auto.autotype(message, client));
            await safeAuto('autorecord', () => auto.autorecord(message, client));
            await safeAuto('tag-response', () => tag.respond(message, client, lid));
            await safeAuto('link-detection', () => group.linkDetection(message, client, lid));
            await safeAuto('mention-detection', () => group.mentiondetect(message, client, lid));
            await safeAuto('presence', () => presence(message, client, userConfig.online));
            await safeAuto('status-like', () => statusLike(message, client, userConfig.like));
            await safeAuto('autoreact', () => reactions.auto(message, client, userConfig.autoreact, userConfig.emoji || '🥷'));

            const body = rawText.trim();
            if (!body.startsWith(prefix)) continue;

            const args = body.slice(prefix.length).trim().split(/\s+/);
            const command = (args.shift() || '').toLowerCase();
            if (!command) continue;

            const participant = message.key?.participant || '';
            const participantNumber = participant.split('@')[0];
            const remoteNumber = remoteJid.split('@')[0];
            const ownerNumber = String(OWNER_NUM).replace(/\D/g, '');

            const isOwner = message.key?.fromMe ||
                participantNumber === ownerNumber ||
                remoteNumber === ownerNumber ||
                lid.includes(participant) ||
                lid.includes(remoteJid);

            const isSudo = isOwner || approvedUsers.some(x => String(x).replace(/\D/g, '') === participantNumber);

            const react = async () => {
                try { await client.sendMessage(remoteJid, { react: { text: '⚡', key: message.key } }); } catch {}
            };

            // Commands that require owner/sudo access.
            const restricted = new Set([
                'sudo', 'delsudo', 'getsudo', 'setprefix', 'getconfig',
                'online', 'welcome', 'goodbye', 'autotype', 'autorecord', 'autoreact',
                'statuslike', 'antilink', 'update', 'device'
            ]);

            if (restricted.has(command) && !isSudo) {
                await client.sendMessage(remoteJid, { text: '⛔ Commande réservée au propriétaire/sudo.' }, { quoted: message });
                continue;
            }

            await react();

            switch (command) {
                case 'menu': return await info(message, commandClient);
                case 'ping': return await pingCommand(message, commandClient);
                case 'owner': return await owner(message, commandClient);
                case 'tourl': return await tourl(message, commandClient);
                case 'vv': return await viewonce(message, commandClient);
                case 'save': return await save(message, commandClient);
                case 'photo': return await media.photo(message, commandClient);
                case 'tomp3':
                case 'toaudio': return await media.tomp3(message, commandClient);
                case 'sticker': return await media.sticker(message, commandClient);
                case 'take': return await media.sticker(message, commandClient);
                case 'setpp': return await media.setProfilePicture(message, commandClient);
                case 'grtpp': return await media.getProfilePicture(message, commandClient);
                case 'react': return await reactCommand(message, commandClient);
                case 'delete': return await deleteQuoted(message, commandClient);

                case 'getid': return await group.gcid(message, commandClient);
                case 'kick': return await group.kick(message, commandClient);
                case 'promote': return await group.promote(message, commandClient);
                case 'demote': return await group.demote(message, commandClient);
                case 'kickall': return isOwner ? group.kickall(message, commandClient) : null;
                case 'purge': return isOwner ? group.purge(message, commandClient) : null;
                case 'bye': return isOwner ? group.bye(message, commandClient) : null;
                case 'promoteall': return isOwner ? group.pall(message, commandClient) : null;
                case 'demoteall': return isOwner ? group.dall(message, commandClient, userLid) : null;
                case 'mute': return await group.mute(message, commandClient);
                case 'unmute': return await group.unmute(message, commandClient);
                case 'gclink': return await group.gclink(message, commandClient);

                case 'sudo':
                    await sudo.sudo(message, commandClient, userConfig.sudoList);
                    return configManager.save();
                case 'delsudo':
                    await sudo.delsudo(message, commandClient, userConfig.sudoList);
                    return configManager.save();
                case 'getsudo': return await sudo.getsudo(message, commandClient, userConfig.sudoList);

                case 'tag': return await tag.tag(message, commandClient);
                case 'tagall': return await tag.tagall(message, commandClient);
                case 'tagadmin': return await tag.tagadmin(message, commandClient);
                case 'settag': return await tag.settag(message, commandClient);
                case 'respons': return await tag.tagoption(message, commandClient);

                case 'online':
                case 'welcome':
                case 'goodbye':
                case 'autotype':
                case 'autorecord':
                case 'autoreact':
                case 'statuslike':
                    return await configCommands.toggle(message, commandClient, number, command, args[0]);
                case 'antilink': return await group.antilink(message, commandClient);
                case 'setprefix': return await configCommands.setPrefix(message, commandClient, number, args.join(' '));
                case 'getconfig': return await configCommands.getConfig(message, commandClient, number);
                case 'device': return await configCommands.device(message, commandClient);
                case 'update': return await configCommands.update(message, commandClient);

                case 'druzz': return await search.druzz(message, commandClient, args.join(' '));
                case 'wiki-en': return await search.wiki(message, commandClient, args.join(' '), 'en');
                case 'wiki-fr': return await search.wiki(message, commandClient, args.join(' '), 'fr');

                // These are deliberately not crash/spam tools.
                case 'bug-menu':
                    return await client.sendMessage(remoteJid, { text: '*⚠️ Bug/crash commands are disabled. I can help debug the bot itself instead.*' }, { quoted: message });
                case 'prem-menu':
                    return await client.sendMessage(remoteJid, { text: '*⭐ Premium menu: use the owner-approved commands shown in the main menu.*' }, { quoted: message });
                case 'fancy': return await fancy(message, commandClient, args.join(' '));
                case 'img':
                case 'play':
                    return await commandClient.sendMessage(remoteJid, { text: `*ℹ️ .${command} needs a downloader/search provider configured. The command router is active.*` }, { quoted: message });
                case 'tiktok':
                case 'tt': return await tiktok(message, commandClient, args.join(' '));

                default:
                    return await commandClient.sendMessage(remoteJid, { text: `*❓ Unknown command:* ${prefix}${command}\n*Use ${prefix}menu*` }, { quoted: message });
            }
        } catch (error) {
            console.error(`Command/message error:`, error);
            try {
                await client.sendMessage(message.key.remoteJid, { text: `❌ Error: ${error.message || 'unknown error'}` }, { quoted: message });
            } catch {}
        }
    }
}



async function deleteQuoted(message, client) {
    const remoteJid = message.key?.remoteJid;
    const ctx = message.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage;
    if (!remoteJid || !quoted || !ctx?.stanzaId) {
        return client.sendMessage(remoteJid, { text: '*Reply to the message you want me to delete.*' }, { quoted: message });
    }
    const participant = ctx.participant || remoteJid;
    await client.sendMessage(remoteJid, {
        delete: { remoteJid, fromMe: false, id: ctx.stanzaId, participant }
    });
}

async function tiktok(message, client, text) {
    const remoteJid = message.key?.remoteJid;
    if (!text) return client.sendMessage(remoteJid, { text: '*Example: .tiktok https://www.tiktok.com/...*' }, { quoted: message });
    if (!/tiktok\.com/i.test(text)) return client.sendMessage(remoteJid, { text: '*Link Invalid!! Please provide a valid TikTok link.*' }, { quoted: message });
    await client.sendMessage(remoteJid, { text: '*🔁 ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ..*' }, { quoted: message });
    try {
        const api = `https://api.bk9.dev/download/tiktok?url=${encodeURIComponent(text)}`;
        const response = await fetch(api, { signal: AbortSignal.timeout(45_000) });
        if (!response.ok) throw new Error(`API HTTP ${response.status}`);
        const data = await response.json();
        const videoUrl = data?.BK9?.BK9;
        if (!data?.status || !videoUrl) throw new Error('API did not return a valid download link.');
        await client.sendMessage(remoteJid, {
            video: { url: videoUrl },
            caption: '*📤 ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ ᴜᴘʟᴏᴀᴅᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ*'
        }, { quoted: message });
    } catch (err) {
        console.error('TikTok:', err);
        await client.sendMessage(remoteJid, { text: `*❌ TikTok download failed: ${err.message}*` }, { quoted: message });
    }
}

export default handleIncomingMessage;
