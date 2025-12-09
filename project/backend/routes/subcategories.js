const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /subcategories?category_id=2
router.get("/", (req, res) => {
  const categoryId = req.query.category_id;

  if (!categoryId) {
    return res.status(400).json({ error: "category_id is required" });
  }

  const sql = `SELECT id, name FROM subcategories WHERE category_id = ?`;

  db.all(sql, [categoryId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(rows);
  });
});

module.exports = router;
