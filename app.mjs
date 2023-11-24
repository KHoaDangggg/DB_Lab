import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import * as url from 'url';
import path from 'path';
import productRouter from "./routes/productRoutes.mjs";
import authiencateRouter from "./routes/authiencateRoutes.mjs"
import viewRouter from './routes/viewRoutes.mjs'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

//Set template engines
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//Serve static file
app.use(express.static(path.join(__dirname, 'public/')));
// Dev logging
app.use(morgan('dev'));
//. Body parser, read data from body to req.body

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(
    express.json({
        limit: '10kb',
    })
);
app.use(cookieParser());
//. Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//. Data sanitization against XSS
app.use(xss());
//. Prevent parameter pollution

// Route
// API
app.use("/api/product/", productRouter);
app.use("/api/user/", authiencateRouter);
// View
app.use('/', viewRouter);




export default app;
