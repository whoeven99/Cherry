import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { initializeIcons } from '@fluentui/react';
import WrappedApp from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

initializeIcons();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WrappedApp />
    </Provider>
  </React.StrictMode>
);
