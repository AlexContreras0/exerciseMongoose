const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  searchTerm,
  searchByName,
} = require("../controllers/usersControllers");
const verifyToken = require("../middlewares/auth");

const router = require("express").Router();

// si en la ruta hay : indica la parte dinámica. Ejemplo: (/:id)

router.get("/", getUsers);
router.get("/count", countUsers);
router.get("/search", searchTerm);
router.get("/name", searchByName);

router.get("/:id", getUserById);
router.patch("/:id", patchById);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
