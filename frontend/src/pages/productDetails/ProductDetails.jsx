import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./productDetails.css";
import AddCart from "../../components/for_cart/AddCart";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5555/products/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data.data);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        const errorMsg = err.response
          ? err.response.data.message
          : "Network error or server is not responding";
        setError(errorMsg);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return <div className="product-details-loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="product-details-error">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="product-details-container">
        <div className="product-details-content">
          <img
            src={`http://localhost:5555/uploads/${product.images}`}
            alt={product.name}
            className="product-details-image"
          />
          <div className="product-details-info">
            <h1>{product.name}</h1>
            <p className="product-details-price">Price: ₹{product.price}</p>
            <div className="product-details-description">
              {product.description.length > 100 && !isExpanded ? (
                <>
                  {product.description.slice(0, 100)}...
                  <button onClick={toggleReadMore} className="read-more-button">
                    Read More
                  </button>
                </>
              ) : (
                <>
                  {product.description}
                  {product.description.length > 100 && (
                    <button onClick={toggleReadMore} className="read-more-button">
                      Read Less
                    </button>
                  )}
                </>
              )}
            </div>
            <p className="product-details-creator">Owner: {product.creator.name}</p>
            <p className="product-details-creator">Duration: {product.duration}</p>
            <AddCart productId={product._id} vendorId={product.creator._id} />
            <button>Buy</button>
            <p className="product-details-reviews-title">Reviews:</p>
            <ul className="product-details-reviews">
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <li key={index} className="product-review">
                    <strong>{review.user.name}:</strong> {review.comment}
                  </li>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
