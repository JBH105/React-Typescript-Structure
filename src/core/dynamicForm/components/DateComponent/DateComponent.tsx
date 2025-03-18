import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { selectComponentProps } from '@shared/interfaces/IGlobalProviderProps';
import dayjs, { Dayjs } from 'dayjs';
import { useFormikContext } from 'formik';
import * as React from 'react';

const DateComponent: React.FC<selectComponentProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];
  const wrapperStyle = {
    border: isError ? '1px solid red' : '1px solid #ced4da'
  };

  const fieldValue = formik.values[field.fieldName];
  const dateValue: Dayjs | null = fieldValue && typeof fieldValue === 'string' ? dayjs(fieldValue) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <div style={wrapperStyle} className="w-full rounded-lg">
          <DatePicker
            name={field.fieldName}
            value={dateValue}
            onChange={(newValue) => setFieldValue!(field.fieldName, newValue ? newValue.toISOString() : '')}
            disableFuture={field.fieldName === 'dob'}
            sx={{
              width: '100%',
              '& .MuiInputBase-root': {
                height: '45px',
                overflow: 'hidden'
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B7B7B7',
                  borderRadius: '7px'
                }
              }
            }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateComponent;
