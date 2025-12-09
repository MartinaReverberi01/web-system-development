require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/products");
const upload = require("./upload/upload");
const categoriesRoutes = require("./routes/categories");
const subcategoriesRoutes = require("./routes/subcategories");

const app = express();   

app.use(cors());
app.use(express.json());
app.use(logger);

// Register the subcategory route
app.use("/categories", categoriesRoutes);
app.use("/subcategories", subcategoriesRoutes);
// Main routes
app.use("/products", productRoutes);
app.use("/images", express.static("upload/images"));

// Upload images
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    imageUrl: `http://localhost:4000/images/${req.file.filename}`
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server active on port", PORT));

