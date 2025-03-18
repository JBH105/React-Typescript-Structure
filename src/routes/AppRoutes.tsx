import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginContainer from '@shared/components/auth/login/container/login.container';
import { APP_ROUTE } from '@shared/constant/app-route';
import { APP_CONSTANTS } from '@shared/constant/app.constant';
import useProcessQueue from '@shared/hooks/useProcessQueue';
import CheckRoleRoute from '@shared/utils/checkRoleRoute';
import PrivateRoute from '@shared/utils/privateRoute';
import SuperAdminRoutes from '@shared/components/Routes/superAdminRoutes';
import SuperVisorRoutes from '@shared/components/Routes/supervisorRoutes';
import TeacherRoutes from '@shared/components/Routes/teacherRoutes';
import StudentRoutes from '@shared/components/Routes/studentRoutes';
import Sidebar from '@shared/components/layout/components/sidebar';

function AppRoutes() {
  const { processQueue } = useProcessQueue();

  useEffect(() => {
    const handleOnline = () => {
      processQueue();
    };
    handleOnline();
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [processQueue]);

  return (
    <Routes>
      <Route path={APP_ROUTE.LOGIN} element={<LoginContainer />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route element={<Sidebar />}>
          <Route path={APP_ROUTE.SUPERVISORS} element={<CheckRoleRoute checkFor={APP_CONSTANTS.ROLE_NAME.SUPERVISOR} />}>
            <Route path="*" element={<SuperVisorRoutes />} />
          </Route>
          <Route path={APP_ROUTE.SUPER_ADMINS} element={<CheckRoleRoute checkFor={APP_CONSTANTS.ROLE_NAME.SUPERADMIN} />}>
            <Route path="*" element={<SuperAdminRoutes />} />
          </Route>
          <Route path={APP_ROUTE.TEACHERS} element={<CheckRoleRoute checkFor={APP_CONSTANTS.ROLE_NAME.TEACHER} />}>
            <Route path="*" element={<TeacherRoutes />} />
          </Route>
          <Route path={APP_ROUTE.STUDENTS} element={<CheckRoleRoute checkFor={APP_CONSTANTS.ROLE_NAME.STUDENT} />}>
            <Route path="*" element={<StudentRoutes />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
