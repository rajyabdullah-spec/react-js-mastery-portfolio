import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ title, showAddBtn }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {showAddBtn && (
        <Link to="/products/new" className="btn-primary">
          + Add product
        </Link>
      )}
    </div>
  );
}

export default Navbar;