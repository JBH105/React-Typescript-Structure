export type ControlType =
  | 'text'
  | 'select'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'image'
  | 'textarea'
  | 'date'
  | 'password'
  | 'submit'
  | 'multiSelect'
  | 'time'
  | 'file'
  | 'switch'
  | 'email'
  | 'joiEditor'
  | 'multiSelectWithAvatar'
  | 'colorbox'
  | 'dropImage'
  | 'autoSelect'
  | 'cropImage'
  | 'multiSelectWithCheckBox'
  | 'array'
  | 'multiFileUpload'
  | 'dropVideo'
  | 'dropFile'
  | 'radioButton'
  | 'dateRangePicker'
  | 'multiSelectWithSearch';

export interface SelectOptionType {
  label?: string | React.ReactNode;
  value?: string;
  avatar?: string | undefined | null;
  category?: string;
  disabled?: boolean;
}
export interface IDynamicFieldData {
  label?: string;
  inputType?: ControlType;
  fieldName: string;
  defaultValue?: string | number | boolean;
  options?: SelectOptionType[];
  required?: boolean;
  avatar?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  icon?: JSX.Element;
  className?: string;
  fieldOuter?: string;
  [key: string]: KeyType;
  value?: string;
  disabled?: boolean;
  spanName?: string;
  placeHolder?: string;
  regex?: RegExp;
  fields?: IDynamicFieldData[];
  selectWithCheckbox?: boolean;
  hideFieldArrayIcon?: boolean;
  FileType?: string;
}

export type KeyType = string | number | ControlType | SelectOptionType[] | boolean | undefined | JSX.Element | RegExp | IDynamicFieldData[];

export type ValueType = string | number | boolean | object;
