import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { ic_nav_indi } from "../assets";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../features/login/loginSlice";

const useSideBar = () => {
  const router = useRouter();

  const pathCheck = (pathname: string) => {
    return router.pathname == pathname;
  };

  const addressPathCheck = () => {
    console.log(router.pathname);
    return router.pathname.includes("address");
  };

  const { value: isLogin } = useAppSelector((state) => state.isLogin);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    sessionStorage.clear();
    dispatch(logout());
    router.push("/");
  };

  return (
    <Container>
      <Link href="/my_account" style={{ textDecoration: "none" }}>
        <Menu isActive={pathCheck("/my_account")}>
          <ImageWrapper isActive={pathCheck("/my_account")}>
            <Image src={ic_nav_indi} alt={"button_close"} />
          </ImageWrapper>
          My Account
        </Menu>
      </Link>
      <Link href="/favorite" style={{ textDecoration: "none" }}>
        <Menu isActive={pathCheck("/favorite")}>
          <ImageWrapper isActive={pathCheck("/favorite")}>
            <Image src={ic_nav_indi} alt={"button_close"} />
          </ImageWrapper>
          Favorits
        </Menu>
      </Link>
      <Link href="/cart" style={{ textDecoration: "none" }}>
        <Menu isActive={pathCheck("/cart")}>
          <ImageWrapper isActive={pathCheck("/cart")}>
            <Image src={ic_nav_indi} alt={"button_close"} />
          </ImageWrapper>
          Cart
        </Menu>
      </Link>
      <Link href="/order" style={{ textDecoration: "none" }}>
        <Menu isActive={pathCheck("/order")}>
          <ImageWrapper isActive={pathCheck("/order")}>
            <Image src={ic_nav_indi} alt={"button_close"} />
          </ImageWrapper>
          Order
        </Menu>
      </Link>
      <Link href="/order_history" style={{ textDecoration: "none" }}>
        <Menu isActive={pathCheck("/order_history")}>
          <ImageWrapper isActive={pathCheck("/order_history")}>
            <Image src={ic_nav_indi} alt={"button_close"} />
          </ImageWrapper>
          Order History
        </Menu>
      </Link>
      <Link href="/address" style={{ textDecoration: "none" }}>
        <Menu isActive={addressPathCheck()}>
          <ImageWrapper isActive={addressPathCheck()}>
            <Image src={ic_nav_indi} alt={"button_close"} />
          </ImageWrapper>
          Address
        </Menu>
      </Link>
      <Link href="/account_detail" style={{ textDecoration: "none" }}>
        <Menu isActive={pathCheck("/account_detail")}>
          <ImageWrapper isActive={pathCheck("/account_detail")}>
            <Image src={ic_nav_indi} alt={"button_close"} />
          </ImageWrapper>
          Account Detail
        </Menu>
      </Link>
      {/**로그아웃 기능 추가하기 */}
      <Link
        onClick={() => logoutHandler()}
        href="/"
        style={{ textDecoration: "none" }}
      >
        <LogoutMenu>Logout</LogoutMenu>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 16px;
  flex-shrink: 0;
  width: 190px;
  @media screen and (max-width: 1279px) {
    width: 160px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const Menu = styled.div<{ isActive: boolean }>`
  display: flex;
  margin-bottom: 16px;
  height: 30px;
  border-bottom: 1px solid #dee8ec;
  box-sizing: border-box;

  font-weight: ${(props) => {
    return props.isActive == true ? "700" : "400";
  }};
  font-size: 14px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const ImageWrapper = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  margin-right: 5px;
  line-height: 16px;
`;
const LogoutMenu = styled.div`
  display: flex;
  margin-bottom: 16px;
  height: 30px;

  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #121822;
`;

export default useSideBar;
