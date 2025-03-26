import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1">
        <NavBar />
        <main className="mt-[20px] p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
