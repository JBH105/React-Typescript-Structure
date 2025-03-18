import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';

export const fields: IDynamicFieldData[] = [
  {
    fieldName: 'name',
    inputType: 'text',
    label: 'Name',
    defaultValue: '',
    required: true,
    min: 5,
    max: 10
  },
  {
    fieldName: 'date',
    inputType: 'date',
    label: 'Date',
    defaultValue: '',
    required: true
  },
  {
    fieldName: 'age',
    inputType: 'number',
    label: 'Age',
    defaultValue: 18,
    required: true
  },
  {
    fieldName: 'language',
    inputType: 'select',
    label: 'Language',
    options: [
      { value: 'english', label: 'English' },
      { value: 'french', label: 'French' }
    ],
    defaultValue: 'english',
    required: true
  },
  {
    fieldName: 'address',
    inputType: 'text',
    label: 'Address',
    defaultValue: '',
    required: true
  },
  {
    fieldName: 'gender',
    inputType: 'radio',
    label: 'Gender',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ],
    defaultValue: 'male',
    required: true
  },
  {
    fieldName: 'image',
    inputType: 'image',
    label: 'Image',
    defaultValue: '',
    required: true
  },
  {
    fieldName: 'textarea',
    inputType: 'textarea',
    label: 'Textarea',
    defaultValue: '',
    required: true,
    rows: 4
  }
];
