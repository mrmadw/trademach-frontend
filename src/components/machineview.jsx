import React from "react"
import axios from "axios";
import { useState, useEffect } from 'react'

function MachineView() {

 const [products, setProducts] = useState([]);

// Fetch API data
  useEffect(() => {
  const fetchMyListings = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await axios.get(
        "https://trademach-backend-production.up.railway.app/api/listings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log("API response:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching user listings:", error);
    }




    const deleteListing = async (id) => {
   console.log("Deleting ID:", id);
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("User not logged in");
    return;
  }

  try {
    await axios.delete(
      `http://localhost:8000/api/listings/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Remove deleted item from UI instantly
    setProducts(prev =>
      prev.filter(product => product.id !== id)
    );
  } catch (error) {
    console.error("Error deleting listing:", error);
  }
};

  };

  fetchMyListings();
}, 

[]);

  const deleteListing = async (id) => {
  if (!window.confirm("Are you sure you want to delete this listing?")) {
    return;
  }

  const token = localStorage.getItem("access_token");

  try {
    await axios.delete(
      `http://localhost:8000/api/listings/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProducts(prev =>
      prev.filter(p => p.id !== id)
    );
  } catch (error) {
    console.error("Delete failed:", error);
  }
};




	return(
		<>
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

             
              <button
      onClick={() => deleteListing(product.id)}
      style={{ color: "red" }}
    >
      Delete
    </button>
            </div>
          ))}
		</div>
		</>
		);
}

export default MachineView;
