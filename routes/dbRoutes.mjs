import express from 'express';
import { getAllProducts } from '../controllers/productController.mjs';
const router = express.Router();


/* FOOD */
router.get('/food/', async function(req, res, next) {
  try {
    const result = await getAllProducts();
    res.json(result)
  } catch (err) {
    console.error(`Error while getting order `, err.message);
    next(err);
  }
});

export default router;