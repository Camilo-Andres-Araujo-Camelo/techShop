import { configureStore } from '@reduxjs/toolkit'
import cartProductsSlice from './slices/cartProducts.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productQuantitySlice from './slices/productQuantity.slice'
import ProductsSlice from './slices/Products.slice'
import  purchasesSlice  from './slices/purchases.slice'

export default configureStore({
    reducer: {
        products: ProductsSlice,
        isLoading: isLoadingSlice,
        purchases: purchasesSlice,
        cartProducts: cartProductsSlice,
        productQuantity: productQuantitySlice
    }
})
