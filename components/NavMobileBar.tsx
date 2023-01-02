import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { ic_cart_wht, ic_favorite_wht } from "../assets";

const NavMobileBar = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Container isActive={isActive}>
        <MenuWrapper>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/new_arrivals"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              New Arrivals
            </Link>
          </Menu>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/shop_fabric"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              Shop fabric
            </Link>
          </Menu>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/shop_supplies"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              Shop supplies
            </Link>
          </Menu>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/shop_by_project"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              Shop by project
            </Link>
          </Menu>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/about_us"
              style={{ textDecoration: "none", color: "#FFFFFF" }}
            >
              New Arrivals
            </Link>
          </Menu>
        </MenuWrapper>
        <MenuButtonWrapper>
          <MenuButtonBox>
            <MenuIcon>
              <Link
                onClick={() => setIsActive(false)}
                href="/cart"
                style={{ textDecoration: "none" }}
              >
                <Image src={ic_cart_wht} alt="cart_menu_button" />
              </Link>
            </MenuIcon>
            <MenuIcon>
              <Link
                onClick={() => setIsActive(false)}
                href="/favorite"
                style={{ textDecoration: "none" }}
              >
                <Image src={ic_favorite_wht} alt="favorite_menu_button" />
              </Link>
            </MenuIcon>

            <MenuButton>
              <Link
                onClick={() => setIsActive(false)}
                href="/login"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <LinkBox>Log in</LinkBox>
              </Link>
            </MenuButton>

            <Circle></Circle>
            <MenuButton>
              <Link
                onClick={() => setIsActive(false)}
                href="/register"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <LinkBox>Sign in</LinkBox>
              </Link>
            </MenuButton>
          </MenuButtonBox>
        </MenuButtonWrapper>
      </Container>
    </>
  );
};

const Container = styled.nav<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive ? "block" : "none";
  }};
  position: fixed;
  z-index: 1;
  top: 64px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 478px;
  background-color: #ff5c01;
`;

const MenuWrapper = styled.ul``;
const Menu = styled.li`
  display: flex;
  height: 62px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
  box-sizing: border-box;

  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
`;
const MenuButtonWrapper = styled.nav`
  position: absolute;
  left: 0px;
  bottom: 26px;
  width: 100%;
`;
const MenuButtonBox = styled.div`
  position: relative;
  display: flex;
  padding-left: 23px;
`;

const MenuIcon = styled.div`
  margin-right: 23px;
`;
const MenuButton = styled.div`
  position: absolute;
  right: 106px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  text-align: right;
  line-height: 24px;
  color: #ffffff;

  cursor: pointer;

  &:nth-of-type(5) {
    right: 33px;
  }
`;

const LinkBox = styled.div``;
const Circle = styled.div`
  position: absolute;
  right: 92px;
  bottom: 12px;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.36);
`;

export default NavMobileBar;
