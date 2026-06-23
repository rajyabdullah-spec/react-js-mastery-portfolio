import React from 'react';
import QuoteCard from './components/QuoteCard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quote Generator</h1>
      </header>
      <main className="app-main">
        <QuoteCard />
      </main>
    </div>
  );
}

export default App;