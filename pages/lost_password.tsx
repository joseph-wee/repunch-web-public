import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { SelectBoxCountryCodeNum } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";

const useLost_password = () => {
  const [email, setEmail] = useState(""); // 이메일
  const [isActive, setIsActive] = useState(false); // 이메일 입력완료후 체크 임시용

  return (
    <>
      <ContainerFindId isActive={isActive}>
        <Title>Find password</Title>
        <WelcomeText>
          Please enter the email address you registered when registering as a
          member. ID and password information will be sent to the e-mail.
        </WelcomeText>
        <Wrapper>
          <InputContainer>
            <InputTitle>Registered Email</InputTitle>
            <Input type="text" onChange={(e) => setEmail(e.target.value)} />
          </InputContainer>
        </Wrapper>
        <Wrapper>
          <Button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <LinkStyling>Cancel</LinkStyling>
            </Link>
          </Button>
          <Button onClick={() => setIsActive(true)}>Confirm</Button>
        </Wrapper>
      </ContainerFindId>
      <ContainerYourPassword isActive={isActive}>
        <TitleYourPassword>
          Your password is
          <br />
          sent to your E-mail
        </TitleYourPassword>

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
      </ContainerYourPassword>
    </>
  );
};

const ContainerFindId = styled.div<{ isActive: boolean }>`
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
    return props.isActive == true ? "none" : "block";
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
  color: #a4abba;

  font-family: "Roboto";
  font-size: 12px;
  line-height: 130%;
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

const ContainerYourPassword = styled.div<{ isActive: boolean }>`
  position: relative;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 427.75px;

  color: #0a4459;
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
`;
const TitleYourPassword = styled.div`
  margin-bottom: 8px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
`;

const TextInform = styled.div`
  margin-bottom: 5px;
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
  margin: 0 auto;
  margin-bottom: 20px;
  max-width: 280px;
  height: 48px;
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
  width: 280px;
  height: 48px;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  color: #ffffff;
`;

export default useLost_password;
