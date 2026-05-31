import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import './userOrder.css';

const statusColor = {
  pending:      '#f0a500',
  accepted:     '#3a86ff',
  'On the way': '#8338ec',
  delivered:    '#06d6a0',
  cancel:       '#ef233c',
};

const UserOrder = () => {
  const API_URL  = import.meta.env.VITE_API_URL || 'http://localhost:5555';
  const token    = localStorage.getItem('token');

  const [orders, setOrders]       = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelling, setCancelling] = useState({});

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/order/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (e) {
      console.error('Error fetching orders:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCancel = async (orderId) => {
    const confirm = await Swal.fire({
      title: 'Cancel Order?',
      text: 'This cannot be undone if items are already on the way.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef233c',
      cancelButtonColor: '#3a86ff',
      confirmButtonText: 'Yes, cancel it',
    });
    if (!confirm.isConfirmed) return;

    try {
      setCancelling(prev => ({ ...prev, [orderId]: true }));
      await axios.delete(`${API_URL}/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({ icon: 'success', title: 'Order Cancelled', timer: 1600, showConfirmButton: false });
      fetchOrders();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Cancel',
        text: e.response?.data?.message || 'Failed to cancel order',
      });
    } finally {
      setCancelling(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const canCancel = (order) =>
    order.status === 'completed' &&
    order.vendorPayments.every(vp => !['On the way', 'delivered', 'cancel'].includes(vp.status));

  return (
    <div className="uo-page">
      <Navbar />

      <div className="uo-header">
        <h2 className="uo-title">My Orders</h2>
      </div>

      {isLoading ? (
        <div className="uo-loading">Loading your orders…</div>
      ) : orders.length === 0 ? (
        <div className="uo-empty">
          <p>No orders yet. Start shopping!</p>
        </div>
      ) : (
        <div className="uo-list">
          {orders.map(order => (
            <div key={order._id} className="uo-card">
              {/* Order meta bar */}
              <div className="uo-card-meta">
                <div className="uo-meta-item">
                  <span className="uo-meta-label">Order ID</span>
                  <span className="uo-meta-value uo-mono">{order.orderId}</span>
                </div>
                <div className="uo-meta-item">
                  <span className="uo-meta-label">Total</span>
                  <span className="uo-meta-value uo-bold">₹{order.totalAmount}</span>
                </div>
                <div className="uo-meta-item">
                  <span className="uo-meta-label">Date</span>
                  <span className="uo-meta-value">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="uo-meta-item">
                  <span className="uo-meta-label">Payment</span>
                  <span
                    className="uo-badge"
                    style={{
                      backgroundColor:
                        order.status === 'completed' ? '#06d6a0' :
                        order.status === 'failed'    ? '#ef233c' : '#f0a500',
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                {canCancel(order) && (
                  <button
                    className="uo-cancel-btn"
                    disabled={cancelling[order.orderId]}
                    onClick={() => handleCancel(order.orderId)}
                  >
                    {cancelling[order.orderId] ? 'Cancelling…' : 'Cancel Order'}
                  </button>
                )}
              </div>

              {/* Per-vendor sections */}
              {order.vendorPayments.map((vp, vpIdx) => (
                <div key={vpIdx} className="uo-vendor-section">
                  <div className="uo-vendor-header">
                    <span className="uo-vendor-name">
                      Sold by: <strong>{vp.vendorId?.name || 'Seller'}</strong>
                    </span>
                    <span
                      className="uo-delivery-badge"
                      style={{ backgroundColor: statusColor[vp.status] || '#888' }}
                    >
                      {vp.status}
                    </span>
                  </div>

                  <div className="uo-items">
                    {vp.items.map((item, idx) => (
                      <div key={item._id || idx} className="uo-item">
                        {item.productId?.images && (
                          <img
                            className="uo-item-img"
                            src={item.productId.images}
                            alt={item.productId?.name}
                          />
                        )}
                        <div className="uo-item-details">
                          <p className="uo-item-name">{item.productId?.name || 'Product'}</p>
                          <p className="uo-item-sub">Price: ₹{item.price}</p>
                          <p className="uo-item-sub">Qty: {item.quantity}</p>
                        </div>
                        <div className="uo-item-total">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrder;

