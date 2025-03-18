import { APP_ROUTE } from '@shared/constant/app-route';
import { RootState } from '@store/app.store';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchRole, fetchUserPermission, loginUser } from '../store-slice/login.slice';
import { APP_CONSTANTS } from '@shared/constant/app.constant';
import { ILogin } from '../interfaces/IAuth';
import LoginView from '../view/loginView';

const LoginContainer = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
  const { data: user, loading } = useSelector((state: RootState) => state.user);
  const roles = useSelector((state: RootState) => state.role.data);
  const navigate = useNavigate();

  const handleSubmit = async (values: ILogin) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();
      if (result?.id) {
        dispatch(fetchUserPermission(result.id));
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const roleOption = useMemo(() => roles.map((data) => ({ value: data.id, label: data.name })), [roles]);

  useEffect(() => {
    dispatch(fetchRole());
  }, [dispatch]);

  useEffect(() => {
    if (user && !loading) {
      switch (user.role?.name) {
        case APP_CONSTANTS.ROLE_NAME.SUPERADMIN:
          navigate(APP_ROUTE.SUPER_ADMINS + APP_ROUTE.DASHBOARD);
          break;
        case APP_CONSTANTS.ROLE_NAME.SUPERVISOR:
          navigate(APP_ROUTE.SUPERVISORS);
          break;
        case APP_CONSTANTS.ROLE_NAME.STUDENT:
          navigate(APP_ROUTE.STUDENTS + APP_ROUTE.DASHBOARD);
          break;
        case APP_CONSTANTS.ROLE_NAME.TEACHER:
          navigate(APP_ROUTE.TEACHERS + APP_ROUTE.DASHBOARD);
          break;
      }
    }
  }, [user, loading, navigate]);
  
  return <LoginView roleOption={roleOption} handleSubmit={handleSubmit} />;
};

export default LoginContainer;
