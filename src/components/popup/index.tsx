import React from "react";
import { createRoot } from "react-dom/client";
import "@css/output.css";
import Popup from "./Popup";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
