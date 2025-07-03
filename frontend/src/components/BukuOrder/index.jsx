import React from "react";
import { Table } from "antd";
import "../../styles/BtcIdr.css";

const columns1 = [
    {
        title: "Harga IDR",
        dataIndex: "hargaIdr",
        render: (text) => <a style={{ color: "#ef4444" }}>{text}</a>,
    },
    {
        title: "Jumlah BTC",
        dataIndex: "jumlahBtc",
    },
    {
        title: "Total",
        dataIndex: "total",
    },
];

const columns2 = [
    {
        title: "Harga IDR",
        dataIndex: "hargaIdr",
        render: (text) => <a style={{ color: "#22c55e" }}>{text}</a>,
    },
    {
        title: "Jumlah BTC",
        dataIndex: "jumlahBtc",
    },
    {
        title: "Total",
        dataIndex: "total",
    },
];

const data = [
    {
        key: "1",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "2",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "3",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "4",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "5",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "6",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "7",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "8",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "9",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
    {
        key: "10",
        hargaIdr: "13272",
        jumlahBtc: "975.1",
        total: "12,941,527.200",
    },
];

const BukuOrder = () => {
    return (
        <main>
            <div className="flex flex-col md:flex-row xl:flex-col w-full justify-between gap-8">
                <div className="w-full">
                    <div className="border-b border-b-[#121B2E] bg-[#0b1322] py-6 px-4">
                        <span className="font-roboto text-white font-bold text-lg">Buku Order</span>
                    </div>
                    <Table columns={columns1} dataSource={data} pagination={false} className="custom-table-buku-order-1" />
                </div>
                <div className="w-full">
                    <div className="border-t border-t-[#121B2E] bg-[#0b1322] py-6 px-4 flex items-center justify-between">
                        <span className="font-roboto text-white font-bold text-lg">12,323</span>
                        <span className="font-roboto text-white font-bold text-lg">Rp 12,323.00</span>
                    </div>
                    <Table columns={columns2} dataSource={data} pagination={false} className="custom-table-buku-order-2" />
                </div>
            </div>
        </main>
    );
};

export default BukuOrder;
