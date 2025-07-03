import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Deposit from "../pages/Deposit";
import Members from "../pages/Members";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list-deposit" element={<Deposit />} />
                <Route path="/list-members" element={<Members />} />
            </Routes>
        </Router>
    );
};

export default App;
