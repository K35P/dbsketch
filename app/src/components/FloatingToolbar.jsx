import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import MouseIcon from '@mui/icons-material/Mouse';

export default function FloatingToolbar({ mode, setMode, zoomIn, zoomOut }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        top: 16,
        zIndex: 10,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        padding: 4,
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        pointerEvents: 'auto',
      }}
    >
      <Tooltip title="Seleziona (Cursore)"><IconButton color={mode==='cursor'?'primary':'default'} onClick={()=>setMode('cursor')} size="small"><MouseIcon /></IconButton></Tooltip>
      <Tooltip title="Mano (Drag sfondo)"><IconButton color={mode==='hand'?'primary':'default'} onClick={()=>setMode('hand')} size="small"><PanToolAltIcon /></IconButton></Tooltip>
      <Tooltip title="Zoom">
        <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color={mode==='zoom'?'primary':'default'} onClick={()=>setMode('zoom')} size="small"><ZoomInIcon /></IconButton>
          {mode==='zoom' && <>
            <IconButton onClick={zoomIn} size="small"><ZoomInIcon fontSize="small" /></IconButton>
            <IconButton onClick={zoomOut} size="small"><ZoomOutIcon fontSize="small" /></IconButton>
          </>}
        </span>
      </Tooltip>
    </div>
  );
} 