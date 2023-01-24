import React, { useState } from "react";
import styled from "styled-components";
import { ic_down_bk, ic_up_bk, test_thumbnail } from "../assets";
import Image from "next/image";

const useOrderInfoBox = ({
  accomplish,
  myAccount,
}: {
  accomplish: boolean;
  myAccount: boolean;
}) => {
  const [orderDetailIsActive, setOrderDetailIsActive] = useState(false);
  const [trackorderIsActive, setTrackorderIsActive] = useState(false);

  return (
    <>
      <Container>
        <ProductWrapper>
          <ImageWrapper>
            <Image src={test_thumbnail} alt={"test"} width={80} height={80} />
          </ImageWrapper>
          <TextWrapper>
            <ProductTitle>Leopard Viscose Crepe-Rose</ProductTitle>
            <MeterageOrSample>Meterage</MeterageOrSample>
          </TextWrapper>
        </ProductWrapper>
        <DashLine1 />
        <OrderInfoWrapper>
          <OrderInfoTitle>Length (m)</OrderInfoTitle>
          <OrderInfoContent>10 m</OrderInfoContent>
        </OrderInfoWrapper>
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
                src={orderDetailIsActive ? ic_down_bk : ic_up_bk}
                alt={"sort_arrow_button"}
              />
            </OrderDetailButtonBox>
          </OrderDetailButtonWrapper>
          <OrderDetailContent isActive={orderDetailIsActive}>
            <ContentTitle>Order Summary</ContentTitle>
            <FlexWrapper>
              <SummaryPriceTitle>Item subtotal</SummaryPriceTitle>
              <SummaryPrice>$32.25</SummaryPrice>
            </FlexWrapper>
            <FlexWrapper>
              <SummaryPriceTitle>
                Delivery by ship
                <QuestionMark>?</QuestionMark>
              </SummaryPriceTitle>
              <SummaryPrice>Free</SummaryPrice>
            </FlexWrapper>
            <FlexWrapper>
              <SummaryPriceTitle>
                Tax <QuestionMark>?</QuestionMark>
              </SummaryPriceTitle>
              <SummaryPrice>$32.25</SummaryPrice>
            </FlexWrapper>
            <DashLine2 />
            <SummaryTotalPriceWrapper>
              <Total>Total</Total>
              <Price>$ 62.25</Price>
            </SummaryTotalPriceWrapper>
            <Line />
            <ContentTitle>Delivered to</ContentTitle>
            <AddressTitle>My1</AddressTitle>
            <AddressText>#809</AddressText>
            <AddressText>#809, 8dong ssangyoung</AddressText>
            <AddressText>daechi dong, gangnamgu</AddressText>
            <AddressText>korea</AddressText>
            <AddressText>06285</AddressText>
            <AddressPhoneNumber>821086281024</AddressPhoneNumber>
            <Line />
            <ContentTitle>Billed to</ContentTitle>
            <BilledWrapper>
              <BilledInfoWrapper>
                <BilledImageWrapper></BilledImageWrapper>
                <BilledNumber>**** 9987</BilledNumber>
              </BilledInfoWrapper>
              <BilledPrice>$ 62.25</BilledPrice>
            </BilledWrapper>
          </OrderDetailContent>
        </OrderDetailContainer>
      </Container>
      <DeliveredContainer>
        <DeliveredTitle>Delivered</DeliveredTitle>
        <DeliveredProgressWrapper>
          <ProgressLine />
          <DeliveredCircle />
          <DeliveredCircle />
          <DeliveredCircle />
          <DeliveredCircle />
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
              src={trackorderIsActive ? ic_down_bk : ic_up_bk}
              alt={"sort_arrow_button"}
            />
          </OrderDetailButtonBox>
        </OrderDetailButtonWrapper>
        <TrackOrderContent isActive={trackorderIsActive}>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>In Production</TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>Packing Complete</TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>
              Shipped (
              <ShippingNumber>&nbsp;DHL 102002102&nbsp;</ShippingNumber> )
            </TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackOrderContentWrapper>
            <TrackOrderCircle />
            <TrackOrderContentTitle>Delivered</TrackOrderContentTitle>
          </TrackOrderContentWrapper>
          <TrackorderProgressLine />

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
        <AccomplishInvoiceButton isActive={!accomplish}>
          Re-order
        </AccomplishInvoiceButton>
      </ButtonWrapper>
    </>
  );
};

const Container = styled.div`
  border: 1px solid #dee8ec;
  border-radius: 2px;
  margin-bottom: 8px;
  @media screen and (max-width: 767px) {
    margin-bottom: 8px;
  }
`;
const ProductWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  height: 80.31px;
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 2px;
`;
const TextWrapper = styled.div`
  margin-left: 10px;
`;
const ProductTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  letter-spacing: -0.011em;

  color: #0a4459;
`;
const MeterageOrSample = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #1eab92;
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
  margin-top: 8px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 8px;
  justify-content: space-between;
  align-items: center;
`;
const OrderInfoTitle = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #a4abba;
`;
const OrderCanceled = styled.div`
  flex-shrink: 0;
  margin-right: 19px;
  height: 34px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #a4abba;
`;
const OrderInfoContent = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 17px;
  text-align: right;
  letter-spacing: -0.011em;
  color: #0a4459;
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
  color: #0a4459;
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
  color: #0a4459;
  cursor: pointer;
`;
const OrderDetailContent = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
`;
const ContentTitle = styled.div`
  margin-top: 11px;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #0a4459;
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  margin-bottom: 2px;
`;
const SummaryPriceTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8aa1aa;
`;
const QuestionMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  background-color: #8aa1aa;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  font-weight: 700;
  font-size: 9px;
  line-height: 9px;
  letter-spacing: -0.011em;
  color: #ffffff;
`;
const SummaryPrice = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8aa1aa;
`;
const DashLine2 = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px dashed #dee8ec;
`;
const SummaryTotalPriceWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;
const AddressTitle = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #0a4459;
`;
const AddressText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8aa1aa;
`;
const AddressPhoneNumber = styled.div`
  margin-top: 12px;
  margin-bottom: 18px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8aa1aa;
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
  color: #8aa1aa;
`;
const BilledPrice = styled.div`
  font-weight: 700;
  font-size: 11px;
  line-height: 18px;
  color: #0a4459;
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
  color: #0a4459;
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
  margin-right: 3px;
  margin-left: 3px;
  width: 5px;
  height: 5px;
  background-color: #0a4459;
  border-radius: 100%;
`;
const ProgressLine = styled.div`
  position: absolute;
  margin-left: 3px;
  width: 72px;
  border-bottom: 1px solid #0a4459;
`;
const DeliveredBigCircle4 = styled.div`
  position: absolute;
  right: 0;
  width: 11px;
  height: 11px;
  border: 1px solid #0a4459;
  box-sizing: border-box;
  border-radius: 100%;
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
  padding-bottom: 19px;
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
  &:nth-of-type(4) {
    margin-bottom: 0;
  }
`;
const TrackOrderCircle = styled.div`
  margin-right: 9px;
  width: 5px;
  height: 5px;
  background-color: #0a4459;
  border-radius: 100%;
`;
const TrackOrderContentTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #0a4459;
`;
const TrackorderProgressLine = styled.div`
  position: absolute;
  top: 28px;
  left: 16px;
  height: 116px;
  border-right: 1px solid #0a4459;
`;
const TrackOrderBigCircle4 = styled.div`
  position: absolute;
  top: 143.5px;
  left: 11px;
  width: 11px;
  height: 11px;
  border: 1px solid #0a4459;
  box-sizing: border-box;
  border-radius: 100%;
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
  border: 1px solid #0a4459;
  border-radius: 2px;
  font-weight: 700;
  font-size: 11px;
  line-height: 14px;
  color: #0a4459;
  cursor: pointer;
  &:nth-of-type(2) {
    margin-bottom: 0px;
  }
`;
export default useOrderInfoBox;
