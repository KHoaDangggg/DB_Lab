import express from 'express';
import {
    getLoginForm,
    getOverview,
    getProduct,
    getSignupForm,
    getMyCart,
} from '../controllers/viewController.mjs';
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
Router.route('/').get(getOverview);
export default Router;
