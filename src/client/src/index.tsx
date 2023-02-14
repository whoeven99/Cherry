import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { initializeIcons } from '@fluentui/react';
import WrappedApp from './App';

initializeIcons();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
