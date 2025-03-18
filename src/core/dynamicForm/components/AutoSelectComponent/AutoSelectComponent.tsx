import { IDynamicFieldData, SelectOptionType } from '@core/dynamicForm/interfaces/DynamicForm';
import { Autocomplete, Box, FormControl, TextField } from '@mui/material';
import { selectComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import { useFormikContext } from 'formik';
import { useState } from 'react';

const AutoSelectComponent: React.FC<selectComponentProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);

  const handleChange = (_: React.SyntheticEvent, value: SelectOptionType | null) => {
    setFieldValue!(field.fieldName, value ? value.value : '');
    setSelectedOption(value);
  };

  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
        <Autocomplete
          options={field.options ?? []}
          value={field.options?.find((option) => option.value === formik.values[field.fieldName]) || null}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  padding: '0 !important',
                  paddingLeft: '10px !important',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                },
                '& .MuiInputBase-input': {
                  height: '12px !important',
                  padding: '14px !important',
                  outline: 'none !important',
                  fontSize: '14px !important',
                  '@media (max-width: 1280px)': {
                    padding: '12px !important',
                    height: '12px'
                  }
                }
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: selectedOption?.avatar ? (
                  <img
                    src={selectedOption.avatar}
                    alt="avatar"
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 10,
                      borderRadius: '50%'
                    }}
                  />
                ) : null
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
              {option.avatar && (
                <img
                  src={option.avatar}
                  alt="avatar"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    borderRadius: '50%'
                  }}
                />
              )}
              {option.label}
            </li>
          )}
          disabled={field.disabled}
        />
      </FormControl>
      {field.icon}
    </Box>
  );
};

export default AutoSelectComponent;
