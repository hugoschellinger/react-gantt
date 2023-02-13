<<<<<<< Updated upstream:src/index.tsx
export {Gantt} from "./components/gantt/gantt";
export { ViewMode } from "./types/public-types";
export type {
  GanttProps,
  ITask,
  TaskType
} from "./types/public-types";
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> Stashed changes:src/index.js
