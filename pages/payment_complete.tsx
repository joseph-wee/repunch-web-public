import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const usePayment_complete = () => {
  const router = useRouter();

  return (
    <Container>
      <MainText>
        Congratulations!. <br />
        The payment has been completed.
      </MainText>
      <InformText>
        If you have any question, please <Br1 />
        contact the <Br2 />
        email below
      </InformText>
      <EmailRepunch>support@repunch.co.kr</EmailRepunch>
      <ButtonHome onClick={() => router.push("./")}>Home</ButtonHome>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
  max-width: 427px;

  color: #121822;
  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const MainText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 22px;
  line-height: 29px;
  text-align: center;
  color: #121822;
`;
const InformText = styled.div`
  margin-bottom: 6px;
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
  display: block;
  margin: 0 auto;
  height: 48px;
  width: 280px;
  box-sizing: border-box;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  color: #121822;
  background-color: #e1ff20;
  border: 1px solid #d4f01e;
  border-radius: 2px;
  cursor: pointer;
`;

const Br1 = styled.br`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const Br2 = styled.br`
  display: block;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default usePayment_complete;
