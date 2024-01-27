/* ------------- 셀렉트박스 컴포넌트 ------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { arrow_down, arrow_up } from "../assets";
import { ListCountryArray, List } from "../pages/register";
import { valueValidation } from "../utils/functions";

// list: 국가 리스트 배열
// setValue: 값을 세팅
const SelectBoxEdit = ({
  list,
  value,
  setValue,
  validationStart,
  setValidationResult,
}: {
  list: ListCountryArray;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  validationStart: boolean;
  setValidationResult: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 셀렉트박스 활성 유무
  const [text, setText] = useState("");

  /** 옵션 선택하면 해당 값이 세팅 */
  const optionHandler = (i: List) => {
    setText(i.name);
    setValue(i.code);
    valueValidation(i.code, validationStart, setValidationResult);
  };

  useEffect(() => {
    list.forEach((i) => {
      i.code == value && setText(i.name);
    });
  });

  return (
    <>
      <Container
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
        tabIndex={0}
        onBlur={() => setIsActive(false)}
      >
        <Select>
          {text}
          <ImageWrapper>
            <Image src={isActive ? arrow_up : arrow_down} alt="arrow" />
          </ImageWrapper>
        </Select>
        <OptionWrapper isActive={isActive}>
          {list.map((i, j) => {
            return (
              <Option key={j} onClick={() => optionHandler(i)}>
                {i.name}
              </Option>
            );
          })}
        </OptionWrapper>
      </Container>
    </>
  );
};

const Container = styled.div<{ isActive: boolean }>`
  overflow: ${(props) => {
    return props.isActive ? "visible" : "hidden";
  }};
  width: 100%;
  height: 40px;

  border: none;
`;
const Select = styled.div`
  display: flex;
  position: relative;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
`;

const ImageWrapper = styled.div`
  position: absolute;
  right: 10px;
`;

const OptionWrapper = styled.div<{ isActive: boolean }>`
  z-index: 1;
  position: relative;
  margin-top: 1px;
  height: ${(props) => {
    return props.isActive ? "200px" : "0";
  }};
  overflow: ${(props) => {
    return props.isActive ? "scroll" : "hidden";
  }};
  overflow-x: hidden;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 2px;
`;

const Option = styled.div`
  display: flex;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px solid #dee8ec;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;

  background-color: #ffffff;
  &:last-of-type {
    border: none;
  }
`;

export default SelectBoxEdit;
