import { Routes, Route, Link, Outlet, useLocation } from "react-router-dom";
import Login from "./login";
import Navbar from "./navbar";
import Dashboard from "./dashboard";
import Register from "./register";
import { useState, useEffect } from 'react'
import './App.css'
import trademach from './assets/trademach.png'
import Api from './apitest'
import axios from "axios";
import CreateList from "./pages/create-list"
import Welcome from "./pages/welcome"
import Hero from "./components/hero"






function App() {


  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
       <div>

      

        

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apitest" element={<Api />} />
        <Route path="/create-list" element={<CreateList />} />
      </Routes>
    </div>
  )
}

function Home() {
 const [products, setProducts] = useState([]);

  // Fetch API data
  useEffect(() => {
    axios.get("https://trademach.vercel.app/api/get_listings")
      .then(res => {
        setProducts(res.data);   // <-- Dynamic data from API
      })
      .catch(err => console.error(err));
  }, []);

   return (
    <div className="flex-col">
      <Navbar />
      <Welcome />

      <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Machines & Parts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={product.main_image || "https://via.placeholder.com/200"}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />

              {/* Title */}
              <h2 className="mt-3 font-semibold text-lg">{product.title}</h2>

              {/* Price */}
              <p className="text-gray-600 mt-1">${product.price}</p>

              {/* Button */}
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                More Information
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
