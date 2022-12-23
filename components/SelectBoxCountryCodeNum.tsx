/* ------------- 셀렉트박스 컴포넌트(국가전화코드 전용) ------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { arrow_down, arrow_up } from "../assets";
import { ListCountryArray } from "../pages/register";

const SelectBoxCountryCodeNum = ({
  list, // 국가 리스트
  value,  // 국가전화코드
  setValue, // 국가전화코드 세팅
}: {
  list: ListCountryArray;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 옵션 활성 유무

  return (
    <>
      <Container
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
        tabIndex={0}
        onBlur={() => setIsActive(false)}
      >
        <Select>
          {value}
          <ImageWrapper>
            <Image src={isActive ? arrow_up : arrow_down} alt="arrow" />
          </ImageWrapper>
        </Select>
        <OptionWrapper isActive={isActive}>
          {list.map((i) => {
            return (
              <Option key={i.code} onClick={() => setValue(i.code_num)}>
                {i.code_num}
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
  margin-right: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 120px;
  flex: 0 0 120px;
  height: 40px;
  @media screen and (max-width: 767px) {
    margin-right: 8.5px;
    width: 77px;
    flex: 0 0 77px;
  } ;
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
  height: ${(props) => {
    return props.isActive ? "200px" : "0";
  }};
  overflow: ${(props) => {
    return props.isActive ? "scroll" : "hidden";
  }};
  overflow-x: hidden;
`;

const Option = styled.div`
  display: flex;
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

  background-color: #ffffff;
`;

export default SelectBoxCountryCodeNum;
