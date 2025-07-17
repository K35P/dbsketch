import React from 'react';
import { useDatabase } from '../context/DatabaseContext.jsx';

export default function RelationLayer() {
  const { tables, relations, dragRel } = useDatabase();
  // Usa coordinate in pixel
  const getColAnchor = (table, colIdx, side = 'left') => {
    const x = table.x;
    const y = table.y;
    const w = table.width;
    const headerH = 28;
    const rowH = 22;
    let px = side === 'right' ? x + w : x;
    return { x: px, y: y + headerH + rowH * colIdx + rowH / 2 };
  };
  // Calcola il centro della card
  const getTableCenter = (table) => ({
    x: table.x + table.width / 2,
    y: table.y + table.height / 2
  });
  // Calcola il punto di partenza/arrivo appena fuori dal bordo della card, su tutti i lati
  const getColEdge = (table, colIdx, side = 'left') => {
    const x = table.x;
    const y = table.y;
    const w = table.width;
    const h = table.height;
    const headerH = 28;
    const rowH = 22;
    let px = x, py = y + headerH + rowH * colIdx + rowH / 2;
    if (side === 'right') px = x + w + 4;
    if (side === 'left') px = x - 4;
    if (side === 'top') {
      px = x + w / 2;
      py = y - 4;
    }
    if (side === 'bottom') {
      px = x + w / 2;
      py = y + h + 4;
    }
    return { x: px, y: py };
  };
  // Path elbow intelligente: orizzontale o verticale
  function getElbowPath(from, to, sideFrom, sideTo) {
    if ((sideFrom === 'left' || sideFrom === 'right') && (sideTo === 'left' || sideTo === 'right')) {
      // elbow orizzontale
      const midX = sideFrom === 'right'
        ? from.x + Math.max(32, (to.x - from.x) / 2)
        : from.x - Math.max(32, (from.x - to.x) / 2);
      return [
        `M${from.x},${from.y}`,
        `L${midX},${from.y}`,
        `L${midX},${to.y}`,
        `L${to.x},${to.y}`
      ].join(' ');
    } else if ((sideFrom === 'top' || sideFrom === 'bottom') && (sideTo === 'top' || sideTo === 'bottom')) {
      // elbow verticale
      const midY = sideFrom === 'bottom'
        ? from.y + Math.max(32, (to.y - from.y) / 2)
        : from.y - Math.max(32, (from.y - to.y) / 2);
      return [
        `M${from.x},${from.y}`,
        `L${from.x},${midY}`,
        `L${to.x},${midY}`,
        `L${to.x},${to.y}`
      ].join(' ');
    } else {
      // elbow misto
      return [
        `M${from.x},${from.y}`,
        `L${from.x},${to.y}`,
        `L${to.x},${to.y}`
      ].join(' ');
    }
  }
  // Scegli il lato migliore in base alla posizione relativa
  function chooseSides(fromTable, toTable) {
    const fromCenter = getTableCenter(fromTable);
    const toCenter = getTableCenter(toTable);
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      // Più distanti orizzontalmente
      return [dx > 0 ? 'right' : 'left', dx > 0 ? 'left' : 'right'];
    } else {
      // Più distanti verticalmente
      return [dy > 0 ? 'bottom' : 'top', dy > 0 ? 'top' : 'bottom'];
    }
  }
  return (
    <svg className="svg-rel" width={window.innerWidth} height={window.innerHeight - 56} style={{ position: 'absolute', left: 0, top: 0, zIndex: 0, pointerEvents: 'none' }}>
      {relations.map((rel, i) => {
        const fromTable = tables.find(t => t.id === rel.from.tableId);
        const toTable = tables.find(t => t.id === rel.to.tableId);
        if (!fromTable || !toTable) return null;
        const [sideFrom, sideTo] = chooseSides(fromTable, toTable);
        const from = getColEdge(fromTable, rel.from.colIdx, sideFrom);
        const to = getColEdge(toTable, rel.to.colIdx, sideTo);
        return (
          <path
            key={i}
            d={getElbowPath(from, to, sideFrom, sideTo)}
            stroke="#2563eb"
            strokeWidth={2.2}
            fill="none"
            markerEnd="url(#arrow)"
            opacity={0.85}
          />
        );
      })}
      {/* Arrow marker */}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,4 L0,8" fill="#2563eb" />
        </marker>
      </defs>
      {/* Linea drag in corso */}
      {dragRel && (() => {
        const fromTable = tables.find(t => t.id === dragRel.from.tableId);
        if (!fromTable) return null;
        const fromX = fromTable.x;
        const toX = dragRel.mouse.x;
        const sideFrom = fromX < toX ? 'right' : 'left';
        const from = getColEdge(fromTable, dragRel.from.colIdx, sideFrom);
        const fromAnchor = getColAnchor(fromTable, dragRel.from.colIdx, sideFrom);
        const to = dragRel.mouse;
        let minDist = 99999, sideTo = 'left', toAnchor = to;
        tables.forEach(table => {
          table.columns.forEach((col, idx) => {
            const pos = getColEdge(table, idx);
            const anchor = getColAnchor(table, idx);
            const dist = Math.abs(pos.y - to.y) + Math.abs(pos.x - to.x);
            if (dist < minDist) {
              minDist = dist;
              sideTo = pos.x < to.x ? 'right' : 'left';
              toAnchor = anchor;
            }
          });
        });
        return (
          <path
            d={getElbowPath(from, to, sideFrom, sideTo)}
            stroke="#2563eb"
            strokeWidth={2.2}
            fill="none"
            opacity={0.5}
            style={{ pointerEvents: 'none' }}
          />
        );
      })()}
    </svg>
  );
} 