import React from "react";
import styled from "styled-components";
import { SideBar, CartMeterageProduct } from "../components";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back, ic_info } from "../assets";
import { goBack } from "../utils/functions";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMeterage, setSample } from "../features/login/cartSlice";
import { useRouter } from "next/router";

const useCart = () => {
  const [isActive, setIsActive] = useState(false);

  const { value: cartValue } = useAppSelector((state) => state.cartValue);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartPurchaseHandler = () => {
    if (cartValue == 0) {
      router.push("/check_out");
    }
    if (cartValue == 1) {
      setIsActive(true);
    }
  };

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
          <AllMeterSampleButtonWrapper isActive={cartValue}>
            <MeterageButton
              isActive={cartValue}
              onClick={() => dispatch(setMeterage())}
            >
              Meterage (2)
            </MeterageButton>
            <SampleButton
              isActive={cartValue}
              onClick={() => dispatch(setSample())}
            >
              Sample (0)
            </SampleButton>
          </AllMeterSampleButtonWrapper>
          <SampleInfoMessage isActive={cartValue}>
            <Image src={ic_info} alt={"ic_info"} />
            Samples can be ordered from 10-20 pieces.
          </SampleInfoMessage>
          <CartMeterageProduct />
          <CartMeterageProduct />
          <RemovePurchaseButtonWrapper>
            <RemoveButton>Remove(2)</RemoveButton>
            <PurchaseButton onClick={() => cartPurchaseHandler()}>
              Process to purchase(2)
            </PurchaseButton>
          </RemovePurchaseButtonWrapper>
        </Main>
      </Container>
      <PopUpBox isActive={isActive}>
        <ContentBox>
          <PopUpMessage>
            Samples can be ordered from
            <br />
            <Bold>10-20</Bold> pieces.
          </PopUpMessage>
          <ButtonWrapper onClick={() => setIsActive(false)}>
            <PopUpButton>OK</PopUpButton>
          </ButtonWrapper>
        </ContentBox>
      </PopUpBox>
    </>
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
    padding-top: 20px;
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
const AllMeterSampleButtonWrapper = styled.div<{ isActive: number }>`
  display: flex;
  gap: 8px;
  margin-bottom: ${(props) => {
    return props.isActive == 1 ? "10px" : "20px";
  }};
`;
const MeterageButton = styled.button<{ isActive: number }>`
  display: block;
  padding: 0;
  width: 100%;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #0a4459;
  border-radius: 2px;
  box-sizing: border-box;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #0a4459;

  border: ${(props) => {
    return props.isActive == 0 ? "1px solid #0a4459" : "1px solid #dee8ec";
  }};
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
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #0a4459;

  border: ${(props) => {
    return props.isActive == 1 ? "1px solid #0a4459" : "1px solid #dee8ec";
  }};
`;
const SampleInfoMessage = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 1 ? "flex" : "none";
  }};
  align-items: center;
  gap: 5.5px;
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #1eab92;
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

const PopUpBox = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  z-index: 2;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ContentBox = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 320px;
  box-sizing: border-box;
  background-color: #ffffff;
`;
const PopUpTitle = styled.div`
  margin-bottom: 9px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #0a4459;
`;
const PopUpMessage = styled.div`
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #0a4459;
`;
const Bold = styled.span`
  color: #ff5c01;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;
const PopUpButton = styled.button`
  width: 280px;
  height: 36px;
  background-color: #1eab92;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  cursor: pointer;
`;

export default useCart;
