import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addCategory } from '../../../redux/admin/categorySlice';
import { Button, Form } from 'react-bootstrap';

const CategoryCreate = () => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/categories', { name: categoryName });
            dispatch(addCategory(response.data));
            setCategoryName('');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Create Category</Button>
        </Form>
    );
};

export default CategoryCreate;
