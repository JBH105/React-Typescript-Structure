import './index.scss';

import { GlobalProvider } from '@shared/context/GlobalContext/index.tsx';
import store from '@store/app.store.ts';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GlobalProvider>
    <ToastContainer />
      <App />
    </GlobalProvider>
  </Provider>
);
