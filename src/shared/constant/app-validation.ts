export const VALIDATION = {
  regex: {
    text: /^[a-zA-Z\s]*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    mobile: /^\d{10}$/,
    textWithChar: /^[a-zA-Z\s@#&$!%*?.,'-]+$/
  },
  PASSWORD_VALIDATION: 'Password must be at least 8 characters long, contain at least one letter and one number',
  CONFIRM_PASSWORD: 'Passwords do not match',
  EMAIL: 'Invalid email address'
};
