import React from 'react';
import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Box } from '@mui/system';
import { Field, useFormikContext } from 'formik';

const NumberFieldComponent: React.FC<{ field: IDynamicFieldData }> = ({ field }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow only numbers and a single decimal point
    value = value.replace(/[^0-9.]/g, ''); // Remove all characters except digits and '.'
    
    // Ensure only one decimal point is allowed
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1]; // Keep only the first decimal part
    }

    // Restrict to max length if provided
    if (field.max && value.length > field.max) {
      value = value.slice(0, field.max);
    }

    // Update the input value
    e.target.value = value;

    // Update Formik state
    formik.setFieldValue(field.fieldName, value);
  };

  return (
    <Box className="field">
      <Field
        name={field.fieldName}
        id={field.fieldName}
        value={formik.values[field.fieldName] || ''}
        type="text" // Use text type to customize input behavior
        placeholder={field.label || field.placeHolder}
        disabled={field?.disabled}
        className={isError ? `error_border ${field.className}` : `${field.className} input_border`}
        onInput={handleInput}
        style={{
          appearance: 'textfield', // Remove browser default number input styles
          MozAppearance: 'textfield',
          WebkitAppearance: 'textfield',
        }}
      />
      {field.icon}
    </Box>
  );
};

export default NumberFieldComponent;
