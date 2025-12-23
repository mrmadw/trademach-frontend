import { Routes, Route, Link } from "react-router-dom";
import { useState } from 'react'
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';


const pngLocations = {
  "Bougainville": ["Buka"],
  "Central": ["Kupiano", "Port Moresby (Outskirts)"],
  "East New Britain": ["Kokopo", "Rabaul"],
  "East Sepik": ["Wewak"],
  "Eastern Highlands": ["Goroka"],
  "Enga": ["Wabag"],
  "Gulf": ["Kerema"],
  "Hela": ["Tari"],
  "Jiwaka": ["Banz"],
  "Madang": ["Madang"],
  "Manus": ["Lorengau"],
  "Milne Bay": ["Alotau"],
  "Morobe": ["Bulolo", "Finschhafen", "Lae"],
  "National Capital District": ["Port Moresby"],
  "New Ireland": ["Kavieng"],
  "Oro": ["Popondetta"],
  "Simbu": ["Kundiawa"],
  "Southern Highlands": ["Mendi"],
  "West New Britain": ["Kimbe"],
  "West Sepik": ["Vanimo"],
  "Western": ["Daru", "Kiunga"],
  "Western Highlands": ["Mount Hagen"]
};


const machinebrand = {
  "Agriculture & Plantations": [
    "Case IH",
    "John Deere",
    "Kubota",
    "Massey Ferguson",
    "New Holland"
  ],
  "Construction & Civil Infrastructure": [
    "Caterpillar",
    "Hyundai",
    "JCB",
    "Liebherr",
    "SANY",
    "Volvo CE"
  ],
  "Forestry & Logging": [
    "Caterpillar",
    "Hitachi",
    "John Deere",
    "Komatsu Forestry",
    "Tigercat"
  ],
  "Mining & Quarrying": [
    "Caterpillar",
    "Epiroc",
    "Hitachi",
    "Komatsu",
    "Liebherr",
    "Sandvik"
  ],
  "Ports, Marine & Logistics": [
    "Kalmar",
    "Konecranes",
    "Lebherr",
    "Wärtsilä"
  ],
  "Power Generation & Industrial Engines": [
    "Caterpillar",
    "Cummins",
    "MTU",
    "Perkins",
    "Wärtsilä"
  ],
  "Road Maintenance & Paving": [
    "Ammann",
    "Bomac",
    "Caterpillar",
    "Dynapac",
    "Wirtgen"
  ]
};






const schema = z.object({
  title: z.string()
  .min(1, "Please enter machine name here.")
  .max(150, "Machine name is too long."),

  description: 
  z.string()
  .min(1, "Your machine needs a description.")
  .max(150, "Description is too long."),

  price: z
  .number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  })
  .positive("Price must be greater than 0")
  .max(10_000_000, "Price is too high"),





})

function MachineHire() {

const{register, 
handleSubmit,
setError,
watch,
control,

formState: {errors, isSubmitting},
} = useForm(
  {resolver: zodResolver(schema),
  // Define default values if necessary
    defaultValues: {
      price: undefined, // It's often better to start with undefined or null for price inputs
    },
  });




const onSubmit = async (data) => {
console.log(data)
  try{

    const response = await axios.post(
      "http://localhost:8000/api/create-listing/",
      data,
      {
        headers:{"Content-Type": "application/json"}},
      );


    console.log("Successfully signed in", response.data);

  
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



       <div className=" py-5 flex w-full h-screen bg-gray-100">

  {/* Register */}
  

  <div className="flex-1 flex flex-col items-center justify-center">
 <form
  onSubmit={handleSubmit(onSubmit)}
  className="flex flex-col gap-4 w-80"
>
  <h1 className="text-3xl font-bold mb-4 text-center">
    ADD MACHINE (RENTAL)
  </h1>

  {/* Machine Name */}
  <input
    {...register("title")}
    className="border p-2 rounded"
    placeholder="Machine Name"
  />

  {/* Description */}
  <textarea
    {...register("description")}
    className="border p-2 rounded"
    rows={3}
    placeholder="Add Description"
  />

  {/* Rental Rate */}
  <Controller
    name="rentalRate"
    control={control}
    render={({ field: { onChange, value } }) => (
      <CurrencyInput
        placeholder="PGK0.00"
        prefix="PGK"
        decimalsLimit={2}
        value={value ?? ""}
        onValueChange={(val) =>
          onChange(val ? Number(val) : undefined)
        }
        className="border p-2 rounded"
      />
    )}
  />

  {/* Rental Period */}
  <select {...register("rentalPeriod")} className="border p-2 rounded">
    <option value="">Select Rental Period</option>
    <option value="hour">Per Hour</option>
    <option value="day">Per Day</option>
    <option value="week">Per Week</option>
    <option value="month">Per Month</option>
  </select>

  {/* === REMAINDER IDENTICAL === */}

  {/* Category, Brand, Location, Condition — SAME AS ABOVE */}

  <button
    disabled={isSubmitting}
    className="bg-blue-800 text-white p-2 rounded mt-2"
  >
    Submit Rental
  </button>
</form>

  
 
  </div>

 
</div>
</div>
  )
}

export default MachineHire;