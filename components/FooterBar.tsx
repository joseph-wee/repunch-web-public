/* ------------- 푸터바 ------------- */

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { btn_to_facebook, btn_to_instagram, btn_to_mail } from "../assets";

const FooterBar = () => {
  return (
    <>
      <Container>
        <Nav>
          <Menu>
            <Link
              href="/term_of_service"
              style={{ textDecoration: "none", color: "#A4ABBA" }}
            >
              TERM OF SERVICE
            </Link>
          </Menu>
          <Bar />
          <Menu>
            <Link
              href="/privacy_policy"
              style={{ textDecoration: "none", color: "#A4ABBA" }}
            >
              PRIVACY POLICY
            </Link>
          </Menu>
          <Bar />
          <Menu>
            <Link
              href="/contact_us"
              style={{ textDecoration: "none", color: "#A4ABBA" }}
            >
              CONTACT US
            </Link>
          </Menu>
        </Nav>
        <Text>2022 Repunch All Rights Reserved.</Text>
        <IconWrapper>
          <A href="https://www.naver.com" target="_blank">
            <Image src={btn_to_instagram} alt="button_menu" />
          </A>

          <A href="https://www.naver.com" target="_blank">
            <Image src={btn_to_mail} alt="cart_menu_button" />
          </A>

          <A href="https://www.naver.com" target="_blank">
            <Image src={btn_to_facebook} alt="favorite_menu_button" />
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
  height: 114.35px;
  box-sizing: border-box;
  background-color: #0a4459;
`;
const Nav = styled.nav`
  display: flex;
  margin-bottom: 2.97px;
  justify-content: center;
  align-items: center;

  height: 16px;
  font-weight: 600;
  font-size: 12px;

  color: #a4abba;
`;
const Menu = styled.div``;
const Bar = styled.div`
  margin-left: 7px;
  margin-right: 7px;
  width: 1px;
  height: 9px;
  border-right: 1px solid #a4abba;
  box-sizing: border-box;
`;
const Text = styled.div`
  display: flex;
  margin-bottom: 15.7px;
  justify-content: center;
  align:items: center;
  height: 16px;

  /*이 폰트 써도 되는걸까? 결정에 따라 적용시키거나 피그마에 따라 바꾸어야할 듯*/
  // font-family: 'SF Pro Text';
  font-weight: 400;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align:items: center;
`;
const A = styled.a`
  margin-left: 4px;
  margin-right: 4px;
`;

export default FooterBar;
