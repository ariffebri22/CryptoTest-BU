const pool = require("../config/db");

const getAllDeposits = async () => {
    console.log("model getAllDeposits");
    try {
        const [rows] = await pool.execute(`SELECT * FROM deposits ORDER BY deposit_date DESC`);
        return rows;
    } catch (err) {
        console.error("Error in getAllDeposits:", err);
        throw err;
    }
};

module.exports = {
    getAllDeposits,
};
