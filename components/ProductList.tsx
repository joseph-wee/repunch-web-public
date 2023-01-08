import React from "react";
import styled from "styled-components";
import { ic_favorite_wht, test_thumbnail } from "../assets";
import Image from "next/legacy/image";
import Link from "next/link";

const ProductCard = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      <Container isActive={isActive}>
        <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
          <Card>
            <Thumbnail>
              <Image
                src={test_thumbnail}
                alt={"thumbnail"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <Soldout>SOLD OUT</Soldout>

              <LikeButton>
                <Image src={ic_favorite_wht} alt={"logo_favorite"} />
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
                <Price>$ 8.38/meter</Price>
              </PriceUnitWrapper>
            </InfoWrapper>
          </Card>
        </Link>
        <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
          <Card>
            <Thumbnail>
              <Image
                src={test_thumbnail}
                alt={"thumbnail"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <Soldout>SOLD OUT</Soldout>

              <LikeButton>
                <Image src={ic_favorite_wht} alt={"logo_favorite"} />
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
                <Price>$ 8.38/meter</Price>
              </PriceUnitWrapper>
            </InfoWrapper>
          </Card>
        </Link>
        <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
          <Card>
            <Thumbnail>
              <Image
                src={test_thumbnail}
                alt={"thumbnail"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <Soldout>SOLD OUT</Soldout>

              <LikeButton>
                <Image src={ic_favorite_wht} alt={"logo_favorite"} />
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
                <Price>$ 8.38/meter</Price>
              </PriceUnitWrapper>
            </InfoWrapper>
          </Card>
        </Link>
        <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
          <Card>
            <Thumbnail>
              <Image
                src={test_thumbnail}
                alt={"thumbnail"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />

              <LikeButton>
                <Image src={ic_favorite_wht} alt={"logo_favorite"} />
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
                <Price>$ 8.38/meter</Price>
              </PriceUnitWrapper>
            </InfoWrapper>
          </Card>
        </Link>
        <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
          <Card>
            <Thumbnail>
              <Image
                src={test_thumbnail}
                alt={"thumbnail"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />

              <LikeButton>
                <Image src={ic_favorite_wht} alt={"logo_favorite"} />
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
                <Price>$ 8.38/meter</Price>
              </PriceUnitWrapper>
            </InfoWrapper>
          </Card>
        </Link>
        <Link href="/product_detail/1" style={{ textDecoration: "none" }}>
          <Card>
            <Thumbnail>
              <Image
                src={test_thumbnail}
                alt={"thumbnail"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />

              <LikeButton>
                <Image src={ic_favorite_wht} alt={"logo_favorite"} />
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
                <Price>$ 8.38/meter</Price>
              </PriceUnitWrapper>
            </InfoWrapper>
          </Card>
        </Link>
      </Container>
    </>
  );
};

const Container = styled.div<{ isActive: boolean }>`
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
  background-color: #ff5c01;
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
`;
const InfoWrapper = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 5px;
  padding-bottom: 12px;

  border-radius: 0px 0px 4px 4px;
  background-color: #ffffff;
`;
const ProductTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #0a4459;
`;
const ProductCategory = styled.div`
  margin-bottom: 7px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #0a4459;
`;
const RatioWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
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
`;
const Price = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.011em;

  color: #ff5c01;
`;

export default ProductCard;
