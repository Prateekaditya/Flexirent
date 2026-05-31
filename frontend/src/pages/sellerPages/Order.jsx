import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SellerBar from '../../components/sellerBar/SellerBar';
import './create.css';
import './sellerOrder.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const STATUSES = ['pending', 'accepted', 'On the way', 'delivered', 'cancel'];

const statusColor = {
  pending:      '#f0a500',
  accepted:     '#3a86ff',
  'On the way': '#8338ec',
  delivered:    '#06d6a0',
  cancel:       '#ef233c',
};

const Order = () => {
  const [orders, setOrders]       = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [updating, setUpdating]   = useState({});

  const API_URL     = import.meta.env.VITE_API_URL || 'http://localhost:5555';
  const token       = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');


  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/order/sellerorder`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetched = response.data.orders || [];
      setOrders(fetched);
      // Pre-fill dropdown with each order's current vendorPayment status
      const init = {};
      fetched.forEach(order => {
        const vp = order.vendorPayments.find(
          v => String(v.vendorId?._id || v.vendorId) === String(currentUser._id)
        );
        if (vp) init[order.orderId] = vp.status;
      });
      setSelectedStatus(init);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdateStatus = async (orderId) => {
    const status = selectedStatus[orderId];
    if (!status) return;
    try {
      setUpdating(prev => ({ ...prev, [orderId]: true }));
      await axios.patch(
        `${API_URL}/order/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Marked as "${status}"`,
        timer: 1800,
        showConfirmButton: false,
      });
      fetchOrders();
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: e.response?.data?.message || 'Could not update status',
      });
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  };

  if (isLoading) return (
    <div className="container">
      <Navbar />
      <SellerBar />
      <div className="so-page"><p className="so-loading">Loading orders…</p></div>
    </div>
  );

  if (error) return (
    <div className="container">
      <Navbar />
      <SellerBar />
      <div className="so-page">
        <p className="so-error">{error}</p>
        <button className="so-retry-btn" onClick={fetchOrders}>Retry</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <Navbar />
      <SellerBar />
      <div className="so-page">
        <h2 className="so-heading">Orders</h2>

        {orders.length === 0 ? (
          <div className="so-empty">
            <p>No orders received yet.</p>
          </div>
        ) : (
          orders.map(order => {
            const myVP = order.vendorPayments.find(
              v => String(v.vendorId?._id || v.vendorId) === String(currentUser._id)
            ) || order.vendorPayments[0];

            const vpStatus        = myVP?.status || 'pending';
            const currentSelected = selectedStatus[order.orderId] || vpStatus;
            const isFinalised     = vpStatus === 'delivered' || vpStatus === 'cancel';
            const paymentDone     = order.status === 'completed';

            return (
              <div key={order._id} className="so-card">
                {/* Header */}
                <div className="so-card-header">
                  <div className="so-info-group">
                    <span className="so-label">Customer</span>
                    <span className="so-value so-bold">{order.userId?.name || '—'}</span>
                    <span className="so-email">{order.userId?.email}</span>
                  </div>
                  <div className="so-info-group">
                    <span className="so-label">Order ID</span>
                    <span className="so-value so-mono">{order.orderId}</span>
                  </div>
                  <div className="so-info-group">
                    <span className="so-label">Total</span>
                    <span className="so-value so-bold">₹{order.totalAmount}</span>
                  </div>
                  <div className="so-info-group">
                    <span className="so-label">Payment</span>
                    <span
                      className="so-badge"
                      style={{
                        backgroundColor:
                          order.status === 'completed' ? '#06d6a0' :
                          order.status === 'failed'    ? '#ef233c' : '#f0a500',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="so-info-group">
                    <span className="so-label">Date</span>
                    <span className="so-value">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="so-items">
                  {myVP?.items?.map((item, idx) => (
                    <div key={item._id || idx} className="so-item">
                      {item.productId?.images && (
                        <img
                          className="so-item-img"
                          src={item.productId.images}
                          alt={item.productId?.name}
                        />
                      )}
                      <div className="so-item-info">
                        <span className="so-item-name">{item.productId?.name || 'Product'}</span>
                        <span className="so-item-meta">Duration: {item.productId?.duration || '—'}</span>
                        <span className="so-item-meta">Qty: {item.quantity}</span>
                        <span className="so-item-meta">Price: ₹{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status Update */}
                <div className="so-status-row">
                  <span className="so-delivery-label">Delivery Status:</span>
                  <span
                    className="so-current-badge"
                    style={{ backgroundColor: statusColor[vpStatus] || '#888' }}
                  >
                    {vpStatus}
                  </span>

                  {paymentDone && !isFinalised ? (
                    <>
                      <select
                        className="so-select"
                        value={currentSelected}
                        onChange={e =>
                          setSelectedStatus(prev => ({ ...prev, [order.orderId]: e.target.value }))
                        }
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button
                        className="so-update-btn"
                        disabled={updating[order.orderId]}
                        onClick={() => handleUpdateStatus(order.orderId)}
                      >
                        {updating[order.orderId] ? 'Updating…' : 'Update Status'}
                      </button>
                    </>
                  ) : (
                    <span className="so-final-note">
                      {!paymentDone ? 'Awaiting payment' : 'Order finalised'}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Order;

