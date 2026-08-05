import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from 'baileys';
import configManager from './manageConfigs.js';
import fs from 'fs';
import group from '../commands/group.js';
import autoJoin from './autoJoin.js';

const SESSIONS_FILE = "sessions.json";
const sessions = {};

function normalizeNumber(value) {
    return String(value || '').replace(/\D/g, '');
}

function saveSessionNumber(number) {
    let sessionsList = [];
    if (fs.existsSync(SESSIONS_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
            sessionsList = Array.isArray(data.sessions) ? data.sessions : [];
        } catch {
            sessionsList = [];
        }
    }
    if (!sessionsList.includes(number)) {
        sessionsList.push(number);
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ sessions: sessionsList }, null, 2));
    }
}

function removeSession(number) {
    if (fs.existsSync(SESSIONS_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
            const sessionsList = Array.isArray(data.sessions) ? data.sessions.filter(n => n !== number) : [];
            fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ sessions: sessionsList }, null, 2));
        } catch {}
    }

    const sessionPath = `./sessions/${number}`;
    if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
    delete sessions[number];

    if (configManager.config?.users?.root?.primary === number) {
        configManager.config.users.root.primary = "";
        configManager.save();
    }
}

function ensureUserConfig(number) {
    configManager.config ||= {};
    configManager.config.users ||= {};
    configManager.config.users[number] ||= {
        sudoList: [],
        tagAudioPath: "tag.mp3",
        antilink: false,
        response: true,
        autoreact: false,
        prefix: ".",
        welcome: false,
        record: false,
        type: false,
        like: false,
        online: false,
        emoji: "🥷"
    };
    configManager.config.users.root ||= {};
    configManager.save();
}

export function getSession(number) {
    return sessions[normalizeNumber(number)];
}

export async function startSession(targetNumber, handler, makePrimary = true, onPairingCode = () => {}) {
    const number = normalizeNumber(targetNumber);
    if (!number || number.length < 7 || number.length > 15) {
        throw new Error("Invalid WhatsApp number. Use country code + number, digits only.");
    }

    if (sessions[number]) return sessions[number];

    const sessionPath = `./sessions/${number}`;
    fs.mkdirSync(sessionPath, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        auth: state,
        version,
        printQRInTerminal: false,
        syncFullHistory: false,
        markOnlineOnConnect: false
    });

    sessions[number] = sock;
    ensureUserConfig(number);
    saveSessionNumber(number);

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
        if (connection === 'open') {
            configManager.config.users.root.primary = number;
            configManager.save();
            console.log(`✅ Session open for ${number}`);

            try {
                await autoJoin(sock, "120363418427132205@newsletter");
            } catch (e) {
                console.warn("AutoJoin skipped:", e.message);
            }
        }

        if (connection === 'close') {
            const code = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = code !== DisconnectReason.loggedOut;
            delete sessions[number];

            if (shouldReconnect) {
                console.log(`🔄 Reconnecting ${number}...`);
                setTimeout(() => startSession(number, handler, false, onPairingCode).catch(console.error), 3000);
            } else {
                console.log(`❌ Session logged out: ${number}`);
                removeSession(number);
            }
        }
    });

    sock.ev.on('messages.upsert', async msg => {
        try {
            await handler(msg, sock);
        } catch (err) {
            console.error("Message handler error:", err);
        }
    });

    if (!state.creds.registered) {
        setTimeout(async () => {
            if (state.creds.registered) return;
            try {
                const code = await sock.requestPairingCode(number);
                console.log(`📲 Pairing code for ${number}: ${code}`);
                onPairingCode(code, number);
            } catch (err) {
                console.error("Pairing code error:", err);
                onPairingCode(null, number, err);
            }
        }, 2500);
    }

    return sock;
}

export default startSession;
