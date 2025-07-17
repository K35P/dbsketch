import React, { useState } from 'react';
import './Toolbar.css';
import { useDatabase } from '../context/DatabaseContext.jsx';

function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown-label" onClick={() => setOpen(v => !v)}>{label}</button>
      {open && <div className="dropdown-menu">{children}</div>}
    </div>
  );
}

export default function Toolbar() {
  const { addTable, openAddRelation } = useDatabase();
  return (
    <header className="toolbar">
      <div className="toolbar-menus">
        <Dropdown label="File">
          <div className="dropdown-item">New</div>
          <div className="dropdown-item">Open...</div>
          <div className="dropdown-item">Save</div>
          <div className="dropdown-item">Export</div>
        </Dropdown>
        <Dropdown label="Edit">
          <div className="dropdown-item">Undo</div>
          <div className="dropdown-item">Redo</div>
        </Dropdown>
        <Dropdown label="Relations">
          <div className="dropdown-item" onClick={openAddRelation}>Add relation</div>
          <div className="dropdown-item">Manage relations</div>
        </Dropdown>
        <Dropdown label="Help">
          <div className="dropdown-item">Guide</div>
          <div className="dropdown-item">About</div>
        </Dropdown>
      </div>
      <div className="toolbar-title">DBSketch</div>
      <div className="toolbar-actions">
        <button onClick={addTable} title="New table">+ Table</button>
        <button disabled title="Export (coming soon)">Export</button>
      </div>
    </header>
  );
} 