import { VALIDATION } from '@shared/constant/app-validation';

import { IDynamicFieldData, ValueType } from '../interfaces/DynamicForm';

export const FormValidation = {
  validateForm: (fields: IDynamicFieldData[], values: Record<string, ValueType | ValueType[]>) => {
    const errors: Record<string, string | Record<number, Record<string, string>>> = {};

    fields.forEach((field) => {
      const value = values[field.fieldName];

      if (field.required && !value) {
        errors[field.fieldName] = `${field.label || field.placeHolder} is required`;
      }

      if (field.min && typeof value === 'string' && value.length < field.min) {
        errors[field.fieldName] = `${field.label} must be at least ${field.min} characters`;
      }

      if (field.max && typeof value === 'string' && value.length > field.max) {
        errors[field.fieldName] = `${field.label} must be at most ${field.max} characters`;
      }

      if (field.regex && typeof value === 'string') {
        const regex = field.regex as RegExp;
        if (!regex.test(value)) {
          errors[field.fieldName] = `${field.label} is invalid`;
        }
      }
      //  TO DO -- uncomment this line
      // Specific field validations
      // if (field.fieldName === 'password') {
      //   const passwordRegex = VALIDATION.regex.password;
      //   if (!passwordRegex.test(value as string)) {
      //     errors[field.fieldName] = VALIDATION.PASSWORD_VALIDATION;
      //   }
      // }

      if (field.fieldName === 'confirmPassword') {
        if (values['password'] !== value) {
          errors[field.fieldName] = VALIDATION.CONFIRM_PASSWORD;
        }
      }

      if (field.fieldName === 'mobileNo' && field.inputType === 'number') {
        const mobileRegex = VALIDATION.regex.mobile;
        if (!mobileRegex.test(value as string)) {
          errors[field.fieldName] = `Enter 10 digit ${field.label}`;
        }
      }

      if (field.inputType === 'email') {
        const emailRegex = VALIDATION.regex.email;
        if (!emailRegex.test(value as string)) {
          errors[field.fieldName] = VALIDATION.EMAIL;
        }
      }

      if (field.inputType === 'multiSelect' && field.required && (!value || (value as unknown as string[]).length === 0)) {
        errors[field.fieldName] = `Please select at least one ${field.label}`;
      }

      if (field.inputType === 'array' && Array.isArray(value)) {
        const arrayErrors: Record<number, Record<string, string>> = {};
        value.forEach((item, index) => {
          const itemErrors: Record<string, string> = {};
          if (field.fields) {
            field.fields.forEach((subField) => {
              const subValue = (item as Record<string, ValueType>)[subField.fieldName];

              if (subField.required && !subValue) {
                itemErrors[subField.fieldName] = `${subField.label || subField.placeHolder} is required`;
              }

              if (subField.regex && typeof subValue === 'string') {
                const regex = subField.regex as RegExp;
                if (!regex.test(subValue)) {
                  itemErrors[subField.fieldName] = `${subField.label} is invalid`;
                }
              }
            });
          }
          if (Object.keys(itemErrors).length > 0) {
            arrayErrors[index] = itemErrors;
          }
        });
        if (Object.keys(arrayErrors).length > 0) {
          errors[field.fieldName] = arrayErrors; // Store structured errors for array fields
        }
      }
    });

    return errors;
  }
};
