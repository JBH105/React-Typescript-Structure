import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/app.store';
import { APP_ROUTE } from '@shared/constant/app-route';

const PrivateRoute = () => {
  const [state, setState] = useState('loading');
  const isUserLogged = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        if (isUserLogged) {
          setState('loggedin');
        } else {
          setState('redirect');
        }
      } catch {
        setState('redirect');
      }
    })();
  }, [dispatch, isUserLogged]);

  if (state === 'loading') {
    return <div className="appLoader">Loading....</div>;
  }

  return state === 'loggedin' ? <Outlet /> : <Navigate to={APP_ROUTE.LOGIN} />;
};

export default PrivateRoute;
