import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    roleId: Yup.string().required('Role is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });