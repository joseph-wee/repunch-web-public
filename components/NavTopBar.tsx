/* ------------- 768px이상 보여지는 상단바 ------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const NavTopBar = () => {
  const [isActive, setIsActive] = useState(true); // 조건부 렌더링 판별, true일때만 렌더링
  const router = useRouter();

  /** 주소 현재 경로에 따라서 조건부 렌더링되게 하는 함수 */
  const conditionalRendering = () => {
    console.log("test");
    switch (router.pathname) {
      case "/login":
        setIsActive(false);
        break;
      case "/authentication":
        setIsActive(false);
        break;
      case "/lost_password":
        setIsActive(false);
        break;
      case "/lost_id":
        setIsActive(false);
        break;
      case "/payment":
        setIsActive(false);
        break;
      case "/password_reset":
        setIsActive(false);
        break;
      default:
        setIsActive(true);
    }
  };

  useEffect(() => {
    conditionalRendering();
  }, [router]);

  return (
    <>
      <Container isActive={isActive}>
        <Wrapper>
          <Link href="/new_arrivals" style={{ textDecoration: "none" }}>
            <Menu>New arrivals</Menu>
          </Link>
          <Link href="/shop_fabric" style={{ textDecoration: "none" }}>
            <Menu>Shop fabric </Menu>
          </Link>
          <Link href="/shop_supplies" style={{ textDecoration: "none" }}>
            <Menu>Shop supplies</Menu>
          </Link>
          <Link href="/shop_by_project" style={{ textDecoration: "none" }}>
            <Menu>Shop by project </Menu>
          </Link>
          <Link href="/about_us" style={{ textDecoration: "none" }}>
            <Menu>About us</Menu>
          </Link>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.nav<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  align-items: center;
  box-sizing: border-box;
  height: 80px;

  background-color: #ffffff;
  border-bottom: 1px solid #f2f6f8;

  @media screen and (max-width: 767px) {
    display: none;
  } ;
`;
const Wrapper = styled.ul`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 459px;
`;
const Menu = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.011em;
  text-align: left;

  color: #0a4459;
`;

export default NavTopBar;
