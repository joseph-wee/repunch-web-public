import { is } from "immer/dist/internal";
import React, { useEffect, useRef, useState } from "react";
import { loginRefreshRequest, productsRequest } from "../utils/api";
import Product from "./Product";

const ProductList = ({
  sortType,
  setResult,
  colors,
  projects,
  designs,
  materials,
  origins,
  widthList,
  weightList,
}: {
  sortType: any;
  setResult: React.Dispatch<React.SetStateAction<number>>;
  colors: any;
  projects: any;
  designs: any;
  materials: any;
  origins: any;
  widthList: any;
  weightList: any;
}) => {
  const [productList, setProductList] = useState<any>([]);

  const [searchAfter, setSearchAfter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef<any>();

  /** 필터링 값 리턴 */
  const returnOfFilter = (state: any) => {
    if (state)
      return state
        .filter((x: any) => x.isChecked === true)
        .map((el: any) => {
          return el.projectNo || el.designNo || el.materialNo || el.colorNo;
        })
        .join();

    return null;
  };

  /** 상품 리스트 초기화 후 호출 함수 */
  const productListRequestInitHandler = () => {
    let at: any = localStorage.getItem("at");
    let rt = localStorage.getItem("rt");

    // 로그인 상태
    if (at) {
      loginRefreshRequest(rt).then((res) => {
        console.log(1);
        // 토큰 재발급 성공 case
        // 엑세스 토큰, 리프레쉬 토큰 세팅 후 카트목록 재요청
        if (res?.data.status == 200) {
          at = res.data.result.access_token;
          rt = res.data.result.refresh_token;
          localStorage.setItem("at", at);
          localStorage.setItem("rt", `${rt}`);
          console.log(2);
          productsRequest(
            at,
            sortType,
            8,
            null,
            returnOfFilter(colors),
            returnOfFilter(projects),
            returnOfFilter(designs),
            returnOfFilter(materials),
            null,
            null
          ).then((res) => {
            console.log(res);
            let x = res?.data.result.data;
            if (x === null) {
              setProductList([]);
              return;
            }
            setProductList([...x]);
            setSearchAfter(x[x.length - 1].productNo);
            setLoading(false);
            setResult(res?.data.result.metadata.totalCount);
          });
        }
      });
      return;
    }
    // 비로그인 상태
    productsRequest(
      null,
      sortType,
      8,
      null,
      returnOfFilter(colors),
      returnOfFilter(projects),
      returnOfFilter(designs),
      returnOfFilter(materials),
      null,
      null
    ).then((res) => {
      console.log(3);
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
    let at: any = localStorage.getItem("at");
    let rt = localStorage.getItem("rt");
    if (at) {
      productsRequest(
        at,
        sortType,
        8,
        searchAfter,
        returnOfFilter(colors),
        returnOfFilter(projects),
        returnOfFilter(designs),
        returnOfFilter(materials),
        null,
        null
      ).then((res) => {
        if (res?.data.result.data) {
          console.log(res);
          let x = res?.data.result.data;
          setProductList([...productList, ...x]);
          setSearchAfter(x[x.length - 1].productNo);
          console.log(x[x.length - 1].productNo);
          setLoading(false);
          return;
        }
      });
      return;
    }
    productsRequest(
      null,
      sortType,
      8,
      searchAfter,
      returnOfFilter(colors),
      returnOfFilter(projects),
      returnOfFilter(designs),
      returnOfFilter(materials),
      null,
      null
    ).then((res) => {
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
  }, [
    sortType,
    colors,
    projects,
    designs,
    materials,
    origins,
    widthList,
    weightList,
  ]);

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
