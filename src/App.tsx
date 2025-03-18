import AppRoutes from 'routes/AppRoutes';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfirmDialogProvider } from '@shared/components/confirmModal/view/confirmDialogProvider';

function App() {
  return (
    <>
      <Router>
        <ConfirmDialogProvider>
            <AppRoutes />
        </ConfirmDialogProvider>
      </Router>
    </>
  );
}

export default App;
