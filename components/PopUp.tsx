import React from "react";
import styled from "styled-components";

const PopUp = ({
  title,
  text,
  isActive,
  setIsActive,
}: {
  title: string;
  text: string;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <BackGround isActive={isActive}>
        <Box>
          <Title>{title}</Title>
          <Text>{text}</Text>
          <Button onClick={() => setIsActive(false)}>OK</Button>
        </Box>
      </BackGround>
    </>
  );
};

const BackGround = styled.div<{ isActive: boolean }>`
  z-index: 2;
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`;
const Box = styled.div`
  padding-top: 28px;
  padding-bottom: 20px;
  box-sizing: border-box;
  width: 320px;
  height: 151px;
  background-color: #ffffff;
`;
const Title = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #121822;
`;
const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;

  color: #548a9e;
`;
const Button = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  width: 236.25px;
  height: 36px;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 2px;
  box-sizing: border-box;

  font-size: 14px;
  font-weight: 700;
  line-height: 18px;

  color: #ffffff;

  background-color: #1eab92;

  cursor: pointer;
`;

export default PopUp;
