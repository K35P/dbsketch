# DBSketch

**DBSketch** is a visual tool for designing and prototyping relational database schemas directly in your browser. It allows you to create tables, define columns and types, set primary keys, and visually establish relationships between tables with an intuitive drag-and-drop interface.

⚠️ Note: This project is a work in progress. Some features may be incomplete or subject to change.

<img width="1237" height="824" alt="Screenshot 2025-07-17 alle 17 40 38" src="https://github.com/user-attachments/assets/e2ba7ce1-8dc5-41a7-bc6a-e1e83d9ae5fb" />

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

## Technologies

- **React** (UI)
- **Vite** (build tool)
- **ESLint** (code quality)
- **CSS** (styling)
