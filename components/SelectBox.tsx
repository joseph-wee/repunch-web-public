/* ------------- 셀렉트박스 컴포넌트 ------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { arrow_down, arrow_up } from "../assets";
import { ListCountryArray, List } from "../pages/register";
import { valueValidation } from "../utils/functions";

// list: 국가 리스트 배열
// setValue: 값을 세팅
const SelectBox = ({
  list,
  value,
  setValue,
  validationStart,
  setValidationResult,
}: {
  list: ListCountryArray;
  value: string | string[] | undefined;
  setValue: any;
  validationStart: boolean;
  setValidationResult: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 셀렉트박스 활성 유무
  const [text, setText] = useState<any>(""); // 선택된 값이 보여지는 텍스트

  /** 옵션 선택하면 해당 값이 세팅 */
  const optionHandler = (i: List) => {
    setText(i.name);
    setValue(i.code);
    valueValidation(i.code, validationStart, setValidationResult);
  };

  /** 나라 리스트 숫자 코드는 업데이트 필요 */
  const countryList: ListCountryArray = [
    { name: "Republic of Korea", code: "KR", code_num: "82" },
    { name: "United States of America", code: "US", code_num: "1" },
    { name: "Greece", code: "GR", code_num: "99" },
    { name: "Netherlands", code: "NL", code_num: "99" },
    { name: "Nepal", code: "NP", code_num: "22" },
    { name: "Norway", code: "NO", code_num: "22" },
    { name: "Danmark", code: "DK", code_num: "22" },
    { name: "Germany", code: "DE", code_num: "49" },
    { name: "Laos", code: "LA", code_num: "22" },
    { name: "Malaysia", code: "MY", code_num: "22" },
    { name: "Mexico", code: "MX", code_num: "22" },
    { name: "Republic of the Union of Myanmar", code: "MM", code_num: "22" },
    { name: "Bangladesh", code: "BD", code_num: "22" },
    { name: "Viet Nam", code: "VN", code_num: "84" },
    { name: "Belgium", code: "BE", code_num: "22" },
    {
      name: "United Kingdom of Great Britain and Northern Ireland",
      code: "GB",
      code_num: "44",
    },
    { name: "Australia", code: "AU", code_num: "61" },
    { name: "Austria", code: "AT", code_num: "22" },
    { name: "Uzbekistan", code: "UZ", code_num: "22" },
    { name: "Egypt", code: "EG", code_num: "22" },
    { name: "Italy", code: "IT", code_num: "22" },
    { name: "India", code: "IN", code_num: "91" },
    { name: "Indonesia", code: "ID", code_num: "22" },
    { name: "Japan", code: "JP", code_num: "22" },
    { name: "China", code: "CN", code_num: "86" },
    { name: "Cambodia", code: "KH", code_num: "22" },
    { name: "Canada", code: "CA", code_num: "1" },
    { name: "Taiwan", code: "TW", code_num: "22" },
    { name: "Thailand", code: "TH", code_num: "886" },
    { name: "Turkey", code: "TR", code_num: "22" },
    { name: "Portugal", code: "PT", code_num: "22" },
    { name: "Poland", code: "PL", code_num: "22" },
    { name: "Puerto Rico", code: "PR", code_num: "22" },
    { name: "France", code: "FR", code_num: "33" },
    { name: "Finland", code: "FI", code_num: "22" },
    { name: "Philippines", code: "PH", code_num: "63" },
    { name: "Hong Kong", code: "HK", code_num: "852" },
  ];

  useEffect(() => {
    let temp: string = "";
    countryList.forEach((el) => {
      if (el.code == value) {
        temp = el.name;
      }
    });
    value && setText(temp);
  }, [value]);

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

export default SelectBox;
