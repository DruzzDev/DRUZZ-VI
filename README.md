# 𝗗𝗥𝗨𝗭𝗭 𝗫-𝗠𝗗 — Premium Pairing Website

The pairing website is a custom dark/glass UI with:
- Responsive mobile-first layout
- Telegram and WhatsApp channel links
- Inline SVG icons (no emoji icons)
- Animated background and entrance effects
- Pairing success sound
- Copy pairing-code button
- Generate/re-generate pairing-code button
- Menu drawer
- Automatic polling for the code (no second click required)
- Number input accepts `+1...` or `509...`
- Mobile viewport/zoom restrictions
- `process.env.PORT` support for Render/Seyori and similar hosts

## Deploy
Build:
```bash
npm install
```

Start:
```bash
npm start
```

Recommended environment variable:
```text
PAIRING_SECRET=your_private_secret
```

Open the service URL and enter the WhatsApp number with country code.

## Stability changes
- The website no longer asks visitors for `PAIRING_SECRET`.
- Pairing API no longer blocks code generation on that variable.
- Repeated requests for the same number do not start competing pairing sessions.
- Keep `PAIRING_SECRET` unset for this public pairing flow.


## Stability fixes in this build
- Optional auto-features are isolated so a failure cannot block `.menu` or other commands.
- Fixed the tag-response LID null bug that could throw on ordinary incoming messages.
- Removed the automatic newsletter join from the socket-open path.
- Added stale-socket protection so an old socket cannot delete a newer active session.
- Added reconnect handling for transient WhatsApp disconnects without deleting auth state.
- Added longer connection/query timeouts and a keep-alive interval.
- Pairing website uses a hot red/orange transparent glass theme.
- Sound attempts to start on the first user interaction with the page; browser autoplay policies may still block audio until a user gesture.
