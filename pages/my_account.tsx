import React, { useEffect } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  RecentOrders,
  SideBar,
} from "../components";
import Link from "next/link";
import { userInfoRequest } from "../utils/api";

const useMy_account = () => {
  useEffect(() => {
    userInfoRequest(sessionStorage.getItem("at")).then((res) => {
      console.log(res);
    });
  }, []);

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
              <Count>1</Count>
              <CountTitle>Order</CountTitle>
            </Box>
          </Link>
        </FavoriteCartOrderCountWrapper>
        <RecentOrders />
        <OrderInfoBox accomplish={true} myAccount={true} />
        <InfoContainer>
          <InfoWrapper>
            <InfoTitle>Mail Address</InfoTitle>
            <InfoContent>jdworks@naver.com</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Name</InfoTitle>
            <InfoContent>Kim Jae Hyeun</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Company nam</InfoTitle>
            <InfoContent>Repp.</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Country</InfoTitle>
            <InfoContent>South Korea</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>Phone Number</InfoTitle>
            <InfoContent>+82(0)10-1234-5678</InfoContent>
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
