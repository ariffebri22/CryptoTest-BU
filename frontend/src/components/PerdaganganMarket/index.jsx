import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import { dataPerdaganganMarket1, dataPerdaganganMarket2 } from "../../data/perdaganganMarket";
import "../../styles/BtcIdr.css";

const columns1 = [
    {
        title: "Pasangan",
        dataIndex: "pasangan",
        key: "pasangan",
        render: (text) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
        title: "Harga",
        dataIndex: "harga",
        key: "harga",
        render: (text) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
        title: "Ubah",
        dataIndex: "ubah",
        key: "ubah",
        render: (text, record) => <span style={{ color: record.isPositiveChange ? "#22c55e" : "#ef4444" }}> {text}</span>,
    },
];

const columns2 = [
    {
        title: "Harga IDR",
        dataIndex: "hargaIdr",
    },
    {
        title: "Jumlah BTC",
        dataIndex: "jumlahBtc",
    },
    {
        title: "Waktu",
        dataIndex: "waktu",
    },
];

const PerdaganganMarket = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(dataPerdaganganMarket1);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        const filtered = dataPerdaganganMarket1.filter((item) => Object.values(item).some((val) => typeof val === "string" && val.toLowerCase().includes(value)));
        setFilteredData(filtered);
    };
    return (
        <main>
            <div className="flex flex-col md:flex-row xl:flex-col w-full justify-between gap-8">
                <div className="w-full">
                    <div className="border-b border-b-[#121B2E] bg-[#0b1322] py-6 px-4">
                        <Input
                            placeholder="Cari"
                            value={searchText}
                            onChange={handleSearch}
                            style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.1)", color: "white", paddingTop: "4px", paddingBottom: "4px" }}
                            classNames="bg-white/10 rounded-xl w-full"
                        />
                        <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
                            <h3 className="text-white font-bold">Favorit</h3>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col items-center pt-1">
                                    <span className="text-white text-sm font-bold mx-2">IDR</span>
                                </div>
                                <div className="flex flex-col items-center pt-1">
                                    <span className="text-[#BCBCBC] text-sm font-bold mx-2">USD</span>
                                </div>
                                <div className="flex flex-col items-center pt-1">
                                    <span className="text-[#BCBCBC] text-sm font-bold mx-2">BNB</span>
                                </div>
                                <div className="flex flex-col items-center pt-1">
                                    <span className="text-[#BCBCBC] text-sm font-bold mx-2">BTC</span>
                                </div>
                                <div className="flex flex-col items-center pt-1">
                                    <span className="text-[#BCBCBC] text-sm font-bold mx-2">ALTS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table columns={columns1} dataSource={filteredData} pagination={false} className="custom-table-buku-order-1" />
                </div>
                <div className="w-full">
                    <div className="border-t border-t-[#121B2E] bg-[#0b1322] py-6 px-4 flex items-center justify-between">
                        <span className="font-roboto text-white font-bold text-lg">
                            Perdagangan <br /> Market
                        </span>
                        <span className="font-roboto text-gray-400 font-bold text-lg">
                            Perdagangan <br /> Saya
                        </span>
                    </div>
                    <Table columns={columns2} dataSource={dataPerdaganganMarket2} pagination={false} className="custom-table-buku-order-2" />
                </div>
            </div>
        </main>
    );
};

export default PerdaganganMarket;
