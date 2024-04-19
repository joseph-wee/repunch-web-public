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
  cartListRequest,
  likeListRequest,
  loginRefreshRequest,
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

  const [orders, setOrders] = useState<any>([]); // 최신 주문 리스트
  const [totalOrdersCount, setTotalOrdersCount] = useState(0); // 전체 주문 개수
  const [recentOrderCount, setRecentOrderCount] = useState(0); // 최근 주문 개수
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [noData, setNoData] = useState(false);

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
      console.log(res?.data.result);
      // 실패 case: 주문 목록 없을 때
      if (res?.data.result.data === null) {
        console.log("?");
        setNoData(true);
        return;
      }

      // 성공 case
      setOrders([...res?.data.result.data]);

      // 실패 case: 토큰 만료
      // 실패 case
    });
  };

  /** 처음 렌더링시 주문 목록 세팅 */
  useEffect(() => {
    ordersAllRequestHandler();
    orderCountRequestHandler();
  }, []);

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
      const result = res?.data.result;
      let x = 0;
      let y = 0;
      result.forEach((el: any) => {
        x += el.count;
        el.status !== "CLOSING_ORDER" &&
          el.status !== "CANCELED" &&
          el.status !== "RETURNS" &&
          (y += el.count);
      });
      setTotalOrdersCount(x);
      setRecentOrderCount(y);
    });
  };

  /** ROLL 카트 목록 핸들러 */
  const cartListHandler = async (searchAfter: number) => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    let nextSearchAfter = await cartListRequest(
      at,
      "ROLL",
      50,
      searchAfter
    ).then((res) => {
      res?.data.result.metadata.totalCount &&
        setCartCount(res?.data.result.metadata.totalCount);

      let tempNextSearchAfter; // 다음 장바구니 목록 가져오기 위한 임시 저장 변수

      // 실패 case (토큰 유효하지 않음)
      if (res?.data.code == 1003) {
        loginRefreshRequest(rt).then((res) => {
          // 토큰 재발급 성공 case
          // 엑세스 토큰, 리프레쉬 토큰 세팅 후 카트목록 재요청
          if (res?.data.status == 200) {
            at = res.data.result.access_token;
            rt = res.data.result.refresh_token;

            if (sessionStorage.getItem("at")) {
              sessionStorage.setItem("at", at);
              sessionStorage.setItem("rt", `${rt}`);
            } else {
              localStorage.setItem("at", at);
              localStorage.setItem("rt", `${rt}`);
            }

            // 카트목록 재요청
            cartListRequest(at, "ROLL", 50, searchAfter).then((res) => {
              // 성공 case
              if (res?.data.status == 200) {
                res?.data.result.metadata.totalCount &&
                  setCartCount(res?.data.result.metadata.totalCount);
                // 장바구니 개수가 0개이면 리턴
                if (res.data.result.data == null) {
                  return;
                }

                // nextSearchAfter 저장
                tempNextSearchAfter = res?.data.result.metadata.searchAfter;
                // response 가공해서 저장
              }
            });
          }
        });

        return;
      }

      // 성공 case
      if (res?.data.status == 200) {
        // 장바구니 개수가 0개이면 리턴
        res?.data.result.metadata.totalCount &&
          setCartCount(res?.data.result.metadata.totalCount);
        if (res.data.result.data == null) {
          return;
        }

        // nextSearchAfter 저장
        tempNextSearchAfter = res?.data.result.metadata.searchAfter;
        // response 가공해서 저장

        return tempNextSearchAfter;
      }

      // 실패 case: 장바구니 목록 더 이상 조회할게 없음
      if (res?.data.code == 9999) {
        return -1;
      }
    });
    return nextSearchAfter;
  };

  /** favorite, cart 개수 카운팅 나중에 바꾸기 */
  useEffect(() => {
    const at = localStorage.getItem("at");
    likeListRequest(at).then((res) => {
      setFavoriteCount(res?.data.result.metadata.totalCount);
    });
    cartListHandler(0);
  }, []);

  return (
    <Container>
      <SideBar />
      <Main>
        <Title>{data.userId !== undefined ? `${data.userId}` : ""}</Title>
        <WelcomeText>Welcome to your Account</WelcomeText>
        <FavoriteCartOrderCountWrapper>
          <Link href="/favorits" style={{ textDecoration: "none" }}>
            <Box>
              <Count>{favoriteCount && `${favoriteCount}`}</Count>
              <CountTitle>Favorite</CountTitle>
            </Box>
          </Link>
          <Link href="/cart" style={{ textDecoration: "none" }}>
            <Box>
              <Count>{cartCount && `${cartCount}`}</Count>
              <CountTitle>Cart</CountTitle>
            </Box>
          </Link>
          <Link href="/order" style={{ textDecoration: "none" }}>
            <Box>
              <Count>{totalOrdersCount && `${totalOrdersCount}`}</Count>
              <CountTitle>Order</CountTitle>
            </Box>
          </Link>
        </FavoriteCartOrderCountWrapper>
        <RecentOrders>
          Recent orders {recentOrderCount && `${recentOrderCount}`}
        </RecentOrders>
        {orders.map((el: any, index: number) => {
          return (
            el.status != "CLOSING_ORDER" &&
            el.status != "RETURNS" &&
            el.status != "CANCEL" &&
            (el.items[0].product.orderUnitType == "ROLL" ? (
              <OrderInfoBox
                data={el}
                clicked={1}
                accomplish={false}
                myAccount={false}
                key={`eas-${index}`}
              />
            ) : (
              <OrderInfoBoxSample
                data={el}
                clicked={1}
                accomplish={false}
                myAccount={false}
                key={`eas-${index}`}
              />
            ))
          );
        })}
        <NoDataText render={noData && orders.length === 0}>
          There is no item yet
        </NoDataText>

        <InfoContainer>
          <InfoWrapper>
            <InfoTitle>Mail Address</InfoTitle>
            <InfoContent>{data.userId}</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Name</InfoTitle>
            <InfoContent>{`${data.firstName} ${data.lastName}`}</InfoContent>
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
