import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const ChartBtcIdr = () => {
    const [chartReady, setChartReady] = useState(false);
    const [candlestickData, setCandlestickData] = useState([]);
    const [viewWindow, setViewWindow] = useState({ min: 10000, max: 13000 });

    useEffect(() => {
        const data = generateCandlestickData();
        setCandlestickData(data);
        setViewWindow(calculateViewWindow(data));
        const timer = setTimeout(() => {
            setChartReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const generateCandlestickData = () => {
        const data = [["Day", "Low", "Open", "Close", "High"]];
        let basePrice = 12000;

        for (let i = 0; i < 40; i++) {
            const hour = Math.floor(i / 8) + 9;
            const minute = (i % 8) * 15;
            const time = `${hour}:${minute < 10 ? "0" + minute : minute}`;

            const direction = Math.random() > 0.5 ? 1 : -1;

            const thicknessOptions = [50, 80, 120, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
            const thickness = thicknessOptions[Math.floor(Math.random() * thicknessOptions.length)];

            const open = basePrice;
            const close = open + direction * thickness;
            const high = Math.max(open, close) + Math.random() * thickness * 0.3;
            const low = Math.min(open, close) - Math.random() * thickness * 0.3;

            data.push([time, low, open, close, high]);

            if (i === 0) {
                data[1] = ["09:00", 12072, 12227, 12323, 12412];
            }

            basePrice = close;
        }
        return data;
    };

    const calculateViewWindow = (data) => {
        let min = Infinity;
        let max = -Infinity;

        for (let i = 1; i < data.length; i++) {
            const [_, low, __, ___, high] = data[i];
            min = Math.min(min, low);
            max = Math.max(max, high);
        }

        const buffer = (max - min) * 0.1;
        return {
            min: Math.floor(min - buffer),
            max: Math.ceil(max + buffer),
        };
    };

    const generateTicks = (min, max) => {
        const range = max - min;
        const step = range <= 2000 ? 200 : 500;
        const ticks = [];

        for (let i = Math.floor(min / step) * step; i <= max; i += step) {
            ticks.push(i);
        }

        return ticks;
    };

    const volumeData = [
        ["Time", "Volume", { role: "style" }],
        ["09:00", 0.3, "#22c55e"],
        ["09:15", 0.25, "#ef4444"],
        ["09:30", 0.28, "#22c55e"],
        ["09:45", 0.2, "#ef4444"],
        ["10:00", 0.22, "#ef4444"],
        ["10:15", 0.18, "#ef4444"],
        ["10:30", 0.15, "#ef4444"],
        ["10:45", 0.12, "#ef4444"],
        ["11:00", 0.1, "#ef4444"],
        ["11:15", 0.08, "#ef4444"],
        ["11:30", 0.12, "#22c55e"],
        ["11:45", 0.15, "#22c55e"],
        ["12:00", 0.18, "#22c55e"],
        ["12:15", 0.2, "#22c55e"],
        ["12:30", 0.22, "#22c55e"],
        ["12:45", 0.25, "#22c55e"],
        ["13:00", 0.28, "#22c55e"],
        ["13:15", 0.3, "#22c55e"],
        ["13:30", 0.25, "#ef4444"],
        ["13:45", 0.2, "#ef4444"],
        ["14:00", 0.18, "#ef4444"],
        ["14:15", 0.15, "#ef4444"],
        ["14:30", 0.12, "#ef4444"],
        ["14:45", 0.1, "#ef4444"],
        ["15:00", 0.08, "#ef4444"],
        ["15:15", 0.1, "#22c55e"],
        ["15:30", 0.12, "#22c55e"],
        ["15:45", 0.15, "#22c55e"],
        ["16:00", 0.18, "#22c55e"],
        ["16:15", 0.2, "#22c55e"],
        ["16:30", 0.22, "#22c55e"],
        ["16:45", 0.25, "#22c55e"],
        ["17:00", 0.28, "#22c55e"],
        ["17:15", 0.3, "#22c55e"],
    ];

    const candlestickOptions = {
        legend: "none",
        backgroundColor: "#0b1322",
        candlestick: {
            fallingColor: { stroke: "#ef4444", fill: "#ef4444" },
            risingColor: { stroke: "#22c55e", fill: "#22c55e" },
            hollowIsRising: false,
            candle: {
                stroke: "transparent",
            },
        },
        hAxis: {
            textStyle: { color: "#BCBCBC" },
            gridlines: { color: "#121B2E" },
            baselineColor: "#121B2E",
        },
        vAxis: {
            textStyle: { color: "#BCBCBC" },
            gridlines: { color: "#121B2E" },
            baselineColor: "#121B2E",
            format: "decimal",
        },
        chartArea: {
            left: 50,
            right: 20,
            top: 20,
            bottom: 30,
            height: "80%",
        },
    };

    const volumeOptions = {
        legend: "none",
        backgroundColor: "#0b1322",
        bar: { groupWidth: "90%" },
        hAxis: {
            textStyle: { color: "transparent" },
            gridlines: { color: "transparent" },
            baselineColor: "transparent",
        },
        vAxis: {
            textStyle: { color: "#BCBCBC", fontSize: 10 },
            gridlines: { color: "transparent" },
            baselineColor: "transparent",
            viewWindow: {
                min: 0,
                max: 0.35,
            },
        },
        chartArea: {
            left: 50,
            right: 20,
            top: 0,
            bottom: 20,
            height: "80%",
        },
    };

    return (
        <div className="bg-[#0b1322] border border-[#121B2E] rounded-lg p-4">
            {/* Toolbar */}
            <div className="flex justify-between flex-col md:flex-row items-start md:items-center gap-2 mb-4">
                <div className="flex space-x-2 text-sm">
                    <span className="text-white font-medium">Waktu</span>
                    {["15M", "1J", "4J", "1H", "1M"].map((item) => (
                        <span key={item} className="text-[#BCBCBC] hover:text-white cursor-pointer">
                            {item}
                        </span>
                    ))}
                </div>
                <div className="flex space-x-2">
                    {["Asli", "Trading View", "Kedalaman"].map((item, index) => (
                        <span key={item} className={`text-sm ${index === 1 ? "text-white font-medium" : "text-[#BCBCBC]"}`}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-xs">
                <span className="text-[#BCBCBC]">2025/02/05</span>
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Buka:</span>
                    <span className="text-white">12227</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Tinggi:</span>
                    <span className="text-green-500">12412</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Renda:</span>
                    <span className="text-red-500">12072</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Tutup:</span>
                    <span className="text-white">12323</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Perubahan:</span>
                    <span className="text-green-500">0.19%</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Amplitudo:</span>
                    <span className="text-green-500">2.76%</span>
                </div>
            </div>

            <div className="relative h-100 mb-1">
                {chartReady && (
                    <Chart
                        chartType="CandlestickChart"
                        width="100%"
                        height="100%"
                        data={candlestickData}
                        options={{
                            ...candlestickOptions,
                            vAxis: {
                                ...candlestickOptions.vAxis,
                                viewWindow: viewWindow,
                                ticks: generateTicks(viewWindow.min, viewWindow.max),
                            },
                        }}
                    />
                )}
            </div>

            <div className="flex gap-4 mb-1 text-xs my-8">
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Vol(BTC):</span>
                    <span className="text-white">12227</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[#BCBCBC]">Vol(IDR):</span>
                    <span className="text-white">12412</span>
                </div>
            </div>

            <div className="relative h-32">{chartReady && <Chart chartType="ColumnChart" width="100%" height="100%" data={volumeData} options={volumeOptions} />}</div>

            <div className="p-4 bg-[#0b1322] border-t border-[#121B2E] mt-12">
                <div className="flex text-white font-bold text-lg mb-4">
                    <span className="mr-4 pb-2 border-b-2 border-blue-500">Spot</span> {/* "Spot" tab */}
                </div>

                <div className="flex text-[#BCBCBC] text-sm mb-4">
                    <span className="mr-4 pb-1 border-b border-white">Limit</span>
                    <span className="mr-4 pb-1">Pasar</span>
                    <span className="pb-1">Stop Limit</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Beli BTC Section */}
                    <div className="p-4 rounded-lg border border-[#1a233e]">
                        <div className="mb-4">
                            <label htmlFor="beliHarga" className="block text-[#BCBCBC] text-sm mb-1">
                                Harga
                            </label>
                            <div className="flex items-center border border-[#374151] rounded-md overflow-hidden">
                                <input type="text" id="beliHarga" defaultValue="12332" className="flex-grow p-2 bg-transparent text-white focus:outline-none" />
                                <span className="bg-[#1a2335] px-3 py-2 text-[#BCBCBC]">IDR</span>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▲</button>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▼</button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="beliJumlah" className="block text-[#BCBCBC] text-sm mb-1">
                                Jumlah
                            </label>
                            <div className="flex items-center border border-[#374151] rounded-md overflow-hidden">
                                <input type="text" id="beliJumlah" defaultValue="0" className="flex-grow p-2 bg-transparent text-white focus:outline-none" />
                                <span className="bg-[#1a2335] px-3 py-2 text-[#BCBCBC]">BTC</span>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▲</button>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▼</button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="beliTotal" className="block text-[#BCBCBC] text-sm mb-1">
                                Total
                            </label>
                            <div className="flex items-center border border-[#374151] rounded-md overflow-hidden">
                                <input type="text" id="beliTotal" defaultValue="0" className="flex-grow p-2 bg-transparent text-white focus:outline-none" />
                                <span className="bg-[#1a2335] px-3 py-2 text-[#BCBCBC]">IDR</span>
                            </div>
                        </div>

                        <div className="text-[#BCBCBC] text-sm mb-4">
                            Tersedia <span className="text-white font-bold">1.000.000 IDR</span>
                        </div>

                        <div className="relative p-[2px] w-full rounded-full inline-block" style={{ background: "linear-gradient(to bottom right, #D57C17, #956836)" }}>
                            <button className="bg-[#0b1322] py-2 px-8 rounded-full cursor-pointer w-full">
                                <span className="capitalize text-white font-roboto font-semibold">beli BTC</span>
                            </button>
                        </div>
                    </div>

                    {/* Jual BTC Section */}
                    <div className="p-4 rounded-lg border border-[#1a233e]">
                        <div className="mb-4">
                            <label htmlFor="jualHarga" className="block text-[#BCBCBC] text-sm mb-1">
                                Harga
                            </label>
                            <div className="flex items-center border border-[#374151] rounded-md overflow-hidden">
                                <input type="text" id="jualHarga" defaultValue="12332" className="flex-grow p-2 bg-transparent text-white focus:outline-none" />
                                <span className="bg-[#1a2335] px-3 py-2 text-[#BCBCBC]">IDR</span>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▲</button>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▼</button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="jualJumlah" className="block text-[#BCBCBC] text-sm mb-1">
                                Jumlah
                            </label>
                            <div className="flex items-center border border-[#374151] rounded-md overflow-hidden">
                                <input type="text" id="jualJumlah" defaultValue="0" className="flex-grow p-2 bg-transparent text-white focus:outline-none" />
                                <span className="bg-[#1a2335] px-3 py-2 text-[#BCBCBC]">BTC</span>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▲</button>
                                <button className="px-2 py-2 text-[#BCBCBC] hover:bg-[#2a344a]">▼</button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="jualTotal" className="block text-[#BCBCBC] text-sm mb-1">
                                Total
                            </label>
                            <div className="flex items-center border border-[#374151] rounded-md overflow-hidden">
                                <input type="text" id="jualTotal" defaultValue="0" className="flex-grow p-2 bg-transparent text-white focus:outline-none" />
                                <span className="bg-[#1a2335] px-3 py-2 text-[#BCBCBC]">IDR</span>
                            </div>
                        </div>

                        <div className="text-[#BCBCBC] text-sm mb-4">
                            Tersedia <span className="text-white font-bold">1.000.000 BTC</span>
                        </div>

                        <div className="relative p-[2px] w-full rounded-full inline-block" style={{ background: "linear-gradient(to bottom right, #D57C17, #956836)" }}>
                            <button className="bg-[#0b1322] py-2 px-8 rounded-full cursor-pointer w-full">
                                <span className="capitalize text-white font-roboto font-semibold">jual BTC</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartBtcIdr;
