/* --------------------------- 로그인 페이지 --------------------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ic_check_wht } from "../assets";
import Link from "next/link";
import { useRouter } from "next/router";

const useLogin = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPaswword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const router = useRouter();

  /** 로그인 요청 api */
  const loginApiRequest = () => {
    axios({
      method: "POST",
      url:
        process.env.NEXT_PUBLIC_API_KEY +
        `login?userId=${userId}&password=${password}&role=USER`,
    })
      .then(function (response) {
        if(response.data.status == 200) {
          alert("로그인 성공하였습니다.(임시 메세지)")
          router.push("/")
        }
        else if(response.data.status == 401){
          alert("로그인에 실패하였습니다.(임시 메세지)")
        }
      })
      .catch(function (error) {
        alert("통신 실패(임시 메세지)");

        console.log(error);
      });
  };

  /**값 비어있는지 검사 후에 로그인 요청 api 호출 */
  const loginApiRequestHandler = () => {
    if (userId.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (password.length == 0) {
      alert("값을 모두 채워주세요");
    } else {
      loginApiRequest();
    }
  };

  useEffect(() => {
    console.log(isChecked);
    console.log(ic_check_wht.src);
  }, [isChecked]);

  return (
    <>
      <Container>
        <Title>Login</Title>
        <WelcomeText>Welcome to Repunch</WelcomeText>

        <InputContainer>
          <InputTitle>ID (Mail address)</InputTitle>
          <Input type="text" onChange={(e) => setUserId(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <InputTitle>Password</InputTitle>
          <Input
            type="password"
            onChange={(e) => setPaswword(e.target.value)}
          />
        </InputContainer>
        <Wrapper>
          <Label htmlFor="test" isChecked={isChecked} img={ic_check_wht.src} />
          <Checkbox
            type="checkbox"
            id="test"
            onChange={() => setIsChecked(!isChecked)}
          />
          Remember
          <Link href="/lost_id" style={{ textDecoration: "none" }}>
            <LinkStyling1>Lost ID</LinkStyling1>
          </Link>
          <Link href="/lost_password" style={{ textDecoration: "none" }}>
            <LinkStyling2>Lost Password? </LinkStyling2>
          </Link>
        </Wrapper>
        <Button onClick={() => loginApiRequestHandler()}>Confirm</Button>
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
    </>
  );
};

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 427px;

  color: #0a4459;
`;
const Title = styled.div`
  margin-bottom: 4px;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
`;
const WelcomeText = styled.div`
  margin-bottom: 20px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  color: #a4abba;
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

const LinkStyling1 = styled.span`
  position: absolute;
  top: 50%;
  right: 90px;
  transform: translateY(-50%);

  font-family: Roboto;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;

  color: #0a4459;
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

  color: #0a4459;
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

  color: #ffffff;

  background-color: #0a4459;
  border: none;
  border-radius: 2px;

  cursor: pointer;
`;

const RegisterContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: #f2f6f8;
`;
const RegisterTitle = styled.div`
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
  color: #0a4459;
`;
const Text = styled.div`
  margin-bottom: 24px;

  font-weight: 400;
  font-size: 11px;
  line-height: 130%;
  color: #8aa1aa;
`;

const ButtonRegister = styled.button`
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

export default useLogin;
