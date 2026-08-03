import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ShowProduct from './pages/ShowProduct';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/show/:id" element={<ShowProduct />} />
        <Route path="/products/new" element={<CreateProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;