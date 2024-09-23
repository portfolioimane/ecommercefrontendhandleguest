import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { updateProduct } from '../../../redux/admin/productSlice';
import { Button, Form } from 'react-bootstrap';

const ProductEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/admin/products/${id}`);
                setProductName(response.data.name);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/admin/products/${id}`, { name: productName });
            dispatch(updateProduct(response.data));
        } catch (error) {
            console.error('Error updating product:', error);
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
            <Button type="submit">Update Product</Button>
        </Form>
    );
};

export default ProductEdit;
