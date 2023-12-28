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
import {
  colorsRequest,
  designsRequest,
  materialsRequest,
  originsRequest,
  projectsRequest,
} from "../utils/api";

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
  sortFilterIsActive,
  setSortFilterIsActive,
  colors,
  projects,
  designs,
  materials,
  origins,
  widthList,
  weightList,
  setColors,
  setProjects,
  setDesigns,
  setMaterials,
  setOrigins,
  setWidthList,
  setWeightList,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  sortFilterIsActive: boolean;
  setSortFilterIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  colors: any;
  projects: any;
  designs: any;
  materials: any;
  origins: any;
  widthList: any;
  weightList: any;
  setColors: React.Dispatch<any>;
  setProjects: React.Dispatch<any>;
  setDesigns: React.Dispatch<any>;
  setMaterials: React.Dispatch<any>;
  setOrigins: React.Dispatch<any>;
  setWidthList: React.Dispatch<any>;
  setWeightList: React.Dispatch<any>;
}) => {
  const [suppliesIsActive, setSuppliesIsActive] = useState(true);
  const [projectIsActive, setProjectIsActive] = useState(true);
  const [colorIsActive, setColorIsActive] = useState(true);
  const [designIsActive, setDesignIsActive] = useState(true);
  const [compositionIsActive, setCompositionIsActive] = useState(true);
  const [widthIsActive, setWidthIsActive] = useState(true);
  const [weightIsActive, setWeightIsActive] = useState(true);
  const [yarnIsActive, setYarnIsActive] = useState(true);
  const [colorChecked, setColorChecked] = useState(new Array(16).fill(false));

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

  /** 필터에 체크될 경우 클리어 버튼 활성화 */
  const clearButtonHandler = () => {
    let count = 0;
    suppliesList.forEach((i) => {
      if (i.isChecked == true) {
        count++;
        setSortFilterIsActive(true);
        return;
      }
    });
    projectList.forEach((i) => {
      if (i.isChecked == true) {
        count++;
        setSortFilterIsActive(true);
        return;
      }
    });
    designList.forEach((i) => {
      if (i.isChecked == true) {
        count++;
        setSortFilterIsActive(true);
        return;
      }
    });
    widthList.forEach((i: any) => {
      if (i.isChecked == true) {
        count++;
        setSortFilterIsActive(true);
        return;
      }
    });
    weightList.forEach((i: any) => {
      if (i.isChecked == true) {
        count++;
        setSortFilterIsActive(true);
        return;
      }
    });
    if (colorChecked.includes(true)) {
      count++;
      setSortFilterIsActive(true);
      return;
    }
    if (count == 0) {
      setSortFilterIsActive(false);
    }
  };

  /** 필터들 체크되면 클리어버튼 활성화, 혹은 체크 모두 해제되면 비활성화 */
  useEffect(() => {
    clearButtonHandler();
  }, [
    suppliesList,
    projectList,
    designList,
    widthList,
    weightList,
    colorChecked,
  ]);

  /** 클리어버튼 클릭시 필터 체크들 모두 해제 */
  useEffect(() => {
    if (sortFilterIsActive == false) {
      let tempSupplieList = suppliesList;
      let tempProjectList = projectList;
      let tempDesignList = designList;
      let tempWidthList = widthList;
      let tempWeightList = weightList;
      let tempColorList = colorChecked;

      tempProjectList = tempProjectList.map((i) => {
        return { ...i, isChecked: false };
      });
      tempProjectList = tempProjectList.map((i) => {
        return { ...i, isChecked: false };
      });
      tempDesignList = tempDesignList.map((i) => {
        return { ...i, isChecked: false };
      });
      tempWidthList = tempWidthList.map((i: any) => {
        return { ...i, isChecked: false };
      });
      tempWeightList = tempWeightList.map((i: any) => {
        return { ...i, isChecked: false };
      });
      tempColorList = tempColorList.map((i) => {
        return false;
      });

      setSuppliesList([...tempSupplieList]);
      setProjectList([...tempProjectList]);
      setDesignList([...tempDesignList]);
      setWidthList([...tempWidthList]);
      setWeightList([...tempWeightList]);
      setColorChecked([...tempColorList]);
      console.log(tempProjectList);
    }
  }, [sortFilterIsActive]);

  useEffect(() => {
    console.log(colors);
  }, [colors]);

  /** 필터 리스트들 세팅 */
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

    sessionStorage.getItem("projects")
      ? setProjects([...JSON.parse(sessionStorage.getItem("projects") || "{}")])
      : projectsRequest().then((res: any) => {
          sessionStorage.setItem("projects", JSON.stringify(res?.data.result));
          setProjects([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false };
            }),
          ]);
        });

    sessionStorage.getItem("designs")
      ? setDesigns([...JSON.parse(sessionStorage.getItem("designs") || "{}")])
      : designsRequest().then((res: any) => {
          sessionStorage.setItem("designs", JSON.stringify(res?.data.result));
          setDesigns([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false };
            }),
          ]);
        });

    sessionStorage.getItem("materials")
      ? setMaterials([
          ...JSON.parse(sessionStorage.getItem("materials") || "{}"),
        ])
      : materialsRequest().then((res: any) => {
          sessionStorage.setItem("materials", JSON.stringify(res?.data.result));
          setMaterials([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false };
            }),
          ]);
        });

    sessionStorage.getItem("origins")
      ? setOrigins([...JSON.parse(sessionStorage.getItem("origins") || "{}")])
      : originsRequest().then((res: any) => {
          sessionStorage.setItem("origins", JSON.stringify(res?.data.result));
          setOrigins([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false };
            }),
          ]);
        });
  }, []);

  /** 체크 핸들러 */
  const checkHandler = (list: any, setList: any, index: number) => {
    console.log("??");
    let tempList = list;
    tempList[index].isChecked = !tempList[index].isChecked;
    setList([...tempList]);
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
        <CategoryTitleWrapper
          onClick={() => setSuppliesIsActive(!suppliesIsActive)}
        >
          <Image
            src={suppliesIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>SELECT COLOR</CategoryTitle>
        </CategoryTitleWrapper>
        <ColorWraaper isActive={suppliesIsActive}>
          {colors &&
            colors.map((el: any, index: number) => {
              return (
                <ColorCircle
                  onClick={() => checkHandler(colors, setColors, index)}
                  key={`asdf${index}`}
                  url={el.imagePath}
                >
                  <ColorChecked isChecked={el.isChecked}>
                    <Image src={colorCheckHandler(index)} alt="check_icon" />
                  </ColorChecked>
                </ColorCircle>
              );
            })}
        </ColorWraaper>
        <CategoryTitleWrapper
          onClick={() => setProjectIsActive(!projectIsActive)}
        >
          <Image
            src={projectIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>Project</CategoryTitle>
        </CategoryTitleWrapper>
        {projects &&
          projects.map((el: any, index: number) => {
            return (
              <CategoryListWrapper
                isActive={projectIsActive}
                key={`test${index}`}
              >
                <Label htmlFor={`project${index}`}>
                  <CustomCheckBox
                    isChecked={el.isChecked}
                    img={ic_check_wht.src}
                  />
                  {el.name}
                </Label>
                <Checkbox
                  type="checkbox"
                  id={`project${index}`}
                  onChange={() => checkHandler(projects, setProjects, index)}
                />
              </CategoryListWrapper>
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
        {designs &&
          designs.map((el: any, index: number) => {
            return (
              <CategoryListWrapper
                isActive={designIsActive}
                key={`designaa${index}`}
              >
                <Label htmlFor={`design${index}`}>
                  <CustomCheckBox
                    isChecked={el.isChecked}
                    img={ic_check_wht.src}
                  />
                  {el.name}
                </Label>
                <Checkbox
                  type="checkbox"
                  id={`design${index}`}
                  onChange={() => checkHandler(designs, setDesigns, index)}
                />
              </CategoryListWrapper>
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
        {materials &&
          materials.map((el: any, index: number) => {
            return (
              <CategoryListWrapper
                isActive={compositionIsActive}
                key={`composition${index}`}
              >
                <Label htmlFor={`composition${index}`}>
                  <CustomCheckBox
                    isChecked={el.isChecked}
                    img={ic_check_wht.src}
                  />

                  {el.name}
                </Label>
                <Checkbox
                  type="checkbox"
                  id={`composition${index}`}
                  onChange={() => checkHandler(materials, setMaterials, index)}
                />
              </CategoryListWrapper>
            );
          })}

        <CategoryTitleWrapper onClick={() => setWidthIsActive(!widthIsActive)}>
          <Image
            src={widthIsActive ? ic_down_bk : ic_up_bk}
            alt={"arrow_down"}
          />
          <CategoryTitle>WIDTH(Inch)</CategoryTitle>
        </CategoryTitleWrapper>
        {widthList.map((i: any, j: number) => {
          return (
            <CategoryListWrapper isActive={widthIsActive} key={`width${j}`}>
              <Label htmlFor={`width${j}`}>
                <CustomCheckBox
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                />
                {i.name}
              </Label>
              <Checkbox
                type="checkbox"
                id={`width${j}`}
                onChange={() => widthCheckedHandler(j)}
              />
            </CategoryListWrapper>
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
        {weightList.map((i: any, j: number) => {
          return (
            <CategoryListWrapper isActive={weightIsActive} key={`weight${j}`}>
              <Label htmlFor={`weight${j}`}>
                <CustomCheckBox
                  isChecked={i.isChecked}
                  img={ic_check_wht.src}
                />
                {i.name}
              </Label>
              <Checkbox
                type="checkbox"
                id={`weight${j}`}
                onChange={() => weightCheckedHandler(j)}
              />
            </CategoryListWrapper>
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

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;
const CustomCheckBox = styled.div<{ isChecked: boolean; img: string }>`
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

  background-image: ${(props) => {
    return props.isChecked == true ? `url(${props.img})` : "";
  }};
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
  height: 190px;
`;
const ColorCircle = styled.div<{ url: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
  margin-bottom: 15.5px;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  cursor: pointer;

  ${(props) => {
    return `background-image: url(${props.url})`;
  }};

  background-position: center;

  &:nth-of-type(1) {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  /* &:nth-of-type(1) {
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
    background-color: #ff96fb;
  }
  &:nth-of-type(10) {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background-color: #ffffff;
  }
  &:nth-of-type(11) {
    background-color: #f7f4e9;
  }
  &:nth-of-type(12) {
    background-color: #c4c4c4;
  }
  &:nth-of-type(13) {
    background-color: #000000;
  }
  &:nth-of-type(14) {
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
  &:nth-of-type(15) {
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
  &:nth-of-type(16) {
    margin-bottom: 0;
    background: linear-gradient(
      154.17deg,
      #ff1001 17.26%,
      #fff500 37.73%,
      #24ff00 57.06%,
      #00bdf9 72.22%,
      #0075ff 90.03%
    );
  } */
`;

const ColorChecked = styled.div<{ isChecked: boolean }>`
  display: ${(props) => {
    return props.isChecked == true ? "block" : "none";
  }};
`;

export default UseFilter;
