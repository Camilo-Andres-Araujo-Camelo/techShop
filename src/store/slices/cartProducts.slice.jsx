import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: [],
    reducers: {
        setCartProducts: (state, action)=> {
            return action.payload
        }
    }
})

export const getCartProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
        .then((res) => dispatch(setCartProducts(res.data.data.cart.products)))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductsToCartThunk = (addedProduct) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', addedProduct, getConfig())
        .then(() => dispatch(getCartProductsThunk()))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const doCheckoutThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCartProducts([])))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deletedProductThunk = (deletedProduct) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete('https://e-commerce-api.academlo.tech/api/v1/cart/1', getConfig())
        .then(() => dispatch(getCartProductsThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCartProducts } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
