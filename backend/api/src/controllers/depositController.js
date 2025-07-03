const { getAllDeposits } = require("../models/depositModel");

const depositController = {
    getAll: async (req, res, next) => {
        try {
            const dataDeposits = await getAllDeposits();
            res.status(200).json({
                status: 200,
                message: "Get all deposits success",
                data: dataDeposits,
            });
        } catch (err) {
            console.error("Error in depositController.getAll:", err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
                error: err.message,
            });
        }
    },
};

module.exports = depositController;
