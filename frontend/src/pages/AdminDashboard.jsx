import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        'http://localhost:5001/api/orders',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:5001/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded p-5 mb-5"
        >

          <h2 className="text-xl font-bold">
            Order #{order._id}
          </h2>

          <p>
            Customer: {order.user?.name}
          </p>

          <p>
            Email: {order.user?.email}
          </p>

          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mt-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>

            </div>
          ))}

          <p className="font-bold mt-4">
            Total: ${order.totalPrice.toFixed(2)}
          </p>

          <p>
            Status: {order.status}
          </p>

          {order.status === 'Pending' && (
            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  updateStatus(order._id, 'Accepted')
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, 'Rejected')
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>

            </div>
          )}

        </div>
      ))}

    </div>
  );
};

export default AdminDashboard;