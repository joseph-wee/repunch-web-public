import React from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  RecentOrders,
  SideBar,
} from "../components";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back } from "../assets";
import { goBack } from "../utils/functions";

const order = () => {
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
          <AllButton>ALL</AllButton>
          <InProductionButton>In Production (0)</InProductionButton>
          <ShippedButton>Shipped (0)</ShippedButton>
          <ReceivedButton>Received (1)</ReceivedButton>
          <DeniedButton>Denied (0)</DeniedButton>
        </ButtonWrapper>
        <RecentOrders />
        <OrderInfoBox accomplish={false} myAccount={false} />
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
  @media screen and (max-width: 767px) {
    display: block;
    padding-left: 20px;
    padding-right: 20px;
    boxsizing: border-box;
  }
`;
const Main = styled.div`
  position: relative;
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.011em;
  color: #0a4459;
  @media screen and (max-width: 767px) {
    font-size: 22px;
    line-height: 26px;
    margin-left: 8px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 11px 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;
const AllButton = styled.button`
  width: 60px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #0a4459;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #0a4459;
`;
const InProductionButton = styled.button`
  width: 138px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0a4459;
`;
const ShippedButton = styled.button`
  width: 102px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0a4459;
`;
const ReceivedButton = styled.button`
  width: 102px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0a4459;
`;
const DeniedButton = styled.button`
  width: 102px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0a4459;
`;

export default order;
