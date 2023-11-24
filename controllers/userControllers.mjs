// Viết hàm return các list về product
import db from '../services/db.js';
import helper from '../helper.js';
import config from '../config.js';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';


const createUser = async (name, phone, password) => {
    password = await bcrypt.hash(this.password, 12);
    const dateTimeValue = moment().format('YYYY-MM-DD HH:mm:ss'); 
    try {
        const rows = await db.query(
            `INSERT INTO User(name, phone, password, passwordChangedAt) VALUES
            ('${name}', '${phone}', '${password}', '${dateTimeValue}');`
        );
        return 'Success'
    } catch (e) {
        return 'Error'
    }
}

const getAllUsers = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * LIMIT ${offset},${config.listPerPage}
        FROM User`
    );
    const users = helper.emptyOrRows(rows);
    return {
        users,
        page
    } 
}

const updateUser = async ({id, name = "", phone = "", password = "", address = "" }) => {
    try {
        if(validateString(name,phone,password,address)) return 'Error';
        const nameQuery = name.trim() || `name  = '${name.trim()}'`;
        const phoneQuery = phone.trim() || `phone = '${phone.trim()}'`;
        const passwordQuery = password.trim() || `password = ${password.trim()}`;
        const addressQuery = address.trim() || `address = ${address.trim()}`;
        const query = `UPDATE User SET ${nameQuery} ${phoneQuery} ${passwordQuery} ${addressQuery} WHERE id = ${id}`;
        await db.query(query);
        return 'Success'
    } catch (e) {
        return 'Error'
    }
}

const findUser = async (phone = '') => {
    try {
        const phoneQuery = phone || `WHERE phone = ${phone}`
        const rows = await db.query(
            `SELECT * 
            FROM User
            ${phoneQuery};`
        );
        const user = helper.emptyOrRows(rows);
        return {
            user,
            message: 'Success'
        }; 
    } catch (error) {
        return {message: 'error'};
    }
}
const validateString = (...str) => {
    for (s in str) {
        if(s.trim() == '') return false;
    }
    return true
}

const correctPassword = async function (candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass);
};



export default {createUser, getAllUsers, updateUser, findUser, correctPassword };