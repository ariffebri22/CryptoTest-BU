import React, { useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const defaultChartData = [
    ["Bulan", "Jumlah"],
    ["Jan", 0],
    ["Feb", 0],
    ["Mar", 0],
    ["Apr", 0],
    ["Mei", 0],
    ["Jun", 0],
    ["Jul", 0],
    ["Agu", 0],
    ["Sep", 0],
    ["Okt", 0],
    ["Nov", 0],
    ["Des", 0],
];

export const options = {
    chartArea: { width: "70%", height: "70%" },
    backgroundColor: "transparent",
    colors: ["#22C55E"],
    legend: { position: "none" },
    hAxis: {
        textStyle: { color: "#FFFFFF" },
        baselineColor: "#4B5563",
        gridlines: { color: "transparent" },
    },
    vAxis: {
        textStyle: { color: "#FFFFFF" },
        baselineColor: "#4B5563",
        gridlines: { color: "#4B5563" },
        minValue: 0,
    },
};

const Home = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const {
        data: dashboardData,
        isLoading: isDashboardLoading,
        isError: isDashboardError,
        error: dashboardError,
    } = useQuery({
        queryKey: ["dashboardSummary", selectedMonth, selectedYear],
        queryFn: async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/dashboard/summary?month=${selectedMonth}&year=${selectedYear}`);
                if (!response.data || !response.data.data) {
                    throw new Error("API response data is empty or malformed.");
                }
                return response.data.data;
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                throw new Error(err.response?.data?.message || err.message || "Failed to fetch dashboard data");
            }
        },
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });

    const depositChartFormattedData = useMemo(() => {
        const formatted = [["Bulan", "Jumlah"]];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

        const monthlyDataMap = new Map(monthNames.map((name, index) => [index + 1, 0]));

        if (dashboardData?.deposit_chart_data && Array.isArray(dashboardData.deposit_chart_data)) {
            dashboardData.deposit_chart_data.forEach((item) => {
                if (typeof item.month === "number" && typeof item.total_deposits === "number") {
                    monthlyDataMap.set(item.month, item.total_deposits);
                } else {
                    console.warn("Unexpected chart data format or missing properties:", item);
                }
            });
        }

        for (let i = 1; i <= 12; i++) {
            formatted.push([monthNames[i - 1], monthlyDataMap.get(i)]);
        }

        if (isDashboardLoading || isDashboardError) {
            return formatted.length > 1 ? formatted : defaultChartData;
        }

        return formatted;
    }, [dashboardData, isDashboardLoading, isDashboardError]);

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const months = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];

    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    const formatCurrency = (amount) => {
        const numAmount = Number(amount);
        if (isNaN(numAmount)) return "IDR 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numAmount);
    };

    return (
        <main className="w-full h-screen bg-black text-white flex">
            <Sidebar />
            <Navbar />
            <div className="flex flex-col flex-1 lg:ml-72 mt-28">
                <section className="flex-1 p-6 md:p-12 overflow-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold">Welcome John Doe</h1>
                            <p className="text-gray-400 mb-8">How are you today...</p>
                        </div>
                        <div className="flex items-center space-x-2 gap-3">
                            <span className="text-gray-400">Filter By:</span>
                            <select className="bg-gray-800 text-white py-1 px-3 rounded focus:outline-none" value={selectedMonth} onChange={handleMonthChange}>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                            <select className="bg-gray-800 text-white py-1 px-3 rounded focus:outline-none" value={selectedYear} onChange={handleYearChange}>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Bar Chart Section */}
                        <div className="bg-gray-900 rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-medium mb-4">Bar Chart (Monthly Deposits Count)</h2>
                            <div className="w-full h-96 flex items-center justify-center">
                                {isDashboardLoading ? (
                                    <Skeleton height={384} className="w-full" baseColor="#374151" highlightColor="#4B5563" />
                                ) : isDashboardError ? (
                                    <p className="text-red-500 text-center">Error loading chart data: {dashboardError.message}</p>
                                ) : (
                                    <Chart chartType="ColumnChart" width="100%" height="100%" data={depositChartFormattedData} options={options} />
                                )}
                            </div>
                        </div>

                        {/* Metric Cards Section */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Total Deposit Card */}
                            <div className="bg-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div className="flex items-start md:items-center mb-4 gap-4 flex-col md:flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                        <path
                                            d="M27 3.25H7C4.92893 3.25 3.25 4.92893 3.25 7V27C3.25 29.0711 4.92893 30.75 7 30.75H27C29.0711 30.75 30.75 29.0711 30.75 27V7C30.75 4.92893 29.0711 3.25 27 3.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M24.5 8.25H9.5C8.80964 8.25 8.25 8.80964 8.25 9.5V24.5C8.25 25.1904 8.80964 25.75 9.5 25.75H24.5C25.1904 25.75 25.75 25.1904 25.75 24.5V9.5C25.75 8.80964 25.1904 8.25 24.5 8.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17 3.25V0.75M23.25 3.25V0.75M10.75 3.25V0.75M17 33.25V30.75M23.25 33.25V30.75M10.75 33.25V30.75M30.75 17H33.25M30.75 23.25H33.25M30.75 10.75H33.25M0.75 17H3.25M0.75 23.25H3.25M0.75 10.75H3.25"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <h2 className="md:text-xl font-bold">Total Deposit</h2>
                                </div>
                                {isDashboardLoading ? (
                                    <>
                                        <Skeleton width={150} height={30} className="mb-2" baseColor="#374151" highlightColor="#4B5563" />
                                        <Skeleton width={100} baseColor="#374151" highlightColor="#4B5563" />
                                    </>
                                ) : isDashboardError ? (
                                    <p className="text-red-500">Error</p>
                                ) : (
                                    <>
                                        <p className="text-3xl font-bold text-white mb-2">{formatCurrency(dashboardData?.total_deposit_amount || 0)}</p>
                                        <p className="text-sm text-gray-400">{dashboardData?.total_deposit || 0} Deposit(s)</p>
                                    </>
                                )}
                            </div>

                            {/* Total Withdraw Card */}
                            <div className="bg-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div className="flex items-start md:items-center mb-4 gap-4 flex-col md:flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                        <path
                                            d="M27 3.25H7C4.92893 3.25 3.25 4.92893 3.25 7V27C3.25 29.0711 4.92893 30.75 7 30.75H27C29.0711 30.75 30.75 29.0711 30.75 27V7C30.75 4.92893 29.0711 3.25 27 3.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M24.5 8.25H9.5C8.80964 8.25 8.25 8.80964 8.25 9.5V24.5C8.25 25.1904 8.80964 25.75 9.5 25.75H24.5C25.1904 25.75 25.75 25.1904 25.75 24.5V9.5C25.75 8.80964 25.1904 8.25 24.5 8.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17 3.25V0.75M23.25 3.25V0.75M10.75 3.25V0.75M17 33.25V30.75M23.25 33.25V30.75M10.75 33.25V30.75M30.75 17H33.25M30.75 23.25H33.25M30.75 10.75H33.25M0.75 17H3.25M0.75 23.25H3.25M0.75 10.75H3.25"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <h2 className="md:text-xl font-bold">Total Withdraw</h2>
                                </div>
                                {isDashboardLoading ? (
                                    <>
                                        <Skeleton width={150} height={30} className="mb-2" baseColor="#374151" highlightColor="#4B5563" />
                                        <Skeleton width={100} baseColor="#374151" highlightColor="#4B5563" />
                                    </>
                                ) : isDashboardError ? (
                                    <p className="text-red-500">Error</p>
                                ) : (
                                    <>
                                        <p className="text-3xl font-bold text-white mb-2">{formatCurrency(dashboardData?.total_withdraw || 0)}</p>
                                        <p className="text-sm text-gray-400">{dashboardData?.total_withdraw_count || 0} Withdraw(s)</p>
                                    </>
                                )}
                            </div>

                            {/* Total Verified KYC Card */}
                            <div className="bg-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div className="flex items-start md:items-center mb-4 gap-4 flex-col md:flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                        <path
                                            d="M27 3.25H7C4.92893 3.25 3.25 4.92893 3.25 7V27C3.25 29.0711 4.92893 30.75 7 30.75H27C29.0711 30.75 30.75 29.0711 30.75 27V7C30.75 4.92893 29.0711 3.25 27 3.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M24.5 8.25H9.5C8.80964 8.25 8.25 8.80964 8.25 9.5V24.5C8.25 25.1904 8.80964 25.75 9.5 25.75H24.5C25.1904 25.75 25.75 25.1904 25.75 24.5V9.5C25.75 8.80964 25.1904 8.25 24.5 8.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17 3.25V0.75M23.25 3.25V0.75M10.75 3.25V0.75M17 33.25V30.75M23.25 33.25V30.75M10.75 33.25V30.75M30.75 17H33.25M30.75 23.25H33.25M30.75 10.75H33.25M0.75 17H3.25M0.75 23.25H3.25M0.75 10.75H3.25"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <h2 className="md:text-xl font-bold">Total Verified KYC</h2>
                                </div>
                                {isDashboardLoading ? (
                                    <>
                                        <Skeleton width={100} height={30} className="mb-2" baseColor="#374151" highlightColor="#4B5563" />
                                    </>
                                ) : isDashboardError ? (
                                    <p className="text-red-500">Error</p>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-400">0 Verified</p>
                                    </>
                                )}
                            </div>

                            {/* Total Registration Card */}
                            <div className="bg-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div className="flex items-start md:items-center mb-4 gap-4 flex-col md:flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                        <path
                                            d="M27 3.25H7C4.92893 3.25 3.25 4.92893 3.25 7V27C3.25 29.0711 4.92893 30.75 7 30.75H27C29.0711 30.75 30.75 29.0711 30.75 27V7C30.75 4.92893 29.0711 3.25 27 3.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M24.5 8.25H9.5C8.80964 8.25 8.25 8.80964 8.25 9.5V24.5C8.25 25.1904 8.80964 25.75 9.5 25.75H24.5C25.1904 25.75 25.75 25.1904 25.75 24.5V9.5C25.75 8.80964 25.1904 8.25 24.5 8.25Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M17 3.25V0.75M23.25 3.25V0.75M10.75 3.25V0.75M17 33.25V30.75M23.25 33.25V30.75M10.75 33.25V30.75M30.75 17H33.25M30.75 23.25H33.25M30.75 10.75H33.25M0.75 17H3.25M0.75 23.25H3.25M0.75 10.75H3.25"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <h2 className="md:text-xl font-bold">Total Registration</h2>
                                </div>
                                {isDashboardLoading ? (
                                    <>
                                        <Skeleton width={100} height={30} className="mb-2" baseColor="#374151" highlightColor="#4B5563" />
                                    </>
                                ) : isDashboardError ? (
                                    <p className="text-red-500">Error</p>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-400">{dashboardData?.total_registrations || 0} Registered</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
