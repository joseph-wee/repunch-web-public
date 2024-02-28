import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { SelectBoxCountryCodeNum } from "../../components";
import Link from "next/link";
import { useRouter } from "next/router";
import { emailPwResetRequest, pwResetRequest } from "../../utils/api";

const usePassword_reset = () => {
  const [popUpIsActive, setPopUpIsActive] = useState(false);
  const [password, setPassword] = useState(""); // 비밀번호
  const [passwordConfirm, setPasswordConfrim] = useState(""); // 비밀번호 확인

  const [passwordValidationResult, setPassowrdValidationResult] =
    useState<number>(0); // 비밀번호 유효성 체크
  const [passwordConfirmValidationResult, setPasswordConfirmValidationResult] =
    useState<number>(0); // 비밀번호 확인 유효성 체크

  const router = useRouter();

  /** password 유효성 검사 */
  const validationPassword = () => {
    let regexp = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,20}$/; // 비밀번호 유효성 검사 정규식 영문,숫자,특수문자 포함
    if (regexp.test(password)) {
      setPassowrdValidationResult(1);
      return true;
    }
    setPassowrdValidationResult(2);
    return false;
  };
  /** passwordConfirm 유효성 검사 */
  const validationPasswordConfirm = () => {
    // let regexp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/; // 비밀번호 유효성 검사 정규식 영문,숫자,특수문자 포함
    if (password == passwordConfirm && passwordConfirm.length > 0) {
      setPasswordConfirmValidationResult(1);
      return true;
    }
    setPasswordConfirmValidationResult(2);
    return false;
  };

  const pwResetRequestHandler = () => {
    let pwVa = validationPassword();
    let pwConfirmVa = validationPasswordConfirm();
    let sessionKey = router.query.key;
    if (pwVa && pwConfirmVa) {
      emailPwResetRequest(sessionKey, password, passwordConfirm).then(
        (res?) => {
          console.log(res);
          if (res?.data.status === 200) {
            setPopUpIsActive(true);
          }
        }
      );
    }
  };

  return (
    <>
      <Container>
        <Title>Password reset</Title>
        {/* <InformText>
          The temporary password can’t be used continuously. Please register and
          use the new password.
        </InformText> */}
        <Wrapper>
          <InputContainer>
            <InputTitle>New password</InputTitle>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorCase isActive={passwordValidationResult}>
              The password must be at least 8 characters including uppercase
              letters, lowercase letters, and numbers.
            </ErrorCase>
          </InputContainer>
        </Wrapper>
        <Wrapper>
          <InputContainer>
            <InputTitle>New password confirm</InputTitle>
            <Input
              type="password"
              onChange={(e) => setPasswordConfrim(e.target.value)}
            />
            <ErrorCase isActive={passwordConfirmValidationResult}>
              Please enter a same password.
            </ErrorCase>
          </InputContainer>
        </Wrapper>
        <Wrapper>
          <Button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <LinkStyling>Cancel</LinkStyling>
            </Link>
          </Button>
          <Button onClick={() => pwResetRequestHandler()}>Confirm</Button>
        </Wrapper>
      </Container>
      <PopUpBox isActive={popUpIsActive}>
        <ContentBox>
          <PopUpTitle>
            A new password has
            <br />
            been registered.
          </PopUpTitle>
          <ButtonWrapper>
            <Link href="/" style={{ textDecoration: "none" }}>
              <PopUpButton>OK</PopUpButton>
            </Link>
          </ButtonWrapper>
        </ContentBox>
      </PopUpBox>
    </>
  );
};

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
  max-width: 427.75px;

  color: #121822;
  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
`;
const InformText = styled.div`
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
`;
const InputTitle = styled.div`
  display: inline-block;
  margin-bottom: 7px;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #121822;
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
  display: ${(props) => {
    return props.isActive == 2 ? "block" : "none";
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
  height: 48px;
  width: 100%;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
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
    border: 1px solid #dee8ec;
    background-color: #f2f6f8;

    @media screen and (max-width: 768px) {
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

const PopUpBox = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  z-index: 3;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ContentBox = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 320px;
  height: 132px;
  box-sizing: border-box;
  background-color: #ffffff;
`;
const PopUpTitle = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;
const PopUpButton = styled.button`
  width: 263.25px;
  height: 36px;
  background-color: #e1ff20;
  border: 0.79402px solid #d4f01e;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
  cursor: pointer;
`;

export default usePassword_reset;
