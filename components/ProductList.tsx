import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  btn_favorite_inact,
  btn_review,
  ic_favorite_wht,
  test_thumbnail,
  test_thumbnail_green,
  test_thumbnail_red,
} from "../assets";
import Image from "next/legacy/image";
import Link from "next/link";
import { productsRequestNext, productsRequestFirst } from "../utils/api";
import Product from "./Product";

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  /** 상품 리스트 호출 함수 */
  const productListRequestFirst = (searchAfter: number) => {
    productsRequestFirst(50).then((res) => {
      let tempArr = productList;
      tempArr = res.data.result.data;
      setProductList([...tempArr]);
      console.log(tempArr);
    });
  };

  useEffect(() => {
    productListRequestFirst(50);
  }, []);

  return (
    <>
      {productList.map((i: any, j: number) => {
        return <Product product={i} key={`product${j}`} />;
      })}
    </>
  );
};

export default ProductList;
