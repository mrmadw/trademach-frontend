import { Routes, Route, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import Register from "./register";
import { useState } from 'react'
import './App.css'
import trademachlogo from './assets/trademachlogo.png'


function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate();

  return (

    <>  
        {/* Mobile Nav*/}
    <div className= {`
    fixed top-0 left-0 h-screen w-64 bg-white shadow z-50
    transition-transform duration-300
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:hidden
  `}
  >       
        <div className="p-2 flex justify-between border-b">
          <div className="text-xl font-bold">Logo</div>
          <button className="lg:hidden text-xl font-bold" onClick={()=>setSidebarOpen(false)}>x</button>
        </div>

       
        <div className="px-6 py-58 space-y-4">
          <button className="  bg-black text-white font-bold border-2 border-blue-700 p-2 w-40 rounded hover:bg-blue-100 transition"
      onClick={() =>navigate("/login")}>
      Login
    </button>
    <button className=" font-bold border-2 border-blue-700 p-2 w-40 rounded hover:bg-blue-100 transition"
      onClick={() =>navigate("/register")}>
      Register
    </button>
          
        </div>
      </div>



      {/* Desktop Nav*/}
    <nav className="w-full bg-white shadow flex justify-between items-center p-2">
      <button className="p-2 text-xl font-bold lg:hidden transition duration-300 ease-in-out"
           onClick={()=>setSidebarOpen(true)}>☰ </button>
      <img className="w-36 h-auto" src={trademachlogo} alt="Logo" />
      <Link className=" hidden sm:block text-blue-800 font-bold" to="/">Home</Link>
      <Link className="hidden sm:block  text-blue-800 font-bold" to="/login">Log in | Register</Link>
      <div className="flex items-center space-x-3">
        <Link className="px-2 py-1 bg-black text-white rounded hover:bg-blue-700" to="/dashboard">
          Add Machine/Parts
        </Link>
      </div>
    </nav>

    </>
  );
}

export default Navbar;