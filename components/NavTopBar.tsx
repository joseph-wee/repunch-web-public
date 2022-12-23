/* ------------- 768px이상 보여지는 상단바 ------------- */

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const NavTopBar = () => {
  return (
    <>
      <Container>
        <Wrapper>
        <Menu>New arrivals</Menu>
        <Menu>Shop fabric </Menu>
        <Menu>Shop supplies</Menu>
        <Menu>Shop by project </Menu>
        <Menu>About us</Menu>
        </Wrapper>
      </Container>
    </>
  )
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 80px;

  border-bottom: 1px solid #F2F6F8;

  @media screen and (max-width: 767px) {
    display: none;
};
`
const Wrapper = styled.ul`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 459px;
`
const Menu = styled.li`

  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.011em;
  text-align: left;

  color: #0A4459;
`

export default NavTopBar