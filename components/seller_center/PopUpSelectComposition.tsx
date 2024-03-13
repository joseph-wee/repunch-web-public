import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colorsRequest, materialsRequest } from "../../utils/api";
import {
  ic_check_red,
  ic_check_web_color,
  ic_check_web_color_dk,
} from "../../assets";
import Image from "next/image";

/** 임시 필터 리스트 타입 */
export interface TempList {
  name: string; // 이름
  isChecked: boolean; // 체크유무
  value: string;
}

export interface ListTempArray extends Array<TempList> {}

const PopUpSelectComposition = ({
  productInfo,
  setProductInfo,
  selectCategory,
  setSelectCategory,
  selectOption,
}: {
  productInfo: any;
  setProductInfo: any;
  selectCategory: string;
  setSelectCategory: any;
  selectOption: number;
}) => {
  const [compositionList, setCompositionList] = useState<any>();

  const [tempList, setTempList] = useState<any>();

  const [selectIndex, setSelectIndex] = useState(-1);
  const [percent, setPercent] = useState(0);
  const ref = useRef<null[] | HTMLInputElement[]>([]);
  const [error, setError] = useState(false);

  /** 숫자만, 다른 키 입력차단, 100 초과 불가 */
  const inputHandler = (value: string, index: number) => {
    const onlyNumber = value.replace(/[^0-9]/g, "");
    // 100 넘을 경우
    if (Number(onlyNumber) > 100) {
      tempList[index].value = 100;
      setTempList([...tempList]);
      return;
    }
    // 아닌 경우
    tempList[index].value = onlyNumber;
    setTempList([...tempList]);
  };

  /** 저장 */
  const compositionSave = () => {
    setSelectIndex(-1);
    // 100퍼센트 미만 이면 에러
    if (percent < 100) {
      setError(true);
      return;
    }
    setSelectCategory("");

    productInfo.materials = tempList
      .filter((el: any) => {
        if (el.value) {
          return {
            materialNo: el.materialNo,
            value: el.value,
          };
        }
      })
      .map((el: any) => {
        return {
          materialNo: el.materialNo,
          value: el.value,
        };
      });
    setProductInfo({ ...productInfo });
  };

  /** 취소 */
  const cancelHandler = () => {
    setSelectCategory("");
    setSelectIndex(-1);
    setTempList([
      ...tempList.map((el: any, index: number) => {
        return {
          ...el,
          value: productInfo.materials[index]
            ? productInfo.materials[index].value
            : "",
        };
      }),
    ]);
  };

  /** 퍼센트 계산 */
  useEffect(() => {
    if (tempList) {
      let sum = 0;
      tempList.forEach((el: any) => {
        sum += Number(el.value);
      });
      setPercent(sum);
    }
  }, [tempList]);

  /** 재료 목록 없으면 불러오고 체크 유무, 값 세팅 */
  useEffect(() => {
    let materials = sessionStorage.getItem("materials");
    sessionStorage.getItem("materials")
      ? setTempList([
          ...JSON.parse(materials || "").map((el: any) => {
            return { ...el, isChecked: false, value: "" };
          }),
        ])
      : materialsRequest().then((res: any) => {
          sessionStorage.setItem("materials", JSON.stringify(res?.data.result));
          setTempList([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false, value: "" };
            }),
          ]);
        });

    console.log(ref);
  }, []);

  /** composition 칸 클릭시 자동 포커스 */
  useEffect(() => {
    ref && ref.current[selectIndex]?.focus();
  }, [selectIndex]);

  return (
    <Container selectCategory={selectCategory}>
      <BackGround />
      <ContentWrapper>
        <Title>Composition</Title>
        <PercentCalc percent={percent}>{`${percent}`}/100%</PercentCalc>
        {tempList &&
          tempList.map((el: any, index: number) => {
            return (
              <CategoryWrapper
                index={index}
                selectIndex={selectIndex}
                onClick={() => {
                  setSelectIndex(index);
                }}
                key={`${index}vbn`}
              >
                <TitlePerecentWrapper>
                  <CategoryTitle>{`${el.name}`}</CategoryTitle>
                  <Percent index={index} selectIndex={selectIndex}>
                    {el.value > 0 && `${el.value}%`}
                  </Percent>
                </TitlePerecentWrapper>
                <PercentInputWrapper index={index} selectIndex={selectIndex}>
                  {/** 수정하는 경우에 디폴트 벨류 세팅하면 될 듯 */}
                  <PercentInput
                    placeholder="Percent"
                    value={el.value}
                    onChange={(e) => inputHandler(e.target.value, index)}
                    ref={(element) => {
                      ref.current[index] = element;
                    }}
                  />
                  <Unit>%</Unit>
                </PercentInputWrapper>
              </CategoryWrapper>
            );
          })}
        <ErrorText error={error}>The total should not exceed 100%.</ErrorText>

        <ButtonWrapper>
          <CancelButton onClick={() => cancelHandler()}>Cancel</CancelButton>
          <ConfirmButton onClick={() => compositionSave()}>
            Confirm
          </ConfirmButton>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div<{ selectCategory: string }>`
  z-index: 3;
  display: ${(props) => {
    return props.selectCategory === "composition" ? "flex" : "none";
  }};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  font-size: 14px;
  font-weight: 400;
  color: #121822;
  line-height: 18.2px;
  @media screen and (max-width: 768px) {
    z-index: 0;
  }
`;
const BackGround = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ContentWrapper = styled.div`
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  width: 460px;

  @media screen and (max-width: 768px) {
    padding-bottom: 84px;
    overflow: scroll;
    position: absolute;
    top: 64px;
    width: 100%;
    height: calc(100vh - 64px);
    min-height: 511px;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
  color: #121822;
  font-size: 16px;
  font-weight: 600;
  line-height: 20.8px;
`;

const CategoryWrapper = styled.div<{ index: number; selectIndex: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f6f8;
  cursor: pointer;
  background-color: ${(props) => {
    return props.selectIndex === props.index ? "#F5F8F9" : "";
  }};
`;
const TitlePerecentWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const CategoryTitle = styled.div``;
const Percent = styled.div<{ index: number; selectIndex: number }>`
  display: ${(props) => {
    return props.selectIndex !== props.index ? "block" : "none";
  }};
  color: #ff2f01;
`;
const PercentInputWrapper = styled.div<{ index: number; selectIndex: number }>`
  display: ${(props) => {
    return props.selectIndex === props.index ? "block" : "none";
  }};
  position: relative;
`;
const PercentInput = styled.input`
  padding-left: 12px;
  padding-right: 25px;
  width: 137px;
  height: 28px;
  border-radius: 2px;
  border: 1px solid #dee8ec;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  &::placeholder {
    color: #dee8ec;
    font-size: 14px;
    font-weight: 400;
    line-height: 18.2px;
  }
`;
const Unit = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 14px;
  font-weight: 400;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 6px;
  @media screen and (max-width: 768px) {
    position: absolute;
  }
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  box-sizing: border-box;
`;
const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  font-weight: 400;
  border-radius: 2px;
  color: #121822;
  border: 1px solid #dee8ec;
  background-color: #f2f6f8;

  cursor: pointer;
`;
const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  font-weight: 700;
  border-radius: 2px;
  border: 0.794px solid #d4f01e;
  background-color: #e1ff20;
  cursor: pointer;
`;
const InputBackground = styled.div<{ selectInput: number }>`
  display: ${(props) => {
    return props.selectInput >= 0 ? "block" : "none";
  }};
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const InputWindow = styled.div<{ selectInput: number }>`
  display: ${(props) => {
    return props.selectInput >= 0 ? "block" : "none";
  }};
  position: absolute;
  padding: 20px;
  width: 320px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20.8px;
  background-color: #ffffff;
`;
const InputTitle = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20.8px;
  text-align: center;
`;
const InputWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
`;
const Input = styled.input<{ selectInput: number; index: number }>`
  display: ${(props) => {
    return props.selectInput === props.index ? "block" : "none";
  }};
  padding-left: 16px;
  padding-right: 25px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #dee8ec;
  &::placeholder {
    color: #dee8ec;
  }
`;

const PercentCalc = styled.div<{ percent: number }>`
  padding-bottom: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f6f8;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 10.6px;
  letter-spacing: -0.132px;
  color: ${(props) => {
    return props.percent > 100 ? "#ff2f01" : "#536c6d";
  }};
`;
const ErrorText = styled.div<{ error: boolean }>`
  visibility: ${(props) => {
    return props.error ? "visible" : "hidden";
  }};
  height: ${(props) => {
    return props.error ? "18.2px" : "0px";
  }};
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
  color: #ff2f01;
  font-weight: 400;
`;
const InputButton = styled.div<{ percent: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  box-sizing: border-box;
  font-weight: 700;
  border-radius: 2px;
  border: 0.794px solid #d4f01e;
  background-color: #e1ff20;
  cursor: pointer;
  ${(props) => {
    return (
      props.percent > 100 &&
      `
      border: 0.794px solid #DEE8EC;
      background-color: #F2F6F8;
    font-weight: 400;
    cursor: default;
    `
    );
  }}
`;

export default PopUpSelectComposition;
