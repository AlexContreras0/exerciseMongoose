const userModel = require("../Models/userModels");

let USERS = [
  { id: 0, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 1, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 2, name: "Usuario 3", email: "usuario3@example.com" },
];

const getUsers = async (req, res) => {
  try {
    const data = await userModel.find(); // Busca todos los usuarios en la base de datos
    res.status(200).json({ status: "succeeded", data, error: null }); // Devuelve los usuarios encontrados
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud
    const user = await userModel.findById(userId); // Busca un usuario por su ID
    res.status(200).json({ status: "succeeded", user }); // Devuelve el usuario encontrado
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

// //Metodo patch para obtener un unico usuario
const patchById = async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud
    const { name, email } = req.body; // Obtiene el nuevo nombre y correo electrónico del usuario

    const user = await userModel.findById(userId); // Busca un usuario por su ID

    if (!user) {
      return res.status(404).send("El usuario no existe"); // Si el usuario no existe, devuelve un mensaje de error
    }

    if (name) {
      user.name = name; // Actualiza el nombre del usuario si se proporciona un nuevo nombre
    }

    if (email) {
      user.email = email; // Actualiza el correo electrónico del usuario si se proporciona uno nuevo
    }

    await user.save(); // Guarda los cambios en la base de datos
    res.status(200).json({ status: "succeeded", user, error: null }); // Devuelve el usuario actualizado
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body; // Obtiene el nombre y correo electrónico del nuevo usuario

    const newUser = new userModel({
      // Crea un nuevo modelo de usuario con los datos proporcionados
      name,
      email,
    });

    await newUser.save(); // Guarda el nuevo usuario en la base de datos
    res.status(201).json({ status: "succeeded", newUser, error: null }); // Devuelve el nuevo usuario creado
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud
    const user = await userModel.findById(userId); // Busca un usuario por su ID

    if (!user) {
      return res.status(404).send("El usuario no existe"); // Si el usuario no existe, devuelve un mensaje de error
    }

    await userModel.findByIdAndDelete(userId); // Elimina el usuario de la base de datos
    res.status(200).send({ status: "succeeded", error: null }); // Devuelve un mensaje de éxito
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const countUsers = async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.status(200).json({ status: "succeeded", count });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", count: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const searchTerm = async (req, res) => {
  try {
    //const term = /@/;
    //const search = await userModel.countDocuments({ email: term });

    const search = await userModel.find({ email: /@/ });

    res.status(200).json({ status: "succeeded", search });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", search: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

const searchByName = async (req, res) => {
  try {
    const name = await userModel.find({}, { name: 1, _id: 0 });
    res.status(200).json({ status: "succeeded", name });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", name: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

module.exports = {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  searchTerm,
  searchByName,
};
