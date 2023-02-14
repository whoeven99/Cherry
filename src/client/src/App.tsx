import React from 'react';
import './App.css';
import {NavigationBar} from "./component/NavigationBar";
import {EditorView} from "./component/EditorView";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <EditorView />
    </div>
  );
}

export default App;
