import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { home_image, ic_down_bk, ic_filter, ic_up_bk } from "../assets";
import Image from "next/legacy/image";
import { useState } from "react";
import { Filter, ProductList } from "../components";

const useAbout_us = () => {
  const [sortIsActive, setSortIsActive] = useState(true);
  const [filterIsActive, setFilterIsActive] = useState(false);

  return (
    <Container>
      <Banner>
        <Background>
          <Image
            src={home_image}
            alt={"homepage_banner"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Background>
        <BannerTextWrapper>
          <Title>추후 페이지 수정예정</Title>
          <Text>
            Fresh additions to our online store, updated weekly! <Br />
            Here at The Fabric Store we get new shipments arriving every single
            week.
          </Text>
        </BannerTextWrapper>
      </Banner>
    </Container>
  );
};
const Container = styled.div`
  background-color: #eeeeee;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 277px;
`;

const Background = styled.div`
  height: 277px;
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
  margin-bottom: 5px;
  heihgt: 96px;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
`;
const Text = styled.span`
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
  padding-top: 50px;
  padding-bottom: 20px;

  max-width: 1030px;
  height: 2843.35px;
  box-sizing: border-box;
  @media screen and (max-width: 1279px) {
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
const ButtonWraaper = styled.div`
  display: flex;
  align-itmes: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;
const FilterButton = styled.button`
  display: none;
  position: relative;
  align-itesm: center;
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

  color: #0a4459;
`;
const FilterAlarmBackground = styled.div`
  display: flex;
  position: absolute;
  top: 6px;
  left: 22px;

  align-itesm: center;
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
  /* identical to box height */

  letter-spacing: -0.011em;
  &::after {
    display: block;
    content: "result";
    font-weight: 400;
  }

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
const SortButton = styled.button`
  display: flex;
  align-items: center;
  border: none;

  cursor: pointer;

  @media screen and (max-width: 1279px) {
    padding-top: 3px;
  }
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
export default useAbout_us;
