import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import {
  home_image_desktop,
  home_image_mobile,
  home_image_pad,
  ic_check_web_status,
  ic_down_bk,
  ic_down_bk_filter,
  ic_filter,
  ic_up_bk,
  ic_up_bk_filter,
} from "../assets";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { Filter, ProductList } from "../components";

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

export default function Home() {
  const [sortIsActive, setSortIsActive] = useState(true);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [sortFilterIsActive, setSortFilterIsActive] = useState(false);
  const [sortType, setSortType] = useState("LATEST");
  const [result, setResult] = useState(0);

  const [colors, setColors] = useState<any>();
  const [projects, setProjects] = useState<any>();
  const [designs, setDesigns] = useState<any>();
  const [materials, setMaterials] = useState<any>();
  const [origins, setOrigins] = useState<any>();
  const [widthList, setWidthList] = useState<ListTempArray>([
    {
      name: "36",
      isChecked: false,
    },
    {
      name: "53",
      isChecked: false,
    },
    {
      name: "60",
      isChecked: false,
    },
  ]);
  const [weightList, setWeightList] = useState<any>([
    {
      name: "Extra light under 80g/m²",
      type: "EXTRA_LIGHT",
      isChecked: false,
    },
    {
      name: "Light 80-135 g/m²",
      type: "LIGHT",
      isChecked: false,
    },
    {
      name: "Medium 135-270 g/m²",
      type: "MEDIUM",
      isChecked: false,
    },
    {
      name: "Heavy 270-400 g/m²",
      type: "HEAVY",
      isChecked: false,
    },
    {
      name: "Extra heavy over 400m²",
      type: "EXTRA_HEAVY",
      isChecked: false,
    },
  ]);
  const [filterIsApplied, setFilterIsApplied] = useState(false); // 필터 적용 유무 값

  /** 필터 리스트들 순회하며 체크되었으면 return true */
  const filterChecker = (list: any) => {
    for (const el of list) {
      if (el.isChecked === true) {
        return true;
      }
    }
  };

  /** 필터 적용되면 filterIsApplied 값 true  */
  useEffect(() => {
    colors &&
    projects &&
    designs &&
    materials &&
    widthList &&
    weightList &&
    (filterChecker(colors) ||
      filterChecker(projects) ||
      filterChecker(designs) ||
      filterChecker(materials) ||
      filterChecker(widthList) ||
      filterChecker(weightList))
      ? setFilterIsApplied(true)
      : setFilterIsApplied(false);
  }, [colors, projects, designs, materials, widthList, weightList]);

  return (
    <Container>
      <Head>
        <title>Repunch-dev</title>
        <meta name="description" content="repunch 웹개발 테스트 사이트" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Home 제작중...
    </Container>
  );
}
const Container = styled.div`
  background-color: #fafafa;
  text-align: center;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  height: 280px;
  overflow: hidden;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    margin: 0;
  }
`;

const BackgroundMobile = styled.div`
  display: none;
  height: 280px;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const BackgroundPad = styled.div`
  display: none;
  height: 280px;
  @media screen and (max-width: 1279px) {
    display: block;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const BackgroundDesktop = styled.div`
  display: block;
  height: 280px;
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
const BannerTextWrapper = styled.div`
  z-index: 1;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  height: 280px;
  box-sizing: border-box;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    padding-right: 14px;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 19px;
`;
const Title = styled.div`
  margin-bottom: 128px;

  font-family: "Inter";
  font-weight: 400;
  font-size: 14.8998px;
  line-height: 17px;
  text-align: right;
  letter-spacing: -0.011em;
  text-transform: uppercase;
  color: #e1ff20;

  @media screen and (max-width: 768px) {
    margin-right: 1.5px;
  }
`;
const Text1 = styled.div`
  flex-shrink: 0;
  height: 19px;
  font-family: "Inter";
  font-weight: 400;
  font-size: 14.8998px;
  line-height: 17px;
  text-align: right;
  letter-spacing: -0.011em;
  text-transform: uppercase;
  color: #e1ff20;
`;
const LineLime = styled.div`
  margin-right: 3px;
  width: 100%;
  height: 8px;

  border-bottom: 1px solid #e1ff20;

  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;
const Text2 = styled.div`
  position: absolute;
  bottom: 59.63px;
  height: 19px;
  font-family: "Inter";
  font-weight: 400;
  font-size: 14.8998px;
  line-height: 17px;
  letter-spacing: -0.011em;
  text-transform: uppercase;
  color: #e1ff20;
`;
const Text3 = styled.div`
  position: absolute;
  bottom: 38.96px;
  height: 19px;
  margin-left: 47.16px;
  font-family: "Inter";
  font-weight: 400;
  font-size: 14.8998px;
  line-height: 17px;
  letter-spacing: -0.011em;
  text-transform: uppercase;
  color: #e1ff20;
`;
const Text4 = styled.div`
  position: absolute;
  bottom: 20.33px;
  height: 19px;
  margin-left: 47.16px;
  font-family: "Inter";
  font-weight: 400;
  font-size: 14.8998px;
  line-height: 17px;
  letter-spacing: -0.011em;
  text-transform: uppercase;
  color: #e1ff20;
`;
const IoText = styled.div`
  position: absolute;
  left: 5px;
  bottom: 24px;
  height: 8px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 12.4px;
  -webkit-transform: scale(0.5); //0.5 -> 50%
  display: inline-block;
  line-height: 8px;
  color: #e1ff20;
`;

const Main = styled.div`
  display: flex;
  margin: 0 auto;
  padding-top: 47px;
  padding-bottom: 20px;

  max-width: 1030px;
  min-height: 2843.35px;
  box-sizing: border-box;
  @media screen and (max-width: 1279px) {
    padding-top: 20px;
    padding-left: 80px;
    padding-right: 80px;
  }

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const ProductListWrapper = styled.div`
  width: 100%;
`;
const ButtonFlexWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;
const FilterButton = styled.button`
  display: none;
  position: relative;
  align-items: center;
  justify-content: center;

  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;

  cursor: pointer;

  @media screen and (max-width: 1279px) {
    display: flex;
  }
`;
const ButtonTextFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  margin-right: 7px;
  height: 19px;

  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #121822;
`;
const FilterAlarmBackground = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  position: absolute;
  top: 6px;
  left: 22px;

  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;

  background-color: #ffffff;
  border-radius: 100%;
`;
const FilterAlarmCircle = styled.div`
  width: 6px;
  height: 6px;
  background-color: #ff5c01;
  border-radius: 100%;
`;
const Result = styled.div`
  display: flex;

  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #121822;

  letter-spacing: -0.011em;
  &::after {
    display: block;
    content: "result";
    font-weight: 400;
    color: #121822;
  }

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
`;
const ClearButton = styled.button<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  padding: 0;
  border: none;
  background-color: #fafafa;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  text-decoration-line: underline;
  color: #536c6d;

  cursor: pointer;
`;
const SortButton = styled.button`
  display: flex;
  align-items: center;
  padding-left: 0;
  border: none;
  background-color: #fafafa;
  cursor: pointer;
`;
const ButtonTextSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #121822;

  @media screen and (max-width: 1279px) {
    margin-right: 7px;
    font-size: 12px;
  }
`;
const SortMenuWrapper = styled.div<{ isActive: boolean }>`
  z-index: 1;
  display: ${(props) => {
    return props.isActive == true ? "none" : "block";
  }};
  position: absolute;
  right: 0;
  top: 25px;
  @media screen and (max-width: 1279px) {
    top: 40px;
  }
  width: 120px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 2px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const SortMenu = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 7px;
  height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #dee8ec;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.011em;
  color: #121822;
  &:last-of-type {
    border: none;
  }
  cursor: pointer;
  ${(props) => {
    return props.isActive ? "background-color: #F2F6F8; font-weight: 700;" : "";
  }};
`;
const ProductListGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 50px;
  column-gap: 20px;

  @media screen and (max-width: 1279px) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 40px;
    column-gap: 18px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 15px;
    column-gap: 15px;
  }
`;
