import catchAsync from '../ultils/catchAsync.mjs';
const getOverview = catchAsync(async (req, res) => {
    res.status(200).render('overview', {
        title: 'Trang chủ',
    });
});
const getProduct = catchAsync(async (req, res, next) => {
    res.status(200).render('product');
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
    res.status(200).render('cart', {
        title: 'My cart',
    });
});
export {
    getOverview,
    getProduct,
    getLoginForm,
    getSignupForm,
    getMyCart,
};
