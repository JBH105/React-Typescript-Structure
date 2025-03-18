import PageNotFound from '@shared/components/common/PageNotFound';
import { Route, Routes } from 'react-router-dom';

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
