import React from "react";
import styled from "styled-components";
import { SideBar, CartMeterageProduct } from "../components";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back } from "../assets";
import { goBack } from "../utils/functions";

const cart = () => {
  return (
    <>
      <Container>
        <SideBar />
        <Main>
          <TitleWrapper>
            <ImageWrapper onClick={() => goBack()}>
              <Image src={btn_web_back} alt={"btn_web_back"} />
            </ImageWrapper>
            <Title>Cart</Title>
          </TitleWrapper>
          <AllMeterSampleButtonWrapper>
            <AllButton>ALL (2)</AllButton>
            <MeterageButton>Meterage (2)</MeterageButton>
            <SampleButton>Sample (0)</SampleButton>
          </AllMeterSampleButtonWrapper>
          <CartMeterageProduct />
          <CartMeterageProduct />
          <RemovePurchaseButtonWrapper>
            <RemoveButton>Remove(2)</RemoveButton>
            <Link href="/check_out" style={{ textDecoration: "none" }}>
              <PurchaseButton>Process to purchase(2)</PurchaseButton>
            </Link>
          </RemovePurchaseButtonWrapper>
        </Main>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
  max-width: 637px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
    boxsizing: border-box;
  }
`;
const Main = styled.div`
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 767px) {
    margin-left: 0;
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
const AllMeterSampleButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: space-between;
  width: 100%;
`;
const AllButton = styled.button`
  padding: 0;
  width: 98px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #0a4459;
  border-radius: 2px;
  box-sizing: border-box;

  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #0a4459;
  @media screen and (max-width: 767px) {
    width: 24%;
  }
`;
const MeterageButton = styled.button`
  padding: 0;
  width: 160px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #0a4459;
  @media screen and (max-width: 767px) {
    width: 39%;
  }
`;
const SampleButton = styled.button`
  padding: 0;
  width: 150px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #0a4459;
  @media screen and (max-width: 767px) {
    width: 36%;
  }
`;
const RemovePurchaseButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 767px) {
    gap: 8px;
  }
`;
const RemoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2.99748px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #0a4459;
  @media screen and (max-width: 767px) {
    width: 50vw;
  }
`;
const PurchaseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 279px;
  height: 48px;
  background: #ff5c01;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 55vw;
  }
`;

export default cart;
