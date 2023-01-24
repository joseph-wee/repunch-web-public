import React from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  RecentOrders,
  SideBar,
} from "../components";
import Link from "next/link";
import { btn_web_back } from "../assets";
import Image from "next/image";

const order_history = () => {
  return (
    <Container>
      <SideBar />
      <Main>
        <TitleWrapper>
          <ImageWrapper>
            <Image src={btn_web_back} alt={"btn_web_back"} />
          </ImageWrapper>
          <Title>Order history</Title>
        </TitleWrapper>
        <RecentOrders />
        <OrderInfoBox accomplish={true} myAccount={false} />
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
    margin-left: 8px;
  }
`;

export default order_history;
