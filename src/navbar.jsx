import { Routes, Route, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import Register from "./register";
import { useState } from 'react'
import './App.css'
import trademachlogo from './assets/trademachlogo.png'


function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white shadow-lg z-50
          ${sidebarOpen ? "block" : "hidden"}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-slate-700">
          <span className="text-lg font-semibold">TradeMach</span>
          <button
            className="text-xl font-bold hover:text-red-400 transition"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="px-6 py-8 space-y-4">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="w-full border border-slate-500 hover:bg-slate-800 font-semibold py-2 rounded transition"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* ================= TOP NAVBAR ================= */}
      <nav className="w-full h-14 bg-gradient-to-b from-slate-900 to-slate-800 border-b border-slate-700 flex items-center px-4">
        
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-slate-200 text-xl hover:text-white transition"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        {/* Logo */}
        <img
          className="w-28 ml-4"
          src={trademachlogo}
          alt="TradeMach Logo"
        />

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-8 ml-10 text-sm">
          <Link
            to="/"
            className="text-white border-b-2 border-indigo-500 pb-1"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-slate-300 hover:text-white transition"
          >
            Categories
          </Link>

          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Login | Register
          </Link>
        </div>

        {/* Right side action */}
        <div className="ml-auto">
          <Link
            to="/dashboard"
            className="text-sm px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
          >
            Add Machine/Parts
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
