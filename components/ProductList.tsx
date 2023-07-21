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
import { productsRequest } from "../utils/api";
import Product from "./Product";

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  /** 상품 리스트 호출 함수 */
  const productListRequestFirst = (searchAfter: number) => {
    productsRequest(10, 10).then((res) => {
      let tempArr = productList;
      tempArr = res.data.result.data;
      setProductList([...tempArr]);
    });
  };

  useEffect(() => {
    productListRequestFirst(10);
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
