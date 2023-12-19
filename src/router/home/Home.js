import React from "react";
import Carousel from "../../components/carousel/Carousel";
import Products from "../../components/products/Products";
import { useSelector } from "react-redux";


function Home({ data }) {
  return (
    <>
      <Carousel />
    <div className="container">
      <Products data={data} />
    </div>
    </>

  );
}

export default Home;
