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
          <ReviewButton>In Review (0)</ReviewButton>
          <ConfirmButton>Order confirmed (0)</ConfirmButton>
          <ShipButton>Shipped (1)</ShipButton>
          <DeliveredButton>Delivered (0)</DeliveredButton>
          <PickupButton>Pick up (0)</PickupButton>
          <CanceledButton>Canceled (0)</CanceledButton>
          <ReturnButton>Return (0)</ReturnButton>
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
  font-size: 24px;
  line-height: 28px;
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
  column-gap: 8px;
  row-gap: 10px;

  flex-wrap: wrap;
  margin-bottom: 20px;
`;
const AllButton = styled.button`
  width: 47px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #121822;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const ReviewButton = styled.button`
  width: 87px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const ConfirmButton = styled.button`
  width: 120px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const ShipButton = styled.button`
  width: 84px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const DeliveredButton = styled.button`
  width: 93px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const PickupButton = styled.button`
  width: 79px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const CanceledButton = styled.button`
  width: 93px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const ReturnButton = styled.button`
  width: 93px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;

export default order;
