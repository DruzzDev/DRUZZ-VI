// test.js
async function autoJoin(sock, channelId, cont) {

    const jid =  '120363424818286187@newsletter'; // Replace with your target newsletter ID

    const queryId = '120363424818286187@newsletter'; // Replace with actual query ID if needed

    const encoder = new TextEncoder();

    const server = 's.whatsapp.net';

    const joinNode = {

        tag: 'iq',
        attrs: {
            id: sock.generateMessageTag(),
            type: 'get',
            xmlns: 'w:mex',
            to: server,
        },
        content: [
            {
                tag: 'query',
                attrs: { 'query_id': queryId },
                content: encoder.encode(JSON.stringify({
                    variables: {
                        newsletter_id: jid,
                        ...(cont || {})
                    }
                }))
            }
        ]
    };

    const fetchNode = {
        tag: 'iq',
        attrs: {
            id: sock.generateMessageTag(),
            type: 'get',
            xmlns: 'newsletter',
            to: server,
        },
        content: [
            {
                tag: 'messages',
                attrs: {
                    type: 'jid',
                    jid: jid,
                    count: '1'
                },
                content: [] // never use null here
            }
        ]
    };

    try {
        const joinResponse = await sock.query(joinNode);
        console.log(`✅ 𝗦𝗲𝗻𝘁 𝗷𝗼𝗶𝗻 𝗿𝗲𝗾𝘂𝗲𝘀𝘁: ${jid}`, joinResponse);


    } catch (err) {
        console.error('❌ 𝗘𝗿𝗿𝗼𝗿 𝗶𝗻 𝘁𝗲𝘀𝘁 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻:', err);
    }
};

export default  autoJoin;
