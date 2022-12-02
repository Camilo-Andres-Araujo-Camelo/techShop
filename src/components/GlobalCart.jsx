import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  doCheckoutThunk,
  getCartProductsThunk,
} from "../store/slices/cartProducts.slice";

const GlobalCart = ({ show, handleClose }) => {
  const cartProducts = useSelector((state) => state.cartProducts);

  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const sendPurchaseOrder = () => {
    dispatch(doCheckoutThunk());
  };

  const deleteProduct = (productId) => {
    const deletedProduct = {
      id: productId,
    };
    console.log(deletedProduct);
  }

  useEffect(() => {
    dispatch(getCartProductsThunk());
  }, []);

  useEffect(() => {
    let total = 0;
    cartProducts.forEach((product) => {
      if (product.categoryId === 1) {
        total += product.price * 0.85 * product.productsInCart.quantity;
      } else if (product.categoryId === 2) {
        total += product.price * 0.8 * product.productsInCart.quantity;
      } else if (product.categoryId === 3) {
        total += product.price * 0.75 * product.productsInCart.quantity;
      } else {
        total += product.price * 0.9 * product.productsInCart.quantity;
      }
    });
    setTotalPrice(total);
  }, [cartProducts]);

  // console.log(cartProducts);
  // console.log(totalPrice);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <i className="fa-solid fa-cart-shopping"></i> Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="productInCart_container">
          {cartProducts.map((productInCart) => (
            <div className="productInCart" key={productInCart.id}>
              <span>{productInCart.brand}</span>
              <h4>{productInCart.title}</h4>
              <div className="product_quantity_in_cart">
                <span>{productInCart.productsInCart.quantity}</span>
                <div className="total_container">
                  <button 
                    className="deleteProduct"
                    onClick={()=> deleteProduct(productInCart.id)}
                  >
                    <i className="fa-regular fa-trash-can fa-xl"></i>
                  </button>
                  <p>
                    Total: $
                    {productInCart.categoryId === 1 ? (
                      <span>
                        {(productInCart?.price * 0.85).toFixed(0) *
                          productInCart.productsInCart.quantity}
                      </span>
                    ) : productInCart.categoryId === 2 ? (
                      <span>
                        {(productInCart?.price * 0.8).toFixed(0) *
                          productInCart.productsInCart.quantity}
                      </span>
                    ) : productInCart.categoryId === 3 ? (
                      <span>
                        {(productInCart?.price * 0.75).toFixed(0) *
                          productInCart.productsInCart.quantity}
                      </span>
                    ) : (
                      <span>
                        {(productInCart?.price * 0.9).toFixed(0) *
                          productInCart.productsInCart.quantity}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartProducts.length !== 0 && (
          <div className="checkout_total">
            <Button onClick={sendPurchaseOrder}>Checkout</Button>
            <p>
              Total: $<span>{totalPrice.toFixed(0)}</span>
            </p>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default GlobalCart;
