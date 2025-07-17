import React, { createContext, useContext, useState, useMemo } from 'react';

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [relations, setRelations] = useState([]);
  // Rimuovo dragRel, setDragRel, startDragRel, cancelDragRel, completeDragRel.
  // Aggiungo stato: relazioneInCreazione, setRelazioneInCreazione.
  // Aggiungo funzione per avviare la creazione relazione (startAddRelation), aggiornare step (updateAddRelationStep), annullare (cancelAddRelation), completare (completeAddRelation).
  const [selected, setSelected] = useState(null); // {type: 'table'|'relation', id}

  // CRUD tabelle (come prima)
  const addTable = () => {
    const name = `Table${tables.length + 1}`;
    setTables([
      ...tables,
      {
        id: Date.now(),
        name,
        x: 100 + Math.random() * 400,
        y: 100 + Math.random() * 200,
        width: 240,
        height: 120,
        columns: [ { name: 'id', type: 'int' } ]
      }
    ]);
  };
  const handleTableMove = (id, x, y) => {
    setTables(tables => tables.map(t => t.id === id ? { ...t, x, y } : t));
  };
  const handleTableResize = (id, width, height) => {
    setTables(tables => tables.map(t => t.id === id ? { ...t, width, height } : t));
  };
  const handleTableNameChange = (id, value) => {
    setTables(tables => tables.map(t => t.id === id ? { ...t, name: value } : t));
  };
  const handleColumnNameChange = (tableId, colIdx, value) => {
    setTables(tables => tables.map(t => {
      if (t.id !== tableId) return t;
      const columns = t.columns.map((col, i) => i === colIdx ? { ...col, name: value } : col);
      return { ...t, columns };
    }));
  };
  const handleTypeChange = (tableId, colIdx, value) => {
    setTables(tables => tables.map(t => {
      if (t.id !== tableId) return t;
      const columns = t.columns.map((col, i) => i === colIdx ? { ...col, type: value } : col);
      return { ...t, columns };
    }));
  };
  const handleSetPK = (tableId, colIdx) => {
    setTables(tables => tables.map(t => {
      if (t.id !== tableId) return t;
      const columns = t.columns.map((col, i) => ({ ...col, pk: i === colIdx }));
      return { ...t, columns };
    }));
  };
  const handleAddColumn = (tableId) => {
    setTables(tables => tables.map(t =>
      t.id === tableId ? { ...t, columns: [...t.columns, { name: `col${t.columns.length + 1}`, type: 'string' }] } : t
    ));
  };
  const handleRemoveColumn = (tableId, colIdx) => {
    setTables(tables => tables.map(t => {
      if (t.id !== tableId) return t;
      const columns = t.columns.filter((_, i) => i !== colIdx);
      return { ...t, columns };
    }));
  };

  // Relazioni
  const addRelation = ({ from, to, type = '1:N' }) => {
    setRelations(rels => [
      ...rels,
      {
        id: Date.now(),
        from,
        to,
        type
      }
    ]);
  };
  const handleRelationTypeChange = (relId, type) => {
    setRelations(rels => rels.map(r => r.id === relId ? { ...r, type } : r));
  };
  const handleDeleteRelation = (relId) => {
    setRelations(rels => rels.filter(r => r.id !== relId));
    setSelected(null);
  };

  // Modalità drag-to-connect
  // Rimuovo dragRel, setDragRel, startDragRel, cancelDragRel, completeDragRel.
  // Aggiungo stato: relazioneInCreazione, setRelazioneInCreazione.
  // Aggiungo funzione per avviare la creazione relazione (startAddRelation), aggiornare step (updateAddRelationStep), annullare (cancelAddRelation), completare (completeAddRelation).

  // Selezione
  const handleSelectTable = (id) => setSelected({ type: 'table', id });
  const handleSelectRelation = (id) => setSelected({ type: 'relation', id });

  // Relazione selezionata arricchita
  const selectedRelation = selected && selected.type === 'relation' ? relations.find(r => r.id === selected.id) : null;
  const relationWithNames = selectedRelation && (() => {
    const fromTable = tables.find(t => t.id === selectedRelation.from.tableId);
    const toTable = tables.find(t => t.id === selectedRelation.to.tableId);
    return {
      ...selectedRelation,
      fromTableName: fromTable?.name || '',
      fromColName: fromTable?.columns[selectedRelation.from.colIdx]?.name || '',
      toTableName: toTable?.name || '',
      toColName: toTable?.columns[selectedRelation.to.colIdx]?.name || ''
    };
  })();
  const selectedTable = selected && selected.type === 'table' ? tables.find(t => t.id === selected.id) : null;

  const value = useMemo(() => ({
    tables, setTables,
    relations, setRelations,
    selected, setSelected,
    addTable,
    handleTableMove, handleTableResize,
    handleTableNameChange, handleColumnNameChange, handleTypeChange, handleSetPK,
    handleAddColumn, handleRemoveColumn,
    addRelation,
    handleRelationTypeChange, handleDeleteRelation,
    handleSelectTable, handleSelectRelation,
    selectedRelation, relationWithNames, selectedTable
  }), [tables, relations, selected]);

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  return useContext(DatabaseContext);
} 