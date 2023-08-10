import React, { useState } from "react";
import styled from "styled-components";
import { MobileSideBar, OrderInfoBox, SideBar } from "../components";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back } from "../assets";
import { goBack } from "../utils/functions";

const order = () => {
  const [clicked, setClicked] = useState(1);

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
            In Review (0)
          </ReviewButton>
          <ConfirmButton onClick={() => setClicked(3)} clicked={clicked}>
            Order confirmed (0)
          </ConfirmButton>
          <ShipButton onClick={() => setClicked(4)} clicked={clicked}>
            In production (0)
          </ShipButton>
          <DeliveredButton onClick={() => setClicked(5)} clicked={clicked}>
            Shipped (1)
          </DeliveredButton>
          <PickupButton onClick={() => setClicked(6)} clicked={clicked}>
            Delivered (0)
          </PickupButton>
          <CanceledButton onClick={() => setClicked(7)} clicked={clicked}>
            Pick up (0)
          </CanceledButton>
        </ButtonWrapper>

        {clicked == 1 || clicked == 5 ? (
          <>
            <RecentOrders>Recent orders 1</RecentOrders>
            <OrderInfoBox accomplish={false} myAccount={false} />
          </>
        ) : (
          <RecentOrders>Recent orders 0</RecentOrders>
        )}
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
  color: #121822;
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
  width: 87px;
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
  width: 122px;
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
  width: 104px;
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
  width: 84px;
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

export default order;
