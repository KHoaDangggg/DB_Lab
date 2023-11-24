// Viết hàm return các list về product
import db from '../services/db.js';
import helper from '../helper.js';
import config from '../config.js';




const getAllProducts = async (
    page = 1,sort, foodType,
    maxPrice, minPrice, avail) => {
    const offset = helper.getOffset(page, config.listPerPage);
    const sortQuery = sort || `ORDER BY price ${sort}`;
    const foodTypeQuery = foodType || ` AND type IN ('${foodType}')`;
    const availQuery = avail || ` AND status = ${avail}`;
    const whereQuery = `WHERE price >= ${minPrice} AND price <= ${maxPrice}` + foodTypeQuery + availQuery;
    const rows = await db.query(
        `SELECT * LIMIT ${offset},${config.listPerPage}
        FROM Product  
        ${whereQuery}
        ${sortQuery}`
    );
    const products = helper.emptyOrRows(rows);
    return {
        products,
        page
    } 
}

const getBestSellerProducts = async () => {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT * LIMIT 10 FROM Product'
    );
    const products = helper.emptyOrRows(rows);
    return products
}

export {
    getAllProducts,
    getBestSellerProducts
}