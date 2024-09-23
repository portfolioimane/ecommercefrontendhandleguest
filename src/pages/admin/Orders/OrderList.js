import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOrders, deleteOrder } from '../../../redux/admin/orderSlice';
import { Button } from 'react-bootstrap';

const OrderList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.items);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/admin/orders');
                dispatch(setOrders(response.data));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/orders/${id}`);
            dispatch(deleteOrder(id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div>
            <h1>Order List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                <Button onClick={() => handleDelete(order.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
