import { Box } from '@mui/system';
import { selectComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { Field } from 'formik';

const RadioComponent: React.FC<selectComponentProps> = ({ field, name, setFieldValue }) => {
  return (
    <div className="radio-btn-wrapper">
      <Box role="group" className="flex gap-6" aria-labelledby={name}>
        {field.options?.map((option) => (
          <label key={option.value} className="radio-btn">
            <Field type="radio" name={name} value={option.value} disabled={field?.disabled}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue!(name!, e.target.value)}
            />
            {option.label}
          </label>
        ))}
      </Box>
    </div>
  );
};

export default RadioComponent;
