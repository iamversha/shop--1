import React, { useEffect, useState } from 'react';
import styles from './productPreview.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../AppRedux/cartSlice'; // Assuming you have a cartSlice for managing cart state

const ProductPreview = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1); // State to track quantity
  // const isLoggedIn = useSelector((state) => !!state.user.token); // Check if the user is logged in
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
          setMainImage(data.images[0]);
        })
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity })); // Dispatch action to add item to cart
  };

  // const handleCheckout = () => {
  //   if (isLoggedIn) {
  //     navigate('/checkout'); // Navigate to checkout page
  //   } else {
  //     alert('Please login to continue.');
  //   }
  // };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productPageContainer}>
      <div className={styles.breadcrumb}>Account / {product.category.name} / {product.title}</div>
      <div className={styles.productContent}>
        <div className={styles.productImageSection}>
          <div className={styles.imageGallery}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Thumbnail ${index + 1}`}
                className={styles.thumbnail}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
          <img src={mainImage} alt="Main Product" className={styles.mainImage} />
        </div>
        <div className={styles.productDetailsSection}>
          <h1 className={styles.productName}>{product.title}</h1>
          <p className={styles.productPrice}>${product.price}</p>
          <p className={styles.productStock}>In Stock</p>
          <div className={styles.productRating}>⭐⭐⭐⭐⭐ (100 reviews)</div>
          <div className={styles.productDescription}>{product.description}</div>

          {/* Quantity Selector */}
          <div className={styles.quantitySelector}>
            <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>

          {/* Add to Cart Button */}
          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* Checkout Button */}
          {/* <button className={styles.checkoutButton} onClick={handleCheckout}>
            {isLoggedIn ? 'Checkout' : 'Please Login to Continue'}
          </button> */}

          <div className={styles.productFeatures}>
            <p>✔ Free Delivery</p>
            <p>✔ Return Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;