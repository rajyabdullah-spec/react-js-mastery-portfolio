import React from 'react';

function ProductForm({ name, setName, price, setPrice, description, setDescription, handleSubmit, buttonText }) {
  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;