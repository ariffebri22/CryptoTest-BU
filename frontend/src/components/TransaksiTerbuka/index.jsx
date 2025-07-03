// TransaksiTerbuka.jsx
import React from "react";

const TransaksiTerbuka = () => {
    return (
        <div className="bg-[#0b1322] text-white p-4 rounded-lg">
            <div className="max-w-7xl mx-auto">
                <div className="flex border-b border-gray-700 mb-4">
                    <button className="py-2 px-4 text-sm font-medium border-b-2 border-blue-500 text-blue-500">Transaksi Terbuka (0)</button>
                    <button className="py-2 px-4 text-sm font-medium text-gray-400 hover:text-white">Riwayat Order</button>
                    <button className="py-2 px-4 text-sm font-medium text-gray-400 hover:text-white">Riwayat Perdagangan</button>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 py-2 px-4 text-sm font-medium text-gray-400 border-b border-gray-700">
                    <div className="col-span-1">Tanggal</div>
                    <div className="col-span-1">Pasangan</div>
                    <div className="col-span-1">Jenis</div>
                    <div className="col-span-1">Sisi</div>
                    <div className="col-span-1">Harga</div>
                    <div className="col-span-1">Jumlah</div>
                    <div className="col-span-1">Terisi</div>
                    <div className="col-span-1">Total</div>
                </div>

                <div className="flex items-center justify-center h-80">
                    <p className="text-gray-500">Anda tidak memiliki order Terbuka</p>
                </div>
            </div>
        </div>
    );
};

export default TransaksiTerbuka;
