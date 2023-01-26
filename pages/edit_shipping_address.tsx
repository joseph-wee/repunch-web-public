import React, { useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  RecentOrders,
  SideBar,
  SelectBox,
} from "../components";
import { btn_web_back, garbage, ic_check_wht } from "../assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { goBack } from "../utils/functions";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useEdit_shipping_address = () => {
  const [countryCode, setCounryCode] = useState<string | undefined>(""); // 국가코드
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isExisted, setIsExisted] = useState<boolean>(false);

  const router = useRouter();

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

  return (
    <Container>
      <SideBar />
      <Main>
        <AddressInit isExisted={isExisted}>
          <TitleWrapper>
            <ImageWrapper onClick={() => goBack()}>
              <Image src={btn_web_back} alt={"btn_web_back"} />
            </ImageWrapper>
            <Title>Edit shipping Address</Title>
          </TitleWrapper>
          <ContentTitleBar>Shipping address</ContentTitleBar>
          <InputContainer>
            <InputTitle>Address title</InputTitle>
            <Input type="text" />
          </InputContainer>
          <Wrapper>
            <InputContainer>
              <InputTitle>First name</InputTitle>
              <Input type="text" />
            </InputContainer>
            <InputContainer>
              <InputTitle>Last name</InputTitle>
              <Input type="text" />
            </InputContainer>
          </Wrapper>
          <InputContainer>
            <InputTitle>Company name</InputTitle>
            <Input type="text" />
          </InputContainer>
          <InputContainer>
            <InputTitle>Country</InputTitle>
            <SelectBox list={countryList} setValue={setCounryCode} />
          </InputContainer>
          <InputContainer>
            <InputTitle>State /Province</InputTitle>
            <Input type="text" />
          </InputContainer>
          <InputContainer>
            <InputTitle>Street address</InputTitle>
            <Input type="text" />
            <Input type="text" />
          </InputContainer>
          <InputContainer>
            <InputTitle>Postcode</InputTitle>
            <Input type="text" />
          </InputContainer>
          <InputContainer>
            <InputTitle>Phone number</InputTitle>
            <Input type="text" />
          </InputContainer>

          <ButtonWrapper>
            <Button>
              <Link href="/address" style={{ textDecoration: "none" }}>
                <LinkStyling>Cancel</LinkStyling>
              </Link>
            </Button>
            <Button onClick={() => router.push("/address")}>Confirm</Button>
          </ButtonWrapper>
        </AddressInit>
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
  padding-bottom: 30px;
  max-width: 637px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 767px) {
    display: block;
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
const AddressInit = styled.div<{ isExisted: boolean }>`
  display: ${(props) => {
    return props.isExisted == true ? "none" : "block";
  }};
`;
const AddressEdit = styled.div<{ isExisted: boolean }>`
  display: ${(props) => {
    return props.isExisted == true ? "block" : "none";
  }};
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
const ContentTitleBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 16px;
  height: 30px;
  background: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #0a4459;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 15px 10px;
`;
const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;
const InputTitle = styled.div`
  display: inline-block;
  margin-right: 3.8px;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;
const Input = styled.input`
  display: inline-block;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;

  &:nth-of-type(2) {
    margin-top: 10px;
  }
`;
const CheckBox = styled.input`
  display: none;
`;
const CheckBoxLabel = styled.label<{ isChecked: boolean }>`
  display: flex;
  margin-bottom: ${(props) => {
    return props.isChecked == true ? "20px" : "22px";
  }};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #0a4459;
`;
const Box = styled.div<{ isChecked: boolean; img: string }>`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: 1px solid #dee8ec;
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
const BillingAddressWrapper = styled.div<{ isChecked: boolean }>`
  display: ${(props) => {
    return props.isChecked == true ? "none" : "block";
  }};
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 11px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: flex;
  margin-bottom: 20px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;

  background-color: #0a4459;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  overflow: hidden;
  cursor: pointer;

  &:nth-of-type(1) {
    font-weight: 400;
    color: #0a4459;
    background-color: #f2f6f8;

    @media screen and (max-width: 767px) {
      margin-right: 11px;
    }
  }
`;

const LinkStyling = styled.div`
  display: flex;
  height: 48px;
  width: 208px;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-weight: 400;
  color: #0a4459;
  line-height: 130%;
`;

export default useEdit_shipping_address;
