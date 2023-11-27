import { getAllProducts, getBestSellerProducts, getOneProduct } from './productController.mjs';
import catchAsync from '../ultils/catchAsync.mjs';
const getOverview = catchAsync(async (req, res) => {
    const query = req.query;
    console.log(query);
    const pattern = query.pattern || ''
    const currentPage = query.page || 1;
    const sort = query.sort || '';
    const foodType = query.foodType || '';
    const maxPrice = query.maxPrice || 1000000000;
    const minPrice = query.minPrice || 0;
    const avail = query.available || '';
    const {products, page} = await getAllProducts(
        parseInt(currentPage), sort, foodType,
        maxPrice, minPrice, avail, pattern);
    res.status(200).render('overview', {
        title: 'Trang chủ',
        products,
        page,
        req
    });
});

const getBestSeller = catchAsync(async (req, res, next) => {
    const products = await getBestSellerProducts();
    res.status(200).render('overview', {
        title: 'Best Seller',
        products,
        req
    })
})
const getProduct = catchAsync(async (req, res, next) => {
    const product = await getOneProduct(req.params.id)
    res.status(200).render('product', {
        title: product.name,
        product,
        req
    });
});
const getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Login to your acount',
    });
};
const getSignupForm = (req, res) => {
    res.status(200).render('signup', {
        title: 'Create your acount',
    });
};
const getMyCart = catchAsync(async (req, res) => {
    res.status(200).render('myCart', {
        title: 'My cart',
    });
});
export {
    getOverview,
    getProduct,
    getLoginForm,
    getSignupForm,
    getMyCart,
    getBestSeller
};
