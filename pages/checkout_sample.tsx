import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ic_air, ic_check_wht, ic_info, paypal } from "../assets";
import { CheckOutMeterageProduct, Sample } from "../components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const useCheck_out_sample = () => {
  const [deliveryIsChecked, setDeliveryIsChecked] = useState<number>(0);
  const [paymentIsChecked, setPaymentIsChecked] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [popUpIsActive, setPopUpIsActive] = useState<number>(0);

  const ref = useRef<any>();

  const router = useRouter();

  useEffect(() => {
    if (popUpIsActive == 1) {
      ref.current.focus();
    }
  }, [popUpIsActive]);

  return (
    <>
      <Container>
        <Title>Check out</Title>
        <ContentTitle>Product</ContentTitle>
        <SampleContainer>
          <SampleWrapper>
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
          </SampleWrapper>
          <QtyWrapper>
            <QtyTitle>Qty</QtyTitle>
            <Qty>13</Qty>
          </QtyWrapper>
          <DottedLine />
          <SamplePriceWrapper>
            <Exvat>EX VAT</Exvat>
            <SamplePrice>$ 4.06(-30%)</SamplePrice>
          </SamplePriceWrapper>
        </SampleContainer>
        {/* <ContentTitle>Order Profile</ContentTitle>
        <ContentWrapper>
          <EditButton>Edit</EditButton>
          <ProfileCorperationName>Repp.corp</ProfileCorperationName>
          <ProfileName>JKim</ProfileName>
          <ProfilePhoneNumber>+82(0)10-8628-1024</ProfilePhoneNumber>
        </ContentWrapper> */}
        <ContentTitle>Shipping Address</ContentTitle>
        <ContentWrapper>
          <EditButton>Edit</EditButton>
          <AddressTitle>My1</AddressTitle>
          <AddressText>#809</AddressText>
          <AddressText>#809, 8dong ssangyoung</AddressText>
          <AddressText>daechi dong, gangnamgu</AddressText>
          <AddressText>korea</AddressText>
          <AddressText>06285</AddressText>
          <AddressPhoneNumber>821086281024</AddressPhoneNumber>
          <AddressButton>+ Add a new address</AddressButton>
          <AddressButton onClick={() => setPopUpIsActive(1)}>
            Select other address
          </AddressButton>
        </ContentWrapper>
        <ContentTitle>Delivery</ContentTitle>
        <ContentWrapper>
          <DeliveryWrapper>
            <Image src={ic_air} alt={"air_image"} width={16} height={16} />
            <DeliveryAirText>By air&nbsp;</DeliveryAirText>
            <DeliveryFreeText>(Free delivery)</DeliveryFreeText>
          </DeliveryWrapper>
          {/* <RadioButton type="radio" id="ship" name="delivery" />
          <RadioLabel
            htmlFor="ship"
            isChecked={deliveryIsChecked}
            order={0}
            onClick={() => setDeliveryIsChecked(0)}
          >
            <DefaultCircle isChecked={deliveryIsChecked} order={0} />
            <CheckedCircle isChecked={deliveryIsChecked} order={0}>
              <SmallCircle />
            </CheckedCircle>
            By air (about 1week)
          </RadioLabel>
          <DashLine />
          <RadioButton type="radio" id="air" name="delivery" />
          <RadioLabel
            htmlFor="air"
            isChecked={deliveryIsChecked}
            order={1}
            onClick={() => setDeliveryIsChecked(1)}
          >
            <DefaultCircle isChecked={deliveryIsChecked} order={1} />
            <CheckedCircle isChecked={deliveryIsChecked} order={1}>
              <SmallCircle />
            </CheckedCircle>
            By ship (about 3week)
          </RadioLabel>
          <DashLine />
          <RadioButton type="radio" id="air" name="delivery" />
          <RadioLabel
            htmlFor="air"
            isChecked={deliveryIsChecked}
            order={2}
            onClick={() => setDeliveryIsChecked(2)}
          >
            <DefaultCircle isChecked={deliveryIsChecked} order={2} />
            <CheckedCircle isChecked={deliveryIsChecked} order={2}>
              <SmallCircle />
            </CheckedCircle>
            Pickup ($1.300)
          </RadioLabel>
          <PickupInfo isActive={deliveryIsChecked}>
            <PickupAddressTitle>Pickup address</PickupAddressTitle>
            <PickupAddressContent>
              V428+89H, Unnamed Road, Phumi Char, Cambodia
            </PickupAddressContent>
            <PickupTimeTitle>Time</PickupTimeTitle>
            <PickupTimeContent>
              Mon-Fri 10:00-19:00 Closed on Sat, Sun, and public holidays
            </PickupTimeContent>
          </PickupInfo> */}
        </ContentWrapper>
        <ContentTitle>Payment</ContentTitle>
        <ContentWrapper>
          <RadioButton type="radio" id="ship" name="delivery" />
          <RadioLabel
            htmlFor="ship"
            isChecked={paymentIsChecked}
            order={0}
            onClick={() => setPaymentIsChecked(0)}
          >
            <DefaultCircle isChecked={paymentIsChecked} order={0} />
            <CheckedCircle isChecked={paymentIsChecked} order={0}>
              <SmallCircle />
            </CheckedCircle>
            Credit Card
          </RadioLabel>
          <DashLine />
          <RadioButton type="radio" id="air" name="delivery" />
          <RadioLabel
            htmlFor="air"
            isChecked={paymentIsChecked}
            order={1}
            onClick={() => setPaymentIsChecked(1)}
          >
            <DefaultCircle isChecked={paymentIsChecked} order={1} />
            <CheckedCircle isChecked={paymentIsChecked} order={1}>
              <SmallCircle />
            </CheckedCircle>
            <Image src={paypal} alt={"paypal_image"} width={63} height={21} />
          </RadioLabel>
        </ContentWrapper>
        {/* <ContentTitle>Billng Address</ContentTitle> */}
        {/* <ContentWrapper>
          <CheckBox type="checkbox" id="address" />
          <CheckBoxLabel
            htmlFor="address"
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          >
            <Box isChecked={isChecked} img={ic_check_wht.src} />
            Set as a shipping address
          </CheckBoxLabel>
          <BillingAddressWrapper isChecked={isChecked}>
            <EditButton>Edit</EditButton>
            <AddressTitle>My1</AddressTitle>
            <AddressText>#809</AddressText>
            <AddressText>#809, 8dong ssangyoung</AddressText>
            <AddressText>daechi dong, gangnamgu</AddressText>
            <AddressText>korea</AddressText>
            <AddressText>06285</AddressText>
            <AddressPhoneNumber>821086281024</AddressPhoneNumber>
            <AddressButton>+ Add a new address</AddressButton>
            <AddressButton>Select other address</AddressButton>
          </BillingAddressWrapper>
        </ContentWrapper> */}
        <PriceWrapper>
          <FlexWrapper>
            <PriceTitle>Item subtotal</PriceTitle>
            <Price>$32.25</Price>
          </FlexWrapper>
          <FlexWrapper>
            <PriceTitle>
              Delivery by ship
              <QuestionMark>?</QuestionMark>
            </PriceTitle>
            <Price>Free</Price>
          </FlexWrapper>
          <FlexWrapper>
            <PriceTitle>
              Tax <QuestionMark>?</QuestionMark>
            </PriceTitle>
            <Price>$32.25</Price>
          </FlexWrapper>
          <Line />
          <FlexWrapper>
            <TotalTitle>Total</TotalTitle>
            <TotalPrice>$62.25</TotalPrice>
          </FlexWrapper>
          <InfoText>
            <Image src={ic_info} alt={"ic_info"} />
            Customs duties & taxes aren’t included. Please contact customs
            later&nbsp;
            <Br />
            to pay
          </InfoText>
        </PriceWrapper>
      </Container>
      <Line />
      <ButtonWrapper>
        <CancelButton onClick={() => router.push("/cart")}>Cancel</CancelButton>
        <CheckoutButton onClick={() => router.push("/payment_complete")}>
          Checkout
        </CheckoutButton>
      </ButtonWrapper>
      <PopUpBox isActive={popUpIsActive}>
        <ContentBox tabIndex={0} onBlur={() => setPopUpIsActive(0)} ref={ref}>
          <AddressMenu onClick={() => setPopUpIsActive(0)}>My1</AddressMenu>
          <BorderLine />
          <AddressMenu onClick={() => setPopUpIsActive(0)}>My2</AddressMenu>
        </ContentBox>
      </PopUpBox>
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  margin-top: 16px;
  padding-top: 20px;
  max-width: 427px;
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
  }
`;
const Title = styled.div`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 767px) {
    font-size: 22px;
    line-height: 26px;
  }
`;
const SampleContainer = styled.div`
  padding-top: 15px;
  padding-left: 16px;
  padding-right: 18px;
  padding-bottom: 15px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
`;
const SampleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  row-gap: 9px;
  column-gap: 9.5px;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 2px;
    column-gap: 2px;
  }
  margin-bottom: 12px;
`;
const QtyWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  height: 18px;
  align-items: center;
  justify-content: space-between;
`;
const QtyTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a4b0b3;
`;
const Qty = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
`;
const DottedLine = styled.div`
  border-bottom: 1px dashed #dee8ec;
`;
const SamplePriceWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  justify-content: right;
`;
const Exvat = styled.div`
  margin-right: 6px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: #121822;
`;
const SamplePrice = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #ff2f01;
`;
const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
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

const ContentWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
`;
const DeliveryWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DeliveryAirText = styled.span`
  margin-left: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
`;
const DeliveryFreeText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #0f697c;
`;
const EditButton = styled.button`
  position: absolute;
  right: 16px;
  border: none;
  background-color: #ffffff;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #a4abba;
  cursor: pointer;
`;
const ProfileCorperationName = styled.div`
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const ProfileName = styled.div`
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const ProfilePhoneNumber = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const BillingAddressWrapper = styled.div<{ isChecked: boolean }>`
  display: ${(props) => {
    return props.isChecked == true ? "none" : "block";
  }};
`;
const AddressTitle = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
`;
const AddressText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const AddressPhoneNumber = styled.div`
  margin-top: 12px;
  margin-bottom: 18px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const AddressButton = styled.button`
  margin-bottom: 8px;
  width: 100%;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  background-color: #ffffff;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
  cursor: pointer;
  &:nth-of-type(3) {
    margin-bottom: 0px;
  }
`;
const RadioButton = styled.input`
  display: none;
`;

const RadioLabel = styled.label<{ isChecked: number; order: number }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
  font-weight: ${(props) => {
    return props.isChecked == props.order ? "700" : "400";
  }};
`;
const DefaultCircle = styled.label<{ isChecked: number; order: number }>`
  display: ${(props) => {
    return props.isChecked == props.order ? "none" : "block";
  }};
  margin-right: 8px;
  width: 16px;
  height: 16.65px;
  border: 1px solid #dee8ec;
  border-radius: 42.6667px;
  box-sizing: border-box;
`;
const CheckedCircle = styled.label<{ isChecked: number; order: number }>`
  display: ${(props) => {
    return props.isChecked == props.order ? "flex" : "none";
  }};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 16px;
  height: 16.65px;
  background-color: #121822;
  border-radius: 8px;
`;
const SmallCircle = styled.div`
  height: 6px;
  width: 6px;
  background-color: #ffffff;
  border-radius: 100%;
`;
const DashLine = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px dashed #dee8ec;
`;
const PickupInfo = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 2 ? "block" : "none";
  }};
  margin-top: 10px;
  padding-left: 24px;
  box-sizing: border-box;
`;
const PickupAddressTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const PickupAddressContent = styled.div`
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const PickupTimeTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const PickupTimeContent = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const CheckBox = styled.input`
  display: none;
`;
const CheckBoxLabel = styled.label<{ isChecked: boolean }>`
  display: flex;
  margin-bottom: ${(props) => {
    return props.isChecked == true ? "0" : "15px";
  }};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const Box = styled.div<{ isChecked: boolean; img: string }>`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: ${(props) => {
    return props.isChecked == true ? "none" : "1px solid #dee8ec;";
  }};
  border-radius: 2.66667px;

  background-color: ${(props) => {
    return props.isChecked == true ? "#FF5C01" : "#FFFFFF";
  }};

  background-image: url(${(props) => {
    return props.isChecked == true ? props.img : "";
  }});
  background-size: 9.5px 7.4px;
  background-position: center;
  background-repeat: no-repeat;
`;

const PriceWrapper = styled.div`
  margin-bottom: 24px;
  padding-top: 15px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 14px;
  background: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  margin-bottom: 2px;
`;
const PriceTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #536c6d;
`;
const QuestionMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  background-color: #536c6d;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  font-weight: 700;
  font-size: 9px;
  line-height: 9px;
  letter-spacing: -0.011em;
  color: #ffffff;
`;
const Price = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #536c6d;
`;
const Line = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #dee8ec;
`;
const TotalTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const TotalPrice = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #ff5c01;
`;
const InfoText = styled.div`
  display: flex;
  gap: 5.5px;
  margin-top: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0f697c;
`;

const Br = styled.br`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 16px;
  max-width: 427px;
  display: flex;
  gap: 10.5px;
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
  }
`;
const CancelButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
  cursor: pointer;
`;
const CheckoutButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #e1ff20;
  border: 1px solid #d4f01e;
  border-radius: 2px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
  cursor: pointer;
`;

const PopUpBox = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 0 ? "none" : "flex";
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
  width: 280px;
  border-radius: 2px;
  background-color: #ffffff;
`;
const AddressMenu = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 50px;
  box-sizing: border-box;

  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.011em;
  color: #121822;

  cursor: pointer;
`;
const BorderLine = styled.div`
  border-top: 1px solid #dee8ec;
`;

export default useCheck_out_sample;
