import React, { useEffect, useState } from "react";
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
import { productsRequest } from "../utils/api";

const Product = ({ product }: any) => {
  const [favoriteIsActive, setFavoriteIsActive] = useState(false);
  const [optionLength, setOptionLength] = useState(
    `${product.options[0].length}m`
  );
  const [thumbnail, setThumnail] = useState(product.options[0].thumbnailUrl);
  const [productList, setProductList] = useState([]);
  const [price, setPrice] = useState(product.options[0].price);

  const fabricList: any = {
    Cotton: "CO",
    Linnen: "LI",
    Silk: "SI",
    Cashmere: "CA",
    Lycra: "LY",
    Wool: "WO",
    Elastane: "EL",
    Polyamide: "PM",
    Polyester: "PL",
    Nylon: "NY",
  };

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
          {product.status == "SALE" ? "" : <Soldout>SOLD OUT</Soldout>}
        </Link>

        <LikeButton onClick={() => setFavoriteIsActive(!favoriteIsActive)}>
          <Image
            src={favoriteIsActive ? btn_review : btn_favorite_inact}
            alt={"logo_favorite"}
          />
        </LikeButton>
      </Thumbnail>

      <InfoWrapper>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductCategory>jacquard</ProductCategory>
        <RatioWrapper>
          {product.materials.map((i: any, j: number) => {
            return (
              <Ratio key={`ratido${j}`}>{`${fabricList[i.name]} ${
                i.value
              }%`}</Ratio>
            );
          })}
        </RatioWrapper>
        <PriceUnitWrapper>
          <Price>{`$ ${price}`}</Price>
          <Meter>/m</Meter>
        </PriceUnitWrapper>
        <ColorLength>{optionLength}</ColorLength>
        <ColorCircleWrapper>
          {product.options.map((i: any, j: number) => {
            return (
              <Link
                href="/product_detail/1"
                style={{ textDecoration: "none" }}
                key={`link${j}`}
              >
                <Image
                  src={i.color.imagePath}
                  alt="colorCircle"
                  width={16}
                  height={16}
                  onMouseOver={() => {
                    setOptionLength(`${i.length}m`);
                    setThumnail(i.thumbnailUrl);
                  }}
                />
              </Link>
            );
          })}
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
  padding-left: 1px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
`;
const RatioWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 21px;
  gap: 4px;
`;
const Ratio = styled.div`
  display: flex;
  align-items: center;
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

export default Product;
