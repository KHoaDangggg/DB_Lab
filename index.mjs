import dotenv from 'dotenv';
import app from './app.mjs';

//Listen server

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App is listening at port ${port} `);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});