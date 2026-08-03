import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';

function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description) return alert('Please fill in all fields');
    addProduct({ name, price, description });
    navigate('/products');
  };

  return (
    <div className="page-wrapper">
      <Navbar title="New Product" showAddBtn={false} />

      <ProductForm
        name={name} setName={setName}
        price={price} setPrice={setPrice}
        description={description} setDescription={setDescription}
        handleSubmit={handleSubmit} buttonText="Create Product"
      />

      <div className="nav-footer">
        <Link to="/products" className="btn-secondary">Go Back</Link>
      </div>
    </div>
  );
}

export default CreateProduct;