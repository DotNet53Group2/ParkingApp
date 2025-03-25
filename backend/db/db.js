const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database.");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cardNumber TEXT,
      cardHolder TEXT,
      expiryDate TEXT,
      cvc TEXT
    )
  `);
});

module.exports = db;
