import React, { useState } from "react";
import { Drawer } from "antd";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => {
        setIsOpen(true);
    };
    const closeDrawer = () => {
        setIsOpen(false);
    };
    return (
        <main className="w-full fixed top-0 bg-black z-50">
            <Drawer title={<p className="font-roboto text-white">Menu</p>} width={320} closable placement="right" onClose={closeDrawer} open={isOpen} zIndex={999} style={{ backgroundColor: "#021136" }}>
                <div className="w-full h-full flex flex-col items-center justify-between">
                    <ul className="items-center gap-8 text-white font-roboto flex flex-col">
                        <li className="cursor-pointer">Pasar</li>
                        <li className="cursor-pointer">Tentang Kami</li>
                        <li className="cursor-pointer">Kontak Kami</li>
                    </ul>
                    <div className="flex gap-8 items-center">
                        <div className="relative p-[2px] rounded-full inline-block" style={{ background: "linear-gradient(to bottom right, #D57C17, #956836)" }}>
                            <button className="bg-black py-2 px-8 rounded-full cursor-pointer">
                                <span className="uppercase text-white font-roboto font-semibold">sign in</span>
                            </button>
                        </div>
                        <div className="relative p-[2px] rounded-full inline-block" style={{ background: "linear-gradient(to bottom right, #D57C17, #956836)" }}>
                            <button className="bg-black py-2 px-8 rounded-full cursor-pointer">
                                <span className="uppercase text-white font-roboto font-semibold">sign up</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>

            <div className="container mx-auto py-8 px-10 flex items-center justify-between ">
                <div className="flex gap-8 items-center">
                    <img src="/vite.svg" alt="Crypto-Logo" loading="eager" width={70} height={70} />
                    <div className="items-center gap-8 text-white font-roboto hidden lg:flex">
                        <a href="#">Pasar</a>
                        <a href="#">Tentang Kami</a>
                        <a href="#">Kontak Kami</a>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" className="lg:hidden cursor-pointer" onClick={openDrawer}>
                    <path d="M3 6H21M3 12H21M3 18H21" stroke="#DBA623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hidden lg:flex gap-8 items-center">
                    <div className="relative p-[2px] rounded-full inline-block" style={{ background: "linear-gradient(to bottom right, #D57C17, #956836)" }}>
                        <button className="bg-black py-2 px-8 rounded-full cursor-pointer">
                            <span className="uppercase text-white font-roboto font-semibold">sign in</span>
                        </button>
                    </div>
                    <div className="relative p-[2px] rounded-full inline-block" style={{ background: "linear-gradient(to bottom right, #D57C17, #956836)" }}>
                        <button className="bg-black py-2 px-8 rounded-full cursor-pointer">
                            <span className="uppercase text-white font-roboto font-semibold">sign up</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Navbar;
