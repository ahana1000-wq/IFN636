import React from 'react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Handmade Bee Embroidery',
      price: 29.99,
      image: '/images/product1.jpg'
    },
    {
      id: 2,
      name: 'Handmade Flower Embroidery',
      price: 19.99,
      image: '/images/product2.jpg'
    }
  ];



  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Our Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded p-5"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded mb-4"
            />

            <h2 className="text-xl font-bold mb-2">
              {product.name}
            </h2>

            <p className="text-xl font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white p-3 rounded"
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Home;