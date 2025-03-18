import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Box } from '@mui/system';
import { DynamicFormProps } from '@shared/interfaces/IGlobalProviderProps';
import { Field, useFormikContext } from 'formik';

const TextareaComponent: React.FC<DynamicFormProps> = ({ field }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];
  return (
    <Box className="field">
      <Field
        as="textarea"
        className={isError ? `error_border ${field.className}` : `${field.className}`}
        rows={field.rows || 3}
        name={field.fieldName}
        disabled={field?.disabled}
      />
    </Box>
  );
};

export default TextareaComponent;
