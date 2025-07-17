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
          <div className="dropdown-item">Nuovo</div>
          <div className="dropdown-item">Apri...</div>
          <div className="dropdown-item">Salva</div>
          <div className="dropdown-item">Esporta</div>
        </Dropdown>
        <Dropdown label="Modifica">
          <div className="dropdown-item">Annulla</div>
          <div className="dropdown-item">Ripristina</div>
        </Dropdown>
        <Dropdown label="Relazioni">
          <div className="dropdown-item" onClick={openAddRelation}>Aggiungi relazione</div>
          <div className="dropdown-item">Gestisci relazioni</div>
        </Dropdown>
        <Dropdown label="Aiuto">
          <div className="dropdown-item">Guida</div>
          <div className="dropdown-item">Info</div>
        </Dropdown>
      </div>
      <div className="toolbar-title">DBSketch</div>
      <div className="toolbar-actions">
        <button onClick={addTable} title="Nuova tabella">+ Tabella</button>
        <button disabled title="Esporta (coming soon)">Esporta</button>
      </div>
    </header>
  );
} 