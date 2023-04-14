/* ------------- 헤더바 ------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  button_menu,
  ic_cart_wht,
  ic_close_black,
  ic_close_wht,
  ic_favorite_wht,
  ic_menu_wht,
  logo,
} from "../assets";
import Link from "next/link";
import NavTopBar from "./NavTopBar";
import NavMobileBar from "./NavMobileBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../features/login/loginSlice";

const useHeaderBar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { value: isLogin } = useAppSelector((state) => state.isLogin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    sessionStorage.getItem("rt") ? dispatch(login()) : "";
  }, []);

  return (
    <>
      <Container>
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          onClick={() => setIsActive(false)}
        >
          <Logo>
            <Image src={logo} alt="logo" />
          </Logo>
        </Link>
        <Menu onClick={() => setIsActive(!isActive)}>
          <Image
            src={isActive ? ic_close_black : ic_menu_wht}
            alt="button_menu"
          />
        </Menu>
        <Menu onClick={() => setIsActive(false)}>
          <Link href="/cart" style={{ textDecoration: "none" }}>
            <Image src={ic_cart_wht} alt="cart_menu_button" />
          </Link>
        </Menu>
        <Menu onClick={() => setIsActive(false)}>
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
  z-index: 3;
  display: flex;
  position: fixed;
  padding-left: 17px;
  padding-right: 20px;
  box-sizing: border-box;
  top: 0;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: #e1ff20;
`;
const Logo = styled.div``;
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
