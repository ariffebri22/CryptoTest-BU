import React from "react";
import Navbar from "../../components/Navbar";
import TableMain from "../../components/TableMain";

const Home = () => {
    return (
        <main className="w-screen bg-gradient-to-b from-black to-[#021136]">
            <Navbar />
            <section className="container mx-auto h-full text-white font-roboto pt-30 pb-20 px-10 ">
                <div className="w-full h-full flex flex-col gap-8">
                    <div className="pt-20">
                        <h1 className="text-4xl font-bold">Pasar</h1>
                        <h2 className="pt-4">Harga Kripto dalam Rupiah Hari ini di Market Terbesar Indonesia</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        <div className="bg-[#0B1322]/50 w-full flex items-center justify-between p-6 rounded-2xl">
                            <div className="flex flex-col">
                                <h3 className="uppercase text-white text-sm">tko/idr</h3>
                                <div className="mt-8">
                                    <h3 className="text-white font-semibold text-2xl">Rp 5,261.3</h3>
                                    <p className="text-red-400 mt-4 text-sm">-3.82%</p>
                                </div>
                            </div>
                            <div className="flex flex-col h-full justify-end gap-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="46" viewBox="0 0 128 46" fill="none">
                                    <path d="M127.5 45L110 27.5L92.5 45L60 12.5L45 27.5L18.5 1L1 18.5" stroke="#FF3B3B" />
                                </svg>
                                <h3 className="text-[#959595] font-semibold text-sm">Volume : 2,258 IDR</h3>
                            </div>
                        </div>
                        <div className="bg-[#0B1322]/50 w-full flex items-center justify-between p-6 rounded-2xl">
                            <div className="flex flex-col">
                                <h3 className="uppercase text-white text-sm">tko/idr</h3>
                                <div className="mt-8">
                                    <h3 className="text-white font-semibold text-2xl">Rp 5,261.3</h3>
                                    <p className="text-red-400 mt-4 text-sm">-3.82%</p>
                                </div>
                            </div>
                            <div className="flex flex-col h-full justify-end gap-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="46" viewBox="0 0 128 46" fill="none">
                                    <path d="M127.5 45L110 27.5L92.5 45L60 12.5L45 27.5L18.5 1L1 18.5" stroke="#FF3B3B" />
                                </svg>
                                <h3 className="text-[#959595] font-semibold text-sm">Volume : 2,258 IDR</h3>
                            </div>
                        </div>
                        <div className="bg-[#0B1322]/50 w-full flex items-center justify-between p-6 rounded-2xl">
                            <div className="flex flex-col">
                                <h3 className="uppercase text-white text-sm">tko/idr</h3>
                                <div className="mt-8">
                                    <h3 className="text-white font-semibold text-2xl">Rp 5,261.3</h3>
                                    <p className="text-green-400 mt-4 text-sm">-3.82%</p>
                                </div>
                            </div>
                            <div className="flex flex-col h-full justify-end gap-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="46" viewBox="0 0 128 46" fill="none">
                                    <path d="M1 45L18.5 27.5L36 45L68.5 12.5L83.5 27.5L110 1L127.5 18.5" stroke="#23913B" />
                                </svg>
                                <h3 className="text-[#959595] font-semibold text-sm">Volume : 2,258 IDR</h3>
                            </div>
                        </div>
                        <div className="bg-[#0B1322]/50 w-full flex items-center justify-between p-6 rounded-2xl">
                            <div className="flex flex-col">
                                <h3 className="uppercase text-white text-sm">tko/idr</h3>
                                <div className="mt-8">
                                    <h3 className="text-white font-semibold text-2xl">Rp 5,261.3</h3>
                                    <p className="text-green-400 mt-4 text-sm">-3.82%</p>
                                </div>
                            </div>
                            <div className="flex flex-col h-full justify-end gap-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="46" viewBox="0 0 128 46" fill="none">
                                    <path d="M1 45L18.5 27.5L36 45L68.5 12.5L83.5 27.5L110 1L127.5 18.5" stroke="#23913B" />
                                </svg>
                                <h3 className="text-[#959595] font-semibold text-sm">Volume : 2,258 IDR</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                            <h3 className="text-white text-2xl font-bold">Favorit</h3>
                            <div className="flex items-center gap-3 md:gap-10">
                                <div className="pt-1 flex flex-col gap-3">
                                    <span className="text-yellow-500 text-lg font-bold mx-2">IDR</span>
                                    <div className="w-full h-1.5 bg-yellow-500 rounded-4xl"></div>
                                </div>
                                <div className="pt-1 flex flex-col gap-3">
                                    <span className="text-[#BCBCBC] text-lg font-bold mx-2">USD</span>
                                    <div className="w-full h-1.5 bg-yellow-500 rounded-4xl opacity-0"></div>
                                </div>
                                <div className="pt-1 flex flex-col gap-3">
                                    <span className="text-[#BCBCBC] text-lg font-bold mx-2">BNB</span>
                                    <div className="w-full h-1.5 bg-yellow-500 rounded-4xl opacity-0"></div>
                                </div>
                                <div className="pt-1 flex flex-col gap-3">
                                    <span className="text-[#BCBCBC] text-lg font-bold mx-2">BTC</span>
                                    <div className="w-full h-1.5 bg-yellow-500 rounded-4xl opacity-0"></div>
                                </div>
                                <div className="pt-1 flex flex-col gap-3">
                                    <span className="text-[#BCBCBC] text-lg font-bold mx-2">ALTS</span>
                                    <div className="w-full h-1.5 bg-yellow-500 rounded-4xl opacity-0"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full overflow-clip">
                            <TableMain />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
