// models/memberModel.js
const pool = require("../config/db");

const getAllMembers = async () => {
    console.log("model getAllMembers");
    try {
        const [rows] = await pool.execute(`SELECT * FROM members ORDER BY registration_date DESC`);
        return rows;
    } catch (err) {
        console.error("Error in getAllMembers:", err);
        throw err;
    }
};

module.exports = {
    getAllMembers,
};
