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
import { loginCheck } from "../utils/functions";
import { useRouter } from "next/router";
import { colorsRequest, loginRefreshRequest } from "../utils/api";
import { setColors } from "../features/login/colorSlice";

const useHeaderBar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  /** 로그인 체크, 토큰 갱신, 로그인 상태 세팅 */
  const loginCheckHandler = () => {
    const prevRt = localStorage.getItem("rt");

    loginRefreshRequest(prevRt).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    sessionStorage.getItem("rt");
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
      router.push(`/${url}`);
      return;
    }
    router.push(`/login?${url}`);
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
      case "/about_us":
        break;
      case "/terms_of_service":
        break;
      case "/privacy_policy":
        break;

      default:
        !loginCheck() && router.push("/login");
    }
  }, [router]);

  /** 페이지 첫 접속시 about us 페이지로 */
  useEffect(() => {
    const access = document.cookie.match(
      "(^|;) ?" + "access" + "=([^;]*)(;|$)"
    );

    // 첫 접속이 아니면
    if (!access) {
      let date = new Date();
      date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // 기간 1년
      document.cookie = `access=true; expires=${date.toUTCString()}; path=/`;
      router.push("/about_us");
    }
  });

  /** 쿠키 값 없으면 로컬스토리지 삭제 */
  // useEffect(() => {
  //   // 결제 콜백, 캔슬때에는 로컬 스토리지 삭제 x
  //   if (
  //     router.pathname.includes("/payment/callback") ||
  //     router.pathname.includes("/payment/cancel")
  //   ) {
  //     return;
  //   }
  //   // 로그인 유지 쿠키 값 없으면 로컬 스토리지 삭제
  //   if (document.cookie == "") {
  //     localStorage.removeItem("at");
  //     localStorage.removeItem("rt");
  //     return;
  //   }
  // }, []);

  return (
    <>
      <Container isActive={router.pathname}>
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
        <Menu onClick={() => clickHandler("cart")}>
          <Image src={ic_cart_wht} alt="cart_menu_button" />
        </Menu>
        <Menu onClick={() => clickHandler("favorite")}>
          <Image src={ic_favorite_wht} alt="favorite_menu_button" />
        </Menu>
        <Menu onClick={() => router.push("/shop")}>Shop</Menu>
        <BarLine />
      </Container>
      {/* <NavTopBar /> */}
      <NavMobileBar
        isActive={isActive}
        setIsActive={setIsActive}
        url={router.pathname}
      />
    </>
  );
};

const Container = styled.header<{ isActive: string }>`
  display: flex;
  z-index: 3;
  position: fixed;
  padding-left: 17px;
  padding-right: 20px;
  box-sizing: border-box;
  top: 0;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: ${(props) => {
    return props.isActive == "/about_us" ? "" : "#e1ff20";
  }};
`;
const Logo = styled.div``;
const Menu = styled.div`
  position: absolute;
  right: 20px;
  font-size: 16px;

  font-weight: 400;
  line-height: 20.8px;
  &:nth-of-type(2) {
    right: 64px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  &:nth-of-type(3) {
    right: 108px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  &:nth-of-type(4) {
    right: 175px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  cursor: pointer;
`;

const BarLine = styled.div`
  width: 1px;
  height: 20px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 155px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default useHeaderBar;
