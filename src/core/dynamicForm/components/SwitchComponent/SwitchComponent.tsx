import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Box } from '@mui/material';
import { selectComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { useFormikContext } from 'formik';

const SwitchComponent: React.FC<selectComponentProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setFieldValue!(field.fieldName, newValue);
  };

  return (
    <Box className="field switch_field">
      <Box sx={{ padding: '15px 0' }}>
        <label className="inline-flex items-center cursor-pointer">
          <input
            name={field.fieldName}
            type="checkbox"
            checked={formik.values[field.fieldName] as boolean}
            onChange={handleChange}
            className="sr-only peer"
            disabled={field?.disabled}
          />
          <div className="relative w-[60px] h-6 bg-[#E4E4E4] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[35px] peer-checked:after:bg-[#fff] rtl:peer-checked:after:-translate-x-[35px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#9e9e9e] after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00B894]"></div>
        </label>
      </Box>
    </Box>
  );
};

export default SwitchComponent;
