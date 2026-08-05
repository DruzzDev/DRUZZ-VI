
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
╭─────────────────╮
┃ 🦞  ${BOT_NAME}  🦞┃
╰─────────────────╯
*║╭─────────────────╮*
*║│ 𝙿𝚁𝙴𝙵𝙸𝚇 : ${(configManager.config.users[number]?.prefix || '.')}*
*║│ 𝚆𝙰𝚂𝚂𝚄𝙿, ${username}*
*║│ 𝙳𝙰𝚈 : ${currentDay}*
*║│ 𝙳𝙰𝚃𝙴 : ${currentDate}/${currentMonth}/${currentYear}*
*║│ 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 1.0.1*
*║│ 𝙿𝙻𝚄𝙶𝙸𝙽𝚂 : 64*
*║│ 𝚃𝚈𝙿𝙴 : 𝚇-𝙼𝙳*
*║╰─────────────────╯*


*╭─────[ 𝙼𝙴𝙽𝚄𝚂 ]────╮*
*│╭──────────────*
*│┃✮ 𝙼𝙴𝙽𝚄*
*│┃✮ 𝙿𝚁𝙴𝙼-𝙼𝙴𝙽𝚄*
*│┃✮ 𝙱𝚄𝙶-𝙼𝙴𝙽𝚄*
*│╰──────────────*
*╰─────────────────╯*

*╭─────[ 𝚃𝙾𝙾𝙻𝚂 ]─────╮*
*│╭───────────────*
*│┃✮ 𝙿𝙸𝙽𝙶*
*│┃✮ 𝙶𝙴𝚃𝙸𝙳*
*│┃✮ 𝚂𝚄𝙳𝙾*
*│┃✮ 𝚃𝙾𝚄𝚁𝙻*
*│┃✮ 𝙾𝚆𝙽𝙴𝚁*
*│┃✮ 𝙵𝙰𝙽𝙲𝚈*
*│┃✮ 𝚄𝙿𝙳𝙰𝚃𝙴*
*│┃✮ 𝙳𝙴𝚅𝙸𝙲𝙴*
*│┃✮ 𝙳𝙴𝙻𝚂𝚄𝙳𝙾*
*│┃✮ 𝙶𝙴𝚃𝚂𝚄𝙳𝙾*
*│╰──────────────*
*╰─────────────────╯*

*╭──[ 𝙲𝙾𝙽𝙵𝙸𝙶 ]─────╮*
*│╭─────────────*
*│┃✮ 𝙾𝙽𝙻𝙸𝙽𝙴*
*│┃✮ 𝚆𝙴𝙻𝙲𝙾𝙼𝙴*
*│┃✮ 𝙰𝚄𝚃𝙾𝚃𝚈𝙿𝙴*
*│┃✮ 𝙰𝚄𝚃𝙾𝚁𝙴𝙰𝙲𝚃*
*│┃✮ 𝚂𝙴𝚃𝙿𝚁𝙴𝙵𝙸𝚇*
*│┃✮ 𝙶𝙴𝚃𝙲𝙾𝙽𝙵𝙸𝙶*
*│┃✮ 𝚂𝚃𝙰𝚃𝚄𝚂𝙻𝙸𝙺𝙴*
*│┃✮ 𝙰𝚄𝚃𝙾𝚁𝙴𝙲𝙾𝚁𝙳*
*│╰─────────────*
*╰─────────────────╯*

*╭────[ 𝙶𝚁𝙾𝚄𝙿 ]────╮*
*│╭─────────────*
*│┃✮ 𝙱𝚈𝙴*
*│┃✮ 𝙺𝙸𝙲𝙺*
*│┃✮ 𝙿𝚄𝚁𝙶𝙴*
*│┃✮ 𝙼𝚄𝚃𝙴*
*│┃✮ 𝚄𝙽𝙼𝚄𝚃𝙴*
*│┃✮ 𝙿𝚁𝙾𝙼𝙾𝚃𝙴*
*│┃✮ 𝙳𝙴𝙼𝙾𝚃𝙴*
*│┃✮ 𝙶𝙲𝙻𝙸𝙽𝙺*
*│┃✮ 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺*
*│┃✮ 𝙺𝙸𝙲𝙺𝙰𝙻𝙻*
*│┃✮ 𝙿𝚁𝙾𝙼𝙾𝚃𝙴𝙰𝙻𝙻*
*│┃✮ 𝙳𝙴𝙼𝙾𝚃𝙴𝙰𝙻𝙻*
*│╰──────────────*
*╰─────────────────╯*

*╭────[  𝙼𝙴𝙳𝙸𝙰  ]────╮*
*│╭──────────────*
*│┃✮ 𝚅𝚅*
*│┃✮ 𝚃𝙰𝙺𝙴*
*│┃✮ 𝚂𝙰𝚅𝙴*
*│┃✮ 𝙿𝙷𝙾𝚃𝙾*
*│┃✮ 𝚂𝙴𝚃𝙿𝙿*
*│┃✮ 𝙶𝚁𝚃𝙿𝙿*
*│┃✮ 𝚃𝙾𝙰𝚄𝙳𝙸𝙾*
*│┃✮ 𝚂𝚃𝙸𝙲𝙺𝙴𝚁*
*│╰──────────────*
*╰────────────────╯*

*╭────[ 𝚂𝙴𝙰𝚁𝙲𝙷 ]────╮*
*│╭──────────────*
*│┃✮ 𝙳𝚁𝚄𝚉𝚉 <𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽>*
*│┃✮ 𝚆𝙸𝙺𝙸-𝙴𝙽 <𝚃𝙾𝙿𝙸𝙲>*
*│┃✮ 𝚆𝙸𝙺𝙸-𝙵𝚁 <𝚃𝙾𝙿𝙸𝙲>*
*│╰──────────────*
*╰─────────────────╯*

*╭──[ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 ]───╮*
*│╭──────────────*
*│┃✮ 𝙸𝙼𝙶*
*│┃✮ 𝙿𝙻𝙰𝚈*
*│┃✮ 𝚃𝙸𝙺𝚃𝙾𝙺*
*│╰──────────────*
*╰─────────────────╯*

*╭─────[ 𝚃𝙰𝙶𝚂 ]─────╮*
*│╭──────────────*
*│┃✮ 𝚃𝙰𝙶*
*│┃✮ 𝚃𝙰𝙶𝙰𝙳𝙼𝙸𝙽*
*│┃✮ 𝚃𝙰𝙶𝙰𝙻𝙻*
*│┃✮ 𝚂𝙴𝚃𝚃𝙰𝙶*
*│┃✮ 𝚁𝙴𝚂𝙿𝙾𝙽𝚂*
*│╰──────────────*
*╰─────────────────╯*

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
