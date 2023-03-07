import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { test_thumbnail } from "../assets";

const CheckOutMeterageProduct = () => {
  return (
    <Contiiner>
      <ProductWrapper>
        <ImageWrapper>
          <Image src={test_thumbnail} alt={"test"} width={80} height={80} />
        </ImageWrapper>
        <TextWrapper>
          <ProductTitle>Leopard Viscose Crepe-Rose</ProductTitle>
          <MeterageOrSample>Meterage</MeterageOrSample>
        </TextWrapper>
      </ProductWrapper>
      <Line />
      <LengthWrapper>
        <LengthTitle>Length (m)</LengthTitle>
        <Length>10 m</Length>
      </LengthWrapper>
      <Line />
      <PriceWrapper>
        <Exvat>EX VAT</Exvat>
        <Price>$ 4.06</Price>
      </PriceWrapper>
    </Contiiner>
  );
};

const Contiiner = styled.div`
  margin-bottom: 10px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
`;

const ProductWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: 13.5px;
  margin-right: 18.5px;
  margin-bottom: 16px;
  height: 80.31px;
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 2px;
`;
const TextWrapper = styled.div`
  margin-left: 10px;
`;
const ProductTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  letter-spacing: -0.011em;

  color: #0a4459;
`;
const MeterageOrSample = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0f697c;
`;
const Line = styled.div`
  margin-left: 13.5px;
  margin-right: 18.5px;
  border-bottom: 1px dashed #dee8ec;
`;

const LengthWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 16px;
  margin-left: 13.5px;
  margin-right: 18.5px;
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: center;
`;
const LengthTitle = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #536c6d;
`;
const Length = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #0a4459;
`;
const PriceWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: 13.5px;
  margin-right: 18.5px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: right;
`;
const Exvat = styled.div`
  margin-right: 6px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: #0a4459;
`;
const Price = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #0a4459;
`;

export default CheckOutMeterageProduct;
