import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Box } from '@mui/system';
import { Field, useFormikContext } from 'formik';

const FieldComponent: React.FC<{ field: IDynamicFieldData }> = ({ field }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];
  return (
    <Box className="field">
      <Field
        className={isError ? `error_border ${field.className}` : `${field.className} input_border`}
        value={formik.values[field.fieldName] || ''}
        name={field.fieldName}
        id={field.fieldName}
        type={field.inputType}
        placeholder={field.label || field.placeHolder}
        maxLength={field.inputType === 'number' ? field.max : undefined}
        onInput={(e: { target: { value: string } }) => {
          if (e.target.value.length > 10 && field.inputType === 'number') {
            e.target.value = e.target.value.slice(0, field.max);
          }
        }}
        disabled={field?.disabled}
        InputProps={{
          sx: {
            height: '10px',
            fontSize: '14px',
            padding: '0 0px'
          }
        }}
        style={{
          appearance: field.inputType === 'number' ? 'textfield' : undefined,
          MozAppearance: field.inputType === 'number' ? 'textfield' : undefined,
          WebkitAppearance: field.inputType === 'number' ? 'textfield' : undefined
        }}
      />
      {field.icon}
    </Box>
  );
};

export default FieldComponent;
