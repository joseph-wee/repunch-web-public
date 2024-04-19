import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { PopUp } from "../components";

const useAuthentication = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Repunch</Title>
          <Name>J Kim</Name>
          <ConfirmWrapper>
            <Id>ID (E-mail)</Id>
            <Email>Test@gmail.com</Email>
            <Text>
              An authentication email has been sent to
              <br />
              your email address.
              <br />
              You can use all services freely after the
              <br />
              authentication process.
            </Text>
            <Button onClick={() => setIsActive(true)}>Confirm</Button>
          </ConfirmWrapper>
        </Wrapper>
        <TextInform>
          If you entered the wrong email address, please
          <br />
          contact the email below
        </TextInform>

        <EmailContainer>
          <EmailRepunch target="_blank" href="mailto:support@repunch.co.kr">
            support@repunch.co.kr
          </EmailRepunch>
        </EmailContainer>
      </Container>
      <PopUp
        title={"Not verified yet"}
        text={"Wait a little longer or resend"}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </>
  );
};

const Container = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: 20px;
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    padding-top: 20px;
  }
`;
const Wrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 29px;
  padding-top: 15px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: #f2f6f8;
  max-width: 427px;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    padding-top: 11px;
  }
`;
const Title = styled.div`
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

  color: #1eab92;
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
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #121822;
`;
const Email = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #ff5c01;
`;
const Text = styled.div`
  margin-bottom: 12px;
  text-align: center;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  color: #121822;
`;

const Button = styled.button`
  display: flex;
  margin: 0 auto;
  width: 180px;
  height: 40px;

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

const TextInform = styled.div`
  margin-bottom: 6px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  text-align: center;

  color: #8aa1aa;
`;
const EmailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EmailRepunch = styled.a`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  text-align: center;
  text-decoration-line: underline;

  color: #121822;
  cursor: pointer;
`;

export default useAuthentication;
