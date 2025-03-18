import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { useFormikContext } from 'formik';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box } from '@mui/material';
import { selectDateRangePickerProps } from '@shared/interfaces/IGlobalProviderProps';

const DateRangePickerComponent: React.FC<selectDateRangePickerProps> = ({ field, setFieldValue }) => {
  const formik = useFormikContext<IDynamicFieldData>();
  const isError = formik.touched[field.fieldName] && formik.errors[field.fieldName];
  const wrapperStyle = {
    border: isError ? '1px solid red' : '1px solid #ced4da',
    // height: '40px'
  };

  const fieldValue = (formik.values[field.fieldName] as [string | undefined, string | undefined]) || [undefined, undefined];
  const startDate = fieldValue[0] ? new Date(fieldValue[0]) : undefined;
  const endDate = fieldValue[1] ? new Date(fieldValue[1]) : undefined;

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFieldValue!(field.fieldName, [start ? start.toISOString() : undefined, end ? end.toISOString() : undefined]);
  };

  return (
    <Box>
      <div style={wrapperStyle} className="w-full rounded-lg">
        <DatePicker
          name={field.fieldName}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleChange}
          className="custom_date_range w-full"
          placeholderText="Select Date Range"
          dateFormat="dd/MM/yyyy"
          autoComplete="off"
        />
      </div>
    </Box>
  );
};

export default DateRangePickerComponent;
