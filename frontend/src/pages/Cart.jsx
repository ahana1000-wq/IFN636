import React from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Cart = () => {

  // 1. Get cart items from CartContext FIRST
  const { cartItems, removeFromCart } = useCart();

  // 2. Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  // 3. THEN create checkout function
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5001/api/orders',
        {
          items: cartItems,
          totalPrice: totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Order placed successfully');

    } catch (error) {
  console.error('Checkout error:', error.response?.data || error.message);

  alert(
    error.response?.data?.message ||
    `Checkout failed: ${error.message}`
  );
}
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <p>Your cart is empty.</p>

      ) : (

        <>
          {cartItems.map((item, index) => (

            <div
              key={`${item.id}-${index}`}
              className="bg-white shadow-md rounded p-4 mb-4 flex items-center gap-6"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-lg">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>

          ))}

          <div className="text-right mt-6">

            <h2 className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>

            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded mt-4"
            >
              Checkout
            </button>

          </div>
        </>

      )}

    </div>
  );
};

export default Cart;