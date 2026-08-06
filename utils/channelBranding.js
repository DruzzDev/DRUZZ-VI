import fs from 'fs';
import { WA_CHANNEL } from '../config.js';

let thumbnail;
try {
    thumbnail = fs.readFileSync('./1.png');
} catch {
    thumbnail = undefined;
}

/*
 * Wrap sendMessage without ever making the command depend on the
 * WhatsApp channel preview. If WhatsApp rejects the preview metadata,
 * the original message is sent normally.
 */
export function channelClient(client) {
    return new Proxy(client, {
        get(target, prop) {
            if (prop !== 'sendMessage') {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            }

            return async (jid, content = {}, options = {}) => {
                if (!WA_CHANNEL || content?.delete || content?.react) {
                    return target.sendMessage(jid, content, options);
                }

                const existing = content.contextInfo || {};
                const externalAdReply = {
                    ...(existing.externalAdReply || {}),
                    title: 'DRUZZ X-MD',
                    body: 'View official channel',
                    mediaType: 1,
                    sourceUrl: WA_CHANNEL,
                    mediaUrl: WA_CHANNEL,
                    renderLargerThumbnail: false,
                    ...(thumbnail ? { thumbnail } : {})
                };

                const decorated = {
                    ...content,
                    contextInfo: {
                        ...existing,
                        externalAdReply
                    }
                };

                try {
                    return await target.sendMessage(jid, decorated, options);
                } catch (previewError) {
                    console.warn('[channel-preview] fallback:', previewError?.message || previewError);
                    // The channel card must never break a command.
                    return target.sendMessage(jid, content, options);
                }
            };
        }
    });
}

export default channelClient;
