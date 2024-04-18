import { is } from "immer/dist/internal";
import React, { useEffect, useRef, useState } from "react";
import {
  likeListRequest,
  loginRefreshRequest,
  productsRequest,
} from "../utils/api";
import Product from "./Product";
import ProductLike from "./ProductLike";

const ProductLikeList = ({
  sortType,
  setResult,
  setNoData,
  result,
}: {
  sortType: any;
  setResult: React.Dispatch<React.SetStateAction<number>>;
  setNoData: React.Dispatch<React.SetStateAction<boolean>>;
  result: any;
}) => {
  const [productList, setProductList] = useState<any>([]);

  const [searchAfter, setSearchAfter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef<any>();

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
          likeListRequest(at).then((res) => {
            // 데이터 없는경우
            if (res?.data.result.data === null) {
              setNoData(true);
              return;
            }
            console.log(3);
            let x = res?.data.result.data;
            console.log(x);
            setProductList([...x]);
            setSearchAfter(x[x.length - 1].productNo);
            setLoading(false);
            setResult(res?.data.result.metadata.totalCount);
          });
        }
      });
      return;
    }
  };

  /** sortType 바뀌면 productList초기화 후 다시 상품 리스트 호출 */
  useEffect(() => {
    productListRequestInitHandler();
  }, [sortType]);

  /** 카운트 개수 계산 */
  useEffect(() => {
    let count = 0;
    productList &&
      productList.forEach((el: any) => {
        el.like === true && count++;
      });
    setResult(count);
  }, [productList]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(([{ isIntersecting }]) => {
  //     isIntersecting && !loading && productListRequestAdditionalHandler();
  //   });
  //   observer.observe(ref.current);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [loading, searchAfter]);

  return (
    <>
      {productList &&
        productList.map((i: any, j: number) => {
          return (
            <>
              {i.like && (
                <ProductLike
                  product={i}
                  key={`product${j}`}
                  index={j}
                  productList={productList}
                  setProductList={setProductList}
                  setNoData={setNoData}
                  setResult={setResult}
                  result={result}
                />
              )}
            </>
          );
        })}
      {productList && <div ref={ref}></div>}
    </>
  );
};

export default ProductLikeList;
