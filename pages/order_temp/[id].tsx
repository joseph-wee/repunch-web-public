import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ic_check_web_status_check,
  ic_check_web_status_dot,
  ic_ship,
} from "../../assets";
import { CheckOutMeterageProduct } from "../../components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ic_air } from "../../assets";
import { useAppSelector } from "../../redux/hooks";
import { orderDetailRequest } from "../../utils/api";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useOrder_temp = () => {
  const [deliveryIsChecked, setDeliveryIsChecked] = useState<number>(0);
  const [paymentIsChecked, setPaymentIsChecked] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [popUpIsActive, setPopUpIsActive] = useState<number>(0);
  const [preparation, setPreparation] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const [product, setProduct] = useState<any>([]);

  const [deliveryMethod, setDeliveryMethod] = useState("");

  const { value: tempOrderList } = useAppSelector(
    (state) => state.tempOrderList
  );

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

  /** total price 계산 및 저장*/
  const totalPriceHandler = async () => {
    let sum = 0;
    // 주문 리스트가 있을경우에만 실행
    if (tempOrderList.length > 0) {
      for (const el of tempOrderList) {
        sum += el.price;
      }
    }
    setTotalPrice(sum);
  };

  useEffect(() => {
    // tempOrderListChekck();
    totalPriceHandler();
    console.log(tempOrderList);
  }, []);

  const ref = useRef<any>();

  const router = useRouter();

  useEffect(() => {
    if (popUpIsActive == 1) {
      ref.current.focus();
    }
  }, [popUpIsActive]);

  useEffect(() => {
    console.log(window.location.pathname.split("/")[2]);
  }, []);

  /** 주문 상세 요청 */
  const orderDetailRequestHandelr = () => {
    const orderNo = window.location.pathname.split("/")[2];
    orderDetailRequest(orderNo).then((res) => {
      console.log(res);
      // 성공 case
      if (res?.data.status == 200) {
        const data = res?.data.result.shippingAddress;
        setProduct({ ...res?.data.result });
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

        setDeliveryMethod(res?.data.result.deliveryMethod);
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

  return (
    <>
      <Container>
        <Title>Order</Title>
        <ProgressContainer>
          <ModelWrapper>
            <Circle1 preparation={preparation} />
            <LinkLine preparation={preparation} />
            <Circle2 preparation={preparation} />
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
        {preparation ? (
          <Notice preparation={preparation}>
            Awaiting proceed to purchase. If payment is not made within 48
            hours, the payment will be automatically canceled.
          </Notice>
        ) : (
          <Notice preparation={preparation}>
            We will prepare the products you ordered as quickly as possible. It
            may take up to 2 business days to get to the payment stage.
          </Notice>
        )}
        <ContentTitle>Product</ContentTitle>
        <OrderListWrapper>
          {tempOrderList.length > 0 &&
            tempOrderList.map((el: any, index: number) => {
              return <CheckOutMeterageProduct data={el} key={"afs" + index} />;
            })}
          <DotLine />
          <PriceWrapper1>
            <Exvat>EX VAT</Exvat>
            <Price1>$ {product && product.totalAmount}</Price1>
          </PriceWrapper1>
        </OrderListWrapper>
        <ContentTitle>Shipping Address</ContentTitle>
        <ContentWrapper>
          <AddressTitle>{address.title}</AddressTitle>
          <AddressText>
            {address.firstName},{address.lastName}
          </AddressText>
          <ProfileCorperationName>{address.companyName}</ProfileCorperationName>
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
                <Image
                  src={ic_ship}
                  alt={"ship_image"}
                  width={16}
                  height={16}
                />
                <DeliveryAirText>By Ship&nbsp;</DeliveryAirText>
                <DeliveryFreeText>(about 5week)</DeliveryFreeText>
              </>
            )}
          </DeliveryWrapper>
        </ContentWrapper>
      </Container>
      <Line />
      <ButtonWrapper>
        <CancelButton onClick={() => router.push("/cart")}>
          Cancel order
        </CancelButton>
        <CancelButton onClick={() => router.push("/order")}>
          Order list
        </CancelButton>
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
const Circle1 = styled.div<{ preparation: boolean }>`
  width: 26px;
  height: 26px;
  border: 1px solid #121822;
  border-radius: 100%;
  ${(props) => {
    switch (props.preparation) {
      case true:
        return `
        background-image: url(${ic_check_web_status_dot.src});
        `;
      case false:
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
const Circle2 = styled.div<{ preparation: boolean }>`
  width: 26px;
  height: 26px;
  ${(props) => {
    switch (props.preparation) {
      case true:
        return `
        border: 1px solid #121822;
        background-image: url(${ic_check_web_status_check.src});
        background-color: #E1FF20;
        background-position: center;
        background-repeat: no-repeat;
        `;
      case false:
        return `
          border: 1px solid #DEE8EC;
          `;
    }
  }};
  border-radius: 100%;
  box-sizing: border-box;
`;
const LinkLine = styled.div<{ preparation: boolean }>`
  width: 100px;
  border-top: ${(props) => {
    return props.preparation ? `1px solid #536C6D` : `1px solid #DEE8EC`;
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
const Notice = styled.div<{ preparation: boolean }>`
  color: ${(props) => {
    return props.preparation ? `#FF2F01` : `#536C6D`;
  }};
  font-size: 11px;
  font-weight: 400;
  line-height: 14.3px;
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

const OrderListWrapper = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
`;
const DotLine = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px dashed #dee8ec;
`;
const PriceWrapper1 = styled.div`
  display: flex;
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
const Price1 = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

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
  font-weight: 700;
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
  margin-bottom: 13px;
  font-weight: 400;
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
  margin-bottom: 13px;
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
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default useOrder_temp;
