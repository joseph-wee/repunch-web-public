/* ------------- 셀렉트박스 컴포넌트(국가전화코드 전용) ------------- */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { arrow_down, arrow_up } from "../assets";
import { ListCountryArray } from "../pages/register";
import { valueValidation } from "../utils/functions";

const SelectBoxCountryCodeNum = ({
  list, // 국가 리스트
  value, // 국가전화코드
  setValue, // 국가전화코드 세팅
  validationStart,
  setValidationResult,
  countryCode,
  setCountryCode,
}: {
  list: any;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  validationStart: boolean;
  setValidationResult: React.Dispatch<React.SetStateAction<number>>;
  countryCode: any;
  setCountryCode: any;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 옵션 활성 유무
  const [text, setText] = useState<any>();
  //       callingCode: el.callingCode,
  //        countryCodeArr: countryCodeArr,

  // useEffect(() => {
  //   list &&
  //     countryCode &&
  //     console.log(
  //       list.find((x: any) => x.countryCodeArr.includes(countryCode))
  //     );
  // }, [countryCode]);

  // const countryCodeFind = () => {
  //   console.log(
  //     list.find((x: any) => x.countryCodeArr.find(countryCode) !== undefined)
  //   );
  // };

  return (
    <>
      <Container
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
        tabIndex={0}
        onBlur={() => setIsActive(false)}
      >
        <Select>
          <CallingCode>{`${value} `}</CallingCode>
          {value
            ? `(${list
                .find((x: any) => x.callingCode.includes(value))
                .countryCodeArr.join(", ")})`
            : ""}
          <ImageWrapper>
            <Image src={isActive ? arrow_up : arrow_down} alt="arrow" />
          </ImageWrapper>
        </Select>
        <OptionWrapper isActive={isActive}>
          {list &&
            list.map((i: any, index: number) => {
              return (
                <Option
                  key={`${index}abd-=sc`}
                  onClick={() => {
                    setValue(i.callingCode);
                    valueValidation(
                      i.callingCode,
                      validationStart,
                      setValidationResult
                    );
                  }}
                >
                  <CallingCode>{`${i.callingCode}`}</CallingCode>(
                  {`${i.countryCodeArr.join(", ")}`})
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
  box-sizing: border-box;
  width: 160px;
  flex: 0 0 120px;
  height: 40px;
  cursor: default;
  @media screen and (max-width: 768px) {
    margin-right: 8.5px;
    width: 77px;
    flex: 0 0 77px;
  }
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
  border: 1px solid #dee8ec;
`;

const Option = styled.div`
  display: flex;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px solid #dee8ec;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;

  background-color: #ffffff;
  &:last-of-type {
    border: none;
  }
`;
const CallingCode = styled.div`
  width: 35px;
`;

export default SelectBoxCountryCodeNum;
