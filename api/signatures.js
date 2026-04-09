import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "GET") {
    try {
      const sigs = await kv.get("inmarket_signatures");
      res.status(200).json(sigs || {});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === "POST") {
    try {
      const body = req.body;
      await kv.set("inmarket_signatures", body);
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
