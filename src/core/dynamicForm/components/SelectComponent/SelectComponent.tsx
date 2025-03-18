import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { selectComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { useFormikContext } from 'formik';
import { useState } from 'react';

const SelectComponent: React.FC<selectComponentProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();

  const [selectValue, setSelectValue] = useState<string>('selected');

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue!(field.fieldName, event.target.value);
    setSelectValue(event.target.value);
  };

  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];
  return (
    <Box className="field">
      <FormControl sx={{ width: '100%', backgroundColor: 'white' }}>
        {!field?.avatar ? (
          <Select
            className={isError ? `error_border ${field.className}` : `${field.className}`}
            name={field.fieldName}
            value={formik.values[field.fieldName] as string}
            onChange={handleChange}
            disabled={field?.disabled}
            sx={{
              fontSize: '14px !important'
            }}
          >
            <MenuItem disabled value="selected" sx={{ fontSize: '14px' }}>
              Select {field.label}
            </MenuItem>
            {field.options?.map((item, index) => (
              <MenuItem key={index} value={item.value} sx={{ fontSize: '14px' }}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            labelId="custom-select-label"
            className={isError ? `error_border ${field.className}` : `${field.className}`}
            value={(formik.values[field.fieldName] as string) || selectValue}
            onChange={handleChange}
            sx={{
              fontSize: '14px !important'
            }}
          >
            {field.options?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={option.avatar ?? ''} alt="" style={{ width: 30, height: 30, marginRight: 10, borderRadius: '100%' }} />
                  {option.label}
                </div>
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
      {field.icon}
    </Box>
  );
};

export default SelectComponent;
