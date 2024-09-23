import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ShopPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/products'); // Adjust the API URL as needed
            dispatch(setProducts(response.data));
        };
        fetchProducts();
    }, [dispatch]);

    return (
        <Container className="my-5">
            <Row>
                {products.map((product) => (
                    <Col md={3} key={product.id} className="mb-4">
                        <Card>
                            <Link to={`/products/${product.id}`}>
                                <Card.Img variant="top" src={product.image} /> {/* Update with actual image path */}
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ShopPage;
