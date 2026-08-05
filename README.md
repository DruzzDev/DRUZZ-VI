# DRUZZ VI — Premium Pairing Website

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
- Number input accepts `+1809...` or `1809...`
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
