/* ------------- 768px이상 보여지는 상단바 ------------- */

import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavTopBar = () => {
  return (
    <>
      <Container>
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

const Container = styled.nav`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 80px;

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
