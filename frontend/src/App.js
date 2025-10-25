import { Routes, Route } from "react-router-dom";
import "./css/global.css";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
