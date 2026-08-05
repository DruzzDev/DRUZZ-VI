
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

    const owner = "𝙳𝚁𝚄𝚉𝚉";

    const number = client.user.id.split(':')[0];

    const username = message.pushName || "Unknown";

    const t = ` 
┏━━━━━━━━━━━━━━━━━━┓
┃ 🦞  ${BOT_NAME}  🦞 ┃
┗━━━━━━━━━━━━━━━━━━┛
*╭━━━━━━━━━━━━━━━━━━*
*║╭━━━━━━━━━━━━━━━*
*║德│ 𝙿𝚁𝙴𝙵𝙸𝚇 : ${(configManager.config.users[number]?.prefix || '.')}*
*║德│ 𝚆𝙰𝚂𝚂𝚄𝙿, ${username}*
*║德│ 𝙳𝙰𝚈 : ${currentDay}*
*║德│ 𝙳𝙰𝚃𝙴 : ${currentDate}/${currentMonth}/${currentYear}*
*║德│ 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 1.0.1*
*║德│ 𝙿𝙻𝚄𝙶𝙸𝙽𝚂 : 64*
*║德│ 𝚃𝚈𝙿𝙴 : 𝚇-𝙼𝙳*
*║╰━━━━━━━━━━━━━━━*
*╰━━━━━━━━━━━━━━━━━━*

*╭━━━━━ 𝙼𝙴𝙽𝚄𝚂 ━━━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝙼𝙴𝙽𝚄*
*║德│┃✮ 𝙿𝚁𝙴𝙼-𝙼𝙴𝙽𝚄*
*║德│┃✮ 𝙱𝚄𝙶-𝙼𝙴𝙽𝚄*
*║╰━━━━━━━━━━━━*
*║*
*║━━━━━ 𝚃𝙾𝙾𝙻𝚂 ━━━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝙿𝙸𝙽𝙶*
*║德│┃✮ 𝙶𝙴𝚃𝙸𝙳*
*║德│┃✮ 𝚂𝚄𝙳𝙾*
*║德│┃✮ 𝚃𝙾𝚄𝚁𝙻*
*║德│┃✮ 𝙾𝚆𝙽𝙴𝚁*
*║德│┃✮ 𝙵𝙰𝙽𝙲𝚈*
*║德│┃✮ 𝚄𝙿𝙳𝙰𝚃𝙴*
*║德│┃✮ 𝙳𝙴𝚅𝙸𝙲𝙴*
*║德│┃✮ 𝙳𝙴𝙻𝚂𝚄𝙳𝙾*
*║德│┃✮ 𝙶𝙴𝚃𝚂𝚄𝙳𝙾*
*║╰━━━━━━━━━━━━*
*║*
*║━━━━ 𝙲𝙾𝙽𝙵𝙸𝙶 ━━━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝙾𝙽𝙻𝙸𝙽𝙴*
*║德│┃✮ 𝚆𝙴𝙻𝙲𝙾𝙼𝙴*
*║德│┃✮ 𝙰𝚄𝚃𝙾𝚃𝚈𝙿𝙴*
*║德│┃✮ 𝙰𝚄𝚃𝙾𝚁𝙴𝙰𝙲𝚃*
*║德│┃✮ 𝚂𝙴𝚃𝙿𝚁𝙴𝙵𝙸𝚇*
*║德│┃✮ 𝙶𝙴𝚃𝙲𝙾𝙽𝙵𝙸𝙶*
*║德│┃✮ 𝚂𝚃𝙰𝚃𝚄𝚂𝙻𝙸𝙺𝙴*
*║德│┃✮ 𝙰𝚄𝚃𝙾𝚁𝙴𝙲𝙾𝚁𝙳*
*║╰━━━━━━━━━━━━*
*║*
*║━━━━━ 𝙶𝚁𝙾𝚄𝙿 ━━━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝙱𝚈𝙴*
*║德│┃✮ 𝙺𝙸𝙲𝙺*
*║德│┃✮ 𝙿𝚄𝚁𝙶𝙴*
*║德│┃✮ 𝙼𝚄𝚃𝙴*
*║德│┃✮ 𝚄𝙽𝙼𝚄𝚃𝙴*
*║德│┃✮ 𝙿𝚁𝙾𝙼𝙾𝚃𝙴*
*║德│┃✮ 𝙳𝙴𝙼𝙾𝚃𝙴*
*║德│┃✮ 𝙶𝙲𝙻𝙸𝙽𝙺*
*║德│┃✮ 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺*
*║德│┃✮ 𝙺𝙸𝙲𝙺𝙰𝙻𝙻*
*║德│┃✮ 𝙿𝚁𝙾𝙼𝙾𝚃𝙴𝙰𝙻𝙻*
*║德│┃✮ 𝙳𝙴𝙼𝙾𝚃𝙴𝙰𝙻𝙻*
*║德│┃✮ 𝙳𝙴𝙻𝙴𝚃𝙴*
*║╰━━━━━━━━━━━━*
*║*
*║━━━━━ 𝙼𝙴𝙳𝙸𝙰 ━━━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝚅𝚅*
*║德│┃✮ 𝚃𝙰𝙺𝙴*
*║德│┃✮ 𝚂𝙰𝚅𝙴*
*║德│┃✮ 𝙿𝙷𝙾𝚃𝙾*
*║德│┃✮ 𝚂𝙴𝚃𝙿𝙿*
*║德│┃✮ 𝙶𝚁𝚃𝙿𝙿*
*║德│┃✮ 𝚃𝙾𝙰𝚄𝙳𝙸𝙾*
*║德│┃✮ 𝚂𝚃𝙸𝙲𝙺𝙴𝚁*
*║╰━━━━━━━━━━━━*
*║*
*║━━━━ 𝚂𝙴𝙰𝚁𝙲𝙷 ━━━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝙳𝚁𝚄𝚉𝚉 <𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽>*
*║德│┃✮ 𝚆𝙸𝙺𝙸-𝙴𝙽 <𝚃𝙾𝙿𝙸𝙲>*
*║德│┃✮ 𝚆𝙸𝙺𝙸-𝙵𝚁 <𝚃𝙾𝙿𝙸𝙲>*
*║╰━━━━━━━━━━━━*
*║*
*║━━━ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 ━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝙸𝙼𝙶*
*║德│┃✮ 𝙿𝙻𝙰𝚈*
*║德│┃✮ 𝚃𝙸𝙺𝚃𝙾𝙺*
*║╰━━━━━━━━━━━━*
*║*
*║━━━━━ 𝚃𝙰𝙶𝚂 ━━━━━━╮*
*║╭━━━━━━━━━━━━*
*║德│┃✮ 𝚃𝙰𝙶*
*║德│┃✮ 𝚃𝙰𝙶𝙰𝙳𝙼𝙸𝙽*
*║德│┃✮ 𝚃𝙰𝙶𝙰𝙻𝙻*
*║德│┃✮ 𝚂𝙴𝚃𝚃𝙰𝙶*
*║德│┃✮ 𝚁𝙴𝚂𝙿𝙾𝙽𝚂*
*║╰━━━━━━━━━━━━*
*╰━━━━━━━━━━━━━━━╯*


> *𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 ${OWNER_NAME}*
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
