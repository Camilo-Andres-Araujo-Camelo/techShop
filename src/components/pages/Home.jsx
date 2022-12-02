import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductsToCartThunk } from "../../store/slices/cartProducts.slice";
import {
  filterName,
  filterProductsThunk,
  getProductsThunk,
} from "../../store/slices/Products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productsCategories, setProductsCategories] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const addProductToCart = (productId) => {
    const addedProduct = {
      id: productId,
      quantity: 1,
    };
    dispatch(addProductsToCartThunk(addedProduct));
    console.log(addedProduct);
  };


  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setProductsCategories(res.data.data.categories));
  }, []);



  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  

  console.log(inputSearch);

  return (
    <div className="home_container">
      <h1>Products Home</h1>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={inputSearch}
          onChange={e => setInputSearch(e.target.value)?.toLowercase()}
        />
        <Button
          variant="outline-secondary"
          onClick={() => dispatch(filterName({inputSearch}))}
        >
          <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
        </Button>
      </InputGroup>

      <div className="categories_container">
        <div className="categories_type">
          <p>Filter by type: </p>
          <Button
              variant="outline-secondary"
              onClick={() => dispatch(getProductsThunk())}
          >
            All products
          </Button>
          {productsCategories.map((productsCategory) => (
            <Button
              key={productsCategory.id}
              onClick={() => dispatch(filterProductsThunk(productsCategory.id))}
              variant="outline-secondary"
            >
              {productsCategory.name}
            </Button>
          ))}
        </div>
      </div>
      <ul className="products_list">
        {products.map((product) => (
          <li className="products_item" key={product.id}>
            <div className="product_img">
              <Link to={`/productsdetail/${product.id}`}>
                <img
                  src={`${product.productImgs[0]}`}
                  alt="product image"
                  className="productImg"
                />
              </Link>
              <div className="percentage">
                {product.category.id === 1 ? (
                  <span>- 15%</span>
                ) : product.category.id === 2 ? (
                  <span>- 20%</span>
                ) : product.category.id === 3 ? (
                  <span>- 25%</span>
                ) : (
                  <span>- 10%</span>
                )}
              </div>
            </div>
            <div className="product_information">
              <Link to={`/productsdetail/${product.id}`}>
                <h2>{product.title}</h2>
              </Link>
              <div className="product_description">
                <p>{product.description}</p>
              </div>
            </div>
            <div className="product_price">
              <div className="promotions">
                <p>
                  Before: <br />
                  <span className="before">${product.price}</span>
                </p>
                <p className="now">
                  Now: <br />
                  {product.category.id === 1 ? (
                    <span>{(product?.price * 0.85).toFixed(0)}</span>
                  ) : product.category?.id === 2 ? (
                    <span>{(product?.price * 0.8).toFixed(0)}</span>
                  ) : product.category?.id === 3 ? (
                    <span>{(product?.price * 0.75).toFixed(0)}</span>
                  ) : (
                    <span>{(product?.price * 0.9).toFixed(0)}</span>
                  )}
                </p>
              </div>
              <div className="container_btn_product">
                <Button className="see_details">
                  <Link to={`/productsdetail/${product.id}`}>
                    See in details
                  </Link>
                </Button>
                <Button onClick={() => addProductToCart(product.id)}>
                  add to cart
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
