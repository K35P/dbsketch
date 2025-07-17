import React from 'react';
import './Sidebar.css';
import { useDatabase } from '../context/DatabaseContext.jsx';

const REL_TYPES = [
  { value: '1:1', label: 'One to One' },
  { value: '1:N', label: 'One to Many' },
  { value: 'N:N', label: 'Many to Many' },
];

export default function Sidebar() {
  const {
    selected, selectedTable: table, relationWithNames: relation,
    handleTableNameChange, handleColumnNameChange, handleTypeChange, handleSetPK,
    handleAddColumn, handleRemoveColumn, handleRelationTypeChange, handleDeleteRelation, handleAddRelationFromSidebar
  } = useDatabase();

  if (!selected) {
    return (
      <aside className="sidebar">
        <div className="sidebar-title">Properties</div>
        <div className="sidebar-content">
          <div style={{color:'#888'}}>Select a table or relation</div>
        </div>
      </aside>
    );
  }
  if (selected.type === 'relation' && relation) {
    return (
      <aside className="sidebar">
        <div className="sidebar-title">Relation</div>
        <div className="sidebar-content">
          <div style={{marginBottom:12}}>
            <b>Linked columns:</b><br/>
            <span style={{color:'#2563eb'}}>{relation.fromTableName}.{relation.fromColName}</span>
            {' '}→{' '}
            <span style={{color:'#2563eb'}}>{relation.toTableName}.{relation.toColName}</span>
          </div>
          <div style={{marginBottom:12}}>
            <b>Relation type:</b><br/>
            <select className="sidebar-select" value={relation.type} onChange={e => handleRelationTypeChange(relation.id, e.target.value)}>
              {REL_TYPES.map(rt => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
            </select>
          </div>
          <button className="sidebar-btn" onClick={() => handleDeleteRelation(relation.id)} style={{color:'#ef4444',marginTop:12}}>Delete relation</button>
        </div>
      </aside>
    );
  }
  if (selected.type === 'table' && table) {
    // Stato per la creazione relazione (solo UI temporanea)
    const [relStep, setRelStep] = React.useState(0);
    const [destTableId, setDestTableId] = React.useState(null);
    const [fromColIdx, setFromColIdx] = React.useState(null);
    const [toColIdx, setToColIdx] = React.useState(null);
    const { tables, addRelation } = useDatabase();

    const resetRel = () => {
      setRelStep(0);
      setDestTableId(null);
      setFromColIdx(null);
      setToColIdx(null);
    };

    const handleStartRel = () => {
      setRelStep(1);
    };
    const handleSelectDestTable = (id) => {
      setDestTableId(id);
      setRelStep(2);
    };
    const handleSelectFromCol = (idx) => {
      setFromColIdx(idx);
      setRelStep(3);
    };
    const handleSelectToCol = (idx) => {
      setToColIdx(idx);
      setRelStep(4);
    };
    const handleConfirmRel = () => {
      if (destTableId != null && fromColIdx != null && toColIdx != null) {
        addRelation({
          from: { tableId: table.id, colIdx: fromColIdx },
          to: { tableId: destTableId, colIdx: toColIdx },
          type: '1:N'
        });
        resetRel();
      }
    };
    return (
      <aside className="sidebar">
        <div className="sidebar-title">Table: <input className="sidebar-input" value={table.name} onChange={e => handleTableNameChange(table.id, e.target.value)} style={{fontWeight:'bold',fontSize:'1.1em',border:'none',background:'transparent',outline:'none'}} /></div>
        <div className="sidebar-content">
          <div style={{fontWeight:'bold',marginBottom:8}}>Columns</div>
          {table.columns.map((col, idx) => (
            <div key={idx} style={{display:'flex',alignItems:'center',gap:6,marginBottom:3,fontSize:'0.97em'}}>
              <input className="sidebar-input" value={col.name} onChange={e => handleColumnNameChange(table.id, idx, e.target.value)} style={{flex:1,minWidth:50,maxWidth:100}} />
              <select className="sidebar-select" value={col.type} onChange={e => handleTypeChange(table.id, idx, e.target.value)} style={{minWidth:50}}>
                {['string','int','float','bool','date','text','uuid'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <label style={{display:'flex',alignItems:'center',gap:2,fontSize:'0.93em'}}>
                <input type="checkbox" checked={!!col.pk} onChange={() => handleSetPK(table.id, idx)} /> PK
              </label>
              <button className="sidebar-btn" onClick={() => handleRemoveColumn(table.id, idx)} title="Remove column" style={{color:'#ef4444',border:'none',background:'none',fontSize:'1.1em',cursor:'pointer'}}>✕</button>
            </div>
          ))}
          <button className="sidebar-btn" onClick={() => handleAddColumn(table.id)} style={{marginTop:8}}>+ Column</button>
          {/* Add relation button */}
          <div style={{marginTop:18}}>
            <button className="sidebar-btn" onClick={handleStartRel} style={{background:'#2563eb',color:'#fff',fontWeight:'bold'}}>+ Add relation</button>
          </div>
          {/* Relation creation stepper */}
          {relStep > 0 && (
            <div style={{marginTop:14,background:'#f3f4f6',padding:10,borderRadius:8}}>
              <div style={{fontWeight:'bold',marginBottom:6}}>New relation</div>
              {relStep === 1 && (
                <>
                  <div>1. Select destination table:</div>
                  <select className="sidebar-select" value={destTableId||''} onChange={e => handleSelectDestTable(Number(e.target.value))}>
                    <option value="">-- Choose table --</option>
                    {tables.filter(t=>t.id!==table.id).map(t=>(
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <div style={{marginTop:8}}><button className="sidebar-btn" onClick={resetRel}>Cancel</button></div>
                </>
              )}
              {relStep === 2 && (
                <>
                  <div>2. Select source column:</div>
                  <select className="sidebar-select" value={fromColIdx||''} onChange={e => handleSelectFromCol(Number(e.target.value))}>
                    <option value="">-- Choose column --</option>
                    {table.columns.map((col,idx)=>(
                      <option key={idx} value={idx}>{col.name}</option>
                    ))}
                  </select>
                  <div style={{marginTop:8}}><button className="sidebar-btn" onClick={resetRel}>Cancel</button></div>
                </>
              )}
              {relStep === 3 && (
                <>
                  <div>3. Select destination column:</div>
                  <select className="sidebar-select" value={toColIdx||''} onChange={e => handleSelectToCol(Number(e.target.value))}>
                    <option value="">-- Choose column --</option>
                    {tables.find(t=>t.id===destTableId)?.columns.map((col,idx)=>(
                      <option key={idx} value={idx}>{col.name}</option>
                    ))}
                  </select>
                  <div style={{marginTop:8}}><button className="sidebar-btn" onClick={resetRel}>Cancel</button></div>
                </>
              )}
              {relStep === 4 && (
                <>
                  <div>4. Confirm relation:</div>
                  <div style={{margin:'8px 0'}}>
                    <b>{table.name}.{table.columns[fromColIdx]?.name}</b> → <b>{tables.find(t=>t.id===destTableId)?.name}.{tables.find(t=>t.id===destTableId)?.columns[toColIdx]?.name}</b>
                  </div>
                  <button className="sidebar-btn" onClick={handleConfirmRel} style={{background:'#2563eb',color:'#fff',fontWeight:'bold'}}>Create relation</button>
                  <button className="sidebar-btn" onClick={resetRel} style={{marginLeft:8}}>Cancel</button>
                </>
              )}
            </div>
          )}
        </div>
      </aside>
    );
  }
  return null;
} 