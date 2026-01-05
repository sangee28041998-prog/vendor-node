const express = require("express");
const router = express.Router();

const { getallProducts, getproductById, createProduct, editProduct, deleteProduct } = require("../controller/product.controller");

const authMiddleware = require("../middleware/authMiddleware");


router.get("/", getallProducts);
router.get("/:id", authMiddleware([]), getproductById);
router.post("/", authMiddleware(["admin"]), createProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;