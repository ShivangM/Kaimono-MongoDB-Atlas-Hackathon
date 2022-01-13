import React, { useEffect, useContext} from "react";
import ProductCard from "../components/Product";
import {
  ProductsStateContext,
  ProductsDispatchContext,
  getProducts
} from "../contexts/products";
import { CommonStateContext } from "../contexts/common";

const Home = () => {
  const { products, isLoading, isLoaded } = useContext(ProductsStateContext);
  const { searchKeyword } = useContext(CommonStateContext);
  const dispatch = useContext(ProductsDispatchContext);

  const productsList =
    products &&
    products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        !searchKeyword
      );
    });

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  if (isLoading) {
    return (
      <div className="products-wrapper">

        <div className="full">

        <svg
          className="spinner"
          width="65px"
          height="65px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
          >
          <circle
            className="path"
            fill="none"
            stroke-width="6"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="30"
            ></circle>
        </svg>
            </div>
      </div>
    );
  }
  return (
    <div className="products-wrapper">
      <div className="products">
        {isLoaded &&
          productsList.map((data) => {
            return <ProductCard key={data.id} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Home;
