import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { about_us_image, ic_down_bk, ic_filter, ic_up_bk } from "../assets";
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
            src={about_us_image}
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
  @media screen and (max-width: 768px) {
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
  @media screen and (max-width: 768px) {
    display: none;
  }
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;
const TextMobile = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

export default useAbout_us;
