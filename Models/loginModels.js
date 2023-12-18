const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Correo incorrecto"],
    minlength: 6,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: [true, "El Rol es obligatorio"],
    enum: ["user", "admin"],
    default: "user",
  },
});

const Login = mongoose.model("Login", loginSchema, "Login");

module.exports = Login;
