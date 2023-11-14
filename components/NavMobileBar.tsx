import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { ic_cart_wht, ic_favorite_wht } from "../assets";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout, login } from "../features/login/loginSlice";
import { loginCheck } from "../utils/functions";

const NavMobileBar = ({
  isActive,
  setIsActive,
  url,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}) => {
  const { value: isLogin } = useAppSelector((state) => state.isLogin);

  const dispatch = useAppDispatch();

  /** 로그인 확인 후 로그인 상태 처리 */
  const loginCheckHandler = () => {
    loginCheck() && dispatch(login());
  };

  const logoutHandler = () => {
    location.reload();
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout);
  };

  /** 로컬에 저장된 후에 홈페이지 재접속 했을 때 로그인 되게 */
  useEffect(() => {
    loginCheckHandler();
  }, []);

  return (
    <>
      <Background
        isActive={isActive}
        onClick={() => setIsActive(false)}
        url={url}
      />
      <Container isActive={isActive} url={url}>
        <MenuWrapper>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/"
              style={{ textDecoration: "none", color: "#121822" }}
            >
              Shop
            </Link>
          </Menu>
          {/* <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/shop_fabrics"
              style={{ textDecoration: "none", color: "#121822" }}
            >
              Shop fabric
            </Link>
          </Menu>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/shop_supplies"
              style={{ textDecoration: "none", color: "#121822" }}
            >
              Shop supplies
            </Link>
          </Menu>
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/shop_project"
              style={{ textDecoration: "none", color: "#121822" }}
            >
              Shop by project
            </Link>
          </Menu> */}
          <Menu>
            <Link
              onClick={() => setIsActive(false)}
              href="/about_us"
              style={{ textDecoration: "none", color: "#121822" }}
            >
              About us
            </Link>
          </Menu>
          <Menu>
            <MenuButton isActive={isLogin}>
              <Link
                onClick={() => setIsActive(false)}
                href="/login"
                style={{ textDecoration: "none", color: "#121822" }}
              >
                <LinkBox>Log in</LinkBox>
              </Link>
            </MenuButton>

            <Circle isActive={isLogin}></Circle>
            <MenuButton isActive={isLogin}>
              <Link
                onClick={() => setIsActive(false)}
                href="/register"
                style={{ textDecoration: "none", color: "#121822" }}
              >
                <LinkBox>Sign in</LinkBox>
              </Link>
            </MenuButton>
            <LogoutButton isActive={isLogin}>
              <Link
                onClick={() => {
                  setIsActive(false);
                  logoutHandler();
                }}
                href="/"
                style={{ textDecoration: "none", color: "#121822" }}
              >
                <LinkBox>Logout</LinkBox>
              </Link>
            </LogoutButton>
          </Menu>
        </MenuWrapper>
        <MenuButtonWrapper></MenuButtonWrapper>
      </Container>
    </>
  );
};

const Background = styled.div<{ isActive: boolean; url: string }>`
  z-index: 1;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  display: ${(props) => {
    return props.url == "/about_us" && "none";
  }};
`;

const Container = styled.nav<{ isActive: boolean; url: string }>`
  display: ${(props) => {
    return props.isActive ? "block" : "none";
  }};
  position: fixed;
  z-index: 2;
  top: 64px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${(props) => {
    return props.url == "/about_us" ? "" : "#e1ff20";
  }};

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const MenuWrapper = styled.ul``;
const Menu = styled.li`
  display: flex;
  position: relative;
  margin-bottom: 15px;
  height: 31px;
  align-items: center;
  box-sizing: border-box;

  font-weight: 400;
  font-size: 16px;
  color: #121822;
  &:last-of-type {
    margin-bottom: 0px;
    height: 24px;
  }
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
`;

const MenuIcon = styled.div`
  margin-right: 23px;
`;
const MenuButton = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive ? "none" : "block";
  }};
`;
const LogoutButton = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive ? "block" : "none";
  }};
`;

const LinkBox = styled.div``;
const Circle = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive ? "none" : "block";
  }};
  margin-left: 10px;
  margin-right: 10px;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #121822;
`;

export default NavMobileBar;
