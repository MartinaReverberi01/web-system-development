const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.post("/", controller.addProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
router.post('/checkout', controller.processCheckout);

module.exports = router;

