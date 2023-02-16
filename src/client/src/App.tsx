import React, { Suspense } from 'react';
import './App.css';
import { NavigationBar } from './component/NavigationBar';
import { MainPageView } from './page/MainPageView';

import './i18n';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <NavigationBar />
      <MainPageView />
    </div>
  );
};

export default function WrappedApp (): JSX.Element {
  return <Suspense fallback="... is loading">
    <App/>
  </Suspense>;
};
