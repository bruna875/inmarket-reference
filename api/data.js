export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const SHEET_URL = "https://script.google.com/macros/library/d/13MMs04e_Svw2gNvwdakInwKGxdM9i1Eie3Geo6qHs1hVlwGlE1JvaTtd/6";

  try {
    const response = await fetch(SHEET_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
