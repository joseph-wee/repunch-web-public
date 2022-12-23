/* ------------- 헤더바 ------------- */

import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { button_menu } from "../assets";

const HeaderBar = () => {



  return (
    <>
      <Container>
        <Title>Repunch</Title>
        {/* <Image 
          src={button_menu}
          alt="button_menu"
          
        /> */}
      </Container>
    </>
  );
};

const Container = styled.header`
  z-index: 2;
  display: flex;
  position: fixed;
  padding-left: 17px;
  padding-right: 20px;
  box-sizing: border-box;
  top: 0;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: #ff5c01;
`;
const Title = styled.h1`
  font-weight: 900;
  font-size: 30px;
  line-height: 130%;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

export default HeaderBar;
