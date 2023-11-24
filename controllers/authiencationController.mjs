import catchAsync from '../ultils/catchAsync.mjs';
import appError from '../ultils/appError.mjs';
import User from './userControllers.mjs'
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const createToken = (phone) => {
    return jwt.sign({ phone }, process.env.PRIVATE_KEY, {
        expiresIn: '7d',
    });
};
const sendToken = (user, req, res) => {
    const token = createToken(user.phone);
    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_JWT_EXPIRE_IN * 24 * 3600 * 1000
        ),
    });
    res.status(201).json({
        status: 'success',
        user,
        token,
    });
};
const login = catchAsync(async (req, res, next) => {
    const { phone, password } = req.body;
    const user = await User.findUser(phone);
    const check = await user.correctPassword(password, user.password);
    if (!check || !user)
        return next(new appError('Can not find user with that phone number', 404));
    sendToken(user, req, res);
});
const signup = catchAsync(async (req, res, next) => {
    const { phone, password } = req.body;
    const newUser = await User.create({
        phone,
        password,
    });
    sendToken(newUser, req, res);
});
const logout = catchAsync(async (req, res, next) => {
    res.cookie('jwt', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 10 * 1000),
    });
    res.status(200).json({
        status: 'success',
    });
});
const protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) return next(new appError('you are not allowed to access', 404));
    const payload = await promisify(jwt.verify)(token, process.env.PRIVATE_KEY);
    const user = await User.findById(payload.id);
    if (!user) {
        return next(
            new appError(
                'The user belonging to this token does no longer exist'
            ),
            401
        );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.PRIVATE_KEY);
    if (user.changedPassAfter(decoded.iat)) {
        return next(
            new appError(
                "User's password has recently changed. Please log in again to get access"
            ),
            401
        );
    }
    req.user = user;
    res.locals.user = user;
    next();
});

const updatePassword = catchAsync(async (req, res, next) => {
    //1. Get user from collection
    const user = await User.findUser(req.body.phone);
    //2. Check if POSTED password is correct
    const correct = User.correctPassword(req.body.password,user.password)
    if (!correct) {
        return next(new appError('Your current password is wrong', 401));
    }
    //3. If correct, update password
    await User.updateUser({password: req.body.password})
    //4. Log user in, send JWT
    sendToken(user, req, res);
});
const isLoggedIn = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            //2. Verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.PRIVATE_KEY
            );

            //3. Check if user still exist
            const freshUser = await User.findUser(decoded.phone);
            if (!freshUser) {
                res.locals.user = null;
                return next();
            }
            //4. Check if users changed password after token was created
            if (freshUser.changedPassAfter(decoded.iat)) {
                res.locals.user = null;
                return next();
            }
            //5. User is logged
            res.locals.user = freshUser;
            req.user = freshUser;
            return next();
        }
        res.locals.user = null;
        next();
    } catch (error) {
        console.log(error);
        res.locals.user = null;
        return next();
    }
};
export {
    login,
    logout,
    signup,
    protect,
    updatePassword,
    isLoggedIn,
}; 
