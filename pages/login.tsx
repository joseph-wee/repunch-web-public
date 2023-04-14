/* --------------------------- 로그인 페이지 --------------------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ic_check_wht } from "../assets";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginRequest } from "../utils/api";
import { PopUp } from "../components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../features/login/loginSlice";
import { userIdValidation } from "../utils/functions";

const useLogin = () => {
  const [userId, setUserId] = useState<string>(""); // id
  const [password, setPaswword] = useState<string>(""); // pw
  const [isChecked, setIsChecked] = useState<boolean>(false); //체크박스
  const [authPageIsActive, setAuthPageIsActive] = useState<boolean>(false);
  const [popUpIsActive, setPopUpIsActive] = useState<boolean>(false);
  const [idValidation, setIdValidation] = useState<number>(0);
  const [pwValidation, setPwValidation] = useState<number>(0);
  const { value: isLogin } = useAppSelector((state) => state.isLogin);

  const dispatch = useAppDispatch();
  const router = useRouter();

  /** id 유효성 검사 */
  const idValidationCheck = () => {
    let regexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 유효성
    if (userId.length > 0 && userId.length < 50 && regexp.test(userId)) {
      setIdValidation(1);
      return true;
    } else {
      setIdValidation(2);
      return false;
    }
  };

  /** pw 유효성 검사 */
  const pwValidationCheck = () => {
    let regexp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;

    if (password.length > 0 && password.length < 50 && regexp.test(password)) {
      setPwValidation(1);
      return true;
    } else {
      setPwValidation(2);
      return false;
    }
  };

  /** 로그인 api 요청후 결과에 따라 액션 */
  const loginRequestHandler = (userId: string, password: string) => {
    let idValidationValue = idValidationCheck();

    if (idValidationValue) {
      loginRequest(userId, password).then((res) => {
        if (res?.data?.status == 200) {
          dispatch(login());
          sessionStorage.setItem("at", res.data.result.access_token);
          sessionStorage.setItem("rt", res.data.result.refresh_token);
          router.push("/");
          return;
        }

        if (res?.response.data.code == 1001) {
          setIdValidation(2);
          return;
        }

        if (res?.response.data.code == 1002) {
          setPwValidation(2);
          return;
        }

        if (res?.response.status == 403) {
          setAuthPageIsActive(true);
          return;
        }
      });
    }
  };

  /** 엔터키 입력시 로그인 */
  const enterHandler = (e: any) => {
    if (e.key === "Enter") {
      loginRequestHandler(userId, password);
    }
  };

  // useEffect(() => {
  //   console.log(isChecked);
  //   console.log(ic_check_wht.src);
  // }, [isChecked]);

  return (
    <>
      <Container isActive={authPageIsActive}>
        <Title>Login</Title>
        <WelcomeText>Welcome to Repunch</WelcomeText>

        <InputContainer>
          <InputTitle>ID (Mail address)</InputTitle>
          <Input
            type="text"
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => enterHandler(e)}
          />
          <ErrorCase isActive={idValidation}>ErrorCase</ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Password</InputTitle>
          <Input
            type="password"
            onChange={(e) => setPaswword(e.target.value)}
            onKeyDown={(e) => enterHandler(e)}
          />
          <ErrorCase isActive={pwValidation}>ErrorCase</ErrorCase>
        </InputContainer>
        <Wrapper>
          <Label htmlFor="test" isChecked={isChecked} img={ic_check_wht.src} />
          <Checkbox
            type="checkbox"
            id="test"
            onChange={() => setIsChecked(!isChecked)}
          />
          Remember
          {/* <Link href="/lost_id" style={{ textDecoration: "none" }}>
            <LinkStyling1>Lost ID</LinkStyling1>
          </Link> */}
          <Link href="/lost_password" style={{ textDecoration: "none" }}>
            <LinkStyling2>Lost Password? </LinkStyling2>
          </Link>
        </Wrapper>
        <Button onClick={() => loginRequestHandler(userId, password)}>
          Confirm
        </Button>
        <RegisterContainer>
          <RegisterTitle>Register</RegisterTitle>
          <Text>
            Sign up for an account to join our service, take advantage of order
            tracking, order history, and pre-filled forms during check-out
            subsequent orders
          </Text>
          <ButtonRegister>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <LinkStyling>Register</LinkStyling>
            </Link>
          </ButtonRegister>
        </RegisterContainer>
      </Container>
      <AuthContainer isActive={authPageIsActive}>
        <AuthWrapper>
          {/* <AuthTitle>Repunch</AuthTitle>
          <Name>J Kim</Name> */}
          {/* <ConfirmWrapper> */}
          <Id>ID (E-mail)</Id>
          <Email>{userId}</Email>
          <AuthText>
            An authentication email has been sent to
            <br />
            your email address.
            <br />
            You can use all services freely after the
            <br />
            authentication process.
          </AuthText>
          <AuthButton onClick={() => router.push("/")}>Home</AuthButton>
          {/* </ConfirmWrapper> */}
        </AuthWrapper>
        <TextInform>
          If you entered the wrong email address, please
          <br />
          contact the email below
        </TextInform>
        <EmailRepunch>support@repunch.co.kr</EmailRepunch>
      </AuthContainer>
      <PopUp
        title={"Not verified yet"}
        text={"Wait a little longer or resend"}
        isActive={popUpIsActive}
        setIsActive={setPopUpIsActive}
      />
    </>
  );
};

const Container = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "none" : "block";
  }};
  position: relative;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  max-width: 427px;

  color: #121822;
`;
const Title = styled.div`
  margin-bottom: 4px;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: #121822;
`;
const WelcomeText = styled.div`
  margin-bottom: 20px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  color: #a4b0b2;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;

  &:nth-of-type(4) {
    margin-bottom: 10px;
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
const Line = styled.div`
  margin-bottom: 20px;
  border-top: 1px dashed #dee8ec;
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 20px;
  align-items: center;

  font-family: Roboto;
  font-size: 11px;
  font-weight: 400;
`;
const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label<{ isChecked: boolean; img: string }>`
  display: inline-block;
  margin-right: 8px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: ${(props) => {
    return props.isChecked == true ? "none" : "1px solid #dee8ec;";
  }};
  border-radius: 2.66667px;

  background-color: ${(props) => {
    return props.isChecked == true ? "#121822" : "#FFFFFF";
  }};

  background-image: url(${(props) => {
    return props.isChecked == true ? props.img : "";
  }});
  background-size: 9.5px 7.4px;
  background-position: center;
  background-repeat: no-repeat;
`;

const LinkStyling1 = styled.span`
  position: absolute;
  top: 50%;
  right: 90px;
  transform: translateY(-50%);

  font-family: Roboto;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;

  color: #121822;
  text-decoration-line: underline;
`;
const LinkStyling2 = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  font-family: Roboto;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;

  color: #121822;
  text-decoration-line: underline;
`;

const Button = styled.button`
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

  color: #121822;

  background-color: #e1ff20;
  border: 0.79402px solid #d4f01e;
  border-radius: 2px;

  cursor: pointer;
`;

const RegisterContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
`;
const RegisterTitle = styled.div`
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
  color: #121822;
`;
const Text = styled.div`
  margin-bottom: 24px;

  font-weight: 400;
  font-size: 11px;
  line-height: 130%;
  color: #536c6d;
`;

const ButtonRegister = styled.button`
  display: flex;
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

  background-color: #121822;
  border: none;
  border-radius: 2px;
`;

const LinkStyling = styled.div`
  display: flex;
  height: 48px;
  width: 385px;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-weight: 400;
  color: #ffffff;
  line-height: 130%;
`;

const AuthContainer = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: 20px;
  padding-left: 20px;
  @media screen and (max-width: 767px) {
    padding-top: 20px;
  }
`;
const AuthWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 29px;
  padding-top: 47px;
  padding-bottom: 26px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: #f2f6f8;
  max-width: 427px;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    padding-top: 11px;
  }
`;
const AuthTitle = styled.div`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  color: #121822;
`;
const Name = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #0f697c;
`;
const ConfirmWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 20px;
  background-color: #ffffff;

  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
`;
const Id = styled.div`
  display: flex;
  align-itmes: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #121822;
`;
const Email = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-itmes: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #ff2f01;
`;
const AuthText = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  color: #121822;
`;

const AuthButton = styled.button`
  display: flex;
  margin: 0 auto;
  margin-top: 12px;
  width: 180px;
  height: 40px;

  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;

  color: #121822;

  overflow: hidden;

  background-color: #e1ff20;
  border: 1px solid #d4f01e;
  border-radius: 2px;

  cursor: pointer;
`;

const TextInform = styled.div`
  margin-bottom: 6px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  text-align: center;

  color: #536c6d;
`;
const EmailRepunch = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px%;

  text-align: center;
  text-decoration-line: underline;

  color: #121822;
`;

export default useLogin;
