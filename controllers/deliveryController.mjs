// Viết hàm return các list về delivery , order, shipper\
// Viết hàm return các list về product
const db = require('./db');
const helper = require('../helper');
const config = require('../config');



const getAllDeliverys = async () => {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM Products LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

module.exports = {
    getAllDeliverys
}