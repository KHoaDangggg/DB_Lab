import catchAsync from '../ultils/catchAsync.mjs';
const getOverview = catchAsync(async (req, res) => {
    
    const products = [
        {
            itemID: 1,
            itemName: "Food 1",
            itemStatus: true,
            price: 1000,
            image: 'images/cake.jpg',
            rate: 4
        },
        {
            itemID: 1,
            itemName: "Food 1",
            itemStatus: true,
            price: 1000,
            image: 'images/cake.jpg',
            rate: 4
        },
        {
            itemID: 1,
            itemName: "Food 1",
            itemStatus: true,
            price: 1000,
            image: 'images/cake.jpg',
            rate: 4
        },
        {
            itemID: 1,
            itemName: "Food 1",
            itemStatus: true,
            price: 1000,
            image: 'images/cake.jpg',
            rate: 4
        },
    ]
    res.status(200).render('overview', {
        title: 'Trang chủ',
        products
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
};
