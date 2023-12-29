import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  OrderInfoBoxSample,
  SideBar,
} from "../components";
import Link from "next/link";
import {
  orderCountRequest,
  ordersRequest,
  userInfoRequest,
} from "../utils/api";

const useMy_account = () => {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    userInfoRequest(localStorage.getItem("at")).then((res) => {
      setData({ ...res?.data.result });
      console.log(res?.data.result);
    });
  }, []);

  const [clicked, setClicked] = useState(1); // 클릭 상태
  const [sum, setSum] = useState(0); // 주문들중 클릭한 상태에 해당하는 개수
  const [orders, setOrders] = useState<any>([]); // 주문 리스트

  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const [countInReview, setCountInReview] = useState(0);
  const [countOrderConfirmed, setCountOrderConfiremd] = useState(0);
  const [countInProduction, setCountInProduction] = useState(0);
  const [countShipped, setCountShipped] = useState(0);
  const [countDelivered, setCountDelivered] = useState(0);
  const [countPickUp, setCountPickUp] = useState(0);
  /** 주문 요청 핸들러 - ALL */
  const ordersAllRequestHandler = () => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    ordersRequest(at, "ROLL", null, false, 20, null).then((res) => {
      let sumInReview = countInReview;
      let sumOrderConfirmed = countOrderConfirmed;
      let sumInProduction = countInProduction;
      let sumShipped = countShipped;
      let sumDelivered = countDelivered;
      let sumPickUp = countPickUp;

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
      // 실패 case
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
    ordersAllRequestHandler();
    orderCountRequestHandler();
  }, []);

  /** recent orders 개수 계산 - clickd, orders 변경감지 */
  useEffect(() => {
    orders.length > 0 && calculator(clicked);
  }, [clicked, orders]);

  /** 주문 요청 목록 핸들러 */
  const orderCountRequestHandler = () => {
    let at: string | null;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    orderCountRequest(at).then((res: any) => {
      console.log(res);
    });
  };

  return (
    <Container>
      <SideBar />
      <Main>
        <Title>Your ID</Title>
        <WelcomeText>Welcome to your Account</WelcomeText>
        <FavoriteCartOrderCountWrapper>
          <Link href="/favorits" style={{ textDecoration: "none" }}>
            <Box>
              <Count>13</Count>
              <CountTitle>Favorite</CountTitle>
            </Box>
          </Link>
          <Link href="/cart" style={{ textDecoration: "none" }}>
            <Box>
              <Count>13</Count>
              <CountTitle>Cart</CountTitle>
            </Box>
          </Link>
          <Link href="/order" style={{ textDecoration: "none" }}>
            <Box>
              <Count>20</Count>
              <CountTitle>Order</CountTitle>
            </Box>
          </Link>
        </FavoriteCartOrderCountWrapper>
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
        <InfoContainer>
          <InfoWrapper>
            <InfoTitle>Mail Address</InfoTitle>
            <InfoContent>{data.userId}</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Name</InfoTitle>
            <InfoContent>{`${data.lastName} ${data.firstName}`}</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Company name</InfoTitle>
            <InfoContent>Repunch</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Country</InfoTitle>
            <InfoContent>South Korea</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Phone Number</InfoTitle>
            <InfoContent>+82(0)10-9908-8763</InfoContent>
          </InfoWrapper>
        </InfoContainer>
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
  @media screen and (max-width: 1280px) {
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
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    margin-bottom: 9px;
    font-size: 22px;
    line-height: 26px;
  }
`;
const WelcomeText = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    position: static;
  }
`;
const FavoriteCartOrderCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 50px;
  padding-right: 55px;
  height: 78px;
  background-color: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  @media screen and (max-width: 768px) {
    padding-left: 10%;
    padding-right: 10%;
  }
`;
const Box = styled.div`
  padding-top: 20px;
  box-sizing: border-box;
  width: 50px;
  height: 78px;
`;
const Count = styled.div`
  margin-bottom: 8px;
  width: 50px;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #121822;
`;
const CountTitle = styled.div`
  width: 50px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  color: #536c6d;
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
const InfoContainer = styled.div`
  margin-top: 10px;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
`;
const InfoTitle = styled.div`
  margin-right: 41.5px;
  width: 101.46px;
  font-weight: 400;
  font-size: 14px;
  line-height: 34px;
  color: #a4abba;
`;
const InfoContent = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #121822;
`;

export default useMy_account;
