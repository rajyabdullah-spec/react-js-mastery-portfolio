import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, updateProduct } = useContext(ProductContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const product = products.find(p => p.id === parseInt(id) || p.id === id);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setDescription(product.description || '');
    }
  }, [product]);

  if (loading) return <div className="system-message">Loading details...</div>;
  if (!product) return <div className="system-message">Product not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description) return alert('Please fill in all fields');
    updateProduct(id, { name, price, description });
    navigate('/products');
  };

  return (
    <div className="page-wrapper">
      <Navbar title={`Edit: ${product.name}`} showAddBtn={false} />

      <ProductForm
        name={name} setName={setName}
        price={price} setPrice={setPrice}
        description={description} setDescription={setDescription}
        handleSubmit={handleSubmit} buttonText="Update Product"
      />

      <div className="nav-footer">
        <Link to={`/products/show/${product.id}`} className="btn-secondary">Show</Link>
        <Link to="/products" className="btn-secondary">Back to List</Link>
      </div>
    </div>
  );
}

export default EditProduct;