import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { Box, Checkbox, Chip, FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { DynamicFormProps } from '@shared/interfaces/IGlobalProviderProps';
import { IdNameType } from '@shared/types/app.type';
import { useFormikContext } from 'formik';
import React from 'react';

const MultiSelect: React.FC<DynamicFormProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];

  const fieldValue: IdNameType[] = Array.isArray(formik.values[field.fieldName]) ? (formik.values[field.fieldName] as IdNameType[]) : [];

  return (
    <Box className="field">
      <FormControl sx={{ width: '100%' }}>
        <Select
          className={isError ? `error_border ${field.className}` : `${field.className}`}
          multiple
          name={field.fieldName}
          input={<OutlinedInput id="select-multiple-chip" />}
          value={fieldValue.map((item) => item.id)}
          onChange={(event) => {
            const selectedOptions = event.target.value as string[];

            const selectedValues = selectedOptions.map((selectedValue) => {
              const selectedOption = field.options?.find((option) => option.value === selectedValue);
              return { id: selectedOption?.value || selectedValue, name: selectedOption?.label || selectedValue };
            });

            setFieldValue && setFieldValue(field.fieldName, selectedValues);
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5, alignItems: 'center', height: '100%', overflow: 'auto' }}>
              {(selected as string[]).map((value) => {
                const selectedOption = field.options?.find((option) => option.value === value);
                return <Chip key={value} label={selectedOption?.label || value} sx={{ fontSize: '13px' }} />;
              })}
            </Box>
          )}
          disabled={field?.disabled}
        >
          {field.options?.map((item) => (
            <MenuItem key={item.value} value={item.value} disabled={item.disabled ? true : false} sx={{ fontSize: '14px' }}>
              {field?.selectWithCheckbox && (
                <Checkbox
                  size="small"
                  checked={fieldValue.some((selected) => selected.id === item.value)}
                  sx={{
                    color: '#00B894',
                    '&.Mui-checked': {
                      color: '#00B894'
                    }
                  }}
                />
              )}
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {field.icon}
    </Box>
  );
};

export default MultiSelect;
