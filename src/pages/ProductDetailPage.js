import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../redux/productSlice';
import { addToCart, addToGuestCart } from '../redux/cartSlice';
import axios from '../axios';
import { Container, Row, Col, Card, Button, ListGroup, Badge, Spinner } from 'react-bootstrap';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) => state.products.currentProduct);
    const isLoggedIn = useSelector((state) => !!state.auth.token);
    const [quantity, setQuantity] = useState(1); // State for quantity

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                dispatch(fetchProductById(response.data.id));
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [dispatch, id]);

    const handleAddToCart = async () => {
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
        };

        if (isLoggedIn) {
            try {
                // Make an API call to add the item to the cart with the selected quantity
                await axios.post(`/api/cart/addtocart/${product.id}`, { quantity });

                // Dispatch the action to update the Redux state
                dispatch(addToCart(item));
                
                // Optionally navigate to the cart or show a success message
                navigate('/cart');
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        } else {
            // Store item in local storage for guest users
            dispatch(addToGuestCart(item));

            navigate('/cart');


            // Optionally show a message or navigate to the cart
            console.log('Item added to cart for guest user.');
        }
    };

    if (!product) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" />
                <p>Loading...</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="product-details-card">
                        <Card.Body>
                            <Card.Title className="product-title">{product.name}</Card.Title>
                            <Card.Text className="product-price">${product.price}</Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Description:</strong> {product.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Category:</strong> <Badge bg="secondary">{product.category.name}</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Stock:</strong> {product.stock > 0 ? product.stock : 'Out of Stock'}
                                </ListGroup.Item>
                            </ListGroup>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                                className="quantity-input"
                            />
                            <Button variant="primary" className="mt-3" onClick={handleAddToCart}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h3>Customer Reviews</h3>
                    <p>No reviews yet.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
