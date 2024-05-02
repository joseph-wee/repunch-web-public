import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colorsRequest } from "../../utils/api";
import { ic_check_web_color, ic_check_web_color_dk } from "../../assets";
import Image from "next/image";

const PopUpSelectColor = ({
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
  const [colors, setColors] = useState<any>(); // 컬러 리스트
  const [selectColorNo, setSelectColorNo] = useState(0); // 선택한 컬러 번호 값

  /** 컬러 리스트 세팅, 없으면 불러와서 세팅 */
  useEffect(() => {
    sessionStorage.getItem("colors")
      ? setColors([...JSON.parse(sessionStorage.getItem("colors") || "{}")])
      : colorsRequest().then((res: any) => {
          console.log(res?.data.result);
          sessionStorage.setItem("colors", JSON.stringify(res?.data.result));
          setColors([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false };
            }),
          ]);
        });
  }, []);

  /** 컬러클릭시 컬러에 따라 다른 체크 아이콘 리턴 */
  const colorCheckHandler = (n: number) => {
    let blackCheckArr = [0, 3, 12, 13, 14];

    // 검은색 체크아이콘이 되어야 하는 컬러면 해당 체크 표시 반영
    if (blackCheckArr.includes(n)) {
      return ic_check_web_color_dk;
    }
    // 아니면 화이트 컬러
    return ic_check_web_color;
  };

  const selectColorSave = () => {
    setSelectCategory("");
    productInfo.options[selectOption].colorNo = selectColorNo;
    setProductInfo({ ...productInfo });
    setSelectColorNo(0);
  };

  /** 맨 처음에 선택한 컬러 할당 */
  // useEffect(() => {
  //   setSelectColorNo(productInfo.options[selectOption].colorNo);
  // }, [productInfo]);

  return (
    <Container selectCategory={selectCategory}>
      <BackGround onClick={() => setSelectCategory("")} />
      <ContentWrapper>
        <GridWrapper>
          {colors &&
            colors.map((el: any, index: number) => {
              return (
                <ColorWrapper
                  onClick={() => setSelectColorNo(el.colorNo)}
                  key={`${index}tyu`}
                >
                  <ColorCircle url={el.imagePath}>
                    {selectColorNo === el.colorNo && (
                      <Image src={colorCheckHandler(index)} alt="check" />
                    )}
                  </ColorCircle>
                  <ColorName>{`${el.name}`}</ColorName>
                </ColorWrapper>
              );
            })}
        </GridWrapper>
        <ButtonWrapper>
          <ConfirmButton onClick={() => selectColorSave()}>
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
    return props.selectCategory === "color" ? "flex" : "none";
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
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  width: 460px;
  height: 370px;
  @media screen and (max-width: 768px) {
    padding-top: 84px;
    width: 100%;
    height: 100vh;
  }
`;
const ButtonWrapper = styled.div`
  position: static;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  bottom: 20px;

  @media screen and (max-width: 768px) {
    position: absolute;
  }
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
const GridWrapper = styled.div`
  display: grid;
  row-gap: 20px;
  column-gap: 40px;
  margin-bottom: 20px;
  justify-content: space-between;
  grid-template-columns: repeat(5, 1fr);

  @media screen and (max-width: 768px) {
    margin: 0;
    grid-template-columns: repeat(8, 1fr);
  }
  @media screen and (max-width: 723px) {
    grid-template-columns: repeat(7, 1fr);
  }
  @media screen and (max-width: 635px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (max-width: 547px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 459px) {
    grid-template-columns: repeat(4, 1fr);
  }

  // 459 4개
  // 547 5개
  // 635 6개
  // 723 7개
  //
`;
const ColorWrapper = styled.div`
  position: relative;
  padding-bottom: 18px;
  width: 48px;
`;
const ColorCircle = styled.div<{ url: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-radius: 100%;
  cursor: pointer;
  box-sizing: border-box;
  width: 48px;
  height: 48px;

  ${(props) => {
    return `background-image: url(${props.url})`;
  }};

  background-position: center;
`;
const ColorName = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 0%);

  text-align: center;
`;

export default PopUpSelectColor;
