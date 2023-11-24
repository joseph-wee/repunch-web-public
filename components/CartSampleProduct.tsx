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
import { cartDelteRequest } from "../utils/api";

const useCartSampleProduct = ({
  el,
  sampleCheckArr, // 롤 체크 유무 배열
  setSampleCheckArr,
  index,
  setSampleTotalCount,
}: {
  el: any;
  sampleCheckArr: Array<boolean>;
  setSampleCheckArr: React.Dispatch<React.SetStateAction<Array<boolean>>>;
  index: number;
  setSampleTotalCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [length, setLength] = useState<string>("1.0");
  const [exist, setExist] = useState(true);

  const checkHandler = () => {
    let temp = sampleCheckArr;
    temp[index] = !temp[index];
    setSampleCheckArr([...temp]);
  };

  /** 장바구니 삭제 핸들러 */
  const cartDeleteRequestHandler = (cartNo: number) => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    cartDelteRequest(at, cartNo);
    setExist(false);
    setSampleTotalCount((prev) => prev - 1);
  };

  return (
    <Container exist={exist}>
      <CheckCancelWrapper>
        <Checkbox
          type="checkbox"
          id={`sample${index}`}
          onChange={() => checkHandler()}
        />
        <Label
          htmlFor={`sample${index}`}
          isChecked={sampleCheckArr[index]}
          img={ic_check_wht.src}
        />
        Check to purchase
        <CloseButton onClick={() => cartDeleteRequestHandler(el.cartNo)}>
          <Image src={ic_close} alt={"close_button"} width={18} height={18} />
        </CloseButton>
      </CheckCancelWrapper>
      <ProductWrapper>
        <ImageWrapper>
          <Image src={el.thumbnail} alt={"test"} width={80} height={80} />
        </ImageWrapper>
        <TextWrapper>
          <ProductTitle>{el.title}</ProductTitle>
          <OptionWrapper>
            <Color color={el.color} />
            {el.color}
            <VerticalLine />
            Sample
          </OptionWrapper>
        </TextWrapper>
      </ProductWrapper>
      <Line />

      <PriceWrapper>
        <Exvat>EX VAT</Exvat>
        <Price>$ {`${el.price}`}</Price>
      </PriceWrapper>
    </Container>
  );
};

const Container = styled.div<{ exist: boolean }>`
  display: ${(props) => {
    return props.exist ? "block" : "none";
  }};
  margin-bottom: 10px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
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
const Color = styled.div`
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
  height: 40px;
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

  color: #121822;
`;

export default useCartSampleProduct;
