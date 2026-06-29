import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TimelineProvider } from './context/TimelineContext'; // استيراد المزوّد

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimelineProvider>
      <App />
    </TimelineProvider>
  </React.StrictMode>
);