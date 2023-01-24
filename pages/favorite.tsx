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

const useFavorite = () => {
  const [sortIsActive, setSortIsActive] = useState(true);

  return (
    <Container>
      <SideBar />
      <Main>
        <TitleWrapper>
          <ImageWrapper>
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
        </ItemSortBar>
        <ProductListGridWrapper isActive={sortIsActive}>
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
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
  max-width: 637px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 767px) {
    display: block;
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
  margin-bottom: 20px;
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
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.011em;
  color: #0a4459;
  @media screen and (max-width: 767px) {
    margin-left: 8px;
  }
`;
const ItemSortBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
  color: #0a4459;
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
  color: #0a4459;
`;
const ItemsTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #0a4459;
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
const ProductListGridWrapper = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "grid" : "none";
  }};

  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 22px;
  column-gap: 17px;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 22px;
    column-gap: 15px;
  }
`;
export default useFavorite;
