# DBSketch

**DBSketch** is a visual tool for designing and prototyping relational database schemas directly in your browser. It allows you to create tables, define columns and types, set primary keys, and visually establish relationships between tables with an intuitive drag-and-drop interface.

## Features

- **Visual Table Creation:** Add, move, resize, and rename tables on a canvas.
- **Column Management:** Add, edit, and remove columns; set data types and primary keys.
- **Relationship Designer:** Create and manage relationships (1:1, 1:N, N:N) between tables visually.
- **Sidebar Editing:** Edit table and relationship properties from a contextual sidebar.
- **Modern UI:** Responsive and clean interface built with React and Vite.
- **Export (coming soon):** Export your schema for use in other tools or as SQL.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components/` – UI components (Canvas, TableCard, Sidebar, Toolbar, etc.)
- `src/context/DatabaseContext.jsx` – State management for tables and relationships
- `src/App.jsx` – Main application layout

## Technologies

- **React** (UI)
- **Vite** (build tool)
- **ESLint** (code quality)
- **CSS** (styling)

## License

MIT
