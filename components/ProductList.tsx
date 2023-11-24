import { is } from "immer/dist/internal";
import React, { useEffect, useRef, useState } from "react";
import { productsRequest } from "../utils/api";
import Product from "./Product";

const ProductList = ({
  sortType,
  setResult,
}: {
  sortType: any;
  setResult: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [productList, setProductList] = useState<any>([]);

  const [searchAfter, setSearchAfter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef<any>();

  /** 상품 리스트 초기화 후 호출 함수 */
  const productListRequestInitHandler = () => {
    let at = localStorage.getItem("at");
    let rt = localStorage.getItem("rt");

    productsRequest(at, sortType, 8, null).then((res) => {
      let x = res?.data.result.data;
      console.log(x);
      setProductList([...x]);
      setSearchAfter(x[x.length - 1].productNo);
      setLoading(false);
      setResult(res?.data.result.metadata.totalCount);
    });
  };

  /** 상품 리스트 호출 함수 */
  const productListRequestAdditionalHandler = () => {
    productsRequest(null, sortType, 8, searchAfter).then((res) => {
      if (res?.data.result.data) {
        let x = res?.data.result.data;
        setProductList([...productList, ...x]);
        setSearchAfter(x[x.length - 1].productNo);
        console.log(x[x.length - 1].productNo);
        setLoading(false);
        return;
      }
    });
  };

  /** sortType 바뀌면 productList초기화 후 다시 상품 리스트 호출 */
  useEffect(() => {
    productListRequestInitHandler();
  }, [sortType]);

  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      isIntersecting && !loading && productListRequestAdditionalHandler();
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [loading, searchAfter]);

  return (
    <>
      {productList &&
        productList.map((i: any, j: number) => {
          return <Product product={i} key={`product${j}`} />;
        })}
      {productList && <div ref={ref}></div>}
    </>
  );
};

export default ProductList;
