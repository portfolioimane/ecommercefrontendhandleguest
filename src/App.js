import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated for v6
import store from './redux/store';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/Products/ProductList';
import ProductCreate from './pages/admin/Products/ProductCreate';
import CategoryList from './pages/admin/Categories/CategoryList';
import OrderList from './pages/admin/Orders/OrderList';
import UserList from './pages/admin/Users/UserList';
import ReviewList from './pages/admin/Reviews/ReviewList';
import Settings from './pages/admin/Settings';
import PublicLayout from './components/PublicLayout';
import AdminRoute from './components/AdminRoute';
import DashboardLayout from './components/admin/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
            
            
                    <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/orders" element={<OrderPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    
              

                <Route element={<AdminRoute />}>
                <Route path="/admin" element={<DashboardLayout />}>
                    
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/products" element={<ProductList />} />
                        <Route path="/admin/products/create" element={<ProductCreate />} />
                        <Route path="/admin/categories" element={<CategoryList />} />
                        <Route path="/admin/orders" element={<OrderList />} />
                        <Route path="/admin/users" element={<UserList />} />
                        <Route path="/admin/reviews" element={<ReviewList />} />
                        <Route path="/admin/settings" element={<Settings />} />
                </Route>
                </Route>
                    </Routes>

                
            </Router>
        </Provider>
    );
};

export default App;
