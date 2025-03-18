import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import Toast from './components/react-toastify';

let root: Root | null = null;

const showToast = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  const toastRoot = document.getElementById('toast-root');
  if (!toastRoot) {
    return;
  }

  if (!root) {
    root = createRoot(toastRoot);
  }

  const toastElement = React.createElement(Toast, { message: `${message}@@${Math.random()}`, severity });

  root.render(toastElement);
};

export default showToast;
