const loginModels = require("../Models/loginModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const newUser = new loginModels({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });

    await newUser.save();

    res.status(201).json({
      status: "Success",
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res
        .status(404)
        .json({ status: "Failed", data: null, error: "El correo ya existe" });
    }

    if (error.message.includes("Correo incorrecto")) {
      return res.status(404).json({
        status: "Failed",
        data: null,
        error: "El correo es incorrecto",
      });
    }

    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await loginModels.findOne({ email: req.body.email });

    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validatePassword) {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.TOKEN_SECRET,
          { expiresIn: "1min" }
        );

        return res.status(201).json({
          status: "Success",
          message: "Usuario correcto",
          data: {
            user: user,
            token: token,
          },
        });
      }

      return res.status(400).json({
        status: "Failed",
        data: null,
        error: "Usuario o contraseña incorrecto",
      });
    }

    return res.status(400).json({
      status: "Failed",
      data: null,
      error: "Usuario o contraseña incorrecto",
    });
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      data: null,
      error: error.message,
    });
  }
};

module.exports = { signup, login };
