const router = require("express").Router();
const { signup } = require("../controllers/loginControllers");
const { login } = require("../controllers/loginControllers");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
