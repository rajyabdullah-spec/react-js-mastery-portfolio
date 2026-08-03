import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch initial products from Fake Store API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        // Mapping FakeStore API fields to wireframe naming
        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.price,
        }));
        setProducts(mappedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // 2. Add product (Create)
  const addProduct = (newProduct) => {
    const createdItem = {
      id: Date.now(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
    };
    setProducts((prev) => [createdItem, ...prev]);
  };

  // 3. Update product (Edit)
  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === parseInt(id) || item.id === id
          ? { ...item, ...updatedData, price: parseFloat(updatedData.price) }
          : item
      )
    );
  };

  // 4. Delete product (Destroy)
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== parseInt(id) && item.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};