import SimpleBackdrop from '@core/loader/components/loader';
import { ILogin } from '@shared/components/auth/login/interfaces/IAuth';
import { APP_ROUTE } from '@shared/constant/app-route';
import { RootState } from '@store/app.store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface CheckRoleRouteProps {
  checkFor: string;
}

const CheckRoleRoute: React.FC<CheckRoleRouteProps> = ({ checkFor }) => {
  const [state, setState] = useState('loading');
  const [loader, setLoader] = useState<boolean>(false);
  const isUserLogged = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    if ((isUserLogged as unknown as ILogin)?.role?.name === checkFor) {
      setState('loggedin');
    } else {
      setState('redirect');
    }
  }, [checkFor, isUserLogged]);

  useEffect(() => {
    if (state === 'loading') {
      return setLoader(true);
    }
    setLoader(false);
  }, [state]);

  if (state === 'loading') {
    return (
      <div>
        <SimpleBackdrop status={loader} />
      </div>
    );
  }

  return state === 'loggedin' ? <Outlet /> : <Navigate to={APP_ROUTE.LOGIN} />;
};

export default CheckRoleRoute;
