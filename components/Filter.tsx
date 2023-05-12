import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import {
  ic_check_web_color,
  ic_check_web_color_dk,
  ic_check_wht,
  ic_close,
  ic_close_black,
  ic_down_bk,
  ic_up_bk,
} from "../assets";

/** 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  group_code: string; // 그룹 코드
  code: string; // 코드
  isChecked: boolean; // 체크유무
}

/** 임시 필터 리스트 타입 */
export interface TempList {
  name: string; // 이름
  isChecked: boolean; // 체크유무
}

/** 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

export interface ListTempArray extends Array<TempList> {}

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
  const [colorChecked, setColorChecked] = useState(new Array(15).fill(false));

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

  const [projectList, setProjectList] = useState<ListTempArray>([
    {
      name: "Casualwear",
      isChecked: false,
    },
    {
      name: "Ceremoney",
      isChecked: false,
    },
    {
      name: "Coating",
      isChecked: false,
    },
    {
      name: "Details",
      isChecked: false,
    },
    {
      name: "Eveningwear",
      isChecked: false,
    },
    {
      name: "Jeanswear",
      isChecked: false,
    },
    {
      name: "Leathergoods",
      isChecked: false,
    },
    {
      name: "Line",
      isChecked: false,
    },
    {
      name: "Outerwear",
      isChecked: false,
    },
    {
      name: "Shirting",
      isChecked: false,
    },
    {
      name: "Sportswear",
      isChecked: false,
    },
    {
      name: "Suiting",
      isChecked: false,
    },
    {
      name: "Tailoring",
      isChecked: false,
    },
    {
      name: "Workwear",
      isChecked: false,
    },
  ]);
  const [designList, setDesignList] = useState<ListTempArray>([
    {
      name: "NEW",
      isChecked: false,
    },
    {
      name: "Check",
      isChecked: false,
    },
    {
      name: "Dot",
      isChecked: false,
    },
    {
      name: "Stripe",
      isChecked: false,
    },
    {
      name: "Double Face",
      isChecked: false,
    },
    {
      name: "Diagonal",
      isChecked: false,
    },
    {
      name: "Twill",
      isChecked: false,
    },
    {
      name: "Fancy",
      isChecked: false,
    },
    {
      name: "Floral",
      isChecked: false,
    },
    {
      name: "Haute couture",
      isChecked: false,
    },
    {
      name: "Herringbone",
      isChecked: false,
    },
    {
      name: "Houndstooth",
      isChecked: false,
    },
    {
      name: "Interiors",
      isChecked: false,
    },
    {
      name: "Jacquard",
      isChecked: false,
    },
    {
      name: "Melange",
      isChecked: false,
    },
    {
      name: "Ready-to-dye",
      isChecked: false,
    },
    {
      name: "Shiny",
      isChecked: false,
    },
    {
      name: "Lustre",
      isChecked: false,
    },
    {
      name: "Transparent",
      isChecked: false,
    },
    {
      name: "Textured",
      isChecked: false,
    },
    {
      name: "Wahsed",
      isChecked: false,
    },
    {
      name: "Water Repellent",
      isChecked: false,
    },
  ]);
  const [compositionList, setCompositionList] = useState<ListTempArray>([
    {
      name: "Wool",
      isChecked: false,
    },
    {
      name: "Cotton",
      isChecked: false,
    },
    {
      name: "Lycra",
      isChecked: false,
    },
    {
      name: "Silk",
      isChecked: false,
    },
    {
      name: "Polyester",
      isChecked: false,
    },
    {
      name: "Linen",
      isChecked: false,
    },
    {
      name: "Viscose",
      isChecked: false,
    },
    {
      name: "Merino",
      isChecked: false,
    },
  ]);
  const [widthList, setWidthList] = useState<ListTempArray>([
    {
      name: "36 inches / 90cm",
      isChecked: false,
    },
    {
      name: "53 inches / 135cm",
      isChecked: false,
    },
    {
      name: "60 inches / 150cm",
      isChecked: false,
    },
  ]);
  const [weightList, setWeightList] = useState<ListTempArray>([
    {
      name: "Extra light under 80g/m²",
      isChecked: false,
    },
    {
      name: "Light 80-135 g/m²",
      isChecked: false,
    },
    {
      name: "Medium 135-270 g/m²",
      isChecked: false,
    },
    {
      name: "Heavy 270-400 g/m²",
      isChecked: false,
    },
    {
      name: "Extra heavy over 400m²",
      isChecked: false,
    },
  ]);

  /**  */
  const suppliesListHandler = (order: number) => {
    let array = suppliesList;
    array[order].isChecked = !array[order].isChecked;
    setSuppliesList([...array]);
  };

  /** 색상 클릭시 해당 colorChecked 값 변경하여 색상에 체크표시 */
  const colorCheckedHandler = (num: number) => {
    let arr = colorChecked;
    arr[num] = !arr[num];
    setColorChecked([...arr]);
  };

  /** 필터 프로젝트 리스트 항목들 체크 핸들러 */
  const projectCheckedHandler = (num: number) => {
    let arr = projectList;
    arr[num].isChecked = !arr[num].isChecked;
    setProjectList([...arr]);
  };

  /** 필터 디자인 리스트 항목들 체크 핸들러 */
  const designCheckedHandler = (num: number) => {
    let arr = designList;
    arr[num].isChecked = !arr[num].isChecked;
    setDesignList([...arr]);
  };

  /** 필터 컴포지션 리스트 항목들 체크 핸들러 */
  const compositionCheckedHandler = (num: number) => {
    let arr = compositionList;
    arr[num].isChecked = !arr[num].isChecked;
    setCompositionList([...arr]);
  };

  /** 필터 width 리스트 항목들 체크 핸들러 */
  const widthCheckedHandler = (num: number) => {
    let arr = widthList;
    arr[num].isChecked = !arr[num].isChecked;
    setWidthList([...arr]);
  };

  /** 필터 weight 리스트 항목들 체크 핸들러 */
  const weightCheckedHandler = (num: number) => {
    let arr = weightList;
    arr[num].isChecked = !arr[num].isChecked;
    setWeightList([...arr]);
  };

  return (
    <>
      <Background isActive={isActive} onClick={() => setIsActive(false)} />
      <Container isActive={isActive}>
        <Wrapper>
          <Title>SELCT CATEGORIES</Title>
          <ButtonClose isActive={isActive} onClick={() => setIsActive(false)}>
            <Image src={ic_close_black} alt={"button_close"} />
          </ButtonClose>
        </Wrapper>
        <CategoryTitleWrapper onClick={() => setColorIsActive(!colorIsActive)}>
          <Image
            src={suppliesIsActive ? ic_up_bk : ic_down_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>SELECT COLOR</CategoryTitle>
        </CategoryTitleWrapper>
        <ColorWraaper isActive={colorIsActive}>
          <ColorCircle onClick={() => colorCheckedHandler(0)}>
            <ColorChecked isChecked={colorChecked[0]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(1)}>
            <ColorChecked isChecked={colorChecked[1]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(2)}>
            <ColorChecked isChecked={colorChecked[2]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(3)}>
            <ColorChecked isChecked={colorChecked[3]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(4)}>
            <ColorChecked isChecked={colorChecked[4]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(5)}>
            <ColorChecked isChecked={colorChecked[5]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(6)}>
            <ColorChecked isChecked={colorChecked[6]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(7)}>
            <ColorChecked isChecked={colorChecked[7]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(8)}>
            <ColorChecked isChecked={colorChecked[8]}>
              <Image src={ic_check_web_color_dk} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(9)}>
            <ColorChecked isChecked={colorChecked[9]}>
              <Image src={ic_check_web_color_dk} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(10)}>
            <ColorChecked isChecked={colorChecked[10]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(11)}>
            <ColorChecked isChecked={colorChecked[11]}>
              <Image src={ic_check_web_color} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(12)}>
            <ColorChecked isChecked={colorChecked[12]}>
              <Image src={ic_check_web_color_dk} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(13)}>
            <ColorChecked isChecked={colorChecked[13]}>
              <Image src={ic_check_web_color_dk} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
          <ColorCircle onClick={() => colorCheckedHandler(14)}>
            <ColorChecked isChecked={colorChecked[14]}>
              <Image src={ic_check_web_color_dk} alt="ic_check_web_color" />
            </ColorChecked>
          </ColorCircle>
        </ColorWraaper>
        <CategoryTitleWrapper
          onClick={() => setProjectIsActive(!projectIsActive)}
        >
          <Image
            src={projectIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>Proejct</CategoryTitle>
        </CategoryTitleWrapper>
        {projectList.map((i, j) => {
          return (
            <>
              <CategoryListWrapper
                isActive={projectIsActive}
                key={`test${j}`}
                onClick={() => projectCheckedHandler(j)}
              >
                <Label
                  htmlFor={`project${j}`}
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                  key={`test1${j}`}
                />
                <Checkbox
                  type="checkbox"
                  id={`project${j}`}
                  onChange={() => projectCheckedHandler(j)}
                  key={`test23${j}`}
                />
                {i.name}
              </CategoryListWrapper>
            </>
          );
        })}

        <CategoryTitleWrapper
          onClick={() => setDesignIsActive(!designIsActive)}
        >
          <Image
            src={designIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>Design</CategoryTitle>
        </CategoryTitleWrapper>
        {designList.map((i, j) => {
          return (
            <>
              <CategoryListWrapper
                isActive={designIsActive}
                key={`design${j}`}
                onClick={() => designCheckedHandler(j)}
              >
                <Label
                  htmlFor={`design${j}`}
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                  key={`design${j}`}
                />
                <Checkbox
                  type="checkbox"
                  id={`design${j}`}
                  onChange={() => designCheckedHandler(j)}
                  key={`design1${j}`}
                />
                {i.name}
              </CategoryListWrapper>
            </>
          );
        })}

        <CategoryTitleWrapper
          onClick={() => setCompositionIsActive(!compositionIsActive)}
        >
          <Image
            src={compositionIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>Composition</CategoryTitle>
        </CategoryTitleWrapper>
        {compositionList.map((i, j) => {
          return (
            <>
              <CategoryListWrapper
                isActive={compositionIsActive}
                key={`composition${j}`}
                onClick={() => compositionCheckedHandler(j)}
              >
                <Label
                  htmlFor={`composition${j}`}
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                  key={`composition${j}`}
                />
                <Checkbox
                  type="checkbox"
                  id={`composition${j}`}
                  onChange={() => compositionCheckedHandler(j)}
                  key={`composition1${j}`}
                />
                {i.name}
              </CategoryListWrapper>
            </>
          );
        })}

        <CategoryTitleWrapper onClick={() => setWidthIsActive(!widthIsActive)}>
          <Image
            src={widthIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>WIDTH</CategoryTitle>
        </CategoryTitleWrapper>
        {widthList.map((i, j) => {
          return (
            <>
              <CategoryListWrapper
                isActive={widthIsActive}
                key={`width${j}`}
                onClick={() => widthCheckedHandler(j)}
              >
                <Label
                  htmlFor={`width${j}`}
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                  key={`width${j}`}
                />
                <Checkbox
                  type="checkbox"
                  id={`width${j}`}
                  onChange={() => widthCheckedHandler(j)}
                  key={`width1${j}`}
                />
                {i.name}
              </CategoryListWrapper>
            </>
          );
        })}

        <CategoryTitleWrapper
          onClick={() => setWeightIsActive(!weightIsActive)}
        >
          <Image
            src={weightIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>Weight</CategoryTitle>
        </CategoryTitleWrapper>
        {weightList.map((i, j) => {
          return (
            <>
              <CategoryListWrapper
                isActive={weightIsActive}
                key={`weight${j}`}
                onClick={() => weightCheckedHandler(j)}
              >
                <Label
                  htmlFor={`weight${j}`}
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                  key={`weight${j}`}
                />
                <Checkbox
                  type="checkbox"
                  id={`weight${j}`}
                  onChange={() => weightCheckedHandler(j)}
                  key={`weight1${j}`}
                />
                {i.name}
              </CategoryListWrapper>
            </>
          );
        })}
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
    padding-top: 20px;
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
  margin-top: 2px;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.011em;

  color: #121822;
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
  margin-left: 2px;
  margin-bottom: 14px;
  height: 21px;
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
  color: #121822;
`;
const CategoryListWrapper = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  align-items: center;
  margin-bottom: 13px;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;
  cursor: pointer;
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
    return props.isChecked == true ? "none" : "1px solid #E0E0E0;";
  }};
  border-radius: 2px;

  background-color: ${(props) => {
    return props.isChecked == true ? "#121822" : "#FFFFFF";
  }};

  background-image: url(${(props) => {
    return props.isChecked == true ? props.img : "";
  }});
  background-size: 9.5px 7.4px;
  background-position: center;
  background-repeat: no-repeat;

  cursor: pointer;
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
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
  margin-bottom: 15.5px;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  cursor: pointer;

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
  &:nth-of-type(15) {
    margin-bottom: 0;
    background: linear-gradient(
      154.17deg,
      #ff1001 17.26%,
      #fff500 37.73%,
      #24ff00 57.06%,
      #00bdf9 72.22%,
      #0075ff 90.03%
    );
  }
`;

const ColorChecked = styled.div<{ isChecked: boolean }>`
  display: ${(props) => {
    return props.isChecked == true ? "block" : "none";
  }};
`;

export default UseFilter;
