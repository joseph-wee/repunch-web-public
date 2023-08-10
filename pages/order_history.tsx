import React, { useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  OrderInfoBoxSample,
  RecentOrders,
  SideBar,
} from "../components";
import Link from "next/link";
import { btn_web_back } from "../assets";
import Image from "next/image";
import { goBack } from "../utils/functions";

const useOrder_history = () => {
  const [orderCategory, setOrderCategory] = useState(0);

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
            Roll (1)
          </MeterageButton>
          <SampleButton
            isActive={orderCategory}
            onClick={() => setOrderCategory(1)}
          >
            Sample (1)
          </SampleButton>
        </AllMeterSampleButtonWrapper>
        <RecentOrders />
        <MeterageOrderWrapper isActive={orderCategory}>
          <OrderInfoBox accomplish={true} myAccount={false} />
        </MeterageOrderWrapper>
        <SampleOrderWrapper isActive={orderCategory}>
          <OrderInfoBoxSample accomplish={true} myAccount={false} />
        </SampleOrderWrapper>
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

export default useOrder_history;
