const pool = require("../config/db");

const getMonthlyDepositData = async (year) => {
    console.log(`model getMonthlyDepositData for ${year}`);
    try {
        const query = `
      SELECT
          MONTH(deposit_date) AS month,
          COUNT(id) AS total_deposits,
          SUM(amount_nett) AS total_amount
      FROM
          deposits
      WHERE
          YEAR(deposit_date) = ? AND status = 'Success'
      GROUP BY
          month
      ORDER BY
          month ASC
    `;
        const [rows] = await pool.execute(query, [year]);

        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            total_deposits: 0,
            total_amount: 0,
        }));

        rows.forEach((row) => {
            const index = row.month - 1;
            monthlyData[index].total_deposits = row.total_deposits;
            monthlyData[index].total_amount = parseFloat(row.total_amount);
        });

        return monthlyData;
    } catch (err) {
        console.error("Error in getMonthlyDepositData:", err);
        throw err;
    }
};

const getMonthlyRegistrationData = async (year) => {
    console.log(`model getMonthlyRegistrationData for ${year}`);
    try {
        const query = `
      SELECT
          MONTH(registration_date) AS month,
          COUNT(id) AS total_registrations
      FROM
          members
      WHERE
          YEAR(registration_date) = ?
      GROUP BY
          month
      ORDER BY
          month ASC
    `;
        const [rows] = await pool.execute(query, [year]);

        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            total_registrations: 0,
        }));

        rows.forEach((row) => {
            const index = row.month - 1;
            monthlyData[index].total_registrations = row.total_registrations;
        });

        return monthlyData;
    } catch (err) {
        console.error("Error in getMonthlyRegistrationData:", err);
        throw err;
    }
};

const getTotalDepositAmount = async (month, year) => {
    console.log(`model getTotalDepositAmount for month ${month} and year ${year}`);
    try {
        let query = `
            SELECT SUM(amount_nett) AS total_amount
            FROM deposits
            WHERE YEAR(deposit_date) = ? AND status = 'Success'
        `;
        const params = [year];

        if (month !== null) {
            query += ` AND MONTH(deposit_date) = ?`;
            params.push(month);
        }

        const [rows] = await pool.execute(query, params);
        return parseFloat(rows[0]?.total_amount) || 0;
    } catch (err) {
        console.error("Error in getTotalDepositAmount:", err);
        throw err;
    }
};

const getTotalRegistrations = async (month, year) => {
    console.log(`model getTotalRegistrations for month ${month} and year ${year}`);
    try {
        let query = `
            SELECT COUNT(id) AS total_registrations
            FROM members
            WHERE YEAR(registration_date) = ?
        `;
        const params = [year];

        if (month !== null) {
            query += ` AND MONTH(registration_date) = ?`;
            params.push(month);
        }

        const [rows] = await pool.execute(query, params);
        return parseInt(rows[0]?.total_registrations) || 0;
    } catch (err) {
        console.error("Error in getTotalRegistrations:", err);
        throw err;
    }
};

const getTotalMembers = async (month = null, year = null) => {
    console.log(`model getTotalMembers for month ${month} and year ${year}`);
    try {
        let query = `SELECT COUNT(id) AS total_members FROM members`;
        const params = [];

        if (year) {
            query += ` WHERE YEAR(registration_date) = ?`;
            params.push(year);

            if (month) {
                query += ` AND MONTH(registration_date) = ?`;
                params.push(month);
            }
        }

        const [rows] = await pool.execute(query, params);
        return parseInt(rows[0]?.total_members) || 0;
    } catch (err) {
        console.error("Error in getTotalMembers:", err);
        throw err;
    }
};

const getTotalDepositsCount = async (month = null, year = null) => {
    console.log(`model getTotalDepositsCount for month ${month} and year ${year}`);
    try {
        let query = `
            SELECT COUNT(id) AS total_deposits 
            FROM deposits 
            WHERE status = 'Success'
        `;
        const params = [];

        if (year) {
            query += ` AND YEAR(deposit_date) = ?`;
            params.push(year);

            if (month) {
                query += ` AND MONTH(deposit_date) = ?`;
                params.push(month);
            }
        }

        const [rows] = await pool.execute(query, params);
        return parseInt(rows[0]?.total_deposits) || 0;
    } catch (err) {
        console.error("Error in getTotalDepositsCount:", err);
        throw err;
    }
};

module.exports = {
    getMonthlyDepositData,
    getMonthlyRegistrationData,
    getTotalDepositAmount,
    getTotalRegistrations,
    getTotalDepositsCount,
    getTotalMembers,
};
