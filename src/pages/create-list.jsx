import { Routes, Route, Link } from "react-router-dom";
import { useState } from 'react'
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import apiClient from '../assets/api';

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

category:
 z.string()
 .optional(),

  brand:
   z.string()
   .optional(),
  
  customcategory:
   z.string()
   .optional(),
  
  custombrand:
   z.string()
   .optional(),
  
  condition:
   z.enum(["new", "used", "refurbished"])
   .optional(),
  
  province:
   z.string()
   .optional(),
  
  town: z.string()
  .optional(),
  
  customLocation:
   z.string()
  .optional(),
  
  address:
   z.string()
   .optional(),




})

function List() {

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
    shouldUnregister: false,
  });



const onSubmit = async (data) => {
  console.log(data);

  try{
    const response = await apiClient.post("create-listing/", data);
   
    console.log("Successfully created listing", response.data);

   }
   catch (error){
    const msg = error.response?.data?.detail ||
    "Make sure you have entered all the necessary information.";
   
    setError("root", {message: msg});
   }
  }



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
    ADD MACHINE
  </h1>

  {/* Machine Name */}
  <input
    {...register("title")}
    className="border p-2 rounded"
    type="text"
    placeholder="Machine Name"
    autoComplete="off"
  />
  {errors.title && (
    <div className="text-red-500">{errors.title.message}</div>
  )}

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

  {/* Price */}
  <Controller
        name="price"
        control={control}
        rules={{ required: 'Price is required', min: { value: 0.01, message: 'Price must be greater than 0' } }}
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            id="price"
            placeholder="PGK0.00"
            prefix="PGK"
            decimalsLimit={2}
            value={value} // RHF value
             onValueChange={(val) => {
        onChange(val ? Number(val) : undefined);
      }
            }
            className= "border p-2 rounded"
          />
        )}
      />
  {errors.price && (
    <div className="text-red-500">{errors.price.message}</div>
  )}


{/* Image */}
  <label>Add Image</label>
   <input type="file" id="file-input" name="ImageStyle"/>


{/* Category */}
<select
  {...register("category")}
  className="border p-2 rounded"
>
  <option value="">Select Category</option>
  {Object.keys(machinebrand).map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
  <option value="Other">Other </option>
</select>
{errors.category && (
  <div className="text-red-500">{errors.category.message}</div>
)}


{/* Brands */}
{watch("category") && watch("category") !== "Other" && (
  <select
    {...register("brand")}
    className="border p-2 rounded"
  >
    <option value="">Select Brand</option>
    {machinebrand[watch("category")]?.map((brand) => (
      <option key={brand} value={brand}>
        {brand}
      </option>
    ))}
    <option value="Other">Other (Brand)</option>
  </select>
)}

{errors.brand && (
  <div className="text-red-500">{errors.brand.message}</div>
)}

{/* Custom Category Input */}
{(watch("category") === "Other") && (
  <input
    {...register("customcategory")}
    type="text"
    className="border p-2 rounded"
    placeholder="Enter your category"
    autoComplete="off"
  />
)}

{/* Custom Brand Input */}
{(watch("brand") === "Other") && (
  <input
    {...register("custombrand")}
    type="text"
    className="border p-2 rounded"
    placeholder="Enter your custom brand"
    autoComplete="off"
  />
)}





  {/* Condition */}
  <select
    {...register("condition")}
    className="border p-2 rounded "
  >
    <option value="">Select Condition</option>
    <option value="new">New</option>
    <option value="used">Used</option>
    <option value="refurbished">Refurbished</option>
  </select>
  {errors.condition && (
    <div className="text-red-500">{errors.condition.message}</div>
  )}

  {/* Location */}
  <h2 className="font-bold text-xl py-2">Current Location of Machine</h2>


{/* Province */}
<select
  {...register("province")}
  className="border p-2 rounded"
>
  <option value="">Select Province</option>
  {Object.keys(pngLocations).map((province) => (
    <option key={province} value={province}>
      {province}
    </option>
  ))}
</select>
{errors.province && (
  <div className="text-red-500">{errors.province.message}</div>
)}

{/* Town / City */}
{watch("province") && watch("province") !== "Other" && (
  <select
    {...register("town")}
    className="border p-2 rounded"
  >
    <option value="">Select Town / City</option>
    {pngLocations[watch("province")]?.map((town) => (
      <option key={town} value={town}>
        {town}
      </option>
    ))}
    <option value="Other">Other (Village)</option>
  </select>
)}

{errors.town && (
  <div className="text-red-500">{errors.town.message}</div>
)}

{/* Custom Village Input */}
{ watch("town") === "Other" && (
  <input
    {...register("customLocation")}
    type="text"
    className="border p-2 rounded"
    placeholder="Enter village / custom location"
    autoComplete="off"
  />
)}

{errors.customLocation && (
  <div className="text-red-500">
    {errors.customLocation.message}
  </div>
)}

{/* Address */}
  <input
    {...register("address")}
    className="border p-2 rounded"
    type="text"
    placeholder="Address"
    autoComplete="off"
  />
  {errors.category && (
    <div className="text-red-500">{errors.address.message}</div>
  )}




  {/* Submit Button */}
  <button
    disabled={isSubmitting}
    className="bg-blue-900 text-white p-2 rounded mt-2 disabled:opacity-50"
  >
    {isSubmitting ? "Submitting..." : "Submit"}
  </button>

  {errors.root && (
    <div className="text-red-500">{errors.root.message}</div>
  )}
</form>


  </div>

 
</div>
</div>
  )
}
export default List;
