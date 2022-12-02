import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../../store/slices/purchases.slice";

const Purchases = () => {

  const getFormatedDate = (dateString) => {
    const date = new Date(dateString);
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    return date.toLocaleDateString(undefined, options)
  }

  const purchases = useSelector((state) => state.purchases);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  

  console.log(purchases);

  return (
    <div>
      <h1>Purchases</h1>
      <ul>
        {purchases.map((purchase) => (
          <li className="purchase" key={purchase.id}>
            {/* <h3>Date: {purchase.createdAt}</h3> */}
            <h3>Date: {getFormatedDate(purchase.createdAt)}</h3>
            <ul className="products">
              {purchase.cart.products.map((product) => (
                <li className="sigle_product" key={product.id}>
                  <Link to={`/productsdetail/${product.id}`}>
                    <h4>{product.title}</h4>
                  </Link>
                  <span>Price: ${product.price}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
