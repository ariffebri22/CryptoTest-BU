// controllers/memberController.js
const { getAllMembers } = require("../models/memberModel");

const memberController = {
    getAll: async (req, res, next) => {
        try {
            const dataMembers = await getAllMembers();
            res.status(200).json({
                status: 200,
                message: "Get all members success",
                data: dataMembers,
            });
        } catch (err) {
            console.error("Error in memberController.getAll:", err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
                error: err.message,
            });
        }
    },
};

module.exports = memberController;
