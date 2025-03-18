// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { IDynamicFieldData, SelectOption } from '@core/dynamicForm/interfaces/DynamicForm';
import { Autocomplete, Box, Checkbox, Chip, FormControl, TextField } from '@mui/material';
import { IdNameType } from '@shared/types/app.type';
import { useFormikContext } from 'formik';
import React, { useMemo, useState, useCallback } from 'react';

const MultiSelectWithSearch: React.FC<{
  field: any;
  setFieldValue: (field: string, value: any) => void;
}> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const [inputValue, setInputValue] = useState('');

  const selectedValues = useMemo(() => {
    const formValues = formik.values[field.fieldName] as IdNameType[];
    return Array.isArray(formValues) ? formValues.map((item) => ({ label: item.name, value: item.id })) : [];
  }, [formik.values, field.fieldName]);

  const handleChange = (_: React.SyntheticEvent, value: SelectOption[]) => {
    const formattedData: IdNameType[] = value.map((option) => ({
      id: option.value || '',
      name: option.label || ''
    }));
    setFieldValue(field.fieldName, formattedData);
  };

  const handleInputChange = useCallback((_: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
  }, []);

  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
        <Autocomplete
          multiple
          limitTags={1}
          options={field.options ?? []}
          getOptionLabel={(option) => option.label || ''}
          value={selectedValues}
          onChange={handleChange}
          disableCloseOnSelect
          inputValue={inputValue}
          onInputChange={handleInputChange}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => <Chip {...getTagProps({ index })} key={option.value} label={option.label} />)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder={field.placeholder || 'Select options'}
              sx={{
                '& .MuiOutlinedInput-root': {
                  padding: '0 !important',
                  paddingLeft: '10px !important',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                },
                '& .MuiInputBase-input': {
                  height: '25px',
                  padding: '16x !important',
                  outline: 'none !important',
                  '@media (max-width: 1280px)': {
                    height: '22px'
                  }
                }
              }}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.value} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
              <Checkbox
                checked={selected}
                disableCloseOnSelect
                size="small"
                sx={{
                  color: '#00B894',
                  '&.Mui-checked': {
                    color: '#00B894'
                  }
                }}
              />
              {option?.avatar && (
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
        />
      </FormControl>
      {field.icon}
    </Box>
  );
};

export default MultiSelectWithSearch;
