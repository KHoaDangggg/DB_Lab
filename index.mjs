// import dotenv from 'dotenv';
// import app from './app.mjs';
// import mysql from 'mysql2';


// // Create the MySQL connection pool
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'nam2442003', // Provide your MySQL password here if set, otherwise keep it as an empty string
//     database: 'food_order_website' // Replace 'your_database_name' with your actual database name
// });

// // Execute queries through the pool
// pool.query('SELECT * FROM Shippers', (err, results) => {
//     if (err) {
//         console.error('Error querying Users table:', err);
//     } else {
//         console.log('Query successful!');
//         console.log(results);
//     }

//     // Close the pool to end the script
//     pool.end();
// });

// process.on('uncaughtException', (err) => {
//     console.log(err.name, err.message);
//     process.exit(1);
// });
// dotenv.config({ path: './config.env' });

// //Connect database


// //Listen server

// const port = process.env.PORT || 8000;
// const server = app.listen(port, () => {
//     console.log(`App is listening at port ${port} `);
// });

// process.on('unhandledRejection', (err) => {
//     console.log(err.name, err.message);
//     server.close(() => {
//         process.exit(1);
//     });
// });