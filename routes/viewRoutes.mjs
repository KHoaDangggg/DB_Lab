import express from 'express';
import {
    getLoginForm,
    getOverview,
    getProduct,
    getSignupForm,
    getMyCart,
    // getMainPage,
} from '../controllers/viewController.mjs';
import { getBestSellerProducts } from '../controllers/productController.mjs';
// import {
//     isLoggedIn,
//     protect,
// } from '../controllers/authiencationControllers.mjs';
const Router = express.Router();
Router.get('/login', getLoginForm);
Router.get('/signup', getSignupForm);
// Router.use(isLoggedIn);
Router.get('/mycart', getMyCart);
Router.get('/:slug', getProduct);
// Router.get('/mainpage', getMainPage);
Router.get('/best-seller').get(getBestSellerProducts);
Router.route('/').get(getOverview);
export default Router;
