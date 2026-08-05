import fs from 'fs';

import path from 'path';

// Path to config.json
const configPath = 'config.json';

// Load config at startup
let config = {};

if (fs.existsSync(configPath)) {

    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

} else {

    config = { users: {} };
}

for (const cfg of Object.values(config.users || {})) {
    cfg.sudoList ||= []; cfg.prefix ||= '.'; cfg.welcome ??= false; cfg.goodbye ??= false; cfg.antilink ??= false; cfg.online ??= false; cfg.type ??= false; cfg.record ??= false; cfg.autoreact ??= false; cfg.like ??= false;
}

// Auto-save config when modified
const saveConfig = () => {

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};

// **Direct Access Object**
export default {

    config,

    save() {

        saveConfig();
    }
};
