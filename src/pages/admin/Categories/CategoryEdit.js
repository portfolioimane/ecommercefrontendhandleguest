import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { updateCategory } from '../../../redux/admin/categorySlice';
import { Button, Form } from 'react-bootstrap';

const CategoryEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/api/admin/categories/${id}`);
                setCategoryName(response.data.name);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/admin/categories/${id}`, { name: categoryName });
            dispatch(updateCategory(response.data));
        } catch (error) {
            console.error('Error updating category:', error);
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
            <Button type="submit">Update Category</Button>
        </Form>
    );
};

export default CategoryEdit;
