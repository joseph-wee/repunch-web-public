import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../features/login/loginSlice";

const MobileSideBar = () => {
  const router = useRouter();

  const { value: isLogin } = useAppSelector((state) => state.isLogin);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    sessionStorage.clear();
    dispatch(logout());
    router.push("/");
  };

  return (
    <Container>
      <Line />
      <Link href="/favorits" style={{ textDecoration: "none" }}>
        <MenuTitle>Favorits</MenuTitle>
      </Link>
      <Line />
      <Link href="/cart" style={{ textDecoration: "none" }}>
        <MenuTitle>Cart</MenuTitle>
      </Link>
      <Line />
      <Link href="/order" style={{ textDecoration: "none" }}>
        <MenuTitle>Order</MenuTitle>
      </Link>
      <Line />
      <Link href="/order_history" style={{ textDecoration: "none" }}>
        <MenuTitle>Order History</MenuTitle>
      </Link>
      <Line />
      <Link href="/address" style={{ textDecoration: "none" }}>
        <MenuTitle>Address</MenuTitle>
      </Link>
      <Line />
      <Link href="/account_detail" style={{ textDecoration: "none" }}>
        <MenuTitle>Account Detail</MenuTitle>
      </Link>
      <Line />
      <MenuTitle onClick={() => logoutHandler()}>Logout</MenuTitle>
    </Container>
  );
};

const Container = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
const Line = styled.div`
  border-bottom: 1px solid #dee8ec;
`;
const MenuTitle = styled.div`
  display: inline-block;
  padding-top: 16px;
  padding-bottom: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #121822;
  cursor: pointer;
`;

export default MobileSideBar;
