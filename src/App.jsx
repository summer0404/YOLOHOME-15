import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1">
        <NavBar />
        <main className="mt-[20px] p-6">
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/info"
              element={
                <ProtectedRoute>
                  <Info />
                </ProtectedRoute>
              }
            />
            <Route index element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
