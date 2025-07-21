import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { GlobalContext } from '../context/GlobalContextProvider';
import StorageIcon from '@mui/icons-material/Storage';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Toolbar() {
  const { theme, setTheme } = useContext(GlobalContext);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="toolbar flex items-center place-content-between gap-4">
      <span className='flex items-center'>
        <StorageIcon fontSize='small' className='text-blue-600' />
        <h1 className="text-xl font-bold text-blue-600">DBSketch</h1>
      </span>
      <Button onClick={toggleTheme} title="Toggle dark mode">
        {theme === 'dark' ? <SunnyIcon /> : <DarkModeIcon />}
      </Button>
    </header>
  );
} 