import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import BtcIdr from "../pages/BtcIdr";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/btc-idr" element={<BtcIdr />} />
            </Routes>
        </Router>
    );
};

export default App;
