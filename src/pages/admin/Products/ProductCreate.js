import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addProduct } from '../../../redux/admin/productSlice';
import { Button, Form } from 'react-bootstrap';

const ProductCreate = () => {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/products', { name: productName });
            dispatch(addProduct(response.data));
            setProductName('');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Create Product</Button>
        </Form>
    );
};

export default ProductCreate;
