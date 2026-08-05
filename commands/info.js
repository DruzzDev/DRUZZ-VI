
import configManager from '../utils/manageConfigs.js'

import { BOT_NAME } from '../config.js'

import { OWNER_NAME } from '../config.js'

import fs from 'fs';

import path from 'path';

import { WA_CHANNEL } from "../config.js"


export async function info(message, client) {

    const remoteJid = message.key.remoteJid;

    const today = new Date();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDay = daysOfWeek[today.getDay()];

    const currentDate = today.getDate();

    const currentMonth = today.getMonth() + 1; 

    const currentYear = today.getFullYear();

    const owner = "𓂀𝐃𝐑𝐔𝐙𝐙 𝐃𝐄𝐕𓂀";

    const number = client.user.id.split(':')[0];

    const username = message.pushName || "Unknown";

    const t = ` 
╭─────────────────╮
┃✦🦞  ${BOT_NAME}  🦞✦┃
╰─────────────────╯
╭─────────────────╮
│ *⚠️ᴘʀᴇғɪx : ${(configManager.config.users[number]?.prefix || '.')}*
│ *🙋ʜᴇʟʟᴏ, ${username}*  
│ *🎑ᴅᴀʏ : ${currentDay}*
│ *🪧ᴅᴀᴛᴇ : ${currentDate}/${currentMonth}/${currentYear}* 
│ *🔰ᴠᴇʀsɪᴏɴ : 5.3.0*
│ *🆙ᴘʟᴜɢɪɴs : 64*
│ *🏧ᴛʏᴘᴇ : x-ᴍᴅ*       
╰─────────────────╯


*╭──[ ⭐ 𝗠𝗘𝗡𝗨𝗦 ⭐ ]─────╮*
*│ ➯ ᴍᴇɴᴜ*
*│ ➯ ᴘʀᴇᴍ-ᴍᴇɴᴜ*
*│ ➯ ʙᴜɢ-ᴍᴇɴᴜ*
*╰─────────────────╯*

*╭──[ 📜 𝗧𝗼𝗼𝗹𝘀 📜 ]──────╮* 
*│ ➯ ᴘɪɴɢ*
*│ ➯ ɢᴇᴛɪᴅ*
*│ ➯ sᴜᴅᴏ*
*│ ➯ ᴛᴏᴜʀʟ*
*│ ➯ ᴏᴡɴᴇʀ*    
*│ ➯ ғᴀɴᴄʏ*   
*│ ➯ ᴜᴘᴅᴀᴛᴇ*
*│ ➯ ᴅᴇᴠɪᴄᴇ* 
*│ ➯ ᴅᴇʟsᴜᴅᴏ*
*│ ➯ ɢᴇᴛsᴜᴅᴏ*    
*╰─────────────────╯*

*╭──[ 🔎 𝗖𝗼𝗻𝗳𝗶𝗴 🔎 ]─────╮*
*│ ➯ ᴏɴʟɪɴᴇ*
*│ ➯ ᴡᴇʟᴄᴏᴍᴇ*
*│ ➯ ᴀᴜᴛᴏᴛʏᴘᴇ*
*│ ➯ ᴀᴜᴛᴏʀᴇᴀᴄᴛ*
*│ ➯ sᴇᴛᴘʀᴇғɪx*
*│ ➯ ɢᴇᴛᴄᴏɴғɪɢ*
*│ ➯ sᴛᴀᴛᴜsʟɪᴋᴇ*
*│ ➯ ᴀᴜᴛᴏʀᴇᴄᴏʀᴅ*        
*╰─────────────────╯*

*╭──[ 🎎 𝗚𝗿𝗼𝘂𝗽 🎎 ]─────╮*
*│ ➯ ʙʏᴇ*
*│ ➯ ᴋɪᴄᴋ*
*│ ➯ ᴘᴜʀɢᴇ*        
*│ ➯ ᴍᴜᴛᴇ*
*│ ➯ ᴜɴᴍᴜᴛᴇ*
*│ ➯ ᴘʀᴏᴍᴏᴛᴇ*
*│ ➯ ᴅᴇᴍᴏᴛᴇ*
*│ ➯ ɢᴄʟɪɴᴋ*      
*│ ➯ ᴀɴᴛɪʟɪɴᴋ*
*│ ➯ ᴋɪᴄᴋᴀʟʟ*
*│ ➯ ᴘʀᴏᴍᴏᴛᴇᴀʟʟ*
*│ ➯ ᴅᴇᴍᴏᴛᴇᴀʟʟ*
*╰─────────────────╯*

*╭──[ 💾 𝗠𝗲𝗱𝗶𝗮 💾 ]─────╮*
*│ ⇛ ᴠᴠ* 
*│ ⇛ ᴛᴀᴋᴇ*  
*│ ⇛ sᴀᴠᴇ*
*│ ⇛ ᴘʜᴏᴛᴏ*
*│ ⇛ sᴇᴛᴘᴘ*
*│ ⇛ ɢʀᴛᴘᴘ*
*│ ⇛ ᴛᴏᴀᴜᴅɪᴏ*
*│ ⇛ sᴛɪᴄᴋᴇʀ*
*╰─────────────────╯*


*╭──[ 🔎 𝗦𝗲𝗮𝗿𝗰𝗵 🔎 ]─────╮#
*│ ➯ ᴅʀᴜᴢᴢ <question<*
*│ ➯ ᴡɪᴋɪ-ᴇɴ <topic>*
*│ ➯ ᴡɪᴋɪ-ғʀ <topic>*      
*╰─────────────────╯*


*╭──[ ♪ 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 ♪ ]──╮*
*│ ⇛ ɪᴍɢ*
*│ ⇛ ᴘʟᴀʏ*
*│ ⇛ ᴛɪᴋᴛᴏᴋ*
*╰─────────────────╯*

*╭──[ 📣 𝗧𝗮𝗴𝘀 📣 ]──────╮*
*│ ➯ ᴛᴀɢ*
*│ ➯ ᴛᴀɢᴀᴅᴍɪɴ*
*│ ➯ tagall*
*│ ➯ sᴇᴛᴛᴀɢ* 
*│ ➯ ʀᴇsᴘᴏɴs*
*╰─────────────────╯*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${OWNER_NAME} 💂
    `
;

    await client.sendMessage(remoteJid, {

        image: { url: "menu.jpg" },

        caption: t,

        quoted: message

    });

    await client.sendMessage(remoteJid, {

            audio: { url: "menu.mp3" }, 

            mimetype: 'audio/mp4',

            ptt: false,

            quoted: message
        });
}   

export default info;
