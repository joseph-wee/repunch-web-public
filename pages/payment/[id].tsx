import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ic_check_wht,
  ic_info,
  ic_ship,
  paypal,
  test_thumbnail,
} from "../../assets";
import { CheckOutMeterageProduct } from "../../components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ic_air } from "../../assets";
import {
  addressListRequest,
  orderDetailRequest,
  paymentRequest1,
} from "../../utils/api";
import { priceToDollar } from "../../utils/functions";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const usePayment = () => {
  const [deliveryIsChecked, setDeliveryIsChecked] = useState<number>(0);
  const [paymentIsChecked, setPaymentIsChecked] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [popUpIsActive, setPopUpIsActive] = useState<number>(0);

  const [order, setOrder] = useState<any>([]);
  const [items, setItems] = useState<any>([]);
  const [address, setAddress] = useState({
    title: "",
    firstName: "",
    lastName: "",
    companyName: "",
    countryCode: "",
    postCode: "",
    state: "",
    streetAddress1: "",
    streetAddress2: "",
    phoneNumber: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const ref = useRef<any>();

  const router = useRouter();

  useEffect(() => {
    if (popUpIsActive == 1) {
      ref.current.focus();
    }
  }, [popUpIsActive]);

  // const at = localStorage.getItem("at"); // 엑세스 토큰

  // /** 주문 목록 조회 핸들러 */
  // const addressListRequestHandler = () => {
  //   addressListRequest(at, 10, 10).then((res) => {
  //     res?.data.result.data == null ? router.push("/add_shipping_address") : ""; // 서치 에프터 동작 확인 후 값 없을 때 까지 불러오는 코드 추가 해야함
  //   });
  // };

  // useEffect(() => {
  //   addressListRequestHandler();
  // }, []);

  /** 나라 리스트 숫자 코드는 업데이트 필요 */
  const countryList: ListCountryArray = [
    { name: "Republic of Korea", code: "KR", code_num: "82" },
    { name: "United States of America", code: "US", code_num: "1" },
    { name: "Greece", code: "GR", code_num: "99" },
    { name: "Netherlands", code: "NL", code_num: "99" },
    { name: "Nepal", code: "NP", code_num: "22" },
    { name: "Norway", code: "NO", code_num: "22" },
    { name: "Danmark", code: "DK", code_num: "22" },
    { name: "Germany", code: "DE", code_num: "49" },
    { name: "Laos", code: "LA", code_num: "22" },
    { name: "Malaysia", code: "MY", code_num: "22" },
    { name: "Mexico", code: "MX", code_num: "22" },
    { name: "Republic of the Union of Myanmar", code: "MM", code_num: "22" },
    { name: "Bangladesh", code: "BD", code_num: "22" },
    { name: "Viet Nam", code: "VN", code_num: "84" },
    { name: "Belgium", code: "BE", code_num: "22" },
    {
      name: "United Kingdom of Great Britain and Northern Ireland",
      code: "GB",
      code_num: "44",
    },
    { name: "Australia", code: "AU", code_num: "61" },
    { name: "Austria", code: "AT", code_num: "22" },
    { name: "Uzbekistan", code: "UZ", code_num: "22" },
    { name: "Egypt", code: "EG", code_num: "22" },
    { name: "Italy", code: "IT", code_num: "22" },
    { name: "India", code: "IN", code_num: "91" },
    { name: "Indonesia", code: "ID", code_num: "22" },
    { name: "Japan", code: "JP", code_num: "22" },
    { name: "China", code: "CN", code_num: "86" },
    { name: "Cambodia", code: "KH", code_num: "22" },
    { name: "Canada", code: "CA", code_num: "1" },
    { name: "Taiwan", code: "TW", code_num: "22" },
    { name: "Thailand", code: "TH", code_num: "886" },
    { name: "Turkey", code: "TR", code_num: "22" },
    { name: "Portugal", code: "PT", code_num: "22" },
    { name: "Poland", code: "PL", code_num: "22" },
    { name: "Puerto Rico", code: "PR", code_num: "22" },
    { name: "France", code: "FR", code_num: "33" },
    { name: "Finland", code: "FI", code_num: "22" },
    { name: "Philippines", code: "PH", code_num: "63" },
    { name: "Hong Kong", code: "HK", code_num: "852" },
  ];

  /** 주문 상세 요청 */
  const orderDetailRequestHandelr = () => {
    const orderNo = window.location.pathname.split("/")[2];
    const at = localStorage.getItem("at");
    orderDetailRequest(at, orderNo).then((res) => {
      console.log(res);
      // 성공 case
      if (res?.data.status == 200) {
        // 주문자체 할당
        setOrder({ ...res?.data.result });
        // 주문 상품 아이템들
        setItems([...res?.data.result.items]);
        const data = res?.data.result.shippingAddress;

        // 주소
        setAddress({
          ...{
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            companyName: data.companyName,
            countryCode: data.countryCode,
            postCode: data.postCode,
            state: data.state,
            streetAddress1: data.streetAddress1,
            streetAddress2: data.streetAddress2,
            phoneNumber: data.phoneNumber,
          },
        });
        // 배송 방식
        setDeliveryMethod(res?.data.result.deliveryMethod);

        // 총 가격 + 나중에 세금 추가
        setTotalPrice(res?.data.result.totalAmount);

        // 로컬스토리지에 세팅

        return;
      }

      // 실패 case : 토큰 만료

      // 실패 case
      if (res?.data.code == 9999) {
        console.log("주문 없음");
        return;
      }
    });
  };

  useEffect(() => {
    orderDetailRequestHandelr();
  }, []);

  /** 결제 요청 */
  const paymentRequest1Handler = () => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    paymentRequest1(
      at,
      order.orderNo,
      order.orderNumber,
      "PAYPAL",
      order.paymentAmount,
      order.pointAmount,
      order.totalAmount
    ).then((res) => {
      // 성공 case
      if (res?.data.status == 200) {
        location.href = res?.data.result.paymentUrl;
      }
    });
  };

  return (
    <>
      <Container>
        <Title>Check out</Title>
        <ContentTitle>Product</ContentTitle>
        <ContentWrapper>
          {items.length > 0 &&
            items.map((el: any, index: number) => {
              return (
                <ProductWrapper key={`${index}33`}>
                  <ImageWrapper>
                    <Image
                      src={el.product.option.thumbnailUrl}
                      alt={"test"}
                      width={80}
                      height={80}
                    />
                  </ImageWrapper>
                  <TextWrapper>
                    <ProductTitle>{el.product.title}</ProductTitle>
                    <OptionWrapper>
                      <Color color={el.product.option.color.name} />
                      {el.product.option.color.name}
                      <VerticalLine />
                      {el.product.option.length}*{el.product.width}m
                    </OptionWrapper>
                    <ProductQty>{el.product.count} Qty</ProductQty>
                  </TextWrapper>
                </ProductWrapper>
              );
            })}
          <DashLine1 />
          {order.length != 0 && (
            <PriceWrapper2>
              <Exvat2>EX VAT</Exvat2>
              <Price2>{`$ ${priceToDollar(order.totalAmount)}`}</Price2>
            </PriceWrapper2>
          )}
        </ContentWrapper>
        {/* <CheckOutMeterageProduct /> */}
        {/* <ContentTitle>Order Profile</ContentTitle>
        <ContentWrapper>
          <EditButton>Edit</EditButton>
          <ProfileCorperationName>Repp.corp</ProfileCorperationName>
          <ProfileName>JKim</ProfileName>
          <ProfilePhoneNumber>+82(0)10-8628-1024</ProfilePhoneNumber>
        </ContentWrapper> */}
        <ContentTitle>Shipping Address</ContentTitle>
        <ContentWrapper>
          <AddressTitle>{address.title}</AddressTitle>
          <AddressText>
            {address.firstName},{address.lastName}
          </AddressText>
          <AddressText>{address.companyName}</AddressText>
          <AddressText>{address.streetAddress2}</AddressText>
          <AddressText>{address.streetAddress1}</AddressText>
          <AddressText>{address.state}</AddressText>
          <AddressText>
            {countryList.filter((x: any) => x.code == "KR")[0].name}
          </AddressText>
          <AddressText>{address.postCode}</AddressText>
          <AddressPhoneNumber>{address.phoneNumber}</AddressPhoneNumber>
        </ContentWrapper>
        <ContentTitle>Delivery</ContentTitle>
        <ContentWrapper>
          <DeliveryWrapper>
            {deliveryMethod == "AIR" && (
              <>
                <Image src={ic_air} alt={"air_image"} width={16} height={16} />
                <DeliveryAirText>By air&nbsp;</DeliveryAirText>
                <DeliveryFreeText>(about 3week)</DeliveryFreeText>
              </>
            )}

            {deliveryMethod == "SHIP" && (
              <>
                <Image src={ic_ship} alt={"air_image"} width={16} height={16} />
                <DeliveryAirText>By ship&nbsp;</DeliveryAirText>
                <DeliveryFreeText>(about 5week)</DeliveryFreeText>
              </>
            )}
          </DeliveryWrapper>
        </ContentWrapper>

        <PriceWrapper>
          <FlexWrapper>
            <PriceTitle>Item subtotal</PriceTitle>
            <Price>${priceToDollar(order.paymentAmount)}</Price>
          </FlexWrapper>
          <FlexWrapper>
            <PriceTitle>
              Delivery by air
              <QuestionMark>?</QuestionMark>
            </PriceTitle>
            <Price>${priceToDollar(order.deliveryFee)}</Price>
          </FlexWrapper>
          <FlexWrapper>
            <PriceTitle>
              Tax <QuestionMark>?</QuestionMark>
            </PriceTitle>
            <Price>$??</Price>
          </FlexWrapper>
          <Line />
          <FlexWrapper>
            <TotalTitle>Total</TotalTitle>
            <TotalPrice>${priceToDollar(totalPrice)}</TotalPrice>
          </FlexWrapper>
          <InfoText>
            <Image src={ic_info} alt={"ic_info"} />
            Customs duties & taxes aren’t included. Please contact customs
            later&nbsp;
            <Br />
            to pay
          </InfoText>
        </PriceWrapper>

        {/* <ContentTitle>Payment</ContentTitle>
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
        </ContentWrapper> */}
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
        {/* <PriceWrapper>
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
        </PriceWrapper> */}
      </Container>
      <Line />
      <ButtonWrapper>
        <CancelButton onClick={() => router.push("/order")}>
          Cancel
        </CancelButton>
        <CheckoutButton onClick={() => paymentRequest1Handler()}>
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
  padding-top: 24px;
  max-width: 427px;
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
  }
`;
const Title = styled.div`
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 22px;
    line-height: 26px;
  }
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

const ProductWrapper = styled.div`
  display: flex;
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
const DashLine1 = styled.div`
  margin-top: 16px;

  margin-bottom: 16px;
  border-bottom: 1px dashed #dee8ec;
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
  color: #121822;
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
  &:nth-of-type(3) {
    margin-bottom: 13px;
  }
`;
const AddressPhoneNumber = styled.div`
  margin-top: 12px;
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
  height: 16px;
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
  height: 16px;
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

  background-image: ${(props) => {
    return props.isChecked == true ? `url(${props.img})` : "";
  }};
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
const PriceWrapper2 = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: 13.5px;

  align-items: center;
  justify-content: right;
`;
const Exvat2 = styled.div`
  margin-right: 6px;
  font-weight: 400;
  font-size: 9.5px;
  line-height: 13px;
  color: #121822;
`;
const Price2 = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #121822;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  margin-bottom: 2px;
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
  @media screen and (max-width: 768px) {
    display: none;
  }
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
const ButtonWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 16px;
  max-width: 427px;
  display: flex;
  gap: 10.5px;
  @media screen and (max-width: 768px) {
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

export default usePayment;
