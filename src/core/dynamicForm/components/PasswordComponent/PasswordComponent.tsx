import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DynamicFormProps } from '@shared/interfaces/IGlobalProviderProps';
import { Field, useFormikContext } from 'formik';
import { useState } from 'react';
import { CiLock } from 'react-icons/ci';
import { LuEye, LuEyeOff } from 'react-icons/lu';

const PasswordComponent: React.FC<DynamicFormProps> = ({ field }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const handleTogglePassword = () => {
    setTogglePassword((prevState) => !prevState);
  };

  return (
    <Box className="field">
      <Field
        name={field.fieldName}
        className={isError ? `error_border ${field.className}` : `${field.className}`}
        type={!togglePassword ? field.inputType : 'text'}
        placeholder={field.label || field.placeHolder}
        disabled={field?.disabled}
      />
      <CiLock className="icon" />
      <Button onClick={handleTogglePassword} className="togglePassword" type="button">
        {!togglePassword ? <LuEyeOff /> : <LuEye />}
      </Button>
    </Box>
  );
};

export default PasswordComponent;