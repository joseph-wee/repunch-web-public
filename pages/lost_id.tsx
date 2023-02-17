import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { SelectBoxCountryCodeNum } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useLost_id = () => {
  const [firstName, setFirstName] = useState<string>(""); // 성
  const [lastName, setLastName] = useState<string>(""); // 이름
  const [countryPhoneNumber, setCountryPhoneNumber] = useState<
    string | undefined
  >(""); // 국가 전화코드
  const [id, setId] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호

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

  /** 인풋 숫자만 되게하는 함수 */
  const inputHandlerOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(onlyNumber);
  };

  return (
    <>
      <ContainerFindId idLength={id.length}>
        <Title>Register</Title>
        <WelcomeText>
          Please enter your registered name and phone number{" "}
        </WelcomeText>
        <Wrapper>
          <InputContainer>
            <InputTitle>First name</InputTitle>
            <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <InputTitle>Last name</InputTitle>
            <Input type="text" onChange={(e) => setLastName(e.target.value)} />
          </InputContainer>
        </Wrapper>
        <InputContainer>
          <InputTitle>Phone number</InputTitle>
          <Wrapper>
            <SelectBoxCountryCodeNumTemporary />
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => inputHandlerOnlyNumber(e)}
            />
          </Wrapper>
        </InputContainer>
        <Wrapper>
          <Button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <LinkStyling>Cancel</LinkStyling>
            </Link>
          </Button>
          <Button onClick={() => setId("test**@gmail.com")}>Confirm</Button>
        </Wrapper>
      </ContainerFindId>
      <ContainerYourId idLength={id.length}>
        <TitleYourId>Your Id</TitleYourId>
        <Email>{"test**@gmail.com"}</Email>
        <TextInform>
          If you entered the wrong email address, please
          <br />
          contact the email below
        </TextInform>
        <EmailRepunch>support@repunch.co.kr</EmailRepunch>
        <ButtonHome>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LinkStylingHome>Home</LinkStylingHome>
          </Link>
        </ButtonHome>
      </ContainerYourId>
    </>
  );
};

const SelectBoxCountryCodeNumTemporary = styled.div`
  margin-right: 8px;
  box-sizing: border-box;
  width: 120px;
  flex: 0 0 120px;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  @media screen and (max-width: 767px) {
    margin-right: 8.5px;
    width: 77px;
    flex: 0 0 77px;
  } ;
`;

const ContainerFindId = styled.div<{ idLength: number }>`
  position: relative;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
  max-width: 427.75px;

  color: #0a4459;
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  display: ${(props) => {
    return props.idLength > 0 ? "none" : "block";
  }};
`;
const Title = styled.div`
  margin-bottom: 2px;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;

  @media screen and (max-width: 767px) {
    margin-bottom: 4px;
  }
`;
const WelcomeText = styled.div`
  top: 28px;
  right: 20px;
  margin-bottom: 20px;

  font-family: "Roboto Slab";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  color: #8aa1aa;

  font-family: "Roboto";
  font-size: 12px;
  line-height: 130%;
`;

const Line = styled.div`
  margin-bottom: 20px;
  border-top: 1px dashed #dee8ec;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;
const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;

  &:nth-of-type(1) {
    margin-right: 10px;
  }
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
    margin-right: 12px;
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

const ContainerYourId = styled.div<{ idLength: number }>`
  position: relative;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 280px;

  color: #0a4459;
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  display: ${(props) => {
    return props.idLength > 0 ? "block" : "none";
  }};
`;
const TitleYourId = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;

  @media screen and (max-width: 767px) {
    margin-bottom: 4px;
  }
`;

const Email = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;

  height: 60px;
  box-sizing: border-box;

  border: 1px solid #dee8ec;
  border-radius: 2px;

  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #ff5c01;
`;

const TextInform = styled.div`
  margin-bottom: 6px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;

  text-align: center;

  color: #8aa1aa;
`;
const EmailRepunch = styled.div`
  margin-bottom: 40px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  text-align: center;
  text-decoration-line: underline;

  color: #0a4459;
`;
const ButtonHome = styled.button`
  display: flex;
  margin-bottom: 20px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;

  color: #ffffff;

  overflow: hidden;

  background-color: #1eab92;
  border: none;
  border-radius: 2px;

  cursor: pointer;
`;

const LinkStylingHome = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 280px;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  color: #ffffff;
`;

export default useLost_id;
