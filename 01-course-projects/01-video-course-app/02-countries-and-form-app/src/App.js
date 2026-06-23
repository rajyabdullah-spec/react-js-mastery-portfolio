import React from 'react';
import Countries from './components/Countries';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Countries /> 

      <hr className="section-divider" />

      <UserForm />
    </div>
  );
}

export default App;