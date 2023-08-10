import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import {
  ic_down_bk,
  ic_down_bk_filter,
  ic_filter,
  ic_up_bk,
  ic_up_bk_filter,
  shop_project_image,
  shop_supply_image,
} from "../assets";
import Image from "next/legacy/image";
import { useState } from "react";
import { Filter, ProductList } from "../components";

const useShop_supplies = () => {
  const [sortIsActive, setSortIsActive] = useState(true);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [sortFilterIsActive, setSortFilterIsActive] = useState(false);

  return (
    <Container>
      <Banner>
        <Background>
          <Image
            src={shop_project_image}
            alt={"homepage_banner"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Background>
        <BannerTextWrapper>
          <Title>New Arrivals</Title>
          <Text>
            Fresh additions to our online store, updated weekly! <br />
            Here at The Fabric Store we get new shipments arriving every single
            week.
          </Text>
          <TextMobile>
            Fresh additions to our online store, updated
            <br />
            weekly! Here at The Fabric Store we get new
            <br /> shipments arriving every single week.
          </TextMobile>
        </BannerTextWrapper>
      </Banner>
      <Main>
        <Filter
          isActive={filterIsActive}
          setIsActive={setFilterIsActive}
          sortFilterIsActive={sortFilterIsActive}
          setSortFilterIsActive={setSortFilterIsActive}
        />
        <ProductListWrapper>
          <ButtonFlexWrapper>
            <FilterButton onClick={() => setFilterIsActive(!filterIsActive)}>
              <Image src={ic_filter} alt={"filter_button"} />
              <ButtonTextFilter>Filter</ButtonTextFilter>
              <FilterAlarmBackground>
                <FilterAlarmCircle />
              </FilterAlarmBackground>
            </FilterButton>
            <Result>1900&nbsp;</Result>
            <ButtonWrapper>
              <ClearButton
                isActive={sortFilterIsActive}
                onClick={() => setSortFilterIsActive(false)}
              >
                Clear Filter
              </ClearButton>
              <SortButton onClick={() => setSortIsActive(!sortIsActive)}>
                <ButtonTextSort>Sort By</ButtonTextSort>

                <Image
                  src={sortIsActive ? ic_down_bk_filter : ic_up_bk_filter}
                  alt={"sort_arrow_button"}
                />
              </SortButton>
            </ButtonWrapper>
            <SortMenuWrapper isActive={sortIsActive}>
              <SortMenu
                onClick={() => {
                  setSortIsActive(!sortIsActive);
                  setSortFilterIsActive(true);
                }}
              >
                Latest
              </SortMenu>
              <SortMenu
                onClick={() => {
                  setSortIsActive(!sortIsActive);
                  setSortFilterIsActive(true);
                }}
              >
                Popular
              </SortMenu>
            </SortMenuWrapper>
          </ButtonFlexWrapper>
          <ProductListGridWrapper>
            <ProductList />
          </ProductListGridWrapper>
        </ProductListWrapper>
      </Main>
    </Container>
  );
};
const Container = styled.div`
  background-color: #fafafa;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 280px;
`;

const Background = styled.div`
  height: 280px;
`;
const BannerTextWrapper = styled.div`
  margin: 0 auto;
  z-index: 1;
  @media screen and (max-width: 767px) {
    width: 75%;
  }
  text-align: center;
  color: #ffffff;
`;
const Title = styled.div`
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 28px;
  line-height: 28px;
`;
const Text = styled.span`
  @media screen and (max-width: 767px) {
    display: none;
  }
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;
const TextMobile = styled.span`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const Br = styled.br`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Main = styled.div`
  display: flex;
  margin: 0 auto;
  padding-top: 47px;
  padding-bottom: 20px;

  max-width: 1030px;
  height: 2843.35px;
  box-sizing: border-box;
  @media screen and (max-width: 1279px) {
    padding-top: 20px;
    padding-left: 80px;
    padding-right: 80px;
  }

  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const ProductListWrapper = styled.div`
  width: 100%;
`;
const ButtonFlexWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;
const FilterButton = styled.button`
  display: none;
  position: relative;
  align-items: center;
  justify-content: center;

  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;

  cursor: pointer;

  @media screen and (max-width: 1279px) {
    display: flex;
  }
`;
const ButtonTextFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  margin-right: 7px;
  height: 19px;

  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #121822;
`;
const FilterAlarmBackground = styled.div`
  display: flex;
  position: absolute;
  top: 6px;
  left: 22px;

  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;

  background-color: #ffffff;
  border-radius: 100%;
`;
const FilterAlarmCircle = styled.div`
  width: 6px;
  height: 6px;
  background-color: #ff5c01;
  border-radius: 100%;
`;
const Result = styled.div`
  display: flex;

  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #121822;

  letter-spacing: -0.011em;
  &::after {
    display: block;
    content: "result";
    font-weight: 400;
    color: #121822;
  }

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
`;
const ClearButton = styled.button<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  padding: 0;
  border: none;
  background-color: #fafafa;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  text-decoration-line: underline;
  color: #536c6d;

  cursor: pointer;
`;
const SortButton = styled.button`
  display: flex;
  align-items: center;
  padding-left: 0;
  border: none;
  background-color: #fafafa;
  cursor: pointer;
`;
const ButtonTextSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;

  @media screen and (max-width: 1279px) {
    margin-right: 7px;
    font-size: 12px;
  }
`;
const SortMenuWrapper = styled.div<{ isActive: boolean }>`
  z-index: 1;
  display: ${(props) => {
    return props.isActive == true ? "none" : "block";
  }};
  position: absolute;
  right: 0;
  top: 25px;
  @media screen and (max-width: 1279px) {
    top: 40px;
  }
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
  row-gap: 50px;
  column-gap: 20px;

  @media screen and (max-width: 1279px) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 40px;
    column-gap: 18px;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 15px;
    column-gap: 15px;
  }
`;
export default useShop_supplies;
