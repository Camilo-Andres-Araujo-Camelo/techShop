import { createSlice } from '@reduxjs/toolkit';

export const productQuantitySlice = createSlice({
    name: 'productQuantity',
    initialState: 1,
    reducers: {
        setProductQuantity: (state, action) => {
            return action.payload
        }
    }
})

export const { setProductQuantity } = productQuantitySlice.actions;



export default productQuantitySlice.reducer;
