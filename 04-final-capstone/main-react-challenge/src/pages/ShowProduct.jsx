import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Navbar from '../components/Navbar';

function ShowProduct() {
  const { id } = useParams();
  const { products, loading } = useContext(ProductContext);

  if (loading) return <div className="system-message">Loading details...</div>;

  const product = products.find(p => p.id === parseInt(id) || p.id === id);
  if (!product) return <div className="system-message">Product not found</div>;

  return (
    <div className="page-wrapper">
      <Navbar title={`Showing: ${product.name}`} showAddBtn={false} />

      <div className="details-card">
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{product.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Price:</span>
          <span className="detail-value">${parseFloat(product.price).toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Description:</span>
          <span className="detail-value">{product.description}</span>
        </div>
      </div>

      <div className="nav-footer">
        <Link to="/products" className="btn-secondary">Back to List</Link>
        <Link to={`/products/edit/${product.id}`} className="btn-secondary">Edit Product</Link>
      </div>
    </div>
  );
}

export default ShowProduct;