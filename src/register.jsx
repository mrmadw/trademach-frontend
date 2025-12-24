import { Routes, Route, Link } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from './navbar'
import axios from 'axios';


const schema = z.object({
  email: 
    z.string()
    .trim()
    .email("Invalid email"),

  password: 
    z.string()
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .min(8, "Password must be at least 8 characters"),


   confirmPassword: 
    z.string()
    .trim()
    .min(1, "Please confirm your password"),

  username: 
    z.string()
    .trim()
    .min(3, "Username should be atleast 3 characters")
    .max(150, "Username is too long.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .optional(),

  first_name:
     z.string()
     .trim()
     .min(2)
     .max(150, "First name is too long."),

  last_name: 
    z.string()
    .trim()
    .min(2)
    .max(150, "Last name is too long."),

  phone: 
  z.string()
  .trim()
  .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),

})
.superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password does not match",
      path: ["confirmPassword"],
    })
  }
})

function Register() {

const{register, 
handleSubmit,
setError,

formState: {errors, isSubmitting},
} = useForm(
  {resolver: zodResolver(schema),
  });




const onSubmit = async (data) => {
const { confirmPassword, ...payload } = data;
console.log(data)
  try{

    const response = await axios.post(
      "https://trademach-backend-production.up.railway.app/api/signup/",
      data, payload,
      {
        headers:{"Content-Type": "application/json"}},
      );


    console.log("Sign up Successful", response.data);

  
    window.location.href = "/login";

  } catch(error){
    // Backend API error message (401, 400, etc.)
    const msg =
    error.response?.data?.detail ||
    "Make sure you have entered all the necessary information.";

    setError("root", { message:msg });
  }
};

  return (
    <div className="flex-col ">

      <div><Navbar/></div>


       <div className=" py-5 flex w-full h-screen bg-gray-100">

  {/* Register */}
  

  <div className="flex-1 flex flex-col items-center justify-center">
   
    
    <form onSubmit={(handleSubmit(onSubmit))} 
      className="flex flex-col gap-4 w-80">
      <h1 className="text-3xl font-bold mb-4 text-center">REGISTER</h1>

      <input{...register("email",

        )}
        className="border p-2 rounded"
        type="email"
        placeholder="Email (required)"
        autoComplete="off"
      />
      {
        errors.email && 
      <div className="text-red-500" autoComplete="email">{errors.email.message}</div>
    }

<input className="border p-2 rounded" type="text" placeholder="Username (Optional)" autoComplete="off" {...register("username")} />
{
        errors.username && 
      <div className="text-red-500">{errors.username.message}</div>
    }  
<input className="border p-2 rounded" type="text" placeholder="First Name" autoComplete="off" {...register("first_name")} />
{
        errors.first_name && 
      <div className="text-red-500">{errors.first_name.message}</div>
    }  
<input className="border p-2 rounded" type="text" placeholder="Last Name" autoComplete="off" {...register("last_name")} />
{
        errors.last_name && 
      <div className="text-red-500">{errors.last_name.message}</div>
    }  
<input className="border p-2 rounded" type="text" placeholder="Phone" autoComplete="off" {...register("phone")} />

{
        errors.phone && 
      <div className="text-red-500">{errors.phone.message}</div>
    }  

<input{...register("password",
        )}
        className="border p-2 rounded"
        type="password"
        placeholder="Password (required)"
        autoComplete="new-password"
      />
      {
        errors.password?.message && 
      <div className="text-red-500">{errors.password?.message}</div>
    }   



<input
 className="border p-2 rounded" type="password" placeholder="Confirm Password" autoComplete="new-password"
  {...register("confirmPassword")
} required />


{
        errors.confirmPassword?.message && 
      <div className="text-red-500">{errors.confirmPassword?.message}</div>
    }   

      <button disabled={isSubmitting} className="bg-blue-900 text-white p-2 rounded mt-2">
        {
          isSubmitting ? "Submitting..." : "Register"
        }
      </button>

        {
        errors.root && 
      <div className="text-red-500">{errors.root.message}</div>
    }


      <p className="text-sm mt-2 text-center">
        Already have an account? <a href="/login" className="text-blue-700 hover:underline">Log in</a>
      </p>
    </form>
  </div>

 
</div>
</div>
  )
}

export default Register;
