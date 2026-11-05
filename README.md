# Art calendar 2027 – order site

Plain HTML/CSS/JS plus one serverless function (`api/order.js`) that writes each order to Notion.

## Files
- `index.html`, `assets/style.css`, `assets/app.js` – the site
- `assets/img`, `assets/fonts` – images and the Su Brush font
- `api/order.js` – creates a row in Notion "Orders Overview" (token stays on the server)
- Price, PayPal name: top of `assets/app.js` (`CONFIG`)

## Setup
1. **Notion integration**: notion.so/profile/integrations → New integration (internal) → copy the secret.
2. **Share the database**: open "Orders Overview" → ••• → Connections → add your integration.
3. **GitHub**: create a repo, upload/push this folder.
4. **Vercel**: Add New Project → import the repo (no build settings needed).
5. **Environment variables** (Project → Settings): `NOTION_TOKEN` = the secret, `NOTION_DATABASE_ID` = `409407cd-dd33-8075-b3f2-f1e8ddf49da3`. Then Redeploy.
6. **Test**: place an order on the live site, check the new row (Status "New"), delete test rows.

Pickup orders are saved with "Receive it in person"; shipping orders include the address inside the Notion row (page content).
