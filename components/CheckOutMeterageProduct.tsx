import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { test_thumbnail } from "../assets";

const CheckOutMeterageProduct = ({ data }: any) => {
  return (
    <Container>
      <ProductWrapper>
        <ImageWrapper>
          <Image src={data.thumbnail} alt={"test"} width={80} height={80} />
        </ImageWrapper>
        <TextWrapper>
          <ProductTitle>{data.title}</ProductTitle>
          <OptionWrapper>
            <Color color={data.color} />
            {data.color}
            <VerticalLine />
            {data.width}*{data.length}
          </OptionWrapper>
          <ProductQty>{data.count} Qty</ProductQty>
        </TextWrapper>
      </ProductWrapper>
      {/* <Line />
      <PriceWrapper>
        <Exvat>EX VAT</Exvat>
        <Price>$ {data.totalPrice}</Price>
      </PriceWrapper> */}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 16px;
`;

const ProductWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  height: 80.31px;
`;
const ImageWrapper = styled.div`
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 2px;
`;
const TextWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-left: 9px;
`;
const ProductTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #536c6d;
`;
const Color = styled.div<{ color: string }>`
  margin-right: 4px;
  width: 12px;
  height: 12px;
  background-color: #ec3939;
  border-radius: 100%;
  ${(props) => {
    switch (props.color) {
      case "White":
        return `    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background-color: #ffffff;`;
      case "Black":
        return "background-color: #000000";
      case "Gray":
        return "background-color: #C4C4C4";
      case "Beige":
        return "background-color: #F1EBD3";
      case "Brown":
        return "background-color: #825757";
      case "Red":
        return "background-color: #EC3939";
      case "Orange":
        return "background-color: #FE7E36";
      case "Yellow":
        return "background-color: #F9D142";
      case "Pink":
        return "background-color: #FF96FB";
      case "Purple":
        return "background-color: #814FEC";
      case "Blue":
        return "background-color: #293DF0";
      case "Green":
        return "background-color: #46CA43";
      case "Silver":
        return `  background: linear-gradient(
      156.04deg,
      #a9a9a9 10.26%,
      #dedede 43.51%,
      #ffffff 52.57%,
      #e1e1e1 61.64%,
      #9a9a9a 93.16%
    );`;
      case "Gold":
        return `    background: linear-gradient(
      152.18deg,
      #d3a810 5.76%,
      #fff8de 44.11%,
      #ffffff 49.34%,
      #fff9e4 55.45%,
      #d3a810 89.44%
    ); `;
      case "Multi":
        return `    background: linear-gradient(
      154.17deg,
      #ff1001 17.26%,
      #fff500 37.73%,
      #24ff00 57.06%,
      #00bdf9 72.22%,
      #0075ff 90.03%
    );`;
    }
  }}
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 9px;
  background-color: #dee8ec;
  margin: 0 6px;
`;
const ProductQty = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  color: #121822;
  text-align: right;
  font-family: Roboto;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.3px;
  letter-spacing: -0.121px;
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
  margin-bottom: 16px;
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

  color: #121822;
`;

export default CheckOutMeterageProduct;
