import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementQuantity, removeFromCart, clearCart } from '../../../AppRedux/cartSlice';
import { useNavigate } from 'react-router-dom';
import styles from './cartPage.module.css';

const CartPage = () => {
  const cart = useSelector((state) => state.cart); // Access cart state
  const isLoggedIn = useSelector((state) => !!state.user.token); // Check if the user is logged in
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity({ id: productId })); // Decrement quantity
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ id: productId })); // Completely remove item
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      // Navigate to a different page if needed (e.g., dashboard or home)
      navigate('/'); // Redirect to the home page or any other page
    } else {
      navigate('/login'); // Redirect to the login page
    }
  };

  if (cart.length === 0) {
    return <h2 className={styles.emptyCart}>Your cart is empty.</h2>;
  }

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Your Cart</h2>
      <ul className={styles.cartList}>
        {cart.map((item) => (
          <li key={item.product.id} className={styles.cartItem}>
            <img
              src={item.product.images[0]}
              alt={item.product.title}
              className={styles.productImage}
            />
            <div className={styles.productDetails}>
              <h4 className={styles.productTitle}>{item.product.title}</h4>
              <p className={styles.productPrice}>Price: ${item.product.price}</p>
              <p className={styles.productQuantity}>Quantity: {item.quantity}</p>
              <div className={styles.quantityControls}>
                <button
                  className={styles.decrementButton}
                  onClick={() => handleDecrementQuantity(item.product.id)}
                >
                  -
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.cartActions}>
        <button className={styles.clearButton} onClick={handleClearCart}>
          Clear Cart
        </button>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          {isLoggedIn ? 'Go to Home' : 'Please Login to Continue'}
        </button>
      </div>
    </div>
  );
};

export default CartPage;