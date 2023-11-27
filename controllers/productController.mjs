// Viết hàm return các list về product
import db from '../services/db.js';
import helper from '../services/helper.js';
import config from '../services/config.js';



 
const getAllProducts = async (
    page = 1,sort, foodType  = '',
    maxPrice = 10000000000000, minPrice=0, avail = '', pattern = '') => {
    const offset = helper.getOffset(page, config.listPerPage);
    const sortQuery = sort === undefined? '':  `ORDER BY new_price ${sort}`;
    console.log(sortQuery)
    const patternQuery = pattern && ` AND item_name LIKE '%${pattern}%'`
    const foodTypeQuery = foodType && ` AND food_type IN ('${foodType}')`;
    const availQuery = avail && ` AND item_status = ${avail}`;
    const whereQuery = `WHERE new_price >= ${minPrice} AND new_price <= ${maxPrice}` + foodTypeQuery + availQuery + patternQuery;
    const query = `SELECT * FROM Product ${whereQuery}
        ${sortQuery} LIMIT ${offset},${config.listPerPage};`
    console.log(query);
    const rows = await db.query(
        query
    );
    const products = helper.emptyOrRows(rows);
    return {
        products,
        page
    } 
}

const getBestSellerProducts = async () => {

    const rows = await db.query(
        'SELECT * FROM Product ORDER BY new_price DESC LIMIT 0,10;'
    );
    const products = helper.emptyOrRows(rows);
    return products
}

const getOneProduct = async (id) => {
    const rows = await db.query(
        `SELECT * FROM Product WHERE item_id = ${id};`
    );
    const product = helper.emptyOrRows(rows);
    return product
}

export {
    getAllProducts,
    getBestSellerProducts,
    getOneProduct
}