// src/components/HomePage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom';
import { setProducts } from '../redux/productSlice';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { FaEye } from 'react-icons/fa';
import axios from '../axios'; // Ensure axios is configured
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Access products from the Redux store
    const products = useSelector((state) => state.products.items); // Get products from the state

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                dispatch(setProducts(response.data)); // Dispatch action to set products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    const defaultImage = 'https://via.placeholder.com/300';

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1 className="text-center mb-4">Welcome to E-Shop!</h1>
                    <p className="text-center mb-5">Discover amazing products at great prices.</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Slider {...settings} className="mb-4">
                        <div>
                            <img src="/path/to/your/image1.jpg" alt="Sale 1" className="img-fluid rounded" />
                        </div>
                        <div>
                            <img src="/path/to/your/image2.jpg" alt="Sale 2" className="img-fluid rounded" />
                        </div>
                        <div>
                            <img src="/path/to/your/image3.jpg" alt="Sale 3" className="img-fluid rounded" />
                        </div>
                    </Slider>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2 className="text-center mb-4">Featured Products</h2>
                </Col>
            </Row>
            <Row>
                {products.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card className="product-card shadow-sm border-light">
                            <Card.Img variant="top" src={product.image || defaultImage} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                                <Button 
                                    variant="primary" 
                                    className="w-100"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <FaEye /> View Product
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
