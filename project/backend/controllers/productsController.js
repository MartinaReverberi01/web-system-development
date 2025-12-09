const { productSchema } = require("../validators/productValidator");
const db = require("../db");

// GET /products
exports.getAllProducts = (req, res) => {
  const { cat, sub } = req.query;

  let sql = `
    SELECT 
      p.*, 
      c.name AS category,
      s.name AS subcategory,
      (
        SELECT SUM(quantity)
        FROM product_sizes ps 
        WHERE ps.product_id = p.id
      ) AS total_quantity,
      (
        SELECT GROUP_CONCAT(ps.size || '(' || ps.quantity || ')', ', ')
        FROM product_sizes ps
        WHERE ps.product_id = p.id
      ) AS sizes_summary
    FROM products p
    INNER JOIN categories c ON p.category_id = c.id
    LEFT JOIN subcategories s ON p.subcategory_id = s.id
    WHERE 1 = 1
  `;

  const params = [];

  if (cat) {
    sql += " AND LOWER(c.name) = LOWER(?)";
    params.push(cat);
  }

  if (sub && sub !== "all") {
    sql += " AND LOWER(s.name) = LOWER(?)";
    params.push(sub);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /products/:id
exports.getProductById = (req, res) => {
  const productSql = `
    SELECT 
      p.*,
      c.name AS category,
      s.name AS subcategory
    FROM products p
    INNER JOIN categories c ON p.category_id = c.id
    LEFT JOIN subcategories s ON p.subcategory_id = s.id
    WHERE p.id = ?
  `;

  const sizesSql = `
    SELECT size, quantity
    FROM product_sizes
    WHERE product_id = ?
    ORDER BY size
  `;

  db.get(productSql, [req.params.id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: "Product not found" });

    db.all(sizesSql, [req.params.id], (err2, sizes) => {
      if (err2) return res.status(500).json({ error: err2.message });

      product.sizes = sizes;
      res.json(product);
    });
  });
};

// POST /products
exports.addProduct = (req, res) => {
  const parsed = productSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  const data = parsed.data;

  const sql = `
    INSERT INTO products
      (name, description, image, category_id, subcategory_id, price, old_price, available, in_sale)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      data.name,
      data.description,
      data.image,
      data.category_id,
      data.subcategory_id || null,
      data.price,
      data.old_price || null,
      data.available,
      data.in_sale,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const productId = this.lastID;

      if (data.sizes?.length > 0) {
        const insertSize = db.prepare(`
          INSERT INTO product_sizes (product_id, size, quantity)
          VALUES (?, ?, ?)
        `);

        data.sizes.forEach((s) => {
          insertSize.run(productId, s.size, s.quantity || 0);
        });

        insertSize.finalize();
      }

      res.json({ message: "Product added", id: productId });
    }
  );
};

// PUT /products/:id
exports.updateProduct = (req, res) => {
  const parsed = productSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  const data = parsed.data;
  const id = req.params.id;

  const updateSql = `
    UPDATE products
    SET name = ?, description = ?, image = ?, category_id = ?, subcategory_id = ?,
        price = ?, old_price = ?, available = ?, in_sale = ?
    WHERE id = ?
  `;

  db.serialize(() => {
    db.run(
      updateSql,
      [
        data.name,
        data.description,
        data.image,
        data.category_id,
        data.subcategory_id || null,
        data.price,
        data.old_price || null,
        data.available,
        data.in_sale,
        id,
      ],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
          return res.status(404).json({ error: "Product not found" });

        // Reset sizes
        db.run(`DELETE FROM product_sizes WHERE product_id = ?`, [id], (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });

          if (data.sizes?.length > 0) {
            const insertSize = db.prepare(`
              INSERT INTO product_sizes (product_id, size, quantity)
              VALUES (?, ?, ?)
            `);

            data.sizes.forEach((s) => {
              insertSize.run(id, s.size, s.quantity || 0);
            });

            insertSize.finalize();
          }

          res.json({ message: "Product updated" });
        });
      }
    );
  });
};

// DELETE /products/:id
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  db.serialize(() => {
    db.run(
      `DELETE FROM product_sizes WHERE product_id = ?`,
      [id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });

        db.run(`DELETE FROM products WHERE id = ?`, [id], function (err2) {
          if (err2) return res.status(500).json({ error: err2.message });
          if (this.changes === 0)
            return res.status(404).json({ error: "Product not found" });

          res.json({ message: "Product deleted" });
        });
      }
    );
  });
};
