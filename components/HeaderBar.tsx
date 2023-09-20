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
import { loginCheck } from "../utils/functions";
import { useRouter } from "next/router";
import { colorsRequest } from "../utils/api";
import { setColors } from "../features/login/colorSlice";

const useHeaderBar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { value: isLogin } = useAppSelector((state) => state.isLogin);

  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    sessionStorage.getItem("rt") ? dispatch(login()) : "";
    colorsRequestHandler();
  }, []);

  /** color값 세팅 */
  const colorsRequestHandler = async () => {
    let tempColors: any = [];
    await colorsRequest().then((res) => {
      res?.data.result.forEach((el: any, index: number) => {
        tempColors.push({
          colorNo: el.colorNo,
          name: el.name,
        });
      });
    });
    dispatch(setColors(tempColors));
  };

  // 엑티브 비활성화
  // 로그인 체크 후 false면 로그인 페이지로 이동
  // true면 해당 페이지로 이동
  /** 아이콘 클릭 핸들러 */
  const clickHandler = (url: string) => {
    setIsActive(false);
    if (loginCheck()) {
      router.push(url);
      return;
    }
    router.push("/login");
  };

  /** 스위치 해당 페이지 제외하고 나머지 페이지의 경우 로그인 체크 후 false일 때 로그인 페이지로 이동 */
  useEffect(() => {
    switch (router.pathname) {
      case "/":
        break;
      case "/register":
        break;
      case "/login":
        break;
      case "/lost_password":
        break;
      case "/new_arrivals":
        break;
      case "/password_reset/[key]":
        break;
      case "/product_detail/[id]":
        break;
      case "/shop_fabrics":
        break;
      case "/shop_project":
        break;
      case "/shop_supplies":
        break;
      case "/about_us":
        break;
      default:
        !loginCheck() && router.push("/login");
    }
  }, [router]);

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
        <Menu onClick={() => clickHandler("/cart")}>
          <Image src={ic_cart_wht} alt="cart_menu_button" />
        </Menu>
        <Menu onClick={() => clickHandler("/favorite")}>
          <Image src={ic_favorite_wht} alt="favorite_menu_button" />
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
