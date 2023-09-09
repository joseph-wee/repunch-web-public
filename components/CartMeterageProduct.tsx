import React, { useState } from "react";
import styled from "styled-components";
import {
  ic_check_wht,
  ic_close,
  ic_minus,
  ic_plus,
  test_thumbnail,
} from "../assets";
import Image from "next/image";

const useCartMeterageProduct = ({
  data,
  rollCheckArr, // 롤 체크 유무 배열
  setRollCheckArr,
  order,
}: {
  data: any;
  rollCheckArr: Array<boolean>;
  setRollCheckArr: React.Dispatch<React.SetStateAction<Array<boolean>>>;
  order: number;
}) => {
  const [count, setCount] = useState(data.count);

  const minus = () => {
    if (count == 1) {
      return;
    }
    setCount(count - 1);
  };
  const plus = () => {
    if (count == data.quantity) return;
    setCount(count + 1);
  };

  const checkHandler = () => {
    let temp = rollCheckArr;
    temp[order] = !temp[order];
    setRollCheckArr([...temp]);
  };

  return (
    <Container>
      <CheckCancelWrapper>
        <Checkbox
          type="checkbox"
          id={`meter${order}`}
          onChange={() => checkHandler()}
        />
        <Label
          htmlFor={`meter${order}`}
          isChecked={rollCheckArr[order]}
          img={ic_check_wht.src}
        />
        Check to purchase
        <CloseButton>
          <Image src={ic_close} alt={"close_button"} width={18} height={18} />
        </CloseButton>
      </CheckCancelWrapper>
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
            {`${data.width}m*${data.length}m`}
          </OptionWrapper>
        </TextWrapper>
      </ProductWrapper>
      <Line />
      <LengthWrapper>
        <LengthPriceWrapper>
          <Length>{`${data.width}m*${data.length}m`}</Length>
          <PriceInfo>{`$ ${data.price}`}</PriceInfo>
        </LengthPriceWrapper>
        <ButtonInputWrapper>
          <MinusButton onClick={() => minus()}>
            <Image src={ic_minus} alt={"minus_button"} />
          </MinusButton>
          <LengthInput
            type="number"
            step="1"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <PlusButton onClick={() => plus()}>
            <Image src={ic_plus} alt={"plus_button"} />
          </PlusButton>
        </ButtonInputWrapper>
      </LengthWrapper>
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
`;
const CheckCancelWrapper = styled.div`
  display: flex;
  position: relative;
  padding-left: 15px;
  padding-right: 17px;
  align-items: center;
  height: 42px;

  border-bottom: 1px solid #dee8ec;
  box-sizing: border-box;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  display: flex;
  letter-spacing: -0.011em;
  color: #121822;
`;
const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label<{ isChecked: boolean; img: string }>`
  display: inline-block;
  margin-right: 6px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: ${(props) => {
    return props.isChecked == true ? "none" : "1px solid #dee8ec;";
  }};
  border-radius: 2.66667px;

  background-color: ${(props) => {
    return props.isChecked == true ? "#121822" : "#FFFFFF";
  }};

  background-image: ${(props) => {
    return props.isChecked == true ? `url(${props.img})` : "";
  }};
  background-size: 9.5px 7.4px;
  background-position: center;
  background-repeat: no-repeat;
`;

const CloseButton = styled.div`
  display: flex;
  position: absolute;
  right: 13px;
  align-items: center;

  cursor: pointer;
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
  margin-bottom: 7px;
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
  }};
`;
const VerticalLine = styled.div`
  width: 1px;
  height: 9px;
  background-color: #dee8ec;
  margin: 0 6px;
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
  height: 40px;
`;
const LengthPriceWrapper = styled.div``;
const Length = styled.div`
  color: #333333;
  font-size: 12px;
  font-weight: 500;
`;
const PriceInfo = styled.div`
  color: #121822;
  font-size: 12px;
  font-weight: 700;
  line-height: 15.6px;
`;
const LengthTitle = styled.div`
  margin-right: 36.5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  letter-spacing: -0.011em;

  color: #121822;
`;
const ButtonInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const MinusButton = styled.button`
  display: flex;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 100%;
  background-color: #f2f6f8;

  cursor: pointer;
`;
const LengthInput = styled.input`
  margin-right: 8px;
  width: 70px;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  text-align: center;
`;
const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 100%;
  background-color: #f2f6f8;

  cursor: pointer;
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

export default useCartMeterageProduct;
