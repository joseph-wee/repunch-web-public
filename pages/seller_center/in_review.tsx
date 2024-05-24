import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ordersRequest, sellerOrdersRequest } from "../../utils/api";
import { OrderInfoBox } from "../../components";
import { SellerOrderBox } from "../../components/seller_center";

const in_review = () => {
  const [orderCategory, setOrderCategory] = useState(0);
  const [clicked, setClicked] = useState(1); // 클릭 상태
  const [sum, setSum] = useState(""); // 주문들중 클릭한 상태에 해당하는 개수
  const [orders, setOrders] = useState<any>([]); // 주문 리스트
  const [ordersSample, setOrdersSample] = useState<any>([]);
  const [noData, setNoData] = useState(false);

  const [loading, setLoading] = useState(false);
  const ref = useRef<any>();
  const [searchAfter, setSearchAfter] = useState<number | null>(null);

  /** 주문 요청 핸들러 - in review */
  const sellerOrdersRequestHandler = () => {
    let at: string | null;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    let tempOrder: any;

    sellerOrdersRequest(at, "ROLL", null, true, 20, searchAfter).then((res) => {
      console.log(res);
      // 실패 case
      if (res?.data.result.data === null) {
        setNoData(true);
        return;
      }

      // 성공 case
      res?.data.result.data && (tempOrder = res?.data.result.data);

      setOrders([...tempOrder]);
      setSum(res?.data.result.data ? tempOrder.length : 0);
      setSearchAfter(res?.data.result.metadata.searchAfter);
    });
  };

  /** 처음 렌더링시 주문 목록 세팅 */
  useEffect(() => {
    sellerOrdersRequestHandler();
  }, []);

  /** 옵저버 갱신 */
  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      isIntersecting && !loading && sellerOrdersRequestHandler();
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [loading, searchAfter]);

  return (
    <Container>
      {orders &&
        orders.map((el: any, i: number) => {
          return (
            <SellerOrderBox
              data={el}
              orders={orders}
              setOrders={setOrders}
              index={i}
              clicked={clicked}
              accomplish={false}
              myAccount={false}
              key={`eats-${i}`}
            />
          );
        })}
      {orders && <div ref={ref} />}
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding-top: 24px;
  max-width: 427px;
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
  }
`;

export default in_review;
