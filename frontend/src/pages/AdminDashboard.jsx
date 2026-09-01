import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axiosInstance.put(`/api/orders/${orderId}/status`, {
        status
      });

      fetchOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {orders.length === 0 ? (
        <p>No orders have been placed.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded p-5 mb-5"
          >
            <h2 className="text-xl font-bold mb-2">
              Order #{order._id}
            </h2>

            <p>
              Customer: {order.user?.name || 'Unknown'}
            </p>

            <p>
              Email: {order.user?.email || 'Unknown'}
            </p>

            <div className="mt-4">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 mb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p>${item.price?.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-bold mt-4">
              Total: ${order.totalPrice?.toFixed(2)}
            </p>

            <p className="mt-2">
              Status: {order.status}
            </p>

            {order.status === 'Pending' && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    updateOrderStatus(order._id, 'Accepted')
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateOrderStatus(order._id, 'Rejected')
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}

    </div>
  );
};

export default AdminDashboard;