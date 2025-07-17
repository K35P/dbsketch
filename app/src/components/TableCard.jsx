import React from 'react';
import { Rnd } from 'react-rnd';
import { useDatabase } from '../context/DatabaseContext.jsx';
import './TableCard.css';

function KeyIcon() {
  return (
    <svg className="pk-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M7.5 1a4.5 4.5 0 0 0-3.58 7.32l-3.1 3.1a1 1 0 0 0 0 1.42l1.14 1.14a1 1 0 0 0 1.42 0l.71-.7.7.7a1 1 0 0 0 1.42 0l1.14-1.14a1 1 0 0 0 0-1.42l-.7-.7.7-.7A4.5 4.5 0 1 0 7.5 1zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>
    </svg>
  );
}

export default function TableCard({ table, selected }) {
  const { handleSelectTable, handleTableMove, handleTableResize } = useDatabase();
  return (
    <Rnd
      size={{ width: table.width }}
      position={{ x: table.x, y: table.y }}
      minWidth={180}
      maxWidth={600}
      bounds="parent"
      enableResizing={{ right: true, left: true, top: false, bottom: false, topRight: false, topLeft: false, bottomRight: false, bottomLeft: false }}
      disableDragging={false}
      onClick={e => { e.stopPropagation(); handleSelectTable(table.id); }}
      onDragStop={(e, d) => handleTableMove(table.id, d.x, d.y)}
      onResizeStop={(e, dir, ref, delta, pos) => handleTableResize(table.id, ref.offsetWidth, ref.offsetHeight)}
      onDrag={(e, d) => handleTableMove(table.id, d.x, d.y)}
      onResize={(e, dir, ref, delta, pos) => handleTableResize(table.id, ref.offsetWidth, ref.offsetHeight)}
      className={`rnd-table${selected ? ' selected' : ''}`}
      style={{height: 'auto'}}
    >
      <div className="rnd-table-header">
        <input value={table.name} readOnly={!selected} />
      </div>
      <div className="rnd-table-cols">
        {table.columns.map((col, idx) => (
          <div
            key={idx}
            className={`rnd-table-col-row`}
            style={{
              background: undefined,
              cursor: undefined,
              border: undefined,
              opacity: 1
            }}
          >
            {col.pk && <KeyIcon />}
            <span className="col-name" style={{fontWeight:col.pk?'bold':'normal'}}>{col.name}</span>
            <span className="col-type">{col.type}</span>
          </div>
        ))}
      </div>
    </Rnd>
  );
} 