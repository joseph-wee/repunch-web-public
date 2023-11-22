import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ic_check_web_status_check,
  ic_check_web_status_dot,
  ic_close_wht,
  ic_down_bk,
  ic_up_bk,
  payment_express,
  test_thumbnail,
} from "../assets";
import Image from "next/image";
import { orderCancelRequest } from "../utils/api";
import Link from "next/link";
import { useRouter } from "next/router";

const useOrderInfoBox = ({
  data,
  clicked,
  accomplish,
  myAccount,
}: {
  data: any;
  clicked: number;
  accomplish: boolean;
  myAccount: boolean;
}) => {
  const [orderDetailIsActive, setOrderDetailIsActive] = useState(false);
  const [trackorderIsActive, setTrackorderIsActive] = useState(false);
  const [questionDeliveryIsActive, setQuestionDeliveryIsActive] =
    useState(false);
  const [questionTaxIsActive, setQuestionTaxIsActive] = useState(false);
  const [render, setRender] = useState(true); // 렌더링 유무
  const questionDeliveryRef = useRef<any>();
  const questionTaxRef = useRef<any>();

  const router = useRouter();

  // 주문 상태 데이터 표시용
  const status = new Map([
    ["IN_REVIEW", "In Review"],
    ["ORDER_CONFIRMED", "Order Confirmed"],
    ["IN_PRODUCTION", "In Production"],
    ["SHIPPED", "Shipped"],
    ["PICKED_UP_READY", "Picked Up Ready"],
    ["PICKED_UP", "Picked Up"],
    ["DELIVERED", "Delivered"],
    ["CLOSING_ORDER", "Closing Order"],
    ["RETURNS", "Returns"],
    ["CANCEL", "Cancel"],
  ]);

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

  useEffect(() => {
    if (clicked == 1) {
      setRender(true);
      return;
    }
    let status = "";

    clicked == 2 && (status = "IN_REVIEW");
    clicked == 3 && (status = "ORDER_CONFIRMED");
    clicked == 4 && (status = "IN_PRODUCTION");
    clicked == 5 && (status = "SHIPPED");
    clicked == 6 && (status = "DELIVERED");
    clicked == 7 && (status = "PICK_UP");

    status == data.status ? setRender(true) : setRender(false);
  }, [clicked]);

  /** 주문취소후 새로고침 */
  const orderCancelHandler = (orderNo: number) => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    orderCancelRequest(at, orderNo).then((res) => {
      console.log(res);
      if (res?.data.status == 200) {
        location.reload();
        return;
      }
    });
  };

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Box render={render}>
      <Container>
        {data.items.map((el: any, index: number) => {
          return (
            <ProductWrapper key={`${index}33`}>
              <ImageWrapper>
                <Image
                  src={el.product.option.files[0].imageUrl}
                  alt={"test"}
                  width={80}
                  height={80}
                />
              </ImageWrapper>
              <TextWrapper>
                {/** 이름 추후 수정필요 */}
                <ProductTitle>{data.name}</ProductTitle>
                <OptionWrapper>
                  <Color color={el.product.option.color.name} />
                  {el.product.option.color.name}
                  <VerticalLine />
                  {el.product.option.length}m*20m
                </OptionWrapper>
                <ProductQty>{el.product.count} Qty</ProductQty>
              </TextWrapper>
            </ProductWrapper>
          );
        })}
        <DashLine1 />
        {/* <OrderInfoWrapper>
          <OrderInfoTitle>Length (m)</OrderInfoTitle>
          <OrderInfoContent>10 m</OrderInfoContent>
        </OrderInfoWrapper> */}

        {data.status == "IN_REVIEW" ? (
          <OrderInfoWrapper>
            <OrderInfoTitle>Delivery</OrderInfoTitle>
            <OrderInfoContent>
              {data.deliveryMethod == "AIR" ? "By air" : "By ship"}
              {data.deliveryFee != 0 && `$(${data.deliveryFee})`}
              {/* / {`{{date}}`}) */}
            </OrderInfoContent>
          </OrderInfoWrapper>
        ) : (
          <>
            <OrderInfoWrapper>
              <OrderInfoTitle>Order no.</OrderInfoTitle>
              <OrderInfoContent>{data.orderNumber}</OrderInfoContent>
            </OrderInfoWrapper>
            <OrderInfoWrapper>
              <OrderInfoTitle>Order time</OrderInfoTitle>
              <OrderInfoContent>JUN 10, 2023 / 23:12</OrderInfoContent>
            </OrderInfoWrapper>
          </>
        )}
        {/* <OrderInfoWrapper>
          <OrderCanceled>Order canceled</OrderCanceled>
          <OrderInfoContent>
            Currently out of stock.
            <br /> Please adjust the quantity and order again.
          </OrderInfoContent>
        </OrderInfoWrapper> 여기 남겨두고 나중에 지우기*/}
        {data.status == "IN_REVIEW" || data.status == "ORDER_CONFIRMED" ? (
          ""
        ) : (
          <>
            <DashLine1 />
            <TotalPriceWrapper>
              <Total>Total</Total>
              <Price>{`$ ${data.totalAmount}`}</Price>
            </TotalPriceWrapper>
          </>
        )}

        <Line />
        <OrderDetailContainer>
          <OrderDetailButtonWrapper>
            <OrderDetailButtonBox
              onClick={() => setOrderDetailIsActive(!orderDetailIsActive)}
            >
              <OrderDetailButton>Order Summary</OrderDetailButton>
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

            {/** 결제전에는 order summary 노출 안함 */}
            {(data.status == "IN_PRODUCTION" ||
              data.status == "SHIPPED" ||
              data.status == "DELIVERED" ||
              data.status == "PICK_UP") && (
              <>
                <ContentTitle>Order Summary</ContentTitle>
                <FlexWrapper>
                  <SummaryPriceTitle>Item subtotal</SummaryPriceTitle>
                  <SummaryPrice>${data.paymentAmount}</SummaryPrice>
                </FlexWrapper>
                <FlexWrapper>
                  <SummaryPriceTitle>
                    Delivery by ship
                    <QuestionMark
                      onClick={() => setQuestionDeliveryIsActive(true)}
                    >
                      ?
                    </QuestionMark>
                  </SummaryPriceTitle>
                  <SummaryPrice>${data.deliveryFee}</SummaryPrice>
                </FlexWrapper>
                <FlexWrapper>
                  <SummaryPriceTitle>
                    Tax{" "}
                    <QuestionMark onClick={() => setQuestionTaxIsActive(true)}>
                      ?
                    </QuestionMark>
                  </SummaryPriceTitle>
                  <SummaryPrice>$??.??</SummaryPrice>
                </FlexWrapper>
                <SummaryTotalPriceWrapper>
                  <Total>Total</Total>
                  <Price>${data.totalAmount}</Price>
                </SummaryTotalPriceWrapper>
                <Line />
                <PaymentTitle>Payment</PaymentTitle>
                <PaymentWrapper>
                  <Image src={payment_express} alt="payment_express" />
                  <PaymentNumber>PayPal</PaymentNumber>
                </PaymentWrapper>
              </>
            )}
            <Line />
            <ContentTitle>Delivered to</ContentTitle>
            <AddressTitle>{data.items[0].shippingAddress.title}</AddressTitle>
            <AddressText>
              {data.items[0].shippingAddress.firstName},
              {data.items[0].shippingAddress.lastName}
            </AddressText>
            <CompanyName>
              {data.items[0].shippingAddress.companyName}
            </CompanyName>
            <AddressText>
              {data.items[0].shippingAddress.streetAddress1}
            </AddressText>
            <AddressText>
              {data.items[0].shippingAddress.streetAddress2}
            </AddressText>
            <AddressText>{data.items[0].shippingAddress.state}</AddressText>
            <AddressText>
              {data.items[0].shippingAddress.country.name}
            </AddressText>
            <AddressText>{data.items[0].shippingAddress.postCode}</AddressText>
            <AddressPhoneNumber>
              {data.items[0].shippingAddress.phoneNumber}
            </AddressPhoneNumber>
          </OrderDetailContent>
        </OrderDetailContainer>
      </Container>

      {data.status == "IN_REVIEW" || data.status == "ORDER_CONFIRMED" ? (
        <>
          <ProgressContainer>
            <ModelWrapper>
              <Circle1 status={data.status} />
              <LinkLine status={data.status} />
              <Circle2 status={data.status} />
            </ModelWrapper>
            <ModelTitleWrapper>
              <ModelTitle1>
                <TempBox1>
                  Prepare fabric and
                  <br />
                  caculating
                </TempBox1>
              </ModelTitle1>
              <ModelTitle2>
                <TempBox2>
                  Proceed to
                  <br />
                  purchase
                </TempBox2>
              </ModelTitle2>
            </ModelTitleWrapper>
          </ProgressContainer>
          {data.status == "IN_REVIEW" ? (
            <Notice status={data.status}>
              Awaiting proceed to purchase. If payment is not made within 48
              hours, the payment will be automatically canceled.
            </Notice>
          ) : (
            <Notice status={data.status}>
              We will prepare the products you ordered as quickly as possible.
              It may take up to 2 business days to get to the payment stage.
            </Notice>
          )}
        </>
      ) : (
        <>
          <DeliveredContainer>
            <DeliveredTitle>{status.get(data.status)}</DeliveredTitle>
            <DeliveredProgressWrapper>
              <TrackBigCircle status={data.status} num={0}>
                <TrackCircle status={data.status} num={0} />
              </TrackBigCircle>
              <TrackLine status={data.status} num={0} />
              <TrackBigCircle status={data.status} num={1}>
                <TrackCircle status={data.status} num={1} />
              </TrackBigCircle>
              <TrackLine status={data.status} num={1} />
              <TrackBigCircle status={data.status} num={2}>
                <TrackCircle status={data.status} num={2} />
              </TrackBigCircle>
              <TrackLine status={data.status} num={2} />
              <TrackBigCircle status={data.status} num={3}>
                <TrackCircle status={data.status} num={3} />
              </TrackBigCircle>
              <TrackLine status={data.status} num={3} />
              <TrackBigCircle status={data.status} num={4}>
                <TrackCircle status={data.status} num={4} />
              </TrackBigCircle>
              <TrackLine status={data.status} num={4} />
              <TrackBigCircle status={data.status} num={5}>
                <TrackCircle status={data.status} num={5} />
              </TrackBigCircle>
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
                <TrackOrderCircle status={data.status} num={0} />
                <TrackOrderContentTitle>In Review</TrackOrderContentTitle>
              </TrackOrderContentWrapper>
              <TrackOrderContentWrapper>
                <TrackOrderCircle status={data.status} num={1} />
                <TrackOrderContentTitle>Order Complete</TrackOrderContentTitle>
              </TrackOrderContentWrapper>
              <TrackOrderContentWrapper>
                <TrackOrderCircle status={data.status} num={2} />
                <TrackOrderContentTitle>In Production</TrackOrderContentTitle>
              </TrackOrderContentWrapper>
              <TrackOrderContentWrapper>
                <TrackOrderCircle status={data.status} num={3} />
                <TrackOrderContentTitle>
                  Shipped&nbsp;
                  {data.status == "SHIPPED" && (
                    <ShippingNumber>(&nbsp;DHL 102002102&nbsp;)</ShippingNumber>
                  )}
                </TrackOrderContentTitle>
              </TrackOrderContentWrapper>
              <TrackOrderContentWrapper>
                <TrackOrderCircle status={data.status} num={4} />
                <TrackOrderContentTitle>Delivered</TrackOrderContentTitle>
              </TrackOrderContentWrapper>
              <TrackOrderContentWrapper>
                <TrackOrderCircle status={data.status} num={5} />
                <TrackOrderContentTitle>Closing order</TrackOrderContentTitle>
              </TrackOrderContentWrapper>
              <TrackorderProgressLine status={data.status} />
              <TrackorderProgressLineGray status={data.status} />

              <TrackOrderBigCircle status={data.status} />
            </TrackOrderContent>
          </TrackOrderContainer>
        </>
      )}

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

      {/** 상태에따라 버튼 노출 */}

      {/** in review case: 취소 가능 */}
      {data.status == "IN_REVIEW" && (
        <CancelButton onClick={() => orderCancelHandler(data.orderNo)}>
          Cancel order
        </CancelButton>
      )}

      {/** order confirmed case: 취소, 주문 가능 */}
      {data.status == "ORDER_CONFIRMED" && (
        <Wrapper>
          <CancelButton onClick={() => orderCancelHandler(data.orderNo)}>
            Cancel order
          </CancelButton>

          <OrderButton onClick={() => router.push(`/payment/${data.orderNo}`)}>
            Order
          </OrderButton>
        </Wrapper>
      )}

      {/** in production case: ?? */}

      {/** delivered, pick up case: 주문 확정 가능 */}
      {data.status == "DELIVERED" ||
        (data.status == "PICK_UP" && (
          <>
            <AccomplishButton>Order accomplish</AccomplishButton>
            <NoticeText>
              After 10 days, it will be automatically checked for completion.
              <br />
              If you have any problems with delivery, please contact us
              via&nbsp;
              <u>support@requnch.io</u> or&nbsp;<u>Contact us</u>
            </NoticeText>
          </>
        ))}

      {/** closing order case: 인보이스 다운 */}
      {/** pick up case: 인보이스 다운 */}
      {data.status == "CLOSING_ORDER" && (
        <InvoiceButton>Invoice Download</InvoiceButton>
      )}

      {/* <ButtonWrapper myAccount={myAccount}>
        <AccomplishInvoiceButton isActive={accomplish}>
          Order accomplish
        </AccomplishInvoiceButton>
        <NoticeText isActive={accomplish}>
          After 10 days, it will be automatically checked for completion.
          <br />
          If you have any problems with delivery, please contact us via&nbsp;
          <u>support@requnch.io</u> or&nbsp;<u>Contact us</u>
        </NoticeText>
        <AccomplishInvoiceButton isActive={!accomplish}>
          Re-order
        </AccomplishInvoiceButton>
        <AccomplishInvoiceButton isActive={!accomplish}>
          Invoice Download
        </AccomplishInvoiceButton>
      </ButtonWrapper> */}
    </Box>
  );
};

const Box = styled.div<{ render: boolean }>`
  display: ${(props) => {
    return props.render == true ? "block" : "none";
  }};
`;

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
  height: 80.31px;
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
const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #536c6d;
`;
const Color = styled.div<{ color: string }>`
  margin-right: 4px;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  ${(props) => {
    switch (props.color) {
      case "White":
        return `    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background-color: #ffffff;`;
      case "Black":
        return "background-color: #000000";
      case "Gray":
        return "background-color: #C4C4C4";
      case "Beige":
        return "background-color: #F1EBD3";
      case "Brown":
        return "background-color: #825757";
      case "Red":
        return "background-color: #EC3939";
      case "Orange":
        return "background-color: #FE7E36";
      case "Yellow":
        return "background-color: #F9D142";
      case "Pink":
        return "background-color: #FF96FB";
      case "Purple":
        return "background-color: #814FEC";
      case "Blue":
        return "background-color: #293DF0";
      case "Green":
        return "background-color: #46CA43";
      case "Silver":
        return `  background: linear-gradient(
      156.04deg,
      #a9a9a9 10.26%,
      #dedede 43.51%,
      #ffffff 52.57%,
      #e1e1e1 61.64%,
      #9a9a9a 93.16%
    );`;
      case "Gold":
        return `    background: linear-gradient(
      152.18deg,
      #d3a810 5.76%,
      #fff8de 44.11%,
      #ffffff 49.34%,
      #fff9e4 55.45%,
      #d3a810 89.44%
    ); `;
      case "Multi":
        return `    background: linear-gradient(
      154.17deg,
      #ff1001 17.26%,
      #fff500 37.73%,
      #24ff00 57.06%,
      #00bdf9 72.22%,
      #0075ff 90.03%
    );`;
    }
  }};
`;
const ColorGreen = styled.div`
  margin-right: 4px;
  width: 12px;
  height: 12px;
  background-color: #46ca43;
  border-radius: 100%;
`;
const VerticalLine = styled.div`
  width: 1px;
  height: 9px;
  background-color: #dee8ec;
  margin: 0 6px;
`;
const ProductQty = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  color: #121822;
  text-align: right;
  font-family: Roboto;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.3px;
  letter-spacing: -0.121px;
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
  margin-bottom: 16px;
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
  margin-top: 9.7px;
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
  margin-top: 16px;
  margin-bottom: 13px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  color: #121822;
`;
const AddressText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const CompanyName = styled.div`
  margin-bottom: 13px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const AddressPhoneNumber = styled.div`
  margin-top: 13px;
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
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

const ProgressContainer = styled.div`
  margin-bottom: 10px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  padding-top: 33px;
  padding-bottom: 38px;
`;
const ModelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 11px;
`;
const Circle1 = styled.div<{ status: string }>`
  width: 26px;
  height: 26px;
  border: 1px solid #121822;
  border-radius: 100%;
  ${(props) => {
    switch (props.status) {
      case "ORDER_CONFIRMED":
        return `
        background-image: url(${ic_check_web_status_dot.src});
        `;
      case "IN_REVIEW":
        return `
          background-image: url(${ic_check_web_status_check.src});
          `;
    }
  }};
  background-color: #e1ff20;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
`;
const Circle2 = styled.div<{ status: string }>`
  width: 26px;
  height: 26px;
  ${(props) => {
    switch (props.status) {
      case "ORDER_CONFIRMED":
        return `
        border: 1px solid #121822;
        background-image: url(${ic_check_web_status_check.src});
        background-color: #E1FF20;
        background-position: center;
        background-repeat: no-repeat;
        `;
      case "IN_REVIEW":
        return `
          border: 1px solid #DEE8EC;
          `;
    }
  }};
  border-radius: 100%;
  box-sizing: border-box;
`;
const LinkLine = styled.div<{ status: string }>`
  width: 100px;
  border-top: ${(props) => {
    return props.status == "ORDER_CONFIRMED"
      ? `1px solid #536C6D`
      : `1px solid #DEE8EC`;
  }};
`;
const ModelTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  color: #121822;
  text-align: center;
  font-size: 11px;
  font-weight: 400;
  line-height: 11px;
`;
const ModelTitle1 = styled.div`
  position: relative;
  width: 26px;
  margin-right: 100px;
`;
const ModelTitle2 = styled.div`
  position: relative;
  width: 26px;
`;
const TempBox1 = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95px;
  margin: 0 auto;
`;
const TempBox2 = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 53px;
  margin: 0 auto;
`;
const Notice = styled.div<{ status: string }>`
  color: ${(props) => {
    return props.status == "ORDER_CONFIRMED" ? `#FF2F01` : `#536C6D`;
  }};
  font-size: 11px;
  font-weight: 400;
  line-height: 14.3px;
`;

const DeliveredContainer = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  border: 1px solid #dee8ec;
  border-radius: 2px 2px 0px 0px;
`;

const DeliveredTitle = styled.div`
  margin-bottom: 5px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const DeliveredProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TrackCircle = styled.div<{ status: string; num: number }>`
  z-index: 1;
  width: 5px;
  height: 5px;
  background-color: #121822;
  border-radius: 100%;

  ${(props) => {
    return (
      props.num > 0 &&
      props.status == "IN_REVIEW" &&
      "background-color: #a4b0b3;"
    );
  }};
  ${(props) => {
    return (
      props.num > 1 &&
      props.status == "ORDER_CONFIRMED" &&
      "background-color: #a4b0b3;"
    );
  }};
  ${(props) => {
    return (
      props.num > 2 &&
      props.status == "IN_PRODUCTION" &&
      "background-color: #a4b0b3;"
    );
  }};
  ${(props) => {
    return (
      props.num > 3 &&
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "background-color: #a4b0b3;"
    );
  }};
  ${(props) => {
    return (
      props.num > 4 &&
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "background-color: #a4b0b3;"
    );
  }};
  ${(props) => {
    return (
      props.num > 5 &&
      (props.status == "CLOSING_ORDER" ||
        props.status == "RETURNS" ||
        props.status == "CANCEL") &&
      "background-color: #a4b0b3;"
    );
  }};
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
const TrackLine = styled.div<{ status: string; num: number }>`
  width: 20.5px;
  border-bottom: 1px solid #121822;

  ${(props) => {
    return props.status == "IN_REVIEW" && "border-bottom: 1px solid #a4b0b3;";
  }};
  ${(props) => {
    return props.status == "IN_REVIEW" && props.num == 0 && "width: 18px";
  }};

  ${(props) => {
    return (
      props.num >= 1 &&
      props.status == "ORDER_CONFIRMED" &&
      "border-bottom: 1px solid #a4b0b3;"
    );
  }};
  ${(props) => {
    return props.num == 0 && props.status == "ORDER_CONFIRMED" && "width: 18px";
  }};
  ${(props) => {
    return props.num == 1 && props.status == "ORDER_CONFIRMED" && "width: 18px";
  }};

  ${(props) => {
    return (
      props.num >= 2 &&
      props.status == "IN_PRODUCTION" &&
      "border-bottom: 1px solid #a4b0b3;"
    );
  }};
  ${(props) => {
    return props.num == 1 && props.status == "IN_PRODUCTION" && "width: 18px";
  }};
  ${(props) => {
    return props.num == 2 && props.status == "IN_PRODUCTION" && "width: 18px";
  }};

  ${(props) => {
    return (
      props.num >= 3 &&
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "border-bottom: 1px solid #a4b0b3;"
    );
  }};
  ${(props) => {
    return (
      props.num == 2 &&
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "width: 18px"
    );
  }};
  ${(props) => {
    return (
      props.num == 3 &&
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "width: 18px"
    );
  }};

  ${(props) => {
    return (
      props.num >= 4 &&
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "border-bottom: 1px solid #a4b0b3;"
    );
  }};
  ${(props) => {
    return (
      props.num == 3 &&
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "width: 18px"
    );
  }};
  ${(props) => {
    return (
      props.num == 4 &&
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "width: 18px"
    );
  }};

  ${(props) => {
    return (
      props.num == 5 &&
      (props.status == "CLOSING_ORDER" ||
        props.status == "RETURNS" ||
        props.status == "CANCEL") &&
      "width: 18px"
    );
  }};
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
const TrackBigCircle = styled.div<{ status: string; num: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5px;
  height: 5px;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #e1ff20;

  ${(props) => {
    return (
      props.num == 0 &&
      props.status == "IN_REVIEW" &&
      "width: 11px; height: 11px; border: 1px solid #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num == 1 &&
      props.status == "ORDER_CONFIRMED" &&
      "width: 11px; height: 11px; border: 1px solid #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num == 2 &&
      props.status == "IN_PRODUCTION" &&
      "width: 11px; height: 11px; border: 1px solid #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num == 3 &&
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "width: 11px; height: 11px; border: 1px solid #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num == 4 &&
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "width: 11px; height: 11px; border: 1px solid #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num == 5 &&
      (props.status == "CLOSING_ORDER" ||
        props.status == "RETURNS" ||
        props.status == "CANCEL") &&
      "width: 11px; height: 11px; border: 1px solid #121822;"
    );
  }};
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
  &:nth-of-type(6) {
    margin-bottom: 0px;
  }
`;
const TrackOrderCircle = styled.div<{ status: string; num: number }>`
  z-index: 2;
  margin-right: 9px;
  width: 5px;
  height: 5px;
  background-color: #a4b0b2;
  border-radius: 100%;

  ${(props) => {
    return (
      props.num == 0 &&
      props.status == "IN_REVIEW" &&
      "background-color: #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num <= 1 &&
      props.status == "ORDER_CONFIRMED" &&
      "background-color: #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num <= 2 &&
      props.status == "IN_PRODUCTION" &&
      "background-color: #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num <= 3 &&
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "background-color: #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num <= 4 &&
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "background-color: #121822;"
    );
  }};
  ${(props) => {
    return (
      props.num <= 5 &&
      (props.status == "CLOSING_ORDER" ||
        props.status == "RETURNS" ||
        props.status == "CANCEL") &&
      "background-color: #121822;"
    );
  }};
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
const TrackorderProgressLine = styled.div<{ status: string }>`
  z-index: 1;
  position: absolute;
  top: 28px;
  left: 16px;
  height: 0px;
  border-right: 1px solid #121822;

  ${(props) => {
    return props.status == "ORDER_CONFIRMED" && "height: 40px;";
  }};
  ${(props) => {
    return props.status == "IN_PRODUCTION" && "height: 80px;";
  }};
  ${(props) => {
    return (
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "height: 120px;"
    );
  }};
  ${(props) => {
    return (
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "height: 160px;"
    );
  }};
  ${(props) => {
    return (
      (props.status == "CLOSING_ORDER" ||
        props.status == "RETURNS" ||
        props.status == "CANCEL") &&
      "height: 200px;"
    );
  }};
`;
const TrackorderProgressLineGray = styled.div<{ status: string }>`
  position: absolute;
  top: 28px;
  left: 16px;
  height: 200px;
  border-right: 1px solid #a4b0b3;
`;
const TrackOrderBigCircle = styled.div<{ status: string }>`
  z-index: 1;
  position: absolute;
  left: 11px;
  width: 11px;
  height: 11px;
  border: 1px solid #121822;
  box-sizing: border-box;
  border-radius: 100%;
  background-color: #e1ff20;

  ${(props) => {
    return props.status == "IN_REVIEW" && "top: 23.5px;";
  }};
  ${(props) => {
    return props.status == "ORDER_CONFIRMED" && "top: 63.5px;";
  }};
  ${(props) => {
    return props.status == "IN_PRODUCTION" && "top: 103.5px;";
  }};
  ${(props) => {
    return (
      (props.status == "SHIPPED" || props.status == "PICKED_UP_READY") &&
      "top: 143.5px;"
    );
  }};
  ${(props) => {
    return (
      (props.status == "DELIVERED" || props.status == "PICKED_UP") &&
      "top: 183.5px;"
    );
  }};
  ${(props) => {
    return (
      (props.status == "CLOSING_ORDER" ||
        props.status == "RETURNS" ||
        props.status == "CANCEL") &&
      "top: 223.5px;"
    );
  }};
`;
const CancelButton = styled.button`
  margin-top: 16px;
  margin-bottom: 16px;

  width: 100%;
  height: 40px;
  color: #121822;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  background-color: #ffffff;

  border: 1px solid #dee8ec;
  border-radius: 2px;

  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const OrderButton = styled.button`
  margin-top: 16px;
  margin-bottom: 16px;

  width: 100%;
  height: 40px;
  color: #121822;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 18.2px;
  background-color: #e1ff20;

  border: 1px solid #d4f01e;
  border-radius: 2px;

  cursor: pointer;
`;

const ButtonWrapper = styled.div<{ myAccount: boolean }>`
  display: ${(props) => {
    return props.myAccount == true ? "none" : "block";
  }};
`;
const AccomplishButton = styled.button`
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
`;
const InvoiceButton = styled.button`
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
`;
const NoticeText = styled.div`
  color: #536c6d;
  font-size: 11px;
  font-weight: 400;
  line-height: 12.65px;
`;
export default useOrderInfoBox;
