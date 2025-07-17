import React, { useRef, useEffect } from 'react';
import TableCard from './TableCard';
import RelationLayer from './RelationLayer';
import './Canvas.css';
import { useDatabase } from '../context/DatabaseContext.jsx';

export default function Canvas() {
  const {
    tables, relations, dragRel, selected,
    handleSelectTable, handleSelectRelation, handleTableMove, handleTableResize, startDragRel, cancelDragRel, completeDragRel
  } = useDatabase();
  const canvasRef = useRef();

  // ESC per annullare dragRel
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') cancelDragRel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cancelDragRel]);

  return (
    <div className="canvas" ref={canvasRef}>
      <RelationLayer />
      {tables.map(table => (
        <TableCard
          key={table.id}
          table={table}
          selected={selected && selected.type === 'table' && selected.id === table.id}
        />
      ))}
    </div>
  );
} 