import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  OrderInfoBoxSample,
  SideBar,
} from "../components";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back, ic_logo_gray } from "../assets";
import { goBack } from "../utils/functions";
import { ordersRequest } from "../utils/api";

const useOrder = () => {
  const [clicked, setClicked] = useState(1); // 클릭 상태
  const [sum, setSum] = useState(0); // 주문들중 클릭한 상태에 해당하는 개수
  const [orders, setOrders] = useState<any>([]); // 주문 리스트
  const [ordersSample, setOrdersSample] = useState<any>([]);

  const [countInReview, setCountInReview] = useState(0);
  const [countOrderConfirmed, setCountOrderConfiremd] = useState(0);
  const [countInProduction, setCountInProduction] = useState(0);
  const [countShipped, setCountShipped] = useState(0);
  const [countDelivered, setCountDelivered] = useState(0);
  const [countPickUp, setCountPickUp] = useState(0);

  /** 주문 요청 핸들러 - ROLL, ALL */
  const ordersRollRequestHandler = () => {
    let at: string | null;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    ordersRequest(at, null, null, false, 30, null).then((res) => {
      let sumInReview = countInReview;
      let sumOrderConfirmed = countOrderConfirmed;
      let sumInProduction = countInProduction;
      let sumShipped = countShipped;
      let sumDelivered = countDelivered;
      let sumPickUp = countPickUp;

      // 실패 case
      if (res?.data.result.data === null) {
        return;
      }

      console.log(res);
      // 성공 case
      setOrders([...res?.data.result.data]);
      for (const el of res?.data.result.data) {
        el.status == "IN_REVIEW" && (sumInReview += 1);
        el.status == "ORDER_CONFIRMED" && (sumOrderConfirmed += 1);
        el.status == "IN_PRODUCTION" && (sumInProduction += 1);
        el.status == "SHIPPED" && (sumShipped += 1);
        el.status == "DELIVERED" && (sumDelivered += 1);
        el.status == "PICK_UP" && (sumPickUp += 1);
      }

      setCountInReview(sumInReview);
      setCountOrderConfiremd(sumOrderConfirmed);
      setCountInProduction(sumInProduction);
      setCountShipped(sumShipped);
      setCountDelivered(sumDelivered);
      setCountPickUp(sumPickUp);

      // 실패 case: 토큰 만료
    });
  };

  /** recent orders, All, in review... 개수 계산 */
  const calculator = (clicked: number) => {
    clicked == 1 && setSum(orders.length);
    clicked == 2 && setSum(countInReview);
    clicked == 3 && setSum(countOrderConfirmed);
    clicked == 4 && setSum(countInProduction);
    clicked == 5 && setSum(countShipped);
    clicked == 6 && setSum(countDelivered);
    clicked == 7 && setSum(countPickUp);
  };

  /** 처음 렌더링시 주문 목록 세팅 */
  useEffect(() => {
    ordersRollRequestHandler();
  }, []);

  /** recent orders 개수 계산 - clickd, orders 변경감지 */
  useEffect(() => {
    orders.length > 0 && calculator(clicked);
  }, [clicked, orders]);

  return (
    <Container>
      <SideBar />
      <Main>
        <TitleWrapper>
          <ImageWrapper onClick={() => goBack()}>
            <Image src={btn_web_back} alt={"btn_web_back"} />
          </ImageWrapper>
          <Title>Order</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <AllButton onClick={() => setClicked(1)} clicked={clicked}>
            ALL
          </AllButton>
          <ReviewButton onClick={() => setClicked(2)} clicked={clicked}>
            In Review ({countInReview})
          </ReviewButton>
          <ConfirmButton onClick={() => setClicked(3)} clicked={clicked}>
            Order confirmed ({countOrderConfirmed})
          </ConfirmButton>
          <ShipButton onClick={() => setClicked(4)} clicked={clicked}>
            In production ({countInProduction})
          </ShipButton>
          <DeliveredButton onClick={() => setClicked(5)} clicked={clicked}>
            Shipped ({countShipped})
          </DeliveredButton>
          <PickupButton onClick={() => setClicked(6)} clicked={clicked}>
            Delivered ({countDelivered})
          </PickupButton>
          {/* <CanceledButton onClick={() => setClicked(7)} clicked={clicked}>
            Pick up ({countPickUp})
          </CanceledButton> */}
        </ButtonWrapper>
        <RecentOrders>Recent orders {sum}</RecentOrders>
        {orders.map((el: any, index: number) => {
          return (
            el.status != "CLOSING_ORDER" &&
            el.status != "RETURNS" &&
            el.status != "CANCEL" &&
            (el.items[0].product.orderUnitType == "ROLL" ? (
              <OrderInfoBox
                data={el}
                clicked={clicked}
                accomplish={false}
                myAccount={false}
                key={`eas-${index}`}
              />
            ) : (
              <OrderInfoBoxSample
                data={el}
                clicked={clicked}
                accomplish={false}
                myAccount={false}
                key={`eas-${index}`}
              />
            ))
          );
        })}
        {/** 카트에 담긴거 없을 때 */}
        <NoDataBox render={sum === 0}>
          <NoDataImageWrapper>
            <Image
              src={ic_logo_gray}
              width={84}
              height={84}
              alt="nodata_logo_gray"
            />
          </NoDataImageWrapper>
          <NoDataText>
            There is no
            <br />
            information to display
          </NoDataText>
        </NoDataBox>
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
const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  row-gap: 10px;

  flex-wrap: wrap;
  margin-bottom: 20px;
`;
const AllButton = styled.button<{ clicked: number }>`
  width: 47px;
  height: 36px;
  background-color: #ffffff;
  ${(props) => {
    switch (props.clicked) {
      case 1:
        return `
        border: 1px solid #121822;
        font-weight: 700;
        `;
      default:
        return `
          border: 1px solid #DEE8EC;
          font-weight: 400;
          `;
    }
  }};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
`;
const ReviewButton = styled.button<{ clicked: number }>`
  min-width: 87px;
  height: 36px;
  background-color: #ffffff;
  ${(props) => {
    switch (props.clicked) {
      case 2:
        return `
        border: 1px solid #121822;
        font-weight: 700;
        `;
      default:
        return `
          border: 1px solid #DEE8EC;
          font-weight: 400;
          `;
    }
  }};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
`;
const ConfirmButton = styled.button<{ clicked: number }>`
  min-width: 122px;
  height: 36px;
  background-color: #ffffff;
  ${(props) => {
    switch (props.clicked) {
      case 3:
        return `
        border: 1px solid #121822;
        font-weight: 700;
        `;
      default:
        return `
          border: 1px solid #DEE8EC;
          font-weight: 400;
          `;
    }
  }};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
`;
const ShipButton = styled.button<{ clicked: number }>`
  min-width: 104px;
  height: 36px;
  background-color: #ffffff;
  ${(props) => {
    switch (props.clicked) {
      case 4:
        return `
        border: 1px solid #121822;
        font-weight: 700;
        `;
      default:
        return `
          border: 1px solid #DEE8EC;
          font-weight: 400;
          `;
    }
  }};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
`;
const DeliveredButton = styled.button<{ clicked: number }>`
  min-width: 84px;
  height: 36px;
  background-color: #ffffff;
  ${(props) => {
    switch (props.clicked) {
      case 5:
        return `
        border: 1px solid #121822;
        font-weight: 700;
        `;
      default:
        return `
          border: 1px solid #DEE8EC;
          font-weight: 400;
          `;
    }
  }};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
`;
const PickupButton = styled.button<{ clicked: number }>`
  width: 93px;
  height: 36px;
  background-color: #ffffff;
  ${(props) => {
    switch (props.clicked) {
      case 6:
        return `
        border: 1px solid #121822;
        font-weight: 700;
        `;
      default:
        return `
          border: 1px solid #DEE8EC;
          font-weight: 400;
          `;
    }
  }};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
`;
const CanceledButton = styled.button<{ clicked: number }>`
  width: 79px;
  height: 36px;
  background-color: #ffffff;
  ${(props) => {
    switch (props.clicked) {
      case 7:
        return `
        border: 1px solid #121822;
        font-weight: 700;
        `;
      default:
        return `
          border: 1px solid #DEE8EC;
          font-weight: 400;
          `;
    }
  }};
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
`;
const ReturnButton = styled.button`
  width: 93px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
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
const NoDataBox = styled.div<{ render: boolean }>`
  display: ${(props) => {
    return props.render ? "block" : "none";
  }};
  padding-top: 60px;
`;
const NoDataImageWrapper = styled.div`
  width: 84px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
const NoDataText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.154px;
  color: #a4b0b2;
`;

export default useOrder;
