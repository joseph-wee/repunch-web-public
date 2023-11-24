import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  btn_favorite_inact,
  btn_review,
  cert,
  ic_favorite_wht,
  test_thumbnail,
  test_thumbnail_green,
  test_thumbnail_red,
} from "../assets";
import Image from "next/legacy/image";
import Link from "next/link";
import { keepDeleteReqeust, keepReqeust } from "../utils/api";
import { useRouter } from "next/router";

const Product = ({ product }: any) => {
  const [favoriteIsActive, setFavoriteIsActive] = useState(product.keep);
  const [optionLength, setOptionLength] = useState(
    `${product.options[0].length}m`
  );
  const [thumbnail, setThumnail] = useState(product.options[0].thumbnailUrl);
  const [productList, setProductList] = useState([]);
  const [price, setPrice] = useState(product.options[0].price);
  const [colorList, setColorList] = useState<any>([]);

  const router = useRouter();

  /** 컬러 중복 제거 */
  const colordupleHandler = () => {
    // 임시로 컬러만 뽑아서 할당
    let tempColorArr: any = [];
    product.options.forEach((el: any) => {
      tempColorArr.push(el.color.name);
    });
    console.log(tempColorArr);
    // 임시 컬러배열에서 중복 제거
    tempColorArr = Array.from(new Set(tempColorArr));

    // 컬러만 할당해놓고
    let tempColorObject = tempColorArr.map((el: any) => {
      return {
        color: el,
        thumbnail: "",
        imagePath: "",
        totalLength: 0,
      };
    });

    // 처음 썸네일, 처음 이미지주소만 할당, 같은 색이면 length 합
    product.options.forEach((el: any, index: number) => {
      if (
        tempColorObject.find((x: any) => x.color == el.color.name).thumbnail ==
        ""
      ) {
        tempColorObject.find((x: any) => x.color == el.color.name).thumbnail =
          el.thumbnailUrl;
      }
      if (
        tempColorObject.find((x: any) => x.color == el.color.name).imagePath ==
        ""
      ) {
        tempColorObject.find((x: any) => x.color == el.color.name).imagePath =
          el.color.imagePath;
      }

      tempColorObject.find((x: any) => x.color == el.color.name).totalLength +=
        el.length;
    });
    console.log(tempColorObject);
    setColorList([...tempColorObject]);
  };

  // 컬러 중복등록 없어져서 필요없어짐
  // useEffect(() => {
  //   colordupleHandler();
  // }, []);

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

  useEffect(() => {
    setOptionLength(`${product.options[0].length}m`);
    setThumnail(product.options[0].thumbnailUrl);
    setPrice(product.options[0].price);
    setFavoriteIsActive(product.keep);
  }, [product]);

  const keepHandler = () => {
    let at = localStorage.getItem("at");
    // 로그인안한 케이스
    if (!at) {
      router.push("/login");
    }

    // 찜해제 케이스
    if (favoriteIsActive) {
      keepDeleteReqeust(at, product.productNo).then(
        (res) =>
          res?.data.status == 200 && setFavoriteIsActive(!favoriteIsActive)
      );
      return;
    }
    // 찜하기 케이스
    if (!favoriteIsActive) {
      keepReqeust(at, product.productNo).then(
        (res) =>
          res?.data.status == 200 && setFavoriteIsActive(!favoriteIsActive)
      );
      return;
    }
  };

  return (
    <Card>
      <Thumbnail>
        <Link
          href={`/product_detail/${product.productNo}`}
          style={{ textDecoration: "none" }}
        >
          <Image
            src={`${thumbnail}?&w=375&q=75`}
            alt={"thumbnail"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          {product.status == "SALE" ? "" : <Soldout>SOLD OUT</Soldout>}
        </Link>

        <LikeButton onClick={() => keepHandler()}>
          <Image
            src={favoriteIsActive ? btn_review : btn_favorite_inact}
            alt={"logo_favorite"}
          />
        </LikeButton>
      </Thumbnail>

      <InfoWrapper>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductCategory>
          {product.design ? product.design.name : "null"}
        </ProductCategory>
        <RatioWrapper>
          {product.certificated && <Image src={cert} alt="cert" />}
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
                href={{
                  pathname: `/product_detail/${product.productNo}`,
                  query: {
                    color: i.color.name,
                  },
                }}
                as={`/product_detail/${product.productNo}`}
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
  top: 19px;
  right: 19px;
  width: 22px;
  height: 22px;

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
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
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
