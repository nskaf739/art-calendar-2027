// Vercel serverless function: receives an order from the website and
// creates one row in the Notion database "Orders Overview".
// NOTION_TOKEN and NOTION_DATABASE_ID are set in Vercel (never in the browser code).

const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!token || !dbId) return res.status(500).json({ error: "Server not configured" });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});

  const first = clean(b.first, 80), last = clean(b.last, 80);
  const email = clean(b.email, 200);
  const qty = Math.floor(Number(b.qty));
  const ship = b.delivery === "Shipping to my home";
  const delivery = ship ? "Shipping to my home" : "Receive it in person";

  if (!first || !last || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !(qty >= 1 && qty <= 99)) {
    return res.status(400).json({ error: "Invalid order" });
  }

  const address = ship
    ? [clean(b.street, 120) + " " + clean(b.nr, 20), clean(b.zip, 20) + " " + clean(b.city, 80), clean(b.country, 80)].join(", ")
    : "";
  if (ship && address.replace(/[ ,]/g, "").length < 6) return res.status(400).json({ error: "Address missing" });

  const total = Number(b.total);
  const date = new Date().toISOString().slice(0, 10);

  const lines = [
    "Delivery: " + delivery,
    ship ? "Address: " + address : null,
    Number.isFinite(total) ? "Total shown to customer: " + total.toFixed(2) + " EUR" : null,
  ].filter(Boolean);

  const page = {
    parent: { database_id: dbId },
    properties: {
      "Name": { title: [{ text: { content: first + " " + last } }] },
      "E-Mail": { email: email },
      "Nummer": { number: qty },
      "Datum": { date: { start: date } },
      "Auswählen": { select: { name: delivery } },
      "Status": { select: { name: "New" } },
    },
    children: lines.map(t => ({
      object: "block", type: "paragraph",
      paragraph: { rich_text: [{ type: "text", text: { content: t } }] },
    })),
  };

  try {
    const r = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });
    if (!r.ok) {
      console.error("Notion error", r.status, await r.text());
      return res.status(502).json({ error: "Could not save order" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ error: "Could not save order" });
  }
};
