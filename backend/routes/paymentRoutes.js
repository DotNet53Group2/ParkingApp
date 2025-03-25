const express = require("express");
const db = require("../db/db");
const router = express.Router();

router.post("/", (req, res) => {
  const { cardNumber, cardHolder, expiryDate, cvc } = req.body;
  
  if (!cardNumber || !cardHolder || !expiryDate || !cvc) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.run(
    "INSERT INTO payments (cardNumber, cardHolder, expiryDate, cvc) VALUES (?, ?, ?, ?)",
    [cardNumber, cardHolder, expiryDate, cvc],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: "Payment method saved!" });
    }
  );
});

router.get("/", (req, res) => {
  db.all("SELECT id, cardHolder, cardNumber, expiryDate FROM payments", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/process", (req, res) => {
  const { cardNumber, cardHolder, expiryDate, cvc } = req.body;

  if (!cardNumber || !cardHolder || !expiryDate || !cvc) {
    return res.status(400).json({ error: "Missing payment details." });
  }

  setTimeout(() => {
    res.json({ success: true, message: "Payment processed successfully!" });
  }, 2000);
});

module.exports = router;
