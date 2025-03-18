import { Box } from '@mui/system';
import { DynamicFormProps } from '@shared/interfaces/IGlobalProviderProps';
import { Field } from 'formik';

const TimeComponent: React.FC<DynamicFormProps> = ({ field }) => {
  return (
    <Box className="field">
      <Field
        name={field.fieldName}
        className={field.className}
        type={field.inputType}
        placeholder={field.label}
        disabled={field?.disabled}
      />
    </Box>
  );
};

export default TimeComponent;
