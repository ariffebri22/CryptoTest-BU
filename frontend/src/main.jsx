import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./router/App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
