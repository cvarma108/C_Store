import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products/productController.js";

const router = express.Router();

// router.get('/1',(req,res)=>{
//     //GET product1
//     res.send('This is product 1')
// })

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
// router.put("/", updateProducts);
router.delete("/:id", deleteProduct);
// router.delete("/", deleteProducts);
export default router;
