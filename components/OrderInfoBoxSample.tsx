import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ic_close_wht,
  ic_down_bk,
  ic_up_bk,
  payment_express,
  test_thumbnail,
} from "../assets";
import Image from "next/image";
import Sample from "./Sample";

const useOrderInfoBoxSample = ({
  accomplish,
  myAccount,
}: {
  accomplish: boolean;
  myAccount: boolean;
}) => {
  const [orderDetailIsActive, setOrderDetailIsActive] = useState(false);
  const [trackorderIsActive, setTrackorderIsActive] = useState(false);
  const [questionDeliveryIsActive, setQuestionDeliveryIsActive] =
    useState(false);
  const [questionTaxIsActive, setQuestionTaxIsActive] = useState(false);
  const questionDeliveryRef = useRef<any>();
  const questionTaxRef = useRef<any>();

  useEffect(() => {
    if (questionDeliveryIsActive) {
      questionDeliveryRef.current.focus();
    }
  }, [questionDeliveryIsActive]);

  useEffect(() => {
    if (questionTaxIsActive) {
      questionTaxRef.current.focus();
    }
  }, [questionTaxIsActive]);

  return (
    <>
      <Container>
        <ProductWrapper>
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
        </ProductWrapper>
        <DashLine1 />
        <OrderInfoWrapper>
          <OrderInfoTitle>Order no.</OrderInfoTitle>
          <OrderInfoContent>0906ZG5D72045J</OrderInfoContent>
        </OrderInfoWrapper>
        <OrderInfoWrapper>
          <OrderInfoTitle>Order time</OrderInfoTitle>
          <OrderInfoContent>JUN 10, 2023 / 23:12</OrderInfoContent>
        </OrderInfoWrapper>
        <OrderInfoWrapper>
          <OrderCanceled>Order canceled</OrderCanceled>
          <OrderInfoContent>
            Currently out of stock.
            <br /> Please adjust the quantity and order again.
          </OrderInfoContent>
        </OrderInfoWrapper>
        <DashLine1 />
        <TotalPriceWrapper>
          <Total>Total</Total>
          <Price>$ 62.25</Price>
        </TotalPriceWrapper>
        <Line />
        <OrderDetailContainer>
          <OrderDetailButtonWrapper>
            <OrderDetailButtonBox
              onClick={() => setOrderDetailIsActive(!orderDetailIsActive)}
            >
              <OrderDetailButton>Order detail</OrderDetailButton>
              <Image
                src={orderDetailIsActive ? ic_up_bk : ic_down_bk}
                alt={"sort_arrow_button"}
              />
            </OrderDetailButtonBox>
          </OrderDetailButtonWrapper>
          <OrderDetailContent isActive={orderDetailIsActive}>
            <DeliveryQuestionInfoBox
              isActive={questionDeliveryIsActive}
              tabIndex={0}
              onBlur={() => setQuestionDeliveryIsActive(false)}
              ref={questionDeliveryRef}
            >
              <QuestionText>
                DeliveryDeliveryDeliveryDeliveryDeliveryDeliveryDeliveryDeliveryDeliveryDeliveryDelivery
              </QuestionText>
              <ImageBox onClick={() => setQuestionDeliveryIsActive(false)}>
                <Image
                  src={ic_close_wht}
                  width={24}
                  height={24}
                  alt="close_wht"
                />
              </ImageBox>
            </DeliveryQuestionInfoBox>
            <TaxQuestionInfoBox
              isActive={questionTaxIsActive}
              tabIndex={0}
              onBlur={() => setQuestionTaxIsActive(false)}
              ref={questionTaxRef}
            >
              <QuestionText>
                TaxTaxTaxTaxTaxTaxTaxTaxTaxTaxTaxTaxTaxTax
              </QuestionText>
              <ImageBox onClick={() => setQuestionTaxIsActive(false)}>
                <Image
                  src={ic_close_wht}
                  width={24}
                  height={24}
                  alt="close_wht"
                />
              </ImageBox>
            </TaxQuestionInfoBox>
            <ContentTitle>Order Summary</ContentTitle>
            <FlexWrapper>
              <SummaryPriceTitle>Item subtotal</SummaryPriceTitle>
              <SummaryPrice>$32.25</SummaryPrice>
            </FlexWrapper>
            <FlexWrapper>
              <SummaryPriceTitle>
                Delivery by ship
                <QuestionMark onClick={() => setQuestionDeliveryIsActive(true)}>
                  ?
                </QuestionMark>
              </SummaryPriceTitle>
              <SummaryPrice>Free</SummaryPrice>
            </FlexWrapper>
            <FlexWrapper>
              <SummaryPriceTitle>
                Tax{" "}
                <QuestionMark onClick={() => setQuestionTaxIsActive(true)}>
                  ?
                </QuestionMark>
              </SummaryPriceTitle>
              <SummaryPrice>$32.25</SummaryPrice>
            </FlexWrapper>
            <SummaryTotalPriceWrapper>
              <Total>Total</Total>
              <Price>$ 62.25</Price>
            </SummaryTotalPriceWrapper>
            <Line />
            <PaymentTitle>Payment</PaymentTitle>
            <PaymentWrapper>
              <Image src={payment_express} alt="payment_express" />
              <PaymentNumber>**** 9987</PaymentNumber>
            </PaymentWrapper>
            <Line />
            <ContentTitle>Delivered to</ContentTitle>
            <AddressTitle>My1</AddressTitle>
            <AddressText>#809</AddressText>
            <AddressText>#809, 8dong ssangyoung</AddressText>
            <AddressText>daechi dong, gangnamgu</AddressText>
            <AddressText>korea</AddressText>
            <AddressText>06285</AddressText>
            <AddressPhoneNumber>821086281024</AddressPhoneNumber>
          </OrderDetailContent>
        </OrderDetailContainer>
      </Container>
      <DeliveredContainer>
        <DeliveredTitle>Shipped</DeliveredTitle>
        <DeliveredProgressWrapper>
          <ProgressLine />
          <ProgressLineGray />
          <DeliveredCircle />
          <DeliveredCircle />
          <DeliveredCircle />
          <DeliveredCircleGray />
          <DeliveredBigCircle4 />
        </DeliveredProgressWrapper>
      </DeliveredContainer>
      <TrackOrderContainer>
        <OrderDetailButtonWrapper>
          <OrderDetailButtonBox
            onClick={() => setTrackorderIsActive(!trackorderIsActive)}
          >
            <OrderDetailButton>Trackorder</OrderDetailButton>
            <Image
              src={trackorderIsActive ? ic_up_bk : ic_down_bk}
              alt={"sort_arrow_button"}
            />
          </OrderDetailButtonBox>
        </OrderDetailButtonWrapper>
        <TrackOrderContent isActive={trackorderIsActive}>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>In Review</TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>Order Complete</TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>In Production</TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>
              Shipped (
              <ShippingNumber>&nbsp;DHL 102002102&nbsp;</ShippingNumber> )
            </TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackOrderContentWrapper>
            <TrackorderCircleGray />
            <TrackOrderContentTitle>Delivered</TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          {/* 
          <TrackorderProgressLine />
          <TrackOrderContentWrapper>
            <TrackorderCircleGray />
            <TrackOrderContentTitle>Picked up</TrackOrderContentTitle>
          </TrackOrderContentWrapper>

          <TrackorderProgressLine />
          <TrackOrderContentWrapper>
            <TrackorderCircleGray />
            <TrackOrderContentTitle>Closing order</TrackOrderContentTitle>
          </TrackOrderContentWrapper>

          <TrackorderProgressLine />
          <TrackOrderContentWrapper>
            <TrackorderCircleGray />
            <TrackOrderContentTitle>Canceled</TrackOrderContentTitle>
          </TrackOrderContentWrapper>

          <TrackorderProgressLine />
          <TrackOrderContentWrapper>
            <TrackorderCircleGray />
            <TrackOrderContentTitle>Returns</TrackOrderContentTitle>
          </TrackOrderContentWrapper> */}

          <TrackorderProgressLine />
          <TrackorderProgressLineGray />

          <TrackOrderBigCircle4 />
        </TrackOrderContent>
      </TrackOrderContainer>
      <ButtonWrapper myAccount={myAccount}>
        <AccomplishInvoiceButton isActive={accomplish}>
          Order accomplish
        </AccomplishInvoiceButton>
        <AccomplishInvoiceButton isActive={accomplish}>
          Invoice Download
        </AccomplishInvoiceButton>
        {/* <AccomplishInvoiceButton isActive={!accomplish}>
          Re-order
        </AccomplishInvoiceButton> */}
      </ButtonWrapper>
    </>
  );
};

const Container = styled.div`
  border: 1px solid #dee8ec;
  border-radius: 2px;
  margin-bottom: 8px;
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`;
const ProductWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 2px;
`;
const TextWrapper = styled.div`
  position: relative;
  margin-left: 10px;
  width: 100%;
`;
const ProductTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  letter-spacing: -0.011em;

  color: #121822;
`;
const MeterageOrSample = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0f697c;
`;
const LengthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  width: 100%;
  position: absolute;
  bottom: 16.5px;
`;
const LengthTitle = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #536c6d;
`;
const Length = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const LengthPrice = styled.div`
  position: absolute;
  bottom: 0.5px;
  width: 100%;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  text-align: right;
  letter-spacing: -0.011em;
  color: #121822;
`;
const DashLine1 = styled.div`
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  border-bottom: 1px dashed #dee8ec;
`;

const OrderInfoWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 6px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 6px;
  justify-content: space-between;
  align-items: center;
`;
const OrderInfoTitle = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #536c6d;
`;
const OrderCanceled = styled.div`
  flex-shrink: 0;
  margin-right: 19px;
  height: 34px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #536c6d;
`;
const OrderInfoContent = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 17px;
  text-align: right;
  letter-spacing: -0.011em;
  color: #121822;
`;
const TotalPriceWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;
const Total = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const Price = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #ff5c01;
`;
const Line = styled.div`
  border-bottom: 1px solid #dee8ec;
`;
const OrderDetailContainer = styled.div`
  position: relative;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`;
const OrderDetailButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;
const OrderDetailButtonBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const OrderDetailButton = styled.button`
  margin-right: 2px;
  padding: none;
  border: none;
  background-color: #ffffff;
  font-weight: 400;
  font-size: 11px;
  line-height: 17px;
  color: #121822;
  cursor: pointer;
`;
const OrderDetailContent = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
`;
const DeliveryQuestionInfoBox = styled.div<{ isActive: boolean }>`
  position: absolute;
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  justify-content: space-between;
  gap: 12px;
  padding-left: 12px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 9px;
  box-sizing: border-box;
  width: 100%;
  top: 16px;
  left: 0;

  height: 79px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 2px;
`;
const TaxQuestionInfoBox = styled.div<{ isActive: boolean }>`
  position: absolute;
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  justify-content: space-between;
  gap: 12px;
  padding-left: 12px;
  padding-top: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  width: 100%;
  top: 16px;
  left: 0;

  height: 79px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 2px;
`;
const QuestionText = styled.div`
  margin-top: 1px;
  height: auto;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.011em;
  color: #ffffff;
  word-break: break-all;
`;
const ImageBox = styled.div`
  cursor: pointer;
`;
const ContentTitle = styled.div`
  margin-top: 11px;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  margin-top: 2px;
`;
const SummaryPriceTitle = styled.div`
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
  cursor: pointer;
`;
const SummaryPrice = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #536c6d;
`;
const DashLine2 = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px dashed #dee8ec;
`;
const SummaryTotalPriceWrapper = styled.div`
  display: flex;
  margin-top: 1px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;
const PaymentTitle = styled.div`
  margin-top: 16px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
`;
const PaymentWrapper = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 16px;
`;
const PaymentNumber = styled.div`
  margin-left: 6.92px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #536c6d;
`;
const AddressTitle = styled.div`
  margin-bottom: 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #121822;
`;
const AddressText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #536c6d;
`;
const AddressPhoneNumber = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #536c6d;
`;
const BilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BilledInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const BilledImageWrapper = styled.div`
  margin-right: 7px;
  width: 19px;
  height: 19px;
  border: 1px solid black;
  border-radius: 2px;
  box-sizing: border-box;
`;
const BilledNumber = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #536c6d;
`;
const BilledPrice = styled.div`
  font-weight: 700;
  font-size: 11px;
  line-height: 18px;
  color: #121822;
`;
const DeliveredContainer = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  border: 1px solid #dee8ec;
  border-radius: 2px 2px 0px 0px;
`;

const DeliveredTitle = styled.div`
  margin: 0 auto;
  margin-bottom: 5px;
  width: 54px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const DeliveredProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  width: 86px;
  height: 11px;
`;
const DeliveredCircle = styled.div`
  z-index: 1;
  margin-right: 3px;
  margin-left: 3px;
  width: 5px;
  height: 5px;
  background-color: #121822;
  border-radius: 100%;
`;
const DeliveredCircleGray = styled.div`
  z-index: 1;
  margin-right: 3px;
  margin-left: 3px;
  width: 5px;
  height: 5px;
  background-color: #a4b0b3;
  border-radius: 100%;
`;
const ProgressLine = styled.div`
  position: absolute;
  margin-left: 3px;
  width: 48px;
  border-bottom: 1px solid #121822;
`;
const ProgressLineGray = styled.div`
  position: absolute;
  right: 6px;
  width: 22px;
  border-bottom: 1px solid #a4b0b3;
`;
const DeliveredBigCircle4 = styled.div`
  position: absolute;
  right: 25px;
  width: 11px;
  height: 11px;
  border: 1px solid #121822;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #e1ff20;
`;
const TrackOrderContainer = styled.div`
  margin-bottom: 8px;
  padding-top: 16px;
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 16px;
  border: 1px solid #dee8ec;
  border-top: none;
  border-radius: 0px 0px 2px 2px;
`;
const TrackOrderContent = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  position: relative;
  margin-top: 9px;
  padding-top: 21px;
  padding-left: 14px;
  padding-bottom: 20px;
  background-color: #f2f6f8;
  border-radius: 2px;
`;
const ShippingNumber = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-decoration-line: underline;
  color: #ff5c01;
  cursor: pointer;
`;
const TrackOrderContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  &:nth-of-type(5) {
    margin-bottom: 0px;
  }
`;
const TrackOrderCircle = styled.div`
  z-index: 1;
  margin-right: 9px;
  width: 5px;
  height: 5px;
  background-color: #121822;
  border-radius: 100%;
`;
const TrackorderCircleGray = styled.div`
  margin-right: 9px;
  width: 5px;
  height: 5px;
  background-color: #a4b0b2;
  border-radius: 100%;
`;
const TrackOrderContentTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const TrackorderProgressLine = styled.div`
  position: absolute;
  top: 28px;
  left: 16px;
  height: 116px;
  border-right: 1px solid #121822;
`;
const TrackorderProgressLineGray = styled.div`
  position: absolute;
  top: 154px;
  left: 16px;
  height: 36px;
  border-right: 1px solid #a4b0b3;
`;
const TrackOrderBigCircle4 = styled.div`
  position: absolute;
  top: 143.5px;
  left: 11px;
  width: 11px;
  height: 11px;
  border: 1px solid #121822;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #e1ff20;
`;
const ButtonWrapper = styled.div<{ myAccount: boolean }>`
  display: ${(props) => {
    return props.myAccount == true ? "none" : "block";
  }};
`;
const AccomplishInvoiceButton = styled.button<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "none" : "block";
  }};
  margin-bottom: 8px;
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #121822;
  border-radius: 2px;
  font-weight: 700;
  font-size: 11px;
  line-height: 14px;
  color: #121822;
  cursor: pointer;
  &:nth-of-type(2) {
    margin-bottom: 0px;
  }
`;
const SampleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  row-gap: 9px;
  column-gap: 9.5px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 2px;
    column-gap: 2px;
  }
`;
export default useOrderInfoBoxSample;
