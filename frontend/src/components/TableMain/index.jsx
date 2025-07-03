import React from "react";
import { Table } from "antd";
import "../../styles/TableMain.css";

const parsePrice = (priceString) => {
    const cleanPrice = priceString.replace(/Rp /g, "").replace(/\./g, "").replace(/,/g, ".");
    const mainPrice = cleanPrice.split(" / ")[0];
    return parseFloat(mainPrice);
};

const parseChange = (changeString) => {
    return parseFloat(changeString.replace("%", ""));
};

const parseMarketCap = (capString) => {
    const cleanCap = capString.replace(/Rp /g, "").replace(/,/g, ".");
    if (cleanCap.includes("T")) {
        return parseFloat(cleanCap.replace("T", "")) * 1_000_000_000_000;
    }
    if (cleanCap.includes("M")) {
        return parseFloat(cleanCap.replace("M", "")) * 1_000_000;
    }
    return parseFloat(cleanCap);
};

const parseVolume = (volumeString) => {
    const cleanVolume = volumeString.replace("M", "");
    return parseFloat(cleanVolume) * 1_000_000;
};

const columns = [
    {
        title: "Pasangan",
        dataIndex: "pair",
        key: "pair",
        render: (text, record) => (
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#FFD700", marginRight: "8px" }}>★</span>
                {text}
            </div>
        ),
        width: 180,
        sorter: (a, b) => a.pair.localeCompare(b.pair),
        multiple: 6,
    },
    {
        title: "Harga Terakhir",
        dataIndex: "lastPriceDisplay",
        key: "lastPrice",
        width: 250,
        sorter: (a, b) => parsePrice(a.lastPriceRaw) - parsePrice(b.lastPriceRaw),
        multiple: 5,
    },
    {
        title: "Perubahan 24jam",
        dataIndex: "change24hDisplay",
        key: "change24h",
        render: (text, record) => <span style={{ color: record.change24hRaw >= 0 ? "#22c55e" : "#ef4444" }}>{text}</span>,
        width: 180,
        sorter: (a, b) => parseChange(a.change24hRaw) - parseChange(b.change24hRaw),
        multiple: 4,
    },
    {
        title: "Tertinggi / Terendah 24Jam",
        dataIndex: "highLow24h",
        key: "highLow24h",
        width: 250,
        sorter: (a, b) => parsePrice(a.highLow24h.split(" / ")[0]) - parsePrice(b.highLow24h.split(" / ")[0]),
        multiple: 3,
    },
    {
        title: "Kapitalisasi Pasar",
        dataIndex: "marketCapDisplay",
        key: "marketCap",
        width: 200,
        sorter: (a, b) => parseMarketCap(a.marketCapRaw) - parseMarketCap(b.marketCapRaw),
        multiple: 2,
    },
    {
        title: "Volume 24 Jam",
        dataIndex: "volume24hDisplay",
        key: "volume24h",
        width: 150,
        sorter: (a, b) => parseVolume(a.volume24hRaw) - parseVolume(b.volume24hRaw),
        multiple: 1,
    },
];

const data = [
    {
        key: "1",
        pair: "BTC/DAI",
        lastPriceDisplay: "98,832.93 / Rp 1,612,213,281.72",
        lastPriceRaw: "98,832.93 / Rp 1,612,213,281.72",
        change24hDisplay: "+3.89%",
        change24hRaw: "+3.89",
        highLow24h: "102,451.34 / Rp 94,288.07",
        marketCapDisplay: "Rp 31,953.008T",
        marketCapRaw: "31.953T",
        volume24hDisplay: "1.538M",
        volume24hRaw: "1.538M",
    },
    {
        key: "2",
        pair: "ETH/DAI",
        lastPriceDisplay: "3,567.12 / Rp 58,123,456.78",
        lastPriceRaw: "3,567.12 / Rp 58,123,456.78",
        change24hDisplay: "-1.25%",
        change24hRaw: "-1.25",
        highLow24h: "3,600.00 / Rp 57,000,000.00",
        marketCapDisplay: "Rp 6,543.210T",
        marketCapRaw: "6.543T",
        volume24hDisplay: "0.876M",
        volume24hRaw: "0.876M",
    },
    {
        key: "3",
        pair: "XRP/ETH",
        lastPriceDisplay: "0.58 / Rp 9,450.00",
        lastPriceRaw: "0.58 / Rp 9,450.00",
        change24hDisplay: "+5.10%",
        change24hRaw: "+5.10",
        highLow24h: "0.60 / Rp 9,300.00",
        marketCapDisplay: "Rp 2.100T",
        marketCapRaw: "2.100T",
        volume24hDisplay: "2.100M",
        volume24hRaw: "2.100M",
    },
    {
        key: "4",
        pair: "ADA/USDT",
        lastPriceDisplay: "0.45 / Rp 7,345.00",
        lastPriceRaw: "0.45 / Rp 7,345.00",
        change24hDisplay: "-0.75%",
        change24hRaw: "-0.75",
        highLow24h: "0.46 / Rp 7,200.00",
        marketCapDisplay: "Rp 1.500T",
        marketCapRaw: "1.500T",
        volume24hDisplay: "0.300M",
        volume24hRaw: "0.300M",
    },
    {
        key: "5",
        pair: "SOL/USD",
        lastPriceDisplay: "150.25 / Rp 2,450,000.00",
        lastPriceRaw: "150.25 / Rp 2,450,000.00",
        change24hDisplay: "+2.50%",
        change24hRaw: "+2.50",
        highLow24h: "152.00 / Rp 2,400,000.00",
        marketCapDisplay: "Rp 12.000T",
        marketCapRaw: "12.000T",
        volume24hDisplay: "1.800M",
        volume24hRaw: "1.800M",
    },
    {
        key: "6",
        pair: "DOGE/DAI",
        lastPriceDisplay: "0.08 / Rp 1,300.00",
        lastPriceRaw: "0.08 / Rp 1,300.00",
        change24hDisplay: "-4.00%",
        change24hRaw: "-4.00",
        highLow24h: "0.09 / Rp 1,250.00",
        marketCapDisplay: "Rp 0.800T",
        marketCapRaw: "0.800T",
        volume24hDisplay: "0.500M",
        volume24hRaw: "0.500M",
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
};

const TableMain = () => {
    return (
        <div className="w-full overflow-x-auto">
            <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ x: "max-content" }} pagination={false} className="custom-transparent-table w-full" />
        </div>
    );
};

export default TableMain;
