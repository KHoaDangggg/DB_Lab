const express = require('express');
const router = express.Router();
const food_order_web = require('../services/food_order_web');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await food_order_web.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting order `, err.message);
    next(err);
  }
});

module.exports = router;