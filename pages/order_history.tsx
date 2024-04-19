import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  OrderInfoBoxSample,
  SideBar,
} from "../components";
import Link from "next/link";
import { btn_web_back, ic_logo_gray } from "../assets";
import Image from "next/image";
import { goBack } from "../utils/functions";
import {
  ordersRequest,
  ordersClosingOrderRequest,
  ordersDeliveredRequest,
} from "../utils/api";

const useOrder_history = () => {
  const [orderCategory, setOrderCategory] = useState(0);
  const [clicked, setClicked] = useState(1); // 클릭 상태
  const [sum, setSum] = useState(0); // 주문들중 클릭한 상태에 해당하는 개수
  const [orders, setOrders] = useState<any>([]); // 주문 리스트
  const [ordersSample, setOrdersSample] = useState<any>([]);
  const [noData, setNoData] = useState(false);

  /** 주문 요청 핸들러 - ALL */
  const ordersAllRequestHandler = () => {
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

    ordersRequest(at, "ROLL", null, true, 20, null).then((res) => {
      console.log(res);
      // 실패 case
      if (res?.data.result.data === null) {
        setNoData(true);
        return;
      }

      // 성공 case
      res?.data.result.data && (tempOrder = res?.data.result.data);

      setOrders([...tempOrder]);

      ordersRequest(at, "SAMPLE", null, true, 20, null).then((res) => {
        console.log(res);
        // 성공 case
        res?.data.result.data && (tempOrder = res?.data.result.data);
        setOrdersSample([...tempOrder]);

        // 실패 case: 토큰 만료
      });
    });
  };

  /** 처음 렌더링시 주문 목록 세팅 */
  useEffect(() => {
    ordersAllRequestHandler();
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <Container>
      <SideBar />
      <Main>
        <TitleWrapper>
          <ImageWrapper onClick={() => goBack()}>
            <Image src={btn_web_back} alt={"btn_web_back"} />
          </ImageWrapper>
          <Title>Order history</Title>
        </TitleWrapper>
        <AllMeterSampleButtonWrapper>
          <MeterageButton
            isActive={orderCategory}
            onClick={() => setOrderCategory(0)}
          >
            Roll ({orders.length})
          </MeterageButton>
          <SampleButton
            isActive={orderCategory}
            onClick={() => setOrderCategory(1)}
          >
            Sample ({ordersSample.length})
          </SampleButton>
        </AllMeterSampleButtonWrapper>
        <RecentOrders>Recent orders {sum}</RecentOrders>
        <MeterageOrderWrapper isActive={orderCategory}>
          {orders.map((el: any, index: number) => {
            return (
              <OrderInfoBox
                data={el}
                clicked={clicked}
                accomplish={false}
                myAccount={false}
                key={`eas-${index}`}
              />
            );
          })}
        </MeterageOrderWrapper>
        <SampleOrderWrapper isActive={orderCategory}>
          {ordersSample.map((el: any, index: number) => {
            return (
              el.status != "CLOSING_ORDER" &&
              el.status != "RETURNS" &&
              el.status != "CANCEL" && (
                <OrderInfoBoxSample
                  data={el}
                  clicked={clicked}
                  accomplish={false}
                  myAccount={false}
                  key={`eas-${index}`}
                />
              )
            );
          })}
        </SampleOrderWrapper>
        {/* <OrderInfoBox accomplish={true} myAccount={false} /> */}
        {/** 카트에 담긴거 없을 때 */}
        <NoDataText render={noData && orders.length === 0}>
          There is no item yet
        </NoDataText>
      </Main>
      <MobileSideBar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 40px;
  max-width: 637px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 768px) {
    display: block;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    boxsizing: border-box;
  }
`;
const Main = styled.div`
  position: relative;
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 20px;
  }
`;

const AllMeterSampleButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;
const MeterageButton = styled.button<{ isActive: number }>`
  display: block;
  padding: 0;
  width: 100%;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #121822;
  border-radius: 2px;
  box-sizing: border-box;

  font-size: 12px;
  line-height: 14px;
  color: #121822;

  font-weight: ${(props) => {
    return props.isActive == 0 ? "700" : "400";
  }};

  border: ${(props) => {
    return props.isActive == 0 ? "1px solid #121822" : "1px solid #dee8ec";
  }};
  cursor: pointer;
`;
const SampleButton = styled.button<{ isActive: number }>`
  display: block;
  padding: 0;
  width: 100%;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;

  font-weight: ${(props) => {
    return props.isActive == 1 ? "700" : "400";
  }};

  border: ${(props) => {
    return props.isActive == 1 ? "1px solid #121822" : "1px solid #dee8ec";
  }};

  cursor: pointer;
`;
const RecentOrders = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 16px;
  height: 30px;
  background: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ImageWrapper = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    font-size: 22px;
    line-height: 26px;
    margin-left: 8px;
  }
`;
const MeterageOrderWrapper = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 0 ? "block" : "none";
  }};
`;
const SampleOrderWrapper = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 1 ? "block" : "none";
  }};
`;
const NoDataText = styled.div<{ render: boolean }>`
  display: ${(props) => {
    return props.render ? "block" : "none";
  }};
  padding-top: 98px;
  padding-bottom: 98px;

  text-align: center;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.154px;
  color: #a4b0b2;
`;

export default useOrder_history;
