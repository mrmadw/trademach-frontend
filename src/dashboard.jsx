import { useState, useEffect } from 'react'
import './App.css'
import MachineView from './components/machineview'
import List from './pages/create-list'
import MachineAuction from './pages/machine-auction'
import MachineHire from './pages/machine-hire'

function handleLogout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [listingType, setListingType] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const navItems = [
    { name: "Dashboard" },
    { name: "List Machine" },
    { name: "Edit Profile" },
    { name: "Help" },
    { name: "LogOut", action: handleLogout },
  ]

  return (
    <div className="flex bg-gray-100 h-screen">

      {/* Sidebar */}
      <div className={`fixed bg-white w-64 h-screen shadow ${
        sidebarOpen ? "translate-x-0" : "-translate-x-64"
      } lg:translate-x-0 lg:static`}>

        <div className="p-4 flex justify-between border-b">
          <div className="text-xl font-bold">Logo</div>
          <button
            className="lg:hidden text-xl font-bold"
            onClick={() => setSidebarOpen(false)}
          >
            x
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="text-xl cursor-pointer hover:text-blue-700"
              onClick={item.action ? item.action : undefined}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white flex justify-between p-4">
          <button
            className="hover:scale-110 p-2 text-xl font-bold lg:hidden transition"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
        </header>

        {/* Dashboard Body */}
        <div className="p-4 space-y-6">

          {/* Listing Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setListingType("sell")}
              className={`  bg-sky-500/96 hover:bg-red-500/90 border-blue-800  p-6 shadow-lg rounded-lg cursor-pointer transition ${
                listingType === "sell" ? "border-2 border-blue-700" : ""
              }`}
            >
              <h2 className="text-xl font-bold text-white">Sell</h2>
              <p className="text-white">List machine for sale</p>
            </div>



            {/* This feature is for later. 

            <div
              onClick={() => setListingType("auction")}
              className={` bg-sky-500/96 hover:bg-red-500/90 p-6 shadow-lg rounded-lg cursor-pointer transition ${
                listingType === "auction" ? "border-2 border-purple-700" : ""
              }`}
            >
              <h2 className="text-xl font-bold text-white">Auction</h2>
              <p className="text-gray-700 text-white">Sell machine via bidding</p>
            </div>

            */}


            <div
              onClick={() => setListingType("hire")}
              className={` bg-sky-500/96 hover:bg-red-500/90 p-6 shadow-lg rounded-lg cursor-pointer transition ${
                listingType === "hire" ? "border-2 border-green-700" : ""
              }`}
            >
              <h2 className="text-xl font-bold text-white">Hire</h2>
              <p className="text-gray-700 text-white">Put machine up for hire</p>
            </div>
          </div>

          {/* Selected Form */}
          <div className="border-black p-6 shadow-lg rounded-lg transition-all">
            {!listingType && (
              <p className="text-black text-center ">
                Select a listing type above to continue
              </p>
            )}

            {listingType === "sell" && <List />}
            {listingType === "auction" && <MachineAuction />}
            {listingType === "hire" && <MachineHire />}
          </div>
        </div>

        <div><MachineView/></div>
      </main>
    </div>
  )
}

export default Dashboard
