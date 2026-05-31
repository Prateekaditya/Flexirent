import React, { useEffect, useState } from 'react';
import './sellerHome.css';
import Navbar from '../../components/navbar/Navbar';
import SellerBar from '../../components/sellerBar/SellerBar';
import axios from 'axios';
import { FaBox, FaShoppingBag, FaRupeeSign, FaStar } from 'react-icons/fa';
import { MdPendingActions, MdLocalShipping, MdCheckCircle, MdCancel } from 'react-icons/md';

const SellerHome = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [products, setProducts] = useState([]);
    const [orders, setOrders]     = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [prodRes, orderRes] = await Promise.all([
                    axios.get(`${API_URL}/products/seller`, { headers }),
                    axios.get(`${API_URL}/order/sellerorder`, { headers }),
                ]);
                setProducts(prodRes.data.data || []);
                setOrders(orderRes.data.orders || []);
            } catch (e) {
                console.error('Dashboard fetch error:', e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // ── Derived stats ──
    const totalProducts = products.length;
    const totalOrders   = orders.filter(o => o.status === 'completed').length;

    const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, order) => {
            const myVP = order.vendorPayments.find(
                vp => String(vp.vendorId?._id || vp.vendorId) === String(user._id)
            );
            return sum + (myVP?.amount || 0);
        }, 0);

    const avgRating = products.length
        ? (products.reduce((sum, p) => {
              const ratings = (p.reviews || []).map(r => r.rating).filter(Boolean);
              return sum + (ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0);
          }, 0) / products.length).toFixed(1)
        : '—';

    const statusCounts = { pending: 0, accepted: 0, 'On the way': 0, delivered: 0, cancel: 0 };
    orders.forEach(order => {
        const myVP = order.vendorPayments.find(
            vp => String(vp.vendorId?._id || vp.vendorId) === String(user._id)
        );
        if (myVP?.status && statusCounts[myVP.status] !== undefined) {
            statusCounts[myVP.status]++;
        }
    });

    const recentOrders = [...orders]
        .filter(o => o.status === 'completed')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const topProducts = [...products]
        .sort((a, b) => (b.sold_out || 0) - (a.sold_out || 0))
        .slice(0, 4);

    if (loading) return (
        <div className="sellerMainContainer">
            <Navbar />
            <SellerBar />
            <div className="sd-page"><p className="sd-loading">Loading dashboard…</p></div>
        </div>
    );

    return (
        <div className="sellerMainContainer">
            <Navbar />
            <SellerBar />
            <div className="sd-page">

                {/* Greeting */}
                <div className="sd-greeting">
                    <h2>Welcome back, <span>{user.name || 'Seller'}</span> 👋</h2>
                    <p>Here's what's happening with your store today.</p>
                </div>

                {/* Stat cards */}
                <div className="sd-stats">
                    <div className="sd-stat-card sd-stat--green">
                        <div className="sd-stat-icon"><FaBox /></div>
                        <div className="sd-stat-info">
                            <span className="sd-stat-label">Total Products</span>
                            <span className="sd-stat-value">{totalProducts}</span>
                        </div>
                    </div>
                    <div className="sd-stat-card sd-stat--blue">
                        <div className="sd-stat-icon"><FaShoppingBag /></div>
                        <div className="sd-stat-info">
                            <span className="sd-stat-label">Orders Completed</span>
                            <span className="sd-stat-value">{totalOrders}</span>
                        </div>
                    </div>
                    <div className="sd-stat-card sd-stat--gold">
                        <div className="sd-stat-icon"><FaRupeeSign /></div>
                        <div className="sd-stat-info">
                            <span className="sd-stat-label">Total Revenue</span>
                            <span className="sd-stat-value">₹{totalRevenue.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <div className="sd-stat-card sd-stat--purple">
                        <div className="sd-stat-icon"><FaStar /></div>
                        <div className="sd-stat-info">
                            <span className="sd-stat-label">Avg Rating</span>
                            <span className="sd-stat-value">{avgRating}</span>
                        </div>
                    </div>
                </div>

                {/* Order pipeline */}
                <div className="sd-section-title">Order Pipeline</div>
                <div className="sd-pipeline">
                    <div className="sd-pipe-item">
                        <MdPendingActions className="sd-pipe-icon" style={{ color: '#f0a500' }} />
                        <span className="sd-pipe-count">{statusCounts.pending}</span>
                        <span className="sd-pipe-label">Pending</span>
                    </div>
                    <span className="sd-pipe-arrow">›</span>
                    <div className="sd-pipe-item">
                        <MdCheckCircle className="sd-pipe-icon" style={{ color: '#3a86ff' }} />
                        <span className="sd-pipe-count">{statusCounts.accepted}</span>
                        <span className="sd-pipe-label">Accepted</span>
                    </div>
                    <span className="sd-pipe-arrow">›</span>
                    <div className="sd-pipe-item">
                        <MdLocalShipping className="sd-pipe-icon" style={{ color: '#8338ec' }} />
                        <span className="sd-pipe-count">{statusCounts['On the way']}</span>
                        <span className="sd-pipe-label">On the way</span>
                    </div>
                    <span className="sd-pipe-arrow">›</span>
                    <div className="sd-pipe-item">
                        <MdCheckCircle className="sd-pipe-icon" style={{ color: '#06d6a0' }} />
                        <span className="sd-pipe-count">{statusCounts.delivered}</span>
                        <span className="sd-pipe-label">Delivered</span>
                    </div>
                    <span className="sd-pipe-arrow">›</span>
                    <div className="sd-pipe-item">
                        <MdCancel className="sd-pipe-icon" style={{ color: '#ef233c' }} />
                        <span className="sd-pipe-count">{statusCounts.cancel}</span>
                        <span className="sd-pipe-label">Cancelled</span>
                    </div>
                </div>

                {/* Bottom two-column */}
                <div className="sd-bottom">
                    {/* Recent orders */}
                    <div className="sd-card">
                        <div className="sd-card-header">Recent Orders</div>
                        {recentOrders.length === 0 ? (
                            <p className="sd-empty">No completed orders yet.</p>
                        ) : (
                            <table className="sd-table">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map(order => {
                                        const myVP = order.vendorPayments.find(
                                            vp => String(vp.vendorId?._id || vp.vendorId) === String(user._id)
                                        ) || order.vendorPayments[0];
                                        return (
                                            <tr key={order._id}>
                                                <td>{order.userId?.name || '—'}</td>
                                                <td>₹{myVP?.amount || order.totalAmount}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                                                <td>
                                                    <span className={`sd-status sd-status--${(myVP?.status || 'pending').replace(/ /g,'-')}`}>
                                                        {myVP?.status || 'pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Top products */}
                    <div className="sd-card">
                        <div className="sd-card-header">Top Products</div>
                        {topProducts.length === 0 ? (
                            <p className="sd-empty">No products listed yet.</p>
                        ) : (
                            <div className="sd-top-products">
                                {topProducts.map(p => (
                                    <div key={p._id} className="sd-top-product-item">
                                        {p.images && (
                                            <img src={p.images} alt={p.name} className="sd-top-product-img" />
                                        )}
                                        <div className="sd-top-product-info">
                                            <span className="sd-top-product-name">{p.name?.slice(0, 30)}{p.name?.length > 30 ? '…' : ''}</span>
                                            <span className="sd-top-product-sub">₹{p.price} · Stock: {p.stock}</span>
                                        </div>
                                        <span className="sd-top-product-sold">{p.sold_out || 0} sold</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;