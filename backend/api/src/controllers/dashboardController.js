const { getMonthlyDepositData, getMonthlyRegistrationData, getTotalDepositAmount, getTotalRegistrations, getTotalDepositsCount, getTotalMembers } = require("../models/dashboardChartModel");

const dashboardController = {
    getDepositChartData: async (req, res, next) => {
        try {
            const { year } = req.query;

            if (!year) {
                return res.status(400).json({
                    status: 400,
                    message: "Year query parameter is required for chart data.",
                });
            }

            const parsedYear = parseInt(year);
            if (isNaN(parsedYear)) {
                return res.status(400).json({
                    status: 400,
                    message: "Year must be a valid number.",
                });
            }

            const chartData = await getMonthlyDepositData(parsedYear);
            res.status(200).json({
                status: 200,
                message: `Get monthly deposit data for ${year} success`,
                data: chartData,
            });
        } catch (err) {
            console.error("Error in dashboardController.getDepositChartData:", err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
                error: err.message,
            });
        }
    },

    getRegistrationChartData: async (req, res, next) => {
        try {
            const { year } = req.query;

            if (!year) {
                return res.status(400).json({
                    status: 400,
                    message: "Year query parameter is required for chart data.",
                });
            }

            const parsedYear = parseInt(year);
            if (isNaN(parsedYear)) {
                return res.status(400).json({
                    status: 400,
                    message: "Year must be a valid number.",
                });
            }

            const chartData = await getMonthlyRegistrationData(parsedYear);
            res.status(200).json({
                status: 200,
                message: `Get monthly registration data for ${year} success`,
                data: chartData,
            });
        } catch (err) {
            console.error("Error in dashboardController.getRegistrationChartData:", err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
                error: err.message,
            });
        }
    },

    getDashboardSummary: async (req, res, next) => {
        try {
            const { month, year } = req.query;

            const currentYear = new Date().getFullYear();
            const parsedYear = year ? parseInt(year) : currentYear;
            const parsedMonth = month ? parseInt(month) : null;

            if (isNaN(parsedYear) || (month && isNaN(parsedMonth))) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid month or year parameter. Must be numbers.",
                });
            }

            const totalDepositAmount = await getTotalDepositAmount(parsedMonth, parsedYear);
            const totalRegistrations = await getTotalRegistrations(parsedMonth, parsedYear);
            const totalMembers = await getTotalMembers(parsedMonth, parsedYear);
            const totalDeposit = await getTotalDepositsCount(parsedMonth, parsedYear);

            const depositChartData = await getMonthlyDepositData(parsedYear);
            const registrationChartData = await getMonthlyRegistrationData(parsedYear);

            res.status(200).json({
                status: 200,
                message: "Dashboard summary data retrieved successfully",
                data: {
                    total_deposit_amount: totalDepositAmount,
                    total_registrations: totalRegistrations,
                    total_member: totalMembers,
                    total_deposit: totalDeposit,
                    deposit_chart_data: depositChartData,
                    registration_chart_data: registrationChartData,
                    filter_applied: { month: parsedMonth, year: parsedYear },
                    total_withdraw: 0,
                    total_verified_kyc: 0,
                },
            });
        } catch (err) {
            console.error("Error in dashboardController.getDashboardSummary:", err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
                error: err.message,
            });
        }
    },
};

module.exports = dashboardController;
