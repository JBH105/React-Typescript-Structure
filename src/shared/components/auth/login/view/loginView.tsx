import { Formik, Form } from 'formik';
import { ILogin, LoginViewProps } from '../interfaces/IAuth';
import { APP_CONSTANTS } from '@shared/constant/app.constant';
import Logo from '@assets/images/nav-logo.png';
import { Box, FormControl } from '@mui/material';
import SelectComponent from '@core/dynamicForm/components/SelectComponent/SelectComponent';
import FieldComponent from '@core/dynamicForm/components/TextComponent/FieldComponent';
import { loginValidationSchema } from '../validation/loginValidation';

const initialValues: ILogin = {
  id: '',
  roleId: '',
  email: '',
  password: '',
  accountId: '',
  username: '',
  role: { name: '' },
  authId: '',
  token: ''
};
const LoginView = ({ roleOption, handleSubmit }: LoginViewProps) => {
  return (
    <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue, errors }) => (
        <Form>
          <div className="min-h-screen w-full flex items-center justify-center login-container">
            <div className="login-card">
              <div className="login-logo-wrapper">
                <img src={Logo} alt="Toms" className="login-logo" />
              </div>

              <div className="login-content">
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle">To continue your account!</p>

                <div className="login-form">
                  <div className="login-form-group">
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <label htmlFor="roleId" className="login-label">Role</label>
                        <SelectComponent field={{ fieldName: 'roleId', required: true, options: roleOption }} setFieldValue={setFieldValue} />
                      </FormControl>
                    </Box>
                  </div>

                  <div className="login-form-group">
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <label htmlFor="email" className="login-label">Email</label>
                        <FieldComponent field={{ fieldName: 'email', required: true }} />
                      </FormControl>
                    </Box>
                  </div>

                  <div className="login-form-group">
                    <Box>
                      <FormControl sx={{ width: '100%' }}>
                        <label htmlFor="password" className="login-label">Password</label>
                        <FieldComponent field={{ fieldName: 'password', required: true, inputType: 'password' }} />
                      </FormControl>
                    </Box>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      type="button"
                      className="login-button-cancel"
                      onClick={() => {
                        setFieldValue('roleId', '');
                        setFieldValue('email', '');
                        setFieldValue('password', '');
                      }}
                    >
                      {APP_CONSTANTS.CANCEL_BUTTON}
                    </button>

                    <button type="submit" className="login-button-submit" disabled={Object.keys(errors).length > 0}>
                      {APP_CONSTANTS.LOGIN_BUTTON}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginView;
