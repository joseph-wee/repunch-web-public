/* ------------- 푸터바 ------------- */

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import {
  btn_to_facebook,
  btn_to_facebook_wht,
  btn_to_instagram,
  btn_to_instagram_wht,
  btn_to_mail,
  btn_to_mail_wht,
} from "../assets";

const FooterBar = () => {
  return (
    <>
      <Container>
        <Nav>
          <Menu>
            <Link
              href="/term_of_service"
              style={{ textDecoration: "none", color: "#536C6D" }}
            >
              TERM OF SERVICE
            </Link>
          </Menu>
          <Bar />
          <Menu>
            <Link
              href="/privacy_policy"
              style={{ textDecoration: "none", color: "#536C6D" }}
            >
              PRIVACY POLICY
            </Link>
          </Menu>
          <Bar />
          <Menu>
            <Link
              href="/contact_us"
              style={{ textDecoration: "none", color: "#536C6D" }}
            >
              CONTACT US
            </Link>
          </Menu>
        </Nav>
        <Text>2022 Repunch All Rights Reserved.</Text>
        <IconWrapper>
          <A href="https://www.naver.com" target="_blank">
            <Image src={btn_to_instagram_wht} alt="button_menu" />
          </A>

          <A href="https://www.naver.com" target="_blank">
            <Image src={btn_to_mail_wht} alt="cart_menu_button" />
          </A>

          <A href="https://www.naver.com" target="_blank">
            <Image src={btn_to_facebook_wht} alt="favorite_menu_button" />
          </A>
        </IconWrapper>
      </Container>
    </>
  );
};

const Container = styled.footer`
  position: absolute;
  bottom: 0px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  height: 115px;
  box-sizing: border-box;
  background-color: #121822;
`;
const Nav = styled.nav`
  display: flex;
  margin-bottom: 2.97px;
  justify-content: center;
  align-items: center;

  line-height: 14px;
  font-weight: 400;
  font-size: 11px;
`;
const Menu = styled.div``;
const Bar = styled.div`
  margin-left: 7px;
  margin-right: 7px;
  width: 1px;
  height: 9px;
  border-right: 1px solid #536c6d;
  box-sizing: border-box;
`;
const Text = styled.div`
  display: flex;
  margin-bottom: 15.7px;
  justify-content: center;
  align-items: center;
  height: 16px;

  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #536c6d;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const A = styled.a`
  margin-left: 4px;
  margin-right: 4px;
`;

export default FooterBar;
