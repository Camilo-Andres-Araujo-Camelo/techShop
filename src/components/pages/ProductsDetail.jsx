import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../../store/slices/Products.slice";
import { Button, Carousel } from "react-bootstrap";
import { addProductsToCartThunk } from "../../store/slices/cartProducts.slice";
import { setProductQuantity } from "../../store/slices/productQuantity.slice";

const ProductsDetail = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const productQuantity = useSelector(state => state.productQuantity)
  

  const addOneProduct = () => {
    dispatch(setProductQuantity(productQuantity + 1));
  };
  const removeOneProduct = () => {
    dispatch(setProductQuantity(productQuantity - 1));
  };

  const addProductToCart = () => {
    const addedProduct = {
      id: product.id,
      quantity: productQuantity
    };
    dispatch(addProductsToCartThunk(addedProduct))
  };

  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(setProductQuantity(1))
  }, []);

  const products = useSelector((state) => state.products);

  const product = products.find((product) => product.id === Number(id));

  const relatedProducts = products.filter(
    (productItem) =>
      productItem.category.id === product.category.id &&
      productItem.id !== product.id
  );

    // console.log(product);

  return (
    <div>
      <Button className="goBack"><Link to={-1}><i className="fa-solid fa-chevron-left"></i> Go back</Link></Button>
      <div className="product_detail_container">
        <div className="product_detail_img_container">
          
          <Carousel>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${product?.productImgs[0]}`}
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${product?.productImgs[1]}`}
                alt="Second slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${product?.productImgs[2]}`}
                alt="Third slide"
              />
            </Carousel.Item>
            
          </Carousel>

          <div className="product_detail_percentage">
            {product?.category.id === 1 ? (
              <span>- 15%</span>
            ) : product?.category.id === 2 ? (
              <span>- 20%</span>
            ) : product?.category.id === 3 ? (
              <span>- 25%</span>
            ) : (
              <span>- 10%</span>
            )}
          </div>
        </div>
        <div className="detail_description">
          <h3>{product?.title}</h3>
          <div className="promotions">
            <p>
              Before: <br />
              <span className="before">${product?.price}</span>
            </p>
            <p className="now">
              Now: <br />
              {product?.category.id === 1 ? (
                <span>{(product?.price * 0.85).toFixed(0)}</span>
              ) : product?.category?.id === 2 ? (
                <span>{(product?.price * 0.8).toFixed(0)}</span>
              ) : product?.category.id === 3 ? (
                <span>{(product?.price * 0.75).toFixed(0)}</span>
              ) : (
                <span>{(product?.price * 0.9).toFixed(0)}</span>
              )}
            </p>
          </div>
          <p>{product?.description}</p>
          <div className="container_buttons">
            <div className="input_counter_container">
              <button
                onClick={removeOneProduct}
                disabled={productQuantity === 1}
              >
                <i className="fa-solid fa-minus fa-xl"></i>
              </button>
              <input
                className="input_cuantity"
                type="text"
                value={productQuantity}
                onChange={() => e.target.value}
              />
              <button onClick={addOneProduct}>
                <i className="fa-solid fa-plus fa-xl"></i>
              </button>
            </div>
            <Button onClick={addProductToCart}>add to cart</Button>
          </div>
        </div>
      </div>
      <div className="related_products_container">
        <ul className="related_products_list">
          {relatedProducts.map((relatedProduct) => (
            <li className="related_product" key={relatedProduct.id}>
              <Link to={`/productsdetail/${relatedProduct.id}`}>
                <h4 className="related_product_title">
                  {relatedProduct.title}
                </h4>
              </Link>

                <img  src={relatedProduct.productImgs[0]} alt="product_img" />

              <p>Price: {relatedProduct.price}</p>
              <Button className="see_details">
                <Link to={`/productsdetail/${relatedProduct.id}`}>
                  See in details
                </Link>
              </Button>
              <div className="product_related_percentage">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsDetail;
<h1>Producst Detail</h1>;
