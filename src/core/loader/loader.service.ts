import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import SimpleBackdrop from './components/loader';

let root: Root | null = null;

const Loader = (status: boolean) => {
  const toastRoot = document.getElementById('loader-root');
  if (!toastRoot) {
    return;
  }

  if (!root) {
    root = createRoot(toastRoot);
  }

  const toastElement = React.createElement(SimpleBackdrop, { status });
  root.render(toastElement);
};

export default Loader;
