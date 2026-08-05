import fs from 'fs';
import { WA_CHANNEL } from '../config.js';

let thumbnail;
try { thumbnail = fs.readFileSync('./1.png'); } catch { thumbnail = undefined; }

export function channelClient(client) {
    return new Proxy(client, {
        get(target, prop) {
            if (prop !== 'sendMessage') {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            }

            return async (jid, content = {}, options = {}) => {
                // Do not decorate deletions/reactions with a channel card.
                if (content?.delete || content?.react) {
                    return target.sendMessage(jid, content, options);
                }

                const existing = content.contextInfo || {};
                const externalAdReply = existing.externalAdReply || {
                    title: 'View channel',
                    body: '𝗗𝗥𝗨𝗭𝗭 𝗫-𝗠𝗗 • ᴏғғɪᴄɪᴀʟ ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ',
                    mediaType: 1,
                    sourceUrl: WA_CHANNEL,
                    mediaUrl: WA_CHANNEL,
                    renderLargerThumbnail: false,
                    thumbnail: thumbnail
                };

                const decorated = {
                    ...content,
                    contextInfo: {
                        ...existing,
                        externalAdReply
                    }
                };

                return target.sendMessage(jid, decorated, options);
            };
        }
    });
}
