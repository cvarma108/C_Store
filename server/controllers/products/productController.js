import { sql } from "../../config/db.js";
//CRUD operations

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error getting products", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;

  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const addProduct = await sql`
            INSERT INTO products (name,image,price)
            VALUES (${name},${image},${price})
            RETURNING *
        `;
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: addProduct[0],
    });
  } catch (error) {
    console.log("Error creating product", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id,'id')

  try {
    const getproduct = await sql`
          SELECT * FROM products WHERE id=${id}
        `;

    if (getproduct.length > 0) {
      res.status(200).json({ success: true, data: getproduct[0] });
    } else {
      res.status(404).json({ success: false, message: "product not found" });
    }
  } catch (error) {
    console.log("Error getting product", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await sql`
        DELETE FROM products WHERE id=${id}
        RETURNING *
        `;
    if (deleteProduct.length > 0) {
      res.status(200).json({
        success: true,
        data: deleteProduct[0],
        measage: "product deleted successfully",
      });
    } else {
      res.status(404).json({
        success: true,
        measage: "product not found",
      });
    }
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;

  try {
    const updateProduct = await sql`
          UPDATE products
          SET name=${name},image=${image},price=${price}
          WHERE id=${id}
          RETURNING *
          `;

    if (updateProduct.length > 0) {
      res.status(200).json({
        success: true,
        measage: "product updated successfully",
        data: updateProduct[0],
      });
    } else {
      res.status(404).json({ success: true, measage: "product not found" });
    }
  } catch (error) {
    console.log("Error updating product", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
