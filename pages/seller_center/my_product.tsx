import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ic_check_web_status,
  ic_down_bk_filter,
  ic_up_bk_filter,
} from "../../assets";
import Image from "next/image";
import { ProductList } from "../../components";
import { sellerProductsRequest } from "../../utils/api";
import SellerProduct from "../../components/seller_center/SellerProduct";

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

const my_product = () => {
  const [sortFilterIsActive, setSortFilterIsActive] = useState(false);
  const [sortIsActive, setSortIsActive] = useState(false);
  const [sortType, setSortType] = useState("LATEST");

  const [products, setProducts] = useState<any>([]); // 셀러 등록 상품들
  const [count, setCount] = useState(0); // 셀러 등록 상품 개수

  const [loading, setLoading] = useState(true); // 상품 불러오기 로딩
  const [searchAfter, setSearchAfter] = useState<number | null>(null); // 다음 상품 불러오기 기준 값

  const ref = useRef<any>();

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

  /** my product 목록 불러오기 - 처음 */
  const sellerProductRequestHandler = () => {
    const at = localStorage.getItem("at");
    sellerProductsRequest(
      at,
      sortType,
      8,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ).then((res?) => {
      console.log(res);
      const data = res?.data.result.data;

      // 등록 상품 없을 경우
      if (data === null) {
        return;
      }

      // 등록 상품 있을 경우
      setProducts([...data]);
      setCount(res?.data.result.metadata.totalCount);
      setSearchAfter(res?.data.result.metadata.searchAfter);
      setLoading(false);
    });
  };

  /** my product 목록 불러오기 - 추가 */
  const sellerProductAdditionalRequestHandler = () => {
    const at = localStorage.getItem("at");
    sellerProductsRequest(
      at,
      sortType,
      8,
      searchAfter,
      null,
      null,
      null,
      null,
      null,
      null
    ).then((res?) => {
      console.log(res);
      const data = res?.data.result.data;

      // 등록 상품 없을 경우
      if (data === null) {
        return;
      }

      // 등록 상품 있을 경우
      setProducts([...products, ...data]);
      setCount(res?.data.result.metadata.totalCount);
      setSearchAfter(res?.data.result.metadata.searchAfter);
      setLoading(false);
    });
  };

  /** 옵저버 갱신 */
  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      isIntersecting && !loading && sellerProductAdditionalRequestHandler();
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [loading, searchAfter]);

  useEffect(() => {
    sellerProductRequestHandler();
  }, [sortType]);

  return (
    <div onClick={() => setSortIsActive(false)}>
      <Container>
        <ItemSortWrapper>
          <Items>{count} items</Items>
          <ButtonWrapper>
            <ClearButton
              isActive={sortFilterIsActive}
              onClick={() => setSortFilterIsActive(false)}
            >
              Clear Filter
            </ClearButton>
            <SortButton
              onClick={(e) => {
                setSortIsActive(!sortIsActive);
                e.stopPropagation();
              }}
            >
              <ButtonTextSort>
                {sortType === "LATEST" && "Sort by latest"}
                {sortType === "LOW_PRICE" && "Sort by low price"}
                {sortType === "HIGH_PRICE" && "Sort by high price"}
              </ButtonTextSort>

              <Image
                src={sortIsActive ? ic_down_bk_filter : ic_up_bk_filter}
                alt={"sort_arrow_button"}
              />
            </SortButton>
          </ButtonWrapper>
        </ItemSortWrapper>
        <SortMenuWrapper isActive={sortIsActive}>
          <SortMenu
            isActive={sortType == "LATEST"}
            onClick={() => {
              setSortIsActive(false);

              setSortType("LATEST");
            }}
          >
            Latest
            {sortType == "LATEST" ? (
              <Image src={ic_check_web_status} alt={"ic_check_web"} />
            ) : (
              ""
            )}
          </SortMenu>
          <SortMenu
            isActive={sortType == "LOW_PRICE"}
            onClick={() => {
              setSortIsActive(false);

              setSortType("LOW_PRICE");
            }}
          >
            Low Price
            {sortType == "LOW_PRICE" ? (
              <Image src={ic_check_web_status} alt={"ic_check_web"} />
            ) : (
              ""
            )}
          </SortMenu>
          <SortMenu
            isActive={sortType == "HIGH_PRICE"}
            onClick={() => {
              setSortIsActive(false);

              setSortType("HIGH_PRICE");
            }}
          >
            High Price
            {sortType == "HIGH_PRICE" ? (
              <Image src={ic_check_web_status} alt={"ic_check_web"} />
            ) : (
              ""
            )}
          </SortMenu>
        </SortMenuWrapper>
        <SellerProductWrapper>
          {products &&
            products.map((el: any, index: number) => {
              return <SellerProduct product={el} key={`${index}a--sdf`} />;
            })}
          {products && <div ref={ref}></div>}
        </SellerProductWrapper>
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 20px;

  max-width: 1030px;
  color: #121822;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
`;
const ItemSortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;
const Items = styled.div``;

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
  background-color: #ffffff;

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
  background-color: #ffffff;
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
    return props.isActive ? "block" : "none";
  }};
  position: absolute;
  right: 20px;
  top: 35px;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 50px;
  column-gap: 20px;

  @media screen and (max-width: 1489px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 40px;
    column-gap: 20px;
  }

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

const SellerProductWrapper = styled.div`
  /* display: grid;
  margin-bottom: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;

  @media screen and (max-width: 1279px) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 16px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 15px;
    column-gap: 20px;
  } */

  display: grid;
  margin-bottom: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 50px;
  column-gap: 20px;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 40px;
    column-gap: 20px;
  }

  @media screen and (max-width: 860px) {
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

export default my_product;
