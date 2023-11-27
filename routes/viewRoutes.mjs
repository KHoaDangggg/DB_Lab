import express from 'express';
import {
    getLoginForm,
    getOverview,
    getProduct,
    getSignupForm,
    getMyCart,
    getBestSeller
    // getMainPage,
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
Router.get('/best-seller',getBestSeller);
Router.get('/:id', getProduct);
// Router.get('/mainpage', getMainPage);
Router.route('/').get(getOverview);
export default Router;
