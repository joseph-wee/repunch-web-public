import React, { useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  ProductList,
  RecentOrders,
  SideBar,
} from "../components";
import { ic_down_bk, ic_up_bk } from "../assets";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back } from "../assets";
import { goBack } from "../utils/functions";

const useFavorite = () => {
  const [sortIsActive, setSortIsActive] = useState(true);

  return (
    <Container>
      <SideBar />
      <Main>
        <TitleWrapper>
          <ImageWrapper onClick={() => goBack()}>
            <Image src={btn_web_back} alt={"btn_web_back"} />
          </ImageWrapper>
          <Title>favorite</Title>
        </TitleWrapper>
        <ItemSortBar>
          <Items>
            <Count>6</Count>
            <ItemsTitle>items</ItemsTitle>
          </Items>
          <SortButton onClick={() => setSortIsActive(!sortIsActive)}>
            <ButtonTextSort>Sort By</ButtonTextSort>

            <Image
              src={sortIsActive ? ic_down_bk : ic_up_bk}
              alt={"sort_arrow_button"}
            />
          </SortButton>
          <SortMenuWrapper isActive={sortIsActive}>
            <SortMenu onClick={() => setSortIsActive(!sortIsActive)}>
              Latest
            </SortMenu>
            <SortMenu onClick={() => setSortIsActive(!sortIsActive)}>
              Popular
            </SortMenu>
          </SortMenuWrapper>
        </ItemSortBar>
        <ProductListGridWrapper>
          <ProductList quantity={"100"} />
          <ProductList quantity={"100"} />
          <ProductList quantity={"100"} />
          <ProductList quantity={"100"} />
        </ProductListGridWrapper>
      </Main>
      <MobileSideBar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 40px;
  max-width: 1030px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 767px) {
    display: block;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    boxsizing: border-box;
  }
`;
const Main = styled.div`
  position: relative;
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 767px) {
    margin-left: 0;
    margin-bottom: 20px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 31.28px;
  @media screen and (max-width: 1279px) {
    margin-bottom: 20px;
  }
`;
const ImageWrapper = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 767px) {
    font-size: 22px;
    line-height: 26px;
    margin-left: 8px;
  }
`;
const ItemSortBar = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21.72px;
  padding-left: 17px;
  padding-right: 13px;
  height: 30px;
  background-color: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
  @media screen and (max-width: 1279px) {
    margin-bottom: 20px;
  }
`;
const Items = styled.div`
  display: flex;
  align-items: center;
`;
const Count = styled.div`
  margin-right: 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
`;
const ItemsTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #f2f6f8;
`;
const ButtonTextSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;

  height: 14px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #000000;
`;
const SortMenuWrapper = styled.div<{ isActive: boolean }>`
  z-index: 1;
  display: ${(props) => {
    return props.isActive == true ? "none" : "block";
  }};
  position: absolute;
  right: 0;
  top: 36px;
  width: 120px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 2px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const SortMenu = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #dee8ec;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #121822;
  &:last-of-type {
    border: none;
  }
  cursor: pointer;
`;
const ProductListGridWrapper = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 22px;
  column-gap: 20px;
  @media screen and (max-width: 1279px) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 22px;
    column-gap: 17px;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 22px;
    column-gap: 15px;
  }
`;
export default useFavorite;
