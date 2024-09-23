import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCart,
  getCartSuccess,
  getCartFailure,
  loadGuestCart,
  removeFromCart,
  removeFromGuestCart,
} from '../redux/cartSlice';
import axios from '../axios';
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items || []);
  const guestItems = useSelector(state => state.cart.guestItems || []);
  const loading = useSelector(state => state.cart.loading);
  const error = useSelector(state => state.cart.error);
  const isLoggedIn = useSelector(state => !!state.auth.token);

  useEffect(() => {
    const fetchCart = async () => {
      console.log("Fetching cart for user:", isLoggedIn ? "Logged In" : "Guest");
      dispatch(getCart());

      if (isLoggedIn) {
        try {
          const response = await axios.get('/api/cart');
          console.log("Cart response:", response.data);
          const items = response.data.items || [];
          dispatch(getCartSuccess(items));
        } catch (err) {
          console.error("Error fetching cart:", err.message);
          dispatch(getCartFailure(err.message));
        }
      } else {
        dispatch(loadGuestCart());
      }
    };

    fetchCart();
  }, [dispatch, isLoggedIn]);

  const handleRemoveFromCart = (id) => {
    console.log("Removing item from cart:", id);
    if (isLoggedIn) {
      axios.delete(`/api/cart/${id}`).then(() => {
        dispatch(removeFromCart(id));
      }).catch(error => {
        console.error('Error removing item from cart:', error);
      });
    } else {
      dispatch(removeFromGuestCart(id));
      console.log("Removed item from guest cart:", id);
    }
  };

  const calculateTotalPrice = () => {
    const items = isLoggedIn ? cart : guestItems;
    return items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  };

  const totalPrice = calculateTotalPrice().toFixed(2);

  if (loading) {
    console.log("Loading cart...");
    return <p className="loading">Loading cart...</p>;
  }
  if (error) {
    console.error("Error loading cart:", error);
    return <p className="error">Error loading cart: {error}</p>;
  }

  const displayCart = isLoggedIn ? cart : guestItems;
  console.log("Display cart items:", displayCart);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {displayCart.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {displayCart.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={isLoggedIn ? item.product.name : item.name} className="item-image" />
                <div className="item-details">
                  <h4>{isLoggedIn ? item.product.name : item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {Number(item.price).toFixed(2)} MAD</p>
                </div>
                <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <h3>Total Price: {totalPrice} MAD</h3>
          </div>
          <button className="checkout-button" onClick={() => {/* Handle checkout logic here */}}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
