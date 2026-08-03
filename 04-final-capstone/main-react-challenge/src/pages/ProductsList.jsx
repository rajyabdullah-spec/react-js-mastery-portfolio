import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Navbar from '../components/Navbar';

function ProductsList() {
  const { products, loading, deleteProduct } = useContext(ProductContext);

  if (loading) return <div className="system-message">Loading products...</div>;

  return (
    <div className="page-wrapper">
      <Navbar title="Products" showAddBtn={true} />

      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>
                <div className="table-actions">
                  <Link to={`/products/show/${product.id}`} className="btn-secondary">
                    Show
                  </Link>
                  <Link to={`/products/edit/${product.id}`} className="btn-secondary">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="nav-footer">
        <Link to="/products/new" className="btn-secondary">
          Add product
        </Link>
      </div>
    </div>
  );
}

export default ProductsList;