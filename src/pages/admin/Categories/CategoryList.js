import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategories, deleteCategory } from '../../../redux/admin/categorySlice';
import { Button } from 'react-bootstrap';

const CategoryList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.items);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/admin/categories');
                dispatch(setCategories(response.data));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/categories/${id}`);
            dispatch(deleteCategory(id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div>
            <h1>Category List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button onClick={() => handleDelete(category.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
