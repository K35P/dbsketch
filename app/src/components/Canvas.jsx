import React, { useState, useRef } from 'react';
import FloatingToolbar from './FloatingToolbar';

export default function Canvas() {
  const [mode, setMode] = useState('cursor'); // cursor | hand | zoom
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Gestione movimento mouse per toolbar flottante
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (mode === 'hand' && dragging.current) {
      setPosition(pos => ({
        x: pos.x + (e.movementX),
        y: pos.y + (e.movementY)
      }));
    }
  };

  const handleMouseDown = (e) => {
    if (mode === 'hand' && e.button === 0) {
      dragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleWheel = (e) => {
    if (mode === 'zoom') {
      e.preventDefault();
      setScale(s => Math.max(0.2, Math.min(3, s - e.deltaY * 0.001)));
    }
  };

  // Zoom tramite toolbar
  const zoomIn = () => setScale(s => Math.min(3, s + 0.1));
  const zoomOut = () => setScale(s => Math.max(0.2, s - 0.1));

  return (
    <main
      className="canvas"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ position: 'relative', overflow: 'hidden', userSelect: mode === 'hand' ? 'none' : 'auto' }}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          width: '100%',
          height: '100%',
          transition: dragging.current ? 'none' : 'transform 0.1s',
          pointerEvents: 'auto',
        }}
      >
        {/* Qui andranno gli elementi del canvas */}
      </div>
      <FloatingToolbar
        mode={mode}
        setMode={setMode}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
    </main>
  );
} 