import React, { useEffect, useState } from "react";
import styles from "./productPreview.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCartItems,
  removeCartItem,
} from "../../../AppRedux/cartSlice";
import apiClient from "../../../Utility/apiClient";

const ProductPreview = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (productId) {
      setLoading(true);
      setError(null);
      apiClient
        .get(`/products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch((error) => setError("Failed to fetch product details."))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  // add to cart
  const handleCart = () => {
    if (product === null) {
      alert("Please add item");
    } else {
      dispatch(setCartItems(product));
      navigate("/cart");
    }
  };

  

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <div className={styles.productPageContainer}>
        <div className={styles.breadcrumb}>
          Account / {product.category?.name} / {product?.title}
        </div>
        <div className={styles.productContent}>
          <div className={styles.productImageSection}>
            <div className={styles.imageGallery}>
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  className={styles.thumbnail}
                />
              ))}
            </div>
            <img
              src={product?.images && product?.images[0]}
              alt="Main Product"
              className={styles.mainImage}
            />
          </div>
          <div className={styles.productDetailsSection}>
            <h1 className={styles.productName}>{product.title}</h1>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productStock}>In Stock</p>
            <div className={styles.productRating}>⭐⭐⭐⭐⭐ (100 reviews)</div>
            <div className={styles.productDescription}>
              {product.description}
            </div>
            
            <button className={styles.buyNowButton} onClick={handleCart}>
              Add To Cart
            </button>
            <div className={styles.productFeatures}>
              <p>✔ Free Delivery</p>
              <p>✔ Return Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPreview;
