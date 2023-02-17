import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { ic_check_wht, ic_close, ic_down_bk, ic_up_bk } from "../assets";

/** 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  group_code: string; // 그룹 코드
  code: string; // 코드
  isChecked: boolean; // 체크유무
}

/** 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const UseFilter = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [suppliesIsActive, setSuppliesIsActive] = useState(true);
  const [projectIsActive, setProjectIsActive] = useState(true);
  const [colorIsActive, setColorIsActive] = useState(true);
  const [designIsActive, setDesignIsActive] = useState(true);
  const [compositionIsActive, setCompositionIsActive] = useState(true);
  const [widthIsActive, setWidthIsActive] = useState(true);
  const [weightIsActive, setWeightIsActive] = useState(true);
  const [yarnIsActive, setYarnIsActive] = useState(true);

  const [suppliesList, setSuppliesList] = useState<ListCountryArray>([
    {
      name: "Patterns",
      group_code: "006",
      code: "0",
      isChecked: false,
    },
    {
      name: "Bias binding",
      group_code: "006",
      code: "1",
      isChecked: false,
    },
    { name: "Lebels", group_code: "006", code: "2", isChecked: false },
    { name: "Zips", group_code: "006", code: "3", isChecked: false },
  ]);

  const suppliesListHandler = (order: number) => {
    let array = suppliesList;
    array[order].isChecked = !array[order].isChecked;
    setSuppliesList([...array]);
  };

  return (
    <>
      <Background isActive={isActive} onClick={() => setIsActive(false)} />
      <Container isActive={isActive}>
        <Wrapper>
          <Title>SELCT CATEGORIES</Title>
          <ButtonClose isActive={isActive} onClick={() => setIsActive(false)}>
            <Image src={ic_close} alt={"button_close"} />
          </ButtonClose>
        </Wrapper>
        <CategoryTitleWrapper
          onClick={() => setSuppliesIsActive(!suppliesIsActive)}
        >
          <Image
            src={suppliesIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>Supplies</CategoryTitle>
        </CategoryTitleWrapper>
        {suppliesList.map((i, j) => {
          return (
            <>
              <CategoryListWrapper
                isActive={suppliesIsActive}
                key={`test${j}`}
                onClick={() => suppliesListHandler(j)}
              >
                <Label
                  htmlFor={`supplies${j}`}
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                  key={`test1${j}`}
                />
                <Checkbox
                  type="checkbox"
                  id={`supplies${j}`}
                  onChange={() => suppliesListHandler(j)}
                  key={`test23${j}`}
                />
                {i.name} (3)
              </CategoryListWrapper>
            </>
          );
        })}

        {suppliesList.map((i, j) => {
          return (
            <>
              <CategoryListWrapper
                isActive={suppliesIsActive}
                key={`test${j}`}
                onClick={() => suppliesListHandler(j)}
              >
                <Label
                  htmlFor={`supplies${j}`}
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                  key={`test1${j}`}
                />
                <Checkbox
                  type="checkbox"
                  id={`supplies${j}`}
                  onChange={() => suppliesListHandler(j)}
                  key={`test23${j}`}
                />
                {i.name} (3)
              </CategoryListWrapper>
            </>
          );
        })}
        <CategoryTitleWrapper onClick={() => setColorIsActive(!colorIsActive)}>
          <Image
            src={suppliesIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>SELECT COLOR</CategoryTitle>
        </CategoryTitleWrapper>
        <ColorWraaper isActive={colorIsActive}>
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
          <ColorCircle />
        </ColorWraaper>
      </Container>
    </>
  );
};

const Background = styled.div<{ isActive: boolean }>`
  z-index: 2;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  @media screen and (max-width: 1279px) {
    display: ${(props) => {
      return props.isActive == true ? "block" : "none";
    }};
  }
`;

const Container = styled.div<{ isActive: boolean }>`
  margin-right: 18px;
  width: 192px;
  flex-shrink: 0;
  height: 500px;
  box-sizing: border-box;

  @media screen and (max-width: 1279px) {
    z-index: 3;
    display: ${(props) => {
      return props.isActive == true ? "block" : "none";
    }};
    position: fixed;
    top: 0;
    left: 0;
    margin-right: 0;
    padding-top: 21px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 43.5px;
    width: 280px;
    height: 100vh;

    background-color: #ffffff;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 38px;
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: -0.011em;

  color: #0a4459;
`;
const ButtonClose = styled.button<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  padding: 0;
  height: 24px;
  border: none;
  background-color: #ffffff;

  cursor: pointer;
`;
const CategoryTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 4px;
  margin-bottom: 14px;
  height: 19px;
  &:nth-of-type(2) {
    margin-top: 0;
  }
  cursor: pointer;
`;
const CategoryTitle = styled.div`
  margin-left: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  letter-spacing: -0.011em;
  color: #0a4459;
`;
const CategoryListWrapper = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  align-items: center;
  margin-bottom: 8px;
  height: 16px;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0a4459;
  cursor: default;
`;

const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label<{ isChecked: boolean; img: string }>`
  display: inline-block;
  margin-left: 1px;
  margin-right: 9px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: ${(props) => {
    return props.isChecked == true ? "none" : "1px solid #dee8ec;";
  }};
  border-radius: 2.66667px;

  background-color: ${(props) => {
    return props.isChecked == true ? "#FF5C01" : "#FFFFFF";
  }};

  background-image: url(${(props) => {
    return props.isChecked == true ? props.img : "";
  }});
  background-size: 9.5px 7.4px;
  background-position: center;
  background-repeat: no-repeat;
`;
const ColorWraaper = styled.div<{ isActive: boolean }>`
display: ${(props) => {
  return props.isActive == true ? "flex" : "none";
}};
  flex-wrap: wrap;
  width: 188px;
  height; 190px;
`;
const ColorCircle = styled.div`
  margin-right: 10px;
  margin-bottom: 15.5px;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  &:nth-of-type(1) {
    background-color: #1b759f;
  }
  &:nth-of-type(2) {
    background-color: #72c771;
  }
  &:nth-of-type(3) {
    background-color: #e35555;
  }
  &:nth-of-type(4) {
    background-color: #fe7e36;
  }
  &:nth-of-type(5) {
    background-color: #8d69da;
  }
  &:nth-of-type(6) {
    background-color: #4659ff;
  }
  &:nth-of-type(7) {
    background-color: #887272;
  }
  &:nth-of-type(8) {
    background-color: #f9d142;
  }
  &:nth-of-type(9) {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background-color: #ffffff;
  }
  &:nth-of-type(10) {
    background-color: #f7f4e9;
  }
  &:nth-of-type(11) {
    background-color: #c4c4c4;
  }
  &:nth-of-type(12) {
    background-color: #000000;
  }
  &:nth-of-type(13) {
    margin-bottom: 0;
    background: linear-gradient(
      156.04deg,
      #a9a9a9 10.26%,
      #dedede 43.51%,
      #ffffff 52.57%,
      #e1e1e1 61.64%,
      #9a9a9a 93.16%
    );
  }
  &:nth-of-type(14) {
    margin-bottom: 0;
    background: linear-gradient(
      152.18deg,
      #d3a810 5.76%,
      #fff8de 44.11%,
      #ffffff 49.34%,
      #fff9e4 55.45%,
      #d3a810 89.44%
    );
  }
`;

export default UseFilter;
