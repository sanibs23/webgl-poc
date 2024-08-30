// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

createRoot(document.getElementById("root")).render(
  <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
    <App />
  </DndProvider>
);
