import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';

const PriceInputForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    // Define default values if necessary
    defaultValues: {
      price: undefined, // It's often better to start with undefined or null for price inputs
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data); // The 'price' will be a clean number/string (e.g., "1234.56")
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="price">Price (PGK):</label>
      <Controller
        name="price"
        control={control}
        rules={{ required: 'Price is required', min: { value: 0.01, message: 'Price must be greater than 0' } }}
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            id="price"
            placeholder="K0.00"
            prefix="K"
            decimalsLimit={2}
            value={value} // RHF value
            onValueChange={(value) => {
              onChange(value); // Update RHF value
            }}
            className={errors.price ? 'input-error' : ''}
          />
        )}
      />
      {errors.price && <p style={{ color: 'red' }}>{errors.price.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default PriceInputForm;
