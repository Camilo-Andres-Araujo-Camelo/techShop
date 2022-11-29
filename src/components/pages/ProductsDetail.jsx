import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../../store/slices/Products.slice";
import { Button } from "react-bootstrap";

const ProductsDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const products = useSelector((state) => state.products);

  const product = products.find((product) => product.id === Number(id));

  const relatedProducts = products.filter(
    (productItem) => productItem.category.id === product.category.id
  );

  console.log(product);

  return (
    <div>
      <h2>{product?.title}</h2>
      <div className="product_detail_container">
        <div className="product_detail_img_container">
          <img src={product?.productImgs[0]} alt="product image" />
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
          <h3>Product overview</h3>
          <div className="promotions">
                <p>
                  Before: <br />
                  <span className="before">${product?.price}</span>
                </p>
                <p className="now">
                  Now: <br />
                
                    {
                        product?.category.id === 1
                        ? (
                            <span>{(product?.price*.85).toFixed(0)}</span>
                        ) : product?.category?.id === 2 ? (
                            <span>{(product?.price*.80).toFixed(0)}</span>
                        ) : product?.category.id === 3 ? (
                            <span>{(product?.price*.75).toFixed(0)}</span>
                        ) : (
                            <span>{(product?.price*.90).toFixed(0)}</span>
                        )
                        
                    }
                </p>
              </div>
          <p>{product?.description}</p>
          <Button>add to cart</Button>
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
                
              <img src={relatedProduct.productImgs[0]} alt="product_img" />
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
