import React, { Suspense } from 'react';
import './App.css';
import { NavigationBar } from './component/NavigationBar';
import { EditorView } from './component/EditorView';

import './i18n';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <NavigationBar />
      <EditorView />
    </div>
  );
};

export default function WrappedApp (): JSX.Element {
  return <Suspense fallback="... is loading">
    <App/>
  </Suspense>;
};
