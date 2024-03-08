/* ------------- 셀렉트박스 컴포넌트 ------------- */

import React, { useEffect, useRef, useState } from "react";
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
  list: any;
  value: string | string[] | undefined;
  setValue: any;
  validationStart: boolean;
  setValidationResult: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 셀렉트박스 활성 유무
  const [text, setText] = useState<any>(""); // 선택된 값이 보여지는 텍스트
  const [focusIndex, setFocusIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  /** 옵션 선택하면 해당 값이 세팅 */
  const optionHandler = (i: any) => {
    setText(i.name);
    setValue(i.countryCode);
    valueValidation(i.countryCode, validationStart, setValidationResult);
  };

  const [result, setResult] = useState<any>([]); // 실시간 검색 결과

  /** 검색 결과 초기화 */
  useEffect(() => {
    if (list) {
      setResult([...list]);
    }
  }, [list]);

  /** 주소 편집시 값 있으면 보여지는 Text 초기화 */
  useEffect(() => {
    if (list && value) {
      setText(list.find((x: any) => x.countryCode === value).name);
    }
  }, [list, value]);

  /** 실시간 나라 검색 결과 세팅 */
  useEffect(() => {
    if (list === undefined) {
      return;
    }
    let tempResult = [];
    let tempIncludeReuslt = [];

    // 시작 문자열이 입력 문자열과 같으면 push
    // 시작 문자열이 같지않고 문자열이 포함되어있으면 includeResult에 push

    for (const el of list) {
      el.name.toLowerCase().startsWith(text.toLowerCase())
        ? tempResult.push(el)
        : el.name.toLowerCase().includes(text.toLowerCase()) &&
          tempIncludeReuslt.push(el);
    }
    // 그리고 두 배열을 합친후 세팅
    tempResult = tempResult.concat(tempIncludeReuslt);
    setResult([...tempResult]);
  }, [text]);

  /** 영어만 허용 */
  const charBlocker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /[^A-Za-z\s]/gi;
    e.target.value = e.target.value.replace(reg, "");
  };

  /** 위, 아래 방향키로 나라 포커싱 */
  const arrowHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //ArrowDown
    //ArrowUp

    const scrollTop = Number(ref.current?.scrollTop);

    // ref.current?.scrollTo({ top: ref.current?.scrollTop + 40 });
    // enter 누르면 해당 나라 선택
    if (e.key === "Enter") {
      optionHandler(result[focusIndex]);
    }

    // 7개 이하면
    if (result.length <= 7) {
      // 윗 방향키인데 -1이면 return
      if (e.key === "ArrowUp" && focusIndex === -1) {
        return;
      }
      // 아래 방향키인데 result길이 끝이면 return
      if (e.key === "ArrowDown" && focusIndex === result.length) {
        return;
      }
      // 위 방향키이면 -1
      if (e.key === "ArrowUp") {
        setFocusIndex((prev) => prev - 1);
        return;
      }
      // 아래 방향키이면 +1
      if (e.key === "ArrowDown") {
        setFocusIndex((prev) => prev + 1);
        return;
      }
    }

    // 윗 방향키인데 -1이면 return
    if (e.key === "ArrowUp" && focusIndex === -1) {
      return;
    }
    // 아래 방향키인데 result길이 끝이면 return
    if (e.key === "ArrowDown" && focusIndex === result.length) {
      return;
    }
    // 위 방향키이면 -1
    if (e.key === "ArrowUp") {
      scrollTop > (focusIndex - 1) * 40 &&
        ref.current?.scrollTo({ top: scrollTop - 40 });
      setFocusIndex((prev) => prev - 1);
      // scrolltop

      return;
    }
    // 아래 방향키이면 +1
    if (e.key === "ArrowDown") {
      // scrollTop + 240 < focusIndex * 40
      scrollTop + 240 < (focusIndex + 1) * 40 &&
        ref.current?.scrollTo({ top: scrollTop + 40 });
      setFocusIndex((prev) => prev + 1);
      return;
    }
  };

  useEffect(() => {
    console.log(ref.current?.scrollTop);
  }, [ref]);

  return (
    <>
      <Container isActive={isActive}>
        <Select>
          <Input
            type="text"
            onChange={(e) => {
              charBlocker(e);
              setText(e.target.value);
              setFocusIndex(-1);
            }}
            value={text}
            onFocus={() => setIsActive(true)}
            onBlur={() => {
              setIsActive(false);
              setFocusIndex(-1);
            }}
            placeholder="Input your country"
            maxLength={50}
            onKeyDown={(e) => arrowHandler(e)}
          />

          <ImageWrapper>
            <Image src={isActive ? arrow_up : arrow_down} alt="arrow" />
          </ImageWrapper>
        </Select>
        <OptionWrapper
          isActive={isActive}
          resultLength={result.length}
          ref={ref}
        >
          {result &&
            result.map((i: any, j: number) => {
              let startIndex = 0;
              i.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 &&
                (startIndex = i.name.toLowerCase().indexOf(text.toLowerCase()));
              let lastIndex = startIndex + text.length - 1;

              return (
                <Option
                  key={`${j}aasccpas-dc`}
                  onMouseDown={() => optionHandler(i)}
                  index={j}
                  focusIndex={focusIndex}
                >
                  {i.name.split("").map((el: string, index: number) => {
                    return index >= startIndex &&
                      index <= lastIndex &&
                      text.length !== 0 ? (
                      el === " " ? (
                        <span key={`${el}${index}asc`}>&nbsp;</span>
                      ) : (
                        <Bold key={`${el}${index}asc`}>{`${el}`}</Bold>
                      )
                    ) : el === " " ? (
                      <span key={`${el}${index}asc`}>&nbsp;</span>
                    ) : (
                      <span key={`${el}${index}asc`}>{`${el}`}</span>
                    );
                  })}
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
  cursor: default;
`;
const Select = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 40px;

  align-items: center;
`;
const Input = styled.input`
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
  &::placeholder {
    color: #dee8ec;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
  }
`;
const ImageWrapper = styled.div`
  position: absolute;
  right: 10px;
`;

const OptionWrapper = styled.div<{ isActive: boolean; resultLength: number }>`
  display: ${(props) => {
    return props.resultLength === 0 ? "none" : "block";
  }};
  z-index: 1;
  position: relative;
  margin-top: 1px;
  max-height: ${(props) => {
    return props.isActive ? "300px" : "0";
  }};
  overflow: ${(props) => {
    return props.isActive ? "scroll" : "hidden";
  }};
  overflow-x: hidden;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  cursor: default;
`;

const Option = styled.div<{ index: number; focusIndex: number }>`
  display: flex;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px solid #dee8ec;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;

  &:last-of-type {
    border: none;
  }
  background-color: ${(props) => {
    return props.focusIndex === props.index ? "#F5F8F9" : "#ffffff";
  }};
`;

const Bold = styled.span`
  font-weight: 700;
`;
export default SelectBox;
