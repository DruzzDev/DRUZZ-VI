export async function pingCommand(message, client) {
    const remoteJid = message.key?.remoteJid;
    if (!remoteJid) return;

    const startTime = Date.now();
    await client.sendMessage(remoteJid, {
        text: '🏓 𝙿𝙾𝙽𝙶!'
    }, { quoted: message });

    const latency = Date.now() - startTime;
    // Keep the command lightweight; one additional plain text send is safe.
    await client.sendMessage(remoteJid, {
        text: `*𝚂𝙿𝙴𝙴𝙳: ${latency} 𝙼𝚂*`
    }, { quoted: message });
}

export default pingCommand;
