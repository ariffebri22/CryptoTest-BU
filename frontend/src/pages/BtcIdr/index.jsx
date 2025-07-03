import React from "react";
import Navbar from "../../components/Navbar";
import BukuOrder from "../../components/BukuOrder";
import PerdaganganMarket from "../../components/PerdaganganMarket";
import ChartBtcIdr from "../../components/ChartBtcIdr";
import TransaksiTerbuka from "../../components/TransaksiTerbuka";

const BtcIdr = () => {
    return (
        <main className="w-screen bg-black">
            <Navbar />
            <section className="container mx-auto h-full text-white font-roboto pt-30 pb-20 px-10">
                <div className="w-full h-full flex flex-col gap-14">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pt-20">
                        <h1 className="text-4xl font-bold">BTC/IDR</h1>
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="text-sm flex flex-col gap-2">
                                <h3>12.323</h3>
                                <h3>Rp 12, 323.00</h3>
                            </div>
                            <div className="text-sm flex flex-col gap-2">
                                <h3>Perubahan 24jam</h3>
                                <h3 className="text-red-500">-687-5.28%</h3>
                            </div>
                            <div className="text-sm flex flex-col gap-2">
                                <h3>High 24jam</h3>
                                <h3>13,010</h3>
                            </div>
                            <div className="text-sm flex flex-col gap-2">
                                <h3>Low 24jam</h3>
                                <h3>11,860</h3>
                            </div>
                            <div className="text-sm flex flex-col gap-2">
                                <h3>Volume 24jam(BTC)</h3>
                                <h3>42,556.70</h3>
                            </div>
                            <div className="text-sm flex flex-col gap-2">
                                <h3>Volume 24jam(IDR)</h3>
                                <h3>520,707,732.80</h3>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        <div className="col-span-1">
                            <BukuOrder />
                        </div>
                        <div className="xl:col-span-2">
                            <ChartBtcIdr />
                        </div>
                        <div className="col-span-1">
                            <PerdaganganMarket />
                        </div>
                    </div>

                    <div>
                        <TransaksiTerbuka />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BtcIdr;
