import React from 'react';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import './App.css';

export default function App() {
  return (
    <div className="app-root">
      <Toolbar />
      <div className="main-layout">
        <Canvas />
        <Sidebar />
      </div>
    </div>
  );
}
