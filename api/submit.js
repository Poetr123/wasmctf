// api/submit.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { flag } = req.body || {};
  if (!flag) {
    res.status(400).json({ message: "Flag is required." });
    return;
  }

  // Correct flag (admin set): do not expose this in public repo
  const CORRECT_FLAG = "ptz{dont_brute_me_5layers}";

  if (flag === CORRECT_FLAG) {
    res.status(200).json({ message: "Correct. Well done." });
  } else {
    res.status(200).json({ message: "Incorrect. Try again." });
  }
}
