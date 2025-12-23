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

function MachineAuction() {

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
    ADD MACHINE (AUCTION)
  </h1>

  {/* Machine Name */}
  <input
    {...register("title")}
    className="border p-2 rounded"
    type="text"
    placeholder="Machine Name"
    autoComplete="off"
  />
  {errors.title && <div className="text-red-500">{errors.title.message}</div>}

  {/* Description */}
  <textarea
    {...register("description")}
    className="border p-2 rounded"
    placeholder="Add Description"
    rows={3}
  />
  {errors.description && (
    <div className="text-red-500">{errors.description.message}</div>
  )}

  {/* Starting Bid */}
  <Controller
    name="startingBid"
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
  {errors.startingBid && (
    <div className="text-red-500">{errors.startingBid.message}</div>
  )}

  {/* Auction End Date */}
  <input
    type="datetime-local"
    {...register("auctionEndDate")}
    className="border p-2 rounded"
  />
  {errors.auctionEndDate && (
    <div className="text-red-500">{errors.auctionEndDate.message}</div>
  )}

  {/* === EVERYTHING BELOW IS IDENTICAL TO YOUR ORIGINAL === */}

  {/* Category */}
  <select {...register("category")} className="border p-2 rounded">
    <option value="">Select Category</option>
    {Object.keys(machinebrand).map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
    <option value="Other">Other</option>
  </select>

  {/* Brands */}
  {watch("category") && watch("category") !== "Other" && (
    <select {...register("brand")} className="border p-2 rounded">
      <option value="">Select Brand</option>
      {machinebrand[watch("category")]?.map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
      <option value="Other">Other (Brand)</option>
    </select>
  )}

  {/* Custom Inputs */}
  {watch("category") === "Other" && (
    <input
      {...register("customcategory")}
      className="border p-2 rounded"
      placeholder="Enter your category"
    />
  )}

  {watch("brand") === "Other" && (
    <input
      {...register("custombrand")}
      className="border p-2 rounded"
      placeholder="Enter your custom brand"
    />
  )}

  {/* Condition */}
  <select {...register("condition")} className="border p-2 rounded">
    <option value="">Select Condition</option>
    <option value="new">New</option>
    <option value="used">Used</option>
    <option value="refurbished">Refurbished</option>
  </select>

  {/* Location */}
  <h2 className="font-bold text-xl py-2">Current Location of Machine</h2>

  <select {...register("province")} className="border p-2 rounded">
    <option value="">Select Province</option>
    {Object.keys(pngLocations).map((province) => (
      <option key={province} value={province}>
        {province}
      </option>
    ))}
  </select>

  {watch("province") && (
    <select {...register("town")} className="border p-2 rounded">
      <option value="">Select Town / City</option>
      {pngLocations[watch("province")]?.map((town) => (
        <option key={town} value={town}>
          {town}
        </option>
      ))}
      <option value="Other">Other (Village)</option>
    </select>
  )}

  {watch("town") === "Other" && (
    <input
      {...register("customLocation")}
      className="border p-2 rounded"
      placeholder="Enter village / custom location"
    />
  )}

  <input
    {...register("address")}
    className="border p-2 rounded"
    placeholder="Address"
  />

  <button
    disabled={isSubmitting}
    className="bg-purple-800 text-white p-2 rounded mt-2"
  >
    Submit Auction
  </button>
</form>
  
 
  </div>

 
</div>
</div>
  )
}

export default MachineAuction;

 