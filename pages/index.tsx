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
      <BigText>We are more than just a textile marketplace.</BigText>
      <MiddleText>
        What sets us apart is our commitment to sustainability. We specialize in
        clothing fabrics, offering a diverse range of materials to meet your
        needs.
      </MiddleText>
      <BigText>Enviromental Responsibility</BigText>
      <MiddleText>
        What sets us apart is our commitment to sustainability. We specialize in
        clothing fabrics, offering a diverse range of materials to meet your
        needs.{" "}
      </MiddleText>
      <BigText>+370,000t / year</BigText>
      <MiddleText>Clothing waste is thrown away every year.</MiddleText>
      <BigText>200 year</BigText>
      <MiddleText>Time taken for fiber decomposition</MiddleText>
      <BigText>1.5°C /year</BigText>
      <MiddleText>
        Increase in typhoons due to rising global temperature
      </MiddleText>
      <BigText>Our solution</BigText>
      <MiddleText>
        What sets us apart is our commitment to sustainability.
      </MiddleText>
      <SmallText>
        We stock up on as much recyclable fabric as possible.
      </SmallText>
      <SmallText>We provide you with access to old fabrics.</SmallText>
      <SmallText>We create new products from old fabrics.</SmallText>
      <BigText>10,000+ Products</BigText>
      <MiddleText>
        What sets us apart is our commitment to sustainability.
      </MiddleText>
      <BigText>What sets us apart is our commitment to sustainability.</BigText>
      <MiddleText>
        We will contact you to schedule an online meeting whenever possible.
      </MiddleText>
      <MiddleText2>Inquary</MiddleText2>
      <SmallText2>
        Please let us know what you are curious about, such as production,
        fabric swatches, etc.
      </SmallText2>
      <MiddleText2>Business industry and detail</MiddleText2>
      <SmallText2></SmallText2>
      <MiddleText2>Business industry and detail</MiddleText2>
      <SmallText2>
        If you tell us about your business, we can prepare in advance and
        provide you with detailed information.
      </SmallText2>
      <MiddleText2>Arrange meeting</MiddleText2>
      <SmallText2>
        please let us know the date and time when the meeting can be held online
        and we will contact you.
      </SmallText2>
    </Container>
  );
}

const Container = styled.div`
  color: #121822;
  background-color: #fafafa;
`;
const BigText = styled.div`
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
`;
const MiddleText2 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;
`;
const MiddleText = styled.div`
  font-family: Inter;
  font-size: 8.633px;
  font-weight: 400;
`;
const SmallText = styled.div`
  font-family: "Kaiti TC";
  font-size: 8.633px;
  font-weight: 400;
  line-height: 20.718px;
`;
const SmallText2 = styled.div`
  color: #000000;
  font-family: Inter;
  font-size: 8px;
  font-weight: 400;
`;
