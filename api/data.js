export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbwTcU3Dt0k-Es_zxTK_mHQdym_4rCdri6croZtzo-mgRVVL6rLoikdw3zVCkQw1wufWSQ/exec";

  try {
    const response = await fetch(SHEET_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
