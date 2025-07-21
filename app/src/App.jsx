import React, { useContext } from 'react';
import './App.scss';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import { GlobalContext } from './context/GlobalContextProvider';

export default function App() {
  const { theme } = useContext(GlobalContext);
  return (
    <div className={`app-root${theme === 'dark' ? ' dark' : ''}`}>
      <div className="main-content">
        <Toolbar />
        <Canvas />
      </div>
      <Sidebar />
    </div>
  );
}
