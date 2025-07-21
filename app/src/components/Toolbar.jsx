import React from 'react';
import Button from '@mui/material/Button';
import StorageIcon from '@mui/icons-material/Storage';

export default function Toolbar() {
  return (
    <header className="toolbar flex items-center gap-4">
      <span className='flex items-center'>
        <StorageIcon fontSize='small' className='text-blue-600' />
        <h1 className="text-xl font-bold text-blue-600">DBSketch</h1>
      </span>
      <Button>Test</Button>
    </header>
  );
} 