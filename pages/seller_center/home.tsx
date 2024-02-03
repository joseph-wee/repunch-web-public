import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  sellerOrderCountRequest,
  sellerProductsRequest,
  userCheck,
} from "../../utils/api";
import { userInfo } from "os";
import SellerProduct from "../../components/seller_center/SellerProduct";
import { ic_link, ic_link_gray } from "../../assets";
import Image from "next/image";
import Link from "next/link";

const home = () => {
  const [sellerInfo, setSellerInfo] = useState({
    companyName: "",
    sellerName: "",
  }); // 셀러 정보
  const [products, setProducts] = useState<any>(); // 셀러 등록 상품들
  const [count, setCount] = useState(0); // 셀러 등록 상품 개수
  const [orderList, setOrderList] = useState([{}]); // 주문 상태 리스트

  const orderStatus = [
    "In review",
    "Order confirm",
    "In Production",
    "Shipped",
    "Delivered",
    "Closing order",
    "Canceled",
    "Returns",
  ];

  /** 셀러 정보 세팅 */
  const sellerInfoHandler = () => {
    const companyName = sessionStorage.getItem("companyName");
    const sellerName = sessionStorage.getItem("sellerName");

    // 셀러 정보 있는 경우
    if (companyName && sellerName) {
      setSellerInfo({
        ...{
          companyName: companyName,
          sellerName: sellerName,
        },
      });
      return;
    }

    // 셀러 정보 없는 경우, 없으면 새로 불러옴
    const at = localStorage.getItem("at");
    userCheck(at).then((res) => {
      const role = res?.data.result.role;
      const companyName = res?.data.result.companyName;
      const sellerName = `${res?.data.result.firstName} ${res?.data.result.lastName}`;
      localStorage.setItem("role", role);
      sessionStorage.setItem("companyName", companyName);
      sessionStorage.setItem("sellerName", sellerName);
      setSellerInfo({
        ...{
          companyName: companyName,
          sellerName: sellerName,
        },
      });
    });
  };

  /** my product 목록 불러오기 */
  const sellerProductRequestHandler = () => {
    const at = localStorage.getItem("at");
    sellerProductsRequest(
      at,
      "LATEST",
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
    });
  };

  /** 셀러 주문 개수 불러오기 */
  const sellerOrderCountRequestHandler = () => {
    const at = localStorage.getItem("at");
    sellerOrderCountRequest(at).then((res?) => {
      const data = res?.data.result.map((el: any, index: number) => {
        return {
          status: orderStatus[index],
          count: el.count,
        };
      });
      setOrderList([...data]);
    });
  };

  useEffect(() => {
    sellerInfoHandler();
    sellerProductRequestHandler();
    sellerOrderCountRequestHandler();
  }, []);

  return (
    <Container>
      <CompanyName>{`${sellerInfo.companyName}`}</CompanyName>
      <SellerName>{`${sellerInfo.sellerName}`}</SellerName>

      <AddProductBox>
        <Notice>
          You must upload the 4 required
          <br /> photos, including a video.
        </Notice>
        <Link
          href="/seller_center/add_product"
          style={{ textDecoration: "none" }}
        >
          <AddProductButton>+ Add product</AddProductButton>
        </Link>
      </AddProductBox>
      {/** TODO: 상품 등록 없으면 안보이게 */}
      <TitleBar>
        <TitleCountWrapper>
          <Title>My product</Title>
          <Count>{`${count}`}</Count>
        </TitleCountWrapper>
        <More>More</More>
      </TitleBar>
      <SellerProductWrapper>
        {products &&
          products.map((el: any, index: number) => {
            return <SellerProduct product={el} key={`${index}a--sdf`} />;
          })}
      </SellerProductWrapper>
      <MoreBigButton>
        See <Bold>{`${count}`}</Bold> more product
      </MoreBigButton>
      <TitleBar>
        <Title>Order list</Title>
        <More>More</More>
      </TitleBar>
      <OrderListContainer>
        {orderList.map((el: any, index: number) => {
          return (
            <>
              <OrderListWrapper key={`12-${index}`}>
                <OrderName>{`${el.status}`}</OrderName>
                <OrderCountWrapper>
                  {el.count === 0 ? (
                    <OrderCountGray>{`${el.count}`}</OrderCountGray>
                  ) : (
                    <OrderCount>{`${el.count}`}</OrderCount>
                  )}
                  <Image
                    src={el.count === 0 ? ic_link_gray : ic_link}
                    alt="ic_link"
                  />
                </OrderCountWrapper>
              </OrderListWrapper>
            </>
          );
        })}
      </OrderListContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 1030px;
  color: #121822;
`;
const CompanyName = styled.div`
  margin-bottom: 1px;
  font-size: 22px;
  font-weight: 700;
  line-height: 28.6px;
`;
const SellerName = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
`;
const AddProductBox = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  border: 0.794px solid #dee8ec;
  background-color: #f2f6f8;
`;
const Notice = styled.div`
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
`;
const AddProductButton = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 18.2px;
  color: #121822;
  box-sizing: border-box;
  border-radius: 2px;
  border: 0.794px solid #d4f01e;
  background: #e1ff20;
  cursor: pointer;
`;
const TitleBar = styled.div`
  margin-bottom: 20px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f6f8;
`;
const TitleCountWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 18.2px;
`;
const Count = styled.div`
  font-size: 14px;
  line-height: 18.2px;
  color: #536c6d;
`;
const More = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  cursor: pointer;
`;
const MoreBigButton = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  text-align: center;
  border-radius: 2px;
  border: 0.794px solid #dee8ec;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  cursor: pointer;
`;
const Bold = styled.span`
  font-weight: 600;
`;
const SellerProductWrapper = styled.div`
  display: grid;
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
  }
`;

const OrderListContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #dee8ec;
`;
const OrderListWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;

  border-bottom: 1px solid #f2f6f8;

  &:first-of-type {
    padding-top: 0px;
  }
  &:last-of-type {
    padding-bottom: 0px;
    border: none;
  }
`;
const OrderName = styled.div``;
const OrderCountWrapper = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
  cursor: pointer;
`;
const OrderCountGray = styled.div`
  color: #dee8ec;
  font-weight: 700;
`;
const OrderCount = styled.div`
  color: #ff2f01;
  font-weight: 700;
`;

export default home;
