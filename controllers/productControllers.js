const productModel = require("../Models/productModels");

const getProducts = async (req, res) => {
  try {
    const data = await productModel.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, size, colors, brand } = req.body;

    const newProduct = new productModel({
      name,
      price,
      description,
      size,
      colors,
      brand,
    });

    await newProduct.save();
    res.status(201).json({ status: "succeeded", newProduct, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", newProduct: null, error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    res.status(200).json({ status: "succeeded", product, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", product: null, error: error.message });
  }
};

const patchProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description, size, colors, brand } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send("El product no existe");
    }

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (description) {
      product.description = description;
    }

    if (size) {
      product.size = size;
    }

    if (colors) {
      product.colors = colors;
    }

    if (brand) {
      product.brand = brand;
    }

    await product.save();
    res.status(200).json({ status: "succeeded", product, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send("El producto no existe");
    }

    await productModel.findByIdAndDelete(productId);
    res.status(200).send({ status: "succeeded", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const averageProduct = async (req, res) => {
  try {
    const average = await productModel.aggregate([
      {
        $group: {
          _id: null,
          mediaPrecio: { $avg: "$price" },
        },
      },
    ]);
    res.status(200).json({ status: "succeeded", average, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", average: null, error: error.message });
  }
};

module.exports = {
  addProduct,
  getProductById,
  patchProductById,
  deleteProduct,
  getProducts,
  averageProduct,
};
