import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: { items: [] },
    reducers: {
        setOrders: (state, action) => {
            state.items = action.payload;
        },
        addOrder: (state, action) => {
            state.items.push(action.payload);
        },
        deleteOrder: (state, action) => {
            state.items = state.items.filter(order => order.id !== action.payload);
        },
    },
});

export const { setOrders, addOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
