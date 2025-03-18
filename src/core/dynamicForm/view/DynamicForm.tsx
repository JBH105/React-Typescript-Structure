import DateComponent from '@core/dynamicForm/components/DateComponent/DateComponent';
import FileComponent from '@core/dynamicForm/components/FileComponent/FileComponent';
import ImageComponent from '@core/dynamicForm/components/ImageComponent/ImageComponent';
import MultiSelect from '@core/dynamicForm/components/MultiSelect/MultiSelect';
import PasswordComponent from '@core/dynamicForm/components/PasswordComponent/PasswordComponent';
import RadioComponent from '@core/dynamicForm/components/RadioComponent/RadioComponent';
import SelectComponent from '@core/dynamicForm/components/SelectComponent/SelectComponent';
import SwitchComponent from '@core/dynamicForm/components/SwitchComponent/SwitchComponent';
import FieldComponent from '@core/dynamicForm/components/TextComponent/FieldComponent';
import TextareaComponent from '@core/dynamicForm/components/TextareaComponent/TextareaComponent';
import TimeComponent from '@core/dynamicForm/components/TimeComponent/TimeComponent';
import { IDynamicFieldData, ValueType } from '@core/dynamicForm/interfaces/DynamicForm';
import { FormValidation } from '@core/dynamicForm/validation/form.validation';
import { Box, Button, FormHelperText } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { ReactNode } from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import AutoSelectComponent from '../components/AutoSelectComponent/AutoSelectComponent';
import Checkbox from '../components/Checkbox/checkbox';
import ColorComponent from '../components/ColorComponent/colorComponent';
import DropImageComponent from '../components/DropImageComponent/ImageComponent';
import HTMLCode from '../components/JoiEditor/HtmlCode';
import ImageCrop from '../components/Image-crop/Image-crop';
import MultiFileUpload from '../components/MultiFileUpload/MultiFileUpload';
import DropVideoComponent from '../components/DropVideoComponent/VideoComponent';
import DropFileComponent from '../components/DropFileComponent/DropFileComponent';
import DateRangePickerComponent from '../components/DateRangePickerComponent/DateRangePickerComponent';
import MultiSelectWithSearch from '../components/MultiSelectWithSearch/MultiSelectWithSearch';
import NumberFieldComponent from '../components/NumberFieldComponent/NumberFieldComponent';
import { SetFieldValueFunction } from '@shared/interfaces/IGlobalProviderProps';

interface DynamicFormProps<T> {
  fields?: IDynamicFieldData[];
  onClick: (value: object) => void;
  onChange?: (values: T, setFieldValue: SetFieldValueFunction) => void;
  onCancel: () => void;
  // fieldValue?: Record<string, ValueType> | undefined;
  fieldValue?: any;
  resetFieldValue?: ((data: T | null | undefined) => void) | undefined;
  children?: ReactNode;
  buttonTexts?: { cancel: string; submit: string };
  isReset?: boolean;
  fieldsToReset?: string[];
  childFormErrors?: object;
  error?: string | null;
  isButtonDisabled?: boolean;
}

const DynamicForm = <T extends object>({
  fields = [],
  onClick,
  onCancel,
  fieldValue,
  resetFieldValue,
  children,
  onChange,
  buttonTexts = { cancel: 'Cancel', submit: 'Submit' },
  isReset = true,
  fieldsToReset,
  childFormErrors = {},
  error,
  isButtonDisabled = false
}: DynamicFormProps<T>) => {
  const initialValues = React.useMemo(() => {
    const defaultValues: Record<string, ValueType | ValueType[]> = {};

    const setDefaultValues = (field: IDynamicFieldData) => {
      if (field.inputType === 'array' && field.fields) {
        
        defaultValues[field.fieldName] = field.defaultValue ?? [
          field.fields.reduce(
            (acc, nestedField) => {
              acc[nestedField.fieldName] = nestedField.defaultValue ?? '';
              return acc;
            },
            {} as Record<string, ValueType>
          )
        ];
      } else if (field.inputType === 'multiFileUpload') {
        defaultValues[field.fieldName] = field.defaultValue ?? [{}];
      } else {
        defaultValues[field.fieldName] = field.defaultValue ?? '';
      }
    };

    if (fieldValue) {
      fields.forEach((field: IDynamicFieldData) => {
        if (field.fieldName in fieldValue) {
          defaultValues[field.fieldName] = fieldValue[field.fieldName] ?? field.defaultValue ?? '';
        } else {
          setDefaultValues(field);
        }
      });
    } else {
      fields.forEach(setDefaultValues);
    }

    return defaultValues;
  }, [fields, fieldValue]);

  const checkRequiredFields = (values: any) => {
    return fields.some((field) => {
      if (field.required && !values[field.fieldName]) {
        return true;
      }
      return false;
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm, setFieldValue }) => {
        onClick(values);
        // setSubmitting(false);
        if (isReset) resetForm();
        if (resetFieldValue) {
          resetFieldValue(undefined);
        }
        if (fieldsToReset) {
          fieldsToReset.forEach((fieldName) => {
            setFieldValue(fieldName, initialValues[fieldName] || '');
          });
        }
      }}
      validate={(values) => FormValidation.validateForm(fields, values)}
    >
      {({ handleSubmit, setFieldValue, resetForm, values, errors }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
          return onChange && onChange(values as T, setFieldValue);
        }, [values, initialValues]);

        const hasErrors =
          Object.keys(errors).length > 0 || Object.keys(childFormErrors).length > 0 || checkRequiredFields(values) || isButtonDisabled;

        return (
          <Form onSubmit={handleSubmit}>
            <Box className="loginFieldsWrapper">
              {fields.map((field: IDynamicFieldData) => (
                <Box key={field.fieldName} className={field.fieldOuter}>
                  <label htmlFor={field.fieldName} className="field_name">
                    {field.label}
                  </label>
                  {renderField(field, setFieldValue, values)}

                  <FormHelperText error>
                    <ErrorMessage name={field.fieldName} component="div" className="error">
                      {(msg) => (typeof msg === 'object' ? Object.values(msg).map((_, idx) => <div key={idx}></div>) : msg)}
                    </ErrorMessage>
                  </FormHelperText>

                  {/* <FormHelperText error>
                    <ErrorMessage name={field.fieldName} component="div" className="error" />
                  </FormHelperText> */}
                </Box>
              ))}
            </Box>
            {children}
            <FormHelperText error>{error}</FormHelperText>
            <Box className="form_btn_outer">
              <Button
                type="button"
                className="cancel_btn"
                onClick={() => {
                  onCancel();
                  resetForm();
                  if (resetFieldValue) {
                    resetFieldValue(undefined);
                  }
                }}
              >
                {buttonTexts.cancel === 'Previous' ? <FaArrowLeft /> : <FaXmark />}
                {buttonTexts?.cancel}
              </Button>
              <Button type="submit" className="submit_btn" disabled={hasErrors || isButtonDisabled}>
                <FaCheck />
                {buttonTexts?.submit}
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export const renderField = (
  field: IDynamicFieldData,
  setFieldValue: (field: string, value: Dayjs | object | string[] | boolean | string | File | null | undefined) => void,
  values?: any
) => {
  switch (field.inputType) {
   
    case 'text':
    case 'email':
      return <FieldComponent field={field} />;
    case 'number':
      return <NumberFieldComponent field={field} />;
    case 'select':
      return <SelectComponent field={field} setFieldValue={setFieldValue} />;
    case 'autoSelect':
      return <AutoSelectComponent field={field} setFieldValue={setFieldValue} />;
    case 'date':
      return <DateComponent field={field} setFieldValue={setFieldValue} />;
    case 'radio':
      return <RadioComponent field={field} name={field.fieldName} setFieldValue={setFieldValue} />;
    case 'image':
      return <ImageComponent field={field} setFieldValue={setFieldValue} />;
    case 'file':
      return <FileComponent field={field} setFieldValue={setFieldValue} />;
    case 'textarea':
      return <TextareaComponent field={field} />;
    case 'password':
      return <PasswordComponent field={field} />;
    case 'multiSelect':
      return <MultiSelect field={field} setFieldValue={setFieldValue} />;
    case 'multiSelectWithSearch':
      return <MultiSelectWithSearch field={field} setFieldValue={setFieldValue} />;
    case 'switch':
      return <SwitchComponent field={field} setFieldValue={setFieldValue} />;
    case 'joiEditor':
      return <HTMLCode field={field} setFieldValue={setFieldValue} />;
    case 'time':
      return <TimeComponent field={field} />;
    case 'checkbox':
      return <Checkbox field={field} setFieldValue={setFieldValue} />;
    case 'dropImage':
      return <DropImageComponent field={field} setFieldValue={setFieldValue} />;
    case 'cropImage':
      return <ImageCrop field={field} setFieldValue={setFieldValue} />;
    case 'colorbox':
      return <ColorComponent field={field} setFieldValue={setFieldValue} />;
    case 'multiFileUpload':
      return <MultiFileUpload field={field} setFieldValue={setFieldValue} value={values} />;
    case 'dropVideo':
      return <DropVideoComponent field={field} setFieldValue={setFieldValue} value={values} />;
    case 'dropFile':
      return <DropFileComponent field={field} setFieldValue={setFieldValue} value={values} />;
    case 'dateRangePicker':
      return <DateRangePickerComponent field={field} setFieldValue={setFieldValue} />;
    default:
      return null;
  }
};

export default DynamicForm;
