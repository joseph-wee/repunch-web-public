import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { SelectBoxCountryCodeNum } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";
import { pwMailingRequest } from "../utils/api";

const useLost_password = () => {
  const [userId, setUserId] = useState(""); // 이메일
  const [isActive, setIsActive] = useState(false); // 이메일 입력완료후 체크 임시용

  const [userIdValidationResult, setUserIdValidationResult] =
    useState<number>(0); // 유저ID(이메일주소) 유효성 체크

  /** userId 유효성 검사 */
  const validationUserId = () => {
    let regexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 유효성 검사 정규식
    if (regexp.test(userId)) {
      setUserIdValidationResult(1);
      return true;
    }
    setUserIdValidationResult(2);
    return false;
  };

  /** 유효성 검사 후 리셋 메일링 전송 함수 */
  const pwMailingRequestHandler = () => {
    let validation = validationUserId();
    if (validation == true) {
      pwMailingRequest(userId).then((res) => {
        if (res.data.status == 200) {
          alert("success");
        } else {
          setUserIdValidationResult(2);
        }
      });
    }
  };

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
            <Input type="text" onChange={(e) => setUserId(e.target.value)} />
            <ErrorCase isActive={userIdValidationResult}>ErrorCase</ErrorCase>
          </InputContainer>
        </Wrapper>
        <Wrapper>
          <Button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <LinkStyling>Cancel</LinkStyling>
            </Link>
          </Button>
          <Button onClick={() => pwMailingRequestHandler()}>Confirm</Button>
        </Wrapper>
        <InfoMessage>
          By Apply(sign up as a member), you agree to our
          <br />
          <Link
            href="/term_of_service"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <LinkStyle>Terms of Service</LinkStyle>
          </Link>
          &nbsp;and&nbsp;
          <Link
            href="/term_of_service"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <LinkStyle>Privacy Policy.</LinkStyle>
          </Link>
        </InfoMessage>
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

  color: #121822;
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
  color: #536c6d;

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
  color: #121822;
`;
const ErrorCase = styled.div<{ isActive: number }>`
  visibility: ${(props) => {
    return props.isActive == 2 ? "visible" : "hidden";
  }};
  margin-top: 10px;
  height: ${(props) => {
    return props.isActive == 0 || props.isActive == 1 ? "0px" : "";
  }};
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #ff5c01;
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
  color: #121822;

  background-color: #e1ff20;
  border: 1px solid #d4f01e;
  border-radius: 2px;

  overflow: hidden;
  cursor: pointer;

  &:nth-of-type(1) {
    margin-right: 12px;
    font-weight: 400;
    color: #121822;
    background-color: #f2f6f8;
    border: 1px solid #dee8ec;

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
  color: #121822;
  line-height: 130%;
`;

const InfoMessage = styled.div`
  @media screen and (max-width: 767px) {
    display: none;
  }
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  text-align: center;

  color: #a4abba;
`;

const LinkStyle = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  color: #a4abba;
  border-bottom: 0.7px solid #a4abba;
  box-sizing: border-box;
  height: 14px;
`;

const ContainerYourPassword = styled.div<{ isActive: boolean }>`
  position: relative;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 427.75px;

  color: #121822;
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
  color: #121822;
`;

const TextInform = styled.div`
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;

  text-align: center;

  color: #536c6d;
`;
const EmailRepunch = styled.div`
  margin-bottom: 40px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  text-align: center;
  text-decoration-line: underline;

  color: #121822;
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

  color: #121822;

  overflow: hidden;

  background-color: #0f697c;
  border: 0.79402px solid #d4f01e;
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
