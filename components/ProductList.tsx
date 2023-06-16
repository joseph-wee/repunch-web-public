import React, { useState } from "react";
import styled from "styled-components";
import {
  btn_favorite_inact,
  btn_review,
  ic_favorite_wht,
  test_thumbnail,
  test_thumbnail_green,
  test_thumbnail_red,
} from "../assets";
import Image from "next/legacy/image";
import Link from "next/link";

// title, quantity, thumbnail, price,
const ProductCard = (
  // title: string,
  quantity: any
  // price: string,
  // favoriteValue: boolean
) => {
  const [favoriteIsActive, setFavoriteIsActive] = useState(false);
  const [colorLength, setColorLength] = useState("60m");
  const [thumbnail, setThumnail] = useState(test_thumbnail);

  return (
    <Card>
      <Thumbnail>
        <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
          <Image
            src={thumbnail}
            alt={"thumbnail"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          {/* {quantity?.quantity == "100" ? <Soldout>SOLD OUT</Soldout> : ""} */}
        </Link>

        <LikeButton onClick={() => setFavoriteIsActive(!favoriteIsActive)}>
          <Image
            src={favoriteIsActive ? btn_review : btn_favorite_inact}
            alt={"logo_favorite"}
          />
        </LikeButton>
      </Thumbnail>

      <InfoWrapper>
        <ProductTitle>Embroidery sheer</ProductTitle>
        <ProductCategory>jacquard</ProductCategory>
        <RatioWrapper>
          <Ratio>EL 9%</Ratio>
          <Ratio>PA 94%</Ratio>
        </RatioWrapper>
        <PriceUnitWrapper>
          <Price>$ 8.38</Price>
          <Meter>/m</Meter>
        </PriceUnitWrapper>
        <ColorLength>{colorLength}</ColorLength>
        <ColorCircleWrapper>
          <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
            <ColorCircle
              color={"blue"}
              onMouseOver={() => {
                setColorLength("30m");
                setThumnail(test_thumbnail);
              }}
            />
          </Link>
          <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
            <ColorCircle
              color={"green"}
              onMouseOver={() => {
                setColorLength("30m");
                setThumnail(test_thumbnail_green);
              }}
            />
          </Link>
          <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
            <ColorCircle
              color={"red"}
              onMouseOver={() => {
                setColorLength("30m");
                setThumnail(test_thumbnail_red);
              }}
            />
          </Link>
        </ColorCircleWrapper>
      </InfoWrapper>
    </Card>
  );
};

const Card = styled.div`
  border-radius: 4px;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));
`;
const Thumbnail = styled.div`
  position: relative;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const Soldout = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;

  padding-left: 13px;
  box-sizing: border-box;
  width: 100%;
  height: 27px;

  font-weight: 700;
  font-size: 12px;
  line-height: 14px;

  color: #ffffff;
  background-color: #121822;
`;
const LikeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: rgba(10, 68, 89, 0.2);
  border-radius: 22px;

  cursor: pointer;
`;
const InfoWrapper = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 5px;
  padding-bottom: 16px;

  border-radius: 0px 0px 4px 4px;
  background-color: #ffffff;
`;
const ProductTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
`;
const ProductCategory = styled.div`
  margin-bottom: 7px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
`;
const RatioWrapper = styled.div`
  display: flex;
  margin-bottom: 21px;
`;
const Ratio = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
  padding-left: 4px;
  padding-right: 4px;
  height: 15px;

  background-color: #fdfbf9;

  border: 0.5px solid #b8a687;
  border-radius: 2px;

  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  color: #b8a687;
`;
const PriceUnitWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1px;
`;
const Price = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 20.8px;
  letter-spacing: -0.011em;

  color: #121822;
`;
const Meter = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 18.2px;
  letter-spacing: -0.011em;

  color: #a4b0b2;
`;
const ColorLength = styled.div`
  margin-bottom: 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const ColorCircleWrapper = styled.div`
  display: flex;
  gap: 6px;
`;
const ColorCircle = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: ${(props) => {
    switch (props.color) {
      case "blue":
        return "#1B8F9F";
      case "green":
        return "#46CA43";
      case "red":
        return "#EC3939";
    }
  }};
`;

export default ProductCard;
