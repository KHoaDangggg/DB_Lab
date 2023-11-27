import express from 'express';
import { getAllProducts } from '../controllers/productController.mjs';
const router = express.Router();


/* FOOD */
router.get('/', async function(req, res, next) {
  try {
    const {products} = await getAllProducts();
    res.json({products})
  } catch (err) {
    console.error(`Error while getting order `, err.message);
    next(err);
  }
});




export default router;