/* ------------- 헤더바 ------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  button_menu,
  ic_cart_wht,
  ic_close_wht,
  ic_favorite_wht,
} from "../assets";
import Link from "next/link";
import NavTopBar from "./NavTopBar";
import NavMobileBar from "./NavMobileBar";

const useHeaderBar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Title>Repunch</Title>
        </Link>
        <Menu onClick={() => setIsActive(!isActive)}>
          <Image
            src={isActive ? ic_close_wht : button_menu}
            alt="button_menu"
          />
        </Menu>
        <Menu>
          <Link href="/cart" style={{ textDecoration: "none" }}>
            <Image src={ic_cart_wht} alt="cart_menu_button" />
          </Link>
        </Menu>
        <Menu>
          <Link href="/favorite" style={{ textDecoration: "none" }}>
            <Image src={ic_favorite_wht} alt="favorite_menu_button" />
          </Link>
        </Menu>
      </Container>
      <NavTopBar />
      <NavMobileBar isActive={isActive} setIsActive={setIsActive} />
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
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 130%;
  /* identical to box height, or 39px */

  letter-spacing: -0.02em;
  color: #ffffff;
`;
const Menu = styled.div`
  position: absolute;
  right: 20px;
  &:nth-of-type(2) {
    right: 64px;
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  &:nth-of-type(3) {
    right: 108px;
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  cursor: pointer;
`;

export default useHeaderBar;
