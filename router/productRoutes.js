const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProductById,
  patchProductById,
  deleteProduct,
  getProducts,
  averageProduct,
} = require("../controllers/productControllers");

// Rutas sin parámetros dinámicos
router.get("/", getProducts);
router.post("/", addProduct);

// Rutas con parámetros dinámicos (:id)
router.get("/:id", getProductById);
router.patch("/:id", patchProductById);
router.delete("/:id", deleteProduct);

// Ruta para el cálculo del promedio
router.get("/average", averageProduct);

module.exports = router;
