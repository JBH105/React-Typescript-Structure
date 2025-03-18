import PageNotFound from '@shared/components/common/PageNotFound';
import { Route, Routes } from 'react-router-dom';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
