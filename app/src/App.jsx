import React from 'react';
import './App.scss';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';

export default function App() {
  return (
    <div className="app-root">
      <div className="main-content">
        <Toolbar />
        <Canvas />
      </div>
      <Sidebar />
    </div>
  );
}
