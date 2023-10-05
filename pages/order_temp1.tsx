import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ic_check_wht, paypal } from "../assets";
import { CheckOutMeterageProduct } from "../components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ic_air } from "../assets";
import { addressListRequest, loginRefreshRequest } from "../utils/api";
import { useAppSelector } from "../redux/hooks";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useOrder_temp1 = () => {
  const [deliveryIsChecked, setDeliveryIsChecked] = useState<number>(0);
  const [paymentIsChecked, setPaymentIsChecked] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [popUpIsActive, setPopUpIsActive] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addressList, setAddressList] = useState<any>([]);
  const [selectAdress, setSelectAddress] = useState<any>();

  const ref = useRef<any>();

  const router = useRouter();

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

  /** 주문 리스트 없으면 카트페이지로 이동 */
  const tempOrderListChekck = () => {
    tempOrderList.length == 0 && router.push("/cart");
  };

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

  const addressListRequestHandler = () => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    addressListRequest(at, 50).then((res) => {
      // 통신 성공 case
      if (res?.data.status == 200) {
        console.log(res?.data.result.data[0]);
        // 주소목록 있는 case
        if (res?.data.result.data) {
          setAddressList(res?.data.result.data);
          setSelectAddress(res?.data.result.data[0]);
          return;
        }
        // 주소목록 없는 case
        if (res?.data.result.data == null) {
          router.push("/add_shipping_address");
          return;
        }
      }
      // 토큰 만료 case
      if (res?.data.code == 1003) {
        loginRefreshRequest(rt).then((res) => {
          // 토큰 갱신 성공 case
          if (res?.data.status == 200) {
            at = res.data.result.access_token;
            rt = res.data.result.refresh_token;

            if (sessionStorage.getItem("at")) {
              sessionStorage.setItem("at", at);
              sessionStorage.setItem("rt", `${rt}`);
            } else {
              localStorage.setItem("at", at);
              localStorage.setItem("rt", `${rt}`);
            }
            addressListRequest(at, 50).then((res) => {
              // 통신 성공 case
              if (res?.data.status == 200) {
                // 주소목록 있는 case
                if (res?.data.result.data) {
                  setAddressList(res?.data.result.data);
                  setSelectAddress(res?.data.result.data[0]);
                  return;
                }
                // 주소목록 없는 case
                if (res?.data.result.data == null) {
                  router.push("/add_shipping_address");
                  return;
                }
              }
            });
          }
        });
      }
    });
  };

  /** 주소 선택시 */
  const selectAdressHandler = (index: number) => {
    setPopUpIsActive(0);
    setSelectAddress(addressList[index]);
  };

  useEffect(() => {
    addressListRequestHandler();
  }, []);

  return (
    <>
      <Container>
        <Title>Order</Title>
        <ContentTitle>Product</ContentTitle>
        <OrderListWrapper>
          {tempOrderList.length > 0 &&
            tempOrderList.map((el: any, index: number) => {
              return <CheckOutMeterageProduct data={el} key={"asdf" + index} />;
            })}
          <DotLine />
          <PriceWrapper>
            <Exvat>EX VAT</Exvat>
            <PriceBold>$ {totalPrice}</PriceBold>
          </PriceWrapper>
        </OrderListWrapper>

        {/* <ContentTitle>Order Profile</ContentTitle>
        <ContentWrapper>
          
          
          <ProfilePhoneNumber>+82(0)10-8628-1024</ProfilePhoneNumber>
        </ContentWrapper> */}
        <ContentTitle>Shipping Address</ContentTitle>

        <ContentWrapper>
          {selectAdress && (
            <>
              <Link
                href={{
                  pathname: `/edit_shipping_address`,
                  query: {
                    addressNo: selectAdress.addressNo,
                    title: selectAdress.title,
                    firstName: selectAdress.firstName,
                    lastName: selectAdress.lastName,
                    companyName: selectAdress.companyName,
                    countryCode: selectAdress.countryCode,
                    state: selectAdress.state,
                    streetAddress2: selectAdress.streetAddress2,
                    streetAddress1: selectAdress.streetAddress1,
                    postCode: selectAdress.postCode,
                    phoneNumber: selectAdress.phoneNumber,
                    backLink: "/order_temp1",
                  },
                }}
                as={`/edit_shipping_address`}
                style={{ textDecoration: "none" }}
              >
                <EditButton>Edit</EditButton>
              </Link>
              <AddressTitle>{selectAdress.title}</AddressTitle>
              <ProfileCorperationName>
                {selectAdress.companyName}
              </ProfileCorperationName>
              <ProfileName>
                {selectAdress.firstName},{selectAdress.lastName}
              </ProfileName>
              <AddressText>{selectAdress.streetAddress2}</AddressText>
              <AddressText>{selectAdress.streetAddress1}</AddressText>
              <AddressText>{selectAdress.state}</AddressText>
              <AddressText>
                {countryList.filter((x: any) => x.code == "KR")[0].name}
              </AddressText>
              <AddressText>{selectAdress.postCode}</AddressText>
              <AddressPhoneNumber>
                {selectAdress.phoneNumber}
              </AddressPhoneNumber>
            </>
          )}
          <AddressButton onClick={() => router.push("/add_shiping_address")}>
            + Add a new address
          </AddressButton>
          <AddressButton onClick={() => setPopUpIsActive(1)}>
            Select other address
          </AddressButton>
        </ContentWrapper>
        <ContentTitle>Delivery</ContentTitle>
        <ContentWrapper>
          <RadioButton type="radio" id="ship" name="delivery" />
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
            By air (about 3week)
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
            By ship (about 5week)
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
            Pickup ($0 / Ready to pick up)
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
          </PickupInfo>
        </ContentWrapper>
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
        <TotalPriceWrapper deliveryIsChecked={deliveryIsChecked}>
          <FlexWrapper>
            <PriceTitle>Item subtotal</PriceTitle>
            <Price>${totalPrice}</Price>
          </FlexWrapper>
          {/* <FlexWrapper>
            <PriceTitle>
              Delivery by ship
              <QuestionMark>?</QuestionMark>
            </PriceTitle>
            <Price>Free</Price>
          </FlexWrapper> */}
          <FlexWrapper>
            <PriceTitle>
              Tax <QuestionMark>?</QuestionMark>
            </PriceTitle>
            <Price>$7.25</Price>
          </FlexWrapper>
          <Line />
          <FlexWrapper>
            <TotalTitle>Total</TotalTitle>
            <TotalPrice>${Number(totalPrice + 7.25)}</TotalPrice>
          </FlexWrapper>
        </TotalPriceWrapper>
      </Container>
      <Line />
      <ButtonWrapper>
        <CancelButton onClick={() => router.push("/cart")}>Cancel</CancelButton>
        <CheckoutButton onClick={() => router.push("/order_temp/1")}>
          {deliveryIsChecked == 2 ? "Checkout" : "Confirm"}
        </CheckoutButton>
      </ButtonWrapper>
      <PopUpBox isActive={popUpIsActive}>
        <ContentBox tabIndex={0} onBlur={() => setPopUpIsActive(0)} ref={ref}>
          {addressList.map((el: any, index: number) => {
            return (
              <>
                <AddressMenu onClick={() => selectAdressHandler(index)}>
                  {el.title}
                </AddressMenu>
                {index + 1 != addressList.length && <BorderLine />}
              </>
            );
          })}
        </ContentBox>
      </PopUpBox>
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding-top: 24px;
  max-width: 427px;
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
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
const PriceWrapper = styled.div`
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
const PriceBold = styled.div`
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
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const ProfileName = styled.div`
  margin-bottom: 13px;
  font-weight: 400;
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
  margin-top: 13px;
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
const TotalPriceWrapper = styled.div<{ deliveryIsChecked: number }>`
  display: ${(props) => {
    return props.deliveryIsChecked == 2 ? "block" : "none";
  }};
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
const Price = styled.div`
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

export default useOrder_temp1;
