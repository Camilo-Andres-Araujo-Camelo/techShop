import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterProductsThunk,
  getProductsThunk,
} from "../../store/slices/Products.slice";

const Home = () => {
  const [productsCategories, setProductsCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setProductsCategories(res.data.data.categories));
  }, []);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  //   console.log(products[0]);
    // console.log(products);
//   console.log(productsCategories);

  return (
    <div className="home_container">
      <h1>Products Home</h1>
      <div className="categories_container">
        <div className="categories_type">
          <p>Filter by type: </p>
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
                {
                    product.category.id === 1
                    ? (
                        <span>- 15%</span>
                    ) : product.category.id === 2 ? (
                        <span>- 20%</span>
                    ) : product.category.id === 3 ? (
                        <span>- 25%</span>
                    ) : (
                        <span>- 10%</span>
                    )
                }
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
                
                    {
                        product.category.id === 1
                        ? (
                            <span>{(product?.price*.85).toFixed(0)}</span>
                        ) : product.category?.id === 2 ? (
                            <span>{(product?.price*.80).toFixed(0)}</span>
                        ) : product.category?.id === 3 ? (
                            <span>{(product?.price*.75).toFixed(0)}</span>
                        ) : (
                            <span>{(product?.price*.90).toFixed(0)}</span>
                        )
                        
                    }
                </p>
              </div>
              <div className="container_btn_product">
                <Button className="see_details">
                  <Link to={`/productsdetail/${product.id}`}>
                    See in details
                  </Link>
                </Button>
                <Button>add to cart</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
