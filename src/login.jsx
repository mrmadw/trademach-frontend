import { Routes, Route, Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react'
import './App.css'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "./navbar";
import axios from "axios";
import Dashboard from "./dashboard"
import apiClient from "./assets/api"
import apiLogin from "./assets/apilogin"
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(4, "Password must be at least 8 characters"),
});


function Login() {


const{register, 
handleSubmit,
setError,

formState: {errors, isSubmitting},
} = useForm(
  {resolver: zodResolver(schema),
  });

const onSubmit = async (data) => {
  try {
    const response = await apiLogin.post(
      "/token/obtain/",
      data,
      { withCredentials: true } // important: allows backend to set HttpOnly cookie
    );

    // Extract access token only
    const { access } = response.data;

    // Store access token in localStorage
    localStorage.setItem("access_token", access);

    console.log("Login success:", response.data);

    // Redirect to dashboard
    window.location.href = "/dashboard";

  } catch (error) {
    // Backend API error message (401, 400, etc.)
    const msg =
      error.response?.data?.detail ||
      "Invalid Login Details. Check your email or password and try again.";

    setError("root", { message: msg });
  }
};


  return (
       <div className="flex flex-col w-full h-screen bg-gray-100">
        <div><Navbar/></div>

{/* Login & Register Container */}
<div className="lg:flex justify-center py-28">

  {/* Left side - Login */}
  <div className="flex-1 flex items-center justify-center">
    <form onSubmit={(handleSubmit(onSubmit))} 
      className="flex flex-col gap-4 w-80">
      <h1 className="text-3xl font-bold mb-4 text-center">LOG IN</h1>

      <input{...register("email",
        )}
        className="border p-2 rounded"
        type="email"
        placeholder="Email (required)"
        autoComplete="off"
       
      />
      {
        errors.email && 
      <div className="text-red-500">{errors.email.message}</div>
    }



      <input{...register("password",
        )}
        className="border p-2 rounded"
        type="password"
        placeholder="Password (required)"
        autoComplete ="off"
      />
      {
        errors.password && 
      <div className="text-red-500">{errors.password.message}</div>
    } 
     



      <a href="#" className="text-sm text-blue-700 hover:underline">Forgot your password?</a>
      <button disabled={isSubmitting} className="bg-blue-900 text-white p-2 rounded mt-2">
        {
          isSubmitting ? "Logging in..." : "Log in"
        }
      </button>

        {
        errors.root && 
      <div className="text-red-500">{errors.root.message}</div>
    }

<a
  href="https://trademach-backend-production.up.railway.app/accounts/google/login/"
  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 transition duration-150 ease-in-out border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  Sign in with Google
</a>


<a
  href="http://localhost:8000/accounts/google/login/"
  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 transition duration-150 ease-in-out border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  Sign in with Google (localhost test - Remove Me when before pushing to prod)
</a>



      <p className="text-sm mt-2 text-center">
        New here? <a href="/register" className="text-blue-700 hover:underline">Register now</a>
      </p>
    </form>
  </div>

  {/* Divider */}
  <div className="w-px bg-gray-400 py-12"></div>

  {/* Right side - Register */}
  <div className="flex-1 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-4">REGISTER</h1>
    <div className="h-12"></div>
    <button className="border-2 border-blue-700 p-2 w-40 rounded hover:bg-blue-100 transition"
      onClick={() => window.location.href = "/register"}>
      Register
    </button>
    <div className="h-42"></div>
  </div>

</div>

</div>

  )
}

export default Login;
