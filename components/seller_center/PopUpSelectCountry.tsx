import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  colorsRequest,
  designsRequest,
  materialsRequest,
  originsRequest,
  projectsRequest,
} from "../../utils/api";
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

const PopUpSelectCountry = ({
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

  const [selectInput, setSelectInput] = useState(-1);
  const [percent, setPercent] = useState(0);
  const ref = useRef<null[] | HTMLInputElement[]>([]);

  const designClickHandler = (index: number) => {
    // let x = tempList;
    // x[index].value = value;
    // setTempList([...x]);

    tempList.forEach((el: any) => {
      el.value = 0;
    });
    tempList[index].value = 1;

    setTempList([...tempList]);
    console.log(tempList);
  };

  const selectFocusHandler = (index: number) => {
    setSelectInput(index);
    ref.current[0]?.focus();
  };

  const okHandelr = () => {
    percent <= 100 && setSelectInput(-1);
  };

  const designSave = () => {
    for (const el of tempList) {
      if (el.value !== 0) {
        setSelectCategory("");
        productInfo.originNo = el.originNo;
        setProductInfo({ ...productInfo });
      }
    }
  };

  useEffect(() => {
    if (tempList) {
      let sum = 0;
      tempList.forEach((el: any) => {
        sum += Number(el.value);
      });
      setPercent(sum);
    }
  }, [tempList]);

  useEffect(() => {
    let origins = sessionStorage.getItem("origins");
    sessionStorage.getItem("origins")
      ? setTempList([
          ...JSON.parse(origins || "").map((el: any) => {
            return { ...el, isChecked: false, value: 0 };
          }),
        ])
      : originsRequest().then((res: any) => {
          sessionStorage.setItem("origins", JSON.stringify(res?.data.result));
          setTempList([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false, value: 0 };
            }),
          ]);
        });
  }, []);

  return (
    <Container selectCategory={selectCategory}>
      <BackGround />
      <ContentWrapper>
        {tempList &&
          tempList.map((el: any, index: number) => {
            return (
              <CategoryWrapper
                value={el.value}
                onClick={() => {
                  designClickHandler(index);
                }}
                key={`${index}rtyu`}
              >
                <TitlePerecentWrapper>
                  <CategoryTitle>{`${el.name}`}</CategoryTitle>
                </TitlePerecentWrapper>
                {el.value > 0 && (
                  <Image src={ic_check_red} alt="ic_check_red" />
                )}
              </CategoryWrapper>
            );
          })}

        <ButtonWrapper>
          <ConfirmButton onClick={() => designSave()}>Confirm</ConfirmButton>
        </ButtonWrapper>
      </ContentWrapper>
      {/* <InputBackground selectInput={selectInput} />
      <InputWindow selectInput={selectInput}>
        <InputTitle>
          Input fabric's composition
          <br />
          percent
        </InputTitle>
        <InputWrapper>
          {tempList &&
            tempList.map((el: any, index: number) => {
              return (
                <Input
                  placeholder="Percent"
                  selectInput={selectInput}
                  index={index}
                  value={tempList[index].value}
                  onChange={(e) => inputHandler(e.target.value, index)}
                  ref={(el) => {
                    ref.current[index] = el;
                  }}
                />
              );
            })}
          <Unit>%</Unit>
        </InputWrapper>
        <PercentCalc percent={percent}>{`${percent}`}/100%</PercentCalc>
        <ErrorText>The total should not exceed 100%.</ErrorText>
        <InputButton percent={percent} onClick={() => okHandelr()}>
          OK
        </InputButton>
      </InputWindow> */}
    </Container>
  );
};

const Container = styled.div<{ selectCategory: string }>`
  z-index: 3;
  display: ${(props) => {
    return props.selectCategory === "country" ? "flex" : "none";
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
  box-sizing: border-box;
  background-color: #ffffff;
  width: 460px;
  height: 511px;
  overflow-y: scroll;

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
const Notice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  color: #0f697c;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f6f8;
`;
const CategoryWrapper = styled.div<{ value: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f6f8;
  background-color: ${(props) => {
    return props.value > 0 && `#F5F8F9`;
  }};
  cursor: pointer;
  font-weight: ${(props) => {
    return props.value > 0 ? `600` : `400`;
  }};
`;
const TitlePerecentWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const CategoryTitle = styled.div``;
const Percent = styled.div`
  color: #ff2f01;
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0px;
  background-color: #ffffff;
  @media screen and (max-width: 768px) {
    position: absolute;
  }
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
`;
const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
const Unit = styled.div`
  position: absolute;
  right: 12px;
  font-size: 14px;
  font-weight: 400;
`;
const PercentCalc = styled.div<{ percent: number }>`
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 10.6px;
  letter-spacing: -0.132px;
  color: ${(props) => {
    return props.percent > 100 ? "#ff2f01" : "#536c6d";
  }};
`;
const ErrorText = styled.div`
  margin-bottom: 16px;
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

export default PopUpSelectCountry;
