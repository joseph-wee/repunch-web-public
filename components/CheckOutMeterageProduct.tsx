import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { test_thumbnail } from "../assets";

const CheckOutMeterageProduct = () => {
  return (
    <Container>
      <ProductWrapper>
        <ImageWrapper>
          <Image src={test_thumbnail} alt={"test"} width={80} height={80} />
        </ImageWrapper>
        <TextWrapper>
          <ProductTitle>Leopard Viscose Crepe-Rose</ProductTitle>
          <MeterageOrSample>Roll</MeterageOrSample>
          <FlexWrapper>
            <MeterStandard>20m*20m</MeterStandard>
            <MeterCount>3</MeterCount>
          </FlexWrapper>
          <ProductPrice>$4.06</ProductPrice>
        </TextWrapper>
      </ProductWrapper>
      <Line />
      <PriceWrapper>
        <Exvat>EX VAT</Exvat>
        <Price>$ 4.06</Price>
      </PriceWrapper>
    </Container>
  );
};

const Container = styled.div`
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
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 2px;
`;
const TextWrapper = styled.div`
  width: 100%;
  margin-left: 10px;
`;
const ProductTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  letter-spacing: -0.011em;

  color: #121822;
`;
const MeterageOrSample = styled.div`
  margin-top: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0f697c;
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
`;
const MeterStandard = styled.div`
  color: #536c6d;
`;
const MeterCount = styled.div`
  color: #121822;
`;
const ProductPrice = styled.div`
  margin-top: 2px;
  text-align: right;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #121822;
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
  color: #121822;
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
  color: #121822;
`;
const Price = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #ff2f01;
`;

export default CheckOutMeterageProduct;
