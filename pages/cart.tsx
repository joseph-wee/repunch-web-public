import React, { useEffect } from "react";
import styled from "styled-components";
import { SideBar, CartMeterageProduct, CartSampleProduct } from "../components";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back, ic_check_wht, ic_info, ic_logo_gray } from "../assets";
import { goBack } from "../utils/functions";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMeterage, setSample } from "../features/login/cartSlice";
import { useRouter } from "next/router";
import {
  cartDelteRequest,
  cartListRequest,
  loginRefreshRequest,
} from "../utils/api";
import { setTempOrderList } from "../features/login/tempOrderSlice";

const useCart = () => {
  const [isActive, setIsActive] = useState(false);
  const [rollAllCheck, setRollAllCheck] = useState(false);
  const [sampleAllCheck, setSampleAllCheck] = useState(false);

  const [rollCheckArr, setRollCheckArr] = useState([false]);
  const [sampleCheckArr, setSampleCheckArr] = useState([false]);

  const { value: cartValue } = useAppSelector((state) => state.cartValue);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [rollTotalCount, setRollTotalCount] = useState(0);
  const [sampleTotalCount, setSampleTotalCount] = useState(0);

  const [rollSelectCount, setRollSelectCount] = useState(0);
  const [sampleSelectCount, setSampleSelectCount] = useState(0);

  const [rollList, setRollList] = useState<any>([]); // 카트 목록 담길 state
  const [sampleList, setSampleList] = useState<any>([]); // 샘플 목록 담길 state

  const [noRoll, setNoRoll] = useState(false);
  const [noSample, setNoSample] = useState(false);

  const { value: tempOrderList } = useAppSelector(
    (state) => state.tempOrderList
  );

  const cartPurchaseHandler = () => {
    if (cartValue == 0) {
      router.push("/check_out");
    }
    if (cartValue == 1) {
      setIsActive(true);
    }
  };

  /** 카트 목록 길이에 만큼 체크박스 할당 */
  useEffect(() => {
    setRollCheckArr(new Array(rollList.length).fill(false));
  }, [rollList]);
  useEffect(() => {
    setSampleCheckArr(new Array(sampleList.length).fill(false));
  }, [sampleList]);

  /** roll 모두 체크 혹은 해제 */
  const rollCheckAll = () => {
    let count = 0;
    rollCheckArr.forEach((i) => {
      if (i) {
        count++;
      }
    });
    if (count == rollCheckArr.length) {
      let temp = rollCheckArr;
      temp.fill(false);
      setRollCheckArr([...temp]);
      return;
    }
    let temp = rollCheckArr;
    temp.fill(true);
    setRollCheckArr([...temp]);
  };

  /** sample 모두 체크 혹은 해제 */
  const sampleCheckAll = () => {
    let count = 0;
    sampleCheckArr.forEach((i) => {
      if (i) {
        count++;
      }
    });
    if (count == sampleCheckArr.length) {
      let temp = sampleCheckArr;
      temp.fill(false);
      setSampleCheckArr([...temp]);
      return;
    }
    let temp = sampleCheckArr;
    temp.fill(true);
    setSampleCheckArr([...temp]);
  };

  /** roll 체크 감지하여 roll selct all 체크 혹은 해제 */
  useEffect(() => {
    console.log(rollCheckArr);
    let count = 0;
    rollCheckArr.forEach((i) => {
      if (i) {
        count++;
      }
    });
    setRollSelectCount(count);
    if (count == rollCheckArr.length) {
      setRollAllCheck(true);
      return;
    }
    setRollAllCheck(false);
  }, [rollCheckArr]);

  /** sample 체크 감지하여 roll selct all 체크 혹은 해제 */
  useEffect(() => {
    let count = 0;
    sampleCheckArr.forEach((i) => {
      if (i) {
        count++;
      }
    });
    setSampleSelectCount(count);
    if (count == sampleCheckArr.length) {
      setSampleAllCheck(true);
      return;
    }
    setSampleAllCheck(false);
  }, [sampleCheckArr]);

  /** ROLL 카트 목록 핸들러 */
  const cartListHandler = async (searchAfter: number) => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    let nextSearchAfter = await cartListRequest(
      at,
      "ROLL",
      50,
      searchAfter
    ).then((res) => {
      console.log(res);
      let tempList = rollList; // 장바구니 리스트
      let tempNextSearchAfter; // 다음 장바구니 목록 가져오기 위한 임시 저장 변수

      // 실패 case (토큰 유효하지 않음)
      if (res?.data.code == 1003) {
        loginRefreshRequest(rt).then((res) => {
          // 토큰 재발급 성공 case
          // 엑세스 토큰, 리프레쉬 토큰 세팅 후 카트목록 재요청
          if (res?.data.status == 200) {
            at = res.data.result.access_token;
            rt = res.data.result.refresh_token;

            if (sessionStorage.getItem("at")) {
              sessionStorage.setItem("at", at);
              sessionStorage.setItem("rt", `${rt}`);
            } else {
              localStorage.setItem("at", at);
              localStorage.setItem("rt", `${rt}`);
            }

            // 카트목록 재요청
            cartListRequest(at, "ROLL", 50, searchAfter).then((res) => {
              // 성공 case
              if (res?.data.status == 200) {
                // 장바구니 개수가 0개이면 리턴
                if (res.data.result.data == null) {
                  rollList.length === 0 && setNoRoll(true);
                  return;
                }

                // nextSearchAfter 저장
                tempNextSearchAfter = res?.data.result.metadata.searchAfter;
                // response 가공해서 저장
                res?.data.result.data.forEach((el: any, index: number) => {
                  // 리스트에 푸시
                  tempList.push({
                    cartNo: el.cartNo, // 카트 번호
                    productNo: el.option.productNo, // 상품 번호
                    productOptionNo: el.option.productNo, // 옵션 번호
                    thumbnail: el.option.thumbnailUrl, // 썸네일
                    title: el.product.title, // 제목
                    color: el.option.color.name, // 컬러
                    width: el.product.width, // 너비
                    length: el.option.length, // 길이
                    price: el.product.price, // 가격
                    count: el.count, // 담은 개수
                    totalPrice: el.count * el.price, // 토탈 가격
                    quantity: el.option.quantity, // 판매 가능 개수
                    display: true,
                  });
                });
              }
            });
          }
        });
        setRollList([...tempList]);
        setRollTotalCount(tempList.length);
        return;
      }

      // 성공 case
      if (res?.data.status == 200) {
        // 장바구니 개수가 0개이면 리턴
        if (res.data.result.data == null) {
          rollList.length === 0 && setNoRoll(true);
          return;
        }
        console.log(res);
        // nextSearchAfter 저장
        tempNextSearchAfter = res?.data.result.metadata.searchAfter;
        // response 가공해서 저장
        res?.data.result.data.forEach((el: any, index: number) => {
          // 리스트에 푸시
          tempList.push({
            cartNo: el.cartNo, // 카트 번호
            productNo: el.option.productNo, // 상품 번호
            productOptionNo: el.option.productOptionNo, // 옵션 번호
            thumbnail: el.option.thumbnailUrl, // 썸네일
            title: el.product.title, // 제목
            color: el.option.color.name, // 컬러
            width: el.product.width, // 너비
            length: el.option.length, // 길이
            price: el.product.price, // 가격
            count: el.count, // 담은 개수
            totalPrice: el.count * el.price, // 토탈 가격
            quantity: el.option.quantity, // 판매 가능 개수
            display: true,
          });
        });
        console.log(tempList);
        setRollList([...tempList]);
        setRollTotalCount(tempList.length);
        return tempNextSearchAfter;
      }

      // 실패 case: 장바구니 목록 더 이상 조회할게 없음
      if (res?.data.code == 9999) {
        return -1;
      }
    });
    return nextSearchAfter;
  };

  /** Sample 카트 목록 핸들러 */
  const SampleCartListHandler = async (searchAfter: number) => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    let nextSearchAfter = await cartListRequest(
      at,
      "SAMPLE",
      50,
      searchAfter
    ).then((res) => {
      console.log(res);
      let tempList = sampleList; // 장바구니 리스트
      let tempNextSearchAfter; // 다음 장바구니 목록 가져오기 위한 임시 저장 변수

      // 실패 case (토큰 유효하지 않음)
      if (res?.data.code == 1003) {
        loginRefreshRequest(rt).then((res) => {
          // 토큰 재발급 성공 case
          // 엑세스 토큰, 리프레쉬 토큰 세팅 후 카트목록 재요청
          if (res?.data.status == 200) {
            at = res.data.result.access_token;
            rt = res.data.result.refresh_token;

            if (sessionStorage.getItem("at")) {
              sessionStorage.setItem("at", at);
              sessionStorage.setItem("rt", `${rt}`);
            } else {
              localStorage.setItem("at", at);
              localStorage.setItem("rt", `${rt}`);
            }

            // 카트목록 재요청
            cartListRequest(at, "SAMPLE", 50, searchAfter).then((res) => {
              // 성공 case
              if (res?.data.status == 200) {
                // 장바구니 개수가 0개이면 리턴
                if (res.data.result.data == null) {
                  sampleList.length === 0 && setNoSample(true);
                  return;
                }
                // nextSearchAfter 저장
                tempNextSearchAfter = res?.data.result.metadata.searchAfter;
                // response 가공해서 저장
                res?.data.result.data.forEach((el: any, index: number) => {
                  // 리스트에 푸시
                  tempList.push({
                    cartNo: el.cartNo, // 카트 번호
                    productNo: el.option.productNo, // 상품 번호
                    productOptionNo: el.productOptionNo,
                    thumbnail: el.option.thumbnailUrl, // 썸네일
                    title: el.product.title, // 제목
                    color: el.option.color.name, // 컬러
                    width: el.product.width, // 너비
                    length: el.option.length, // 길이
                    price: el.option.samplePrice, // 가격
                    count: el.count, // 담은 개수
                    totalPrice: el.count * el.samplePrice, // 토탈 가격
                    quantity: el.option.quantity, // 판매 가능 개수
                    display: true,
                  });
                });
              }
            });
          }
        });
        setSampleList([...tempList]);
        setSampleTotalCount(tempList.length);
        return;
      }

      // 성공 case
      if (res?.data.status == 200) {
        // 장바구니 개수가 0개이면 리턴
        if (res.data.result.data == null) {
          sampleList.length === 0 && setNoSample(true);
          return;
        }
        console.log(res);
        // nextSearchAfter 저장
        tempNextSearchAfter = res?.data.result.metadata.searchAfter;
        // response 가공해서 저장
        res?.data.result.data.forEach((el: any, index: number) => {
          // 리스트에 푸시
          tempList.push({
            cartNo: el.cartNo, // 카트 번호
            productNo: el.option.productNo, // 상품 번호
            productOptionNo: el.productOptionNo, // 옵션 번호
            thumbnail: el.option.thumbnailUrl, // 썸네일
            title: el.product.title, // 제목
            color: el.option.color.name, // 컬러
            width: el.product.width, // 너비
            length: el.option.length, // 길이
            price: el.option.samplePrice, // 가격
            count: el.count, // 담은 개수
            totalPrice: el.count * el.samplePrice, // 토탈 가격
            quantity: el.option.quantity, // 판매 가능 개수
            display: true,
          });
        });

        setSampleList([...tempList]);
        setSampleTotalCount(tempList.length);
        return tempNextSearchAfter;
      }

      // 실패 case: 장바구니 목록 더 이상 조회할게 없음
      if (res?.data.code == 9999) {
        return -1;
      }
    });
    return nextSearchAfter;
  };

  /** 카트 목록 끝까지 요청 일단 500개까지만 되도록 해놓음 */
  const totalCartListHandler = async () => {
    let nextSearchAfter: any = 0;
    for (let i = 0; i < 10; i++) {
      nextSearchAfter = await cartListHandler(nextSearchAfter);
      if (nextSearchAfter == -1 || nextSearchAfter == null) {
        break;
      }
    }
    nextSearchAfter = 0;
    for (let i = 0; i < 10; i++) {
      nextSearchAfter = await SampleCartListHandler(nextSearchAfter);
      if (nextSearchAfter == -1 || nextSearchAfter == null) {
        break;
      }
    }
  };

  /** 선택목록 데이터 주문 페이지로 넘기기 */
  const purchaseHandler = () => {
    let temp: any = [];
    // ROLL 구매 case
    if (cartValue == 0) {
      rollCheckArr.forEach((el: any, index: number) => {
        el && rollList[index].count > 0 && temp.push(rollList[index]);
      });

      // 체크한게 있어야 구매 진행
      if (temp.length > 0) {
        dispatch(setTempOrderList(temp));
        router.push("/order_temp1");
      }
    }
    // Sample 구매 case
    if (cartValue == 1) {
      sampleCheckArr.forEach((el: any, index: number) => {
        el && temp.push(sampleList[index]);
      });
      // 체크한게 10~20개일 때만 구매 진행
      if (temp.length >= 1 && temp.length <= 20) {
        dispatch(setTempOrderList(temp));

        router.push("/checkout_sample");
        return;
      }
      // 체크한게 10~20개 아니면
      if (temp.length < 10 || temp.length > 20) {
        setIsActive(true);
      }
    }
  };

  /** 카트 선택 삭제 핸들러 */
  const removeHandler = () => {
    let at: any;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    // Roll 삭제 케이스
    if (cartValue === 0 && rollSelectCount > 0) {
      let temp = rollList;
      let deleteCount = 0;
      rollCheckArr.forEach((el: boolean, index: number) => {
        if (el) {
          cartDelteRequest(at, rollList[index].cartNo);
          deleteCount++;
          temp[index].display = false;
        }
      });
      setRollTotalCount((prev) => prev - deleteCount);
      setRollList([...temp]);
      return;
    }

    // Sample 삭제 케이스
    if (cartValue === 1 && sampleSelectCount > 0) {
      let temp = sampleList;
      let deleteCount = 0;
      sampleCheckArr.forEach((el: boolean, index: number) => {
        if (el) {
          cartDelteRequest(at, sampleList[index].cartNo);
          deleteCount++;
          temp[index].display = false;
        }
      });
      setSampleTotalCount((prev) => prev - deleteCount);
      setSampleList([...temp]);
      return;
    }
  };

  useEffect(() => {
    totalCartListHandler();
  }, []);

  return (
    <>
      <Container>
        <SideBar />
        <Main>
          <TitleWrapper>
            <ImageWrapper onClick={() => goBack()}>
              <Image src={btn_web_back} alt={"btn_web_back"} />
            </ImageWrapper>
            <Title>Cart</Title>
          </TitleWrapper>
          <AllMeterSampleButtonWrapper isActive={cartValue}>
            <MeterageButton
              isActive={cartValue}
              onClick={() => dispatch(setMeterage())}
            >
              Roll ({rollTotalCount})
            </MeterageButton>
            <SampleButton
              isActive={cartValue}
              onClick={() => dispatch(setSample())}
            >
              Sample ({sampleTotalCount})
            </SampleButton>
          </AllMeterSampleButtonWrapper>

          {cartValue == 0 ? (
            <>
              {rollTotalCount > 0 && (
                <SelectAllBoxWrapper>
                  <Checkbox
                    type="checkbox"
                    id="roll_all"
                    onChange={() => setRollAllCheck(!rollAllCheck)}
                  />
                  <Label
                    htmlFor="roll_all"
                    isChecked={rollAllCheck}
                    img={ic_check_wht.src}
                    onClick={() => rollCheckAll()}
                  />
                  Select all
                </SelectAllBoxWrapper>
              )}

              {rollList.map((el: any, index: number) => {
                return (
                  <MeterageProductWrapper key={`meter-${index}`}>
                    <CartMeterageProduct
                      el={el}
                      rollList={rollList}
                      setRollList={setRollList}
                      rollCheckArr={rollCheckArr}
                      setRollCheckArr={setRollCheckArr}
                      index={index}
                      setRollTotalCount={setRollTotalCount}
                    />
                  </MeterageProductWrapper>
                );
              })}
            </>
          ) : (
            // <>
            //   <SelectAllBoxWrapper>
            //     <Checkbox
            //       type="checkbox"
            //       id="roll_all"
            //       onChange={() => setRollAllCheck(!rollAllCheck)}
            //     />
            //     <Label
            //       htmlFor="roll_all"
            //       isChecked={rollAllCheck}
            //       img={ic_check_wht.src}
            //       onClick={() => rollCheckAll()}
            //     />
            //     Select all
            //   </SelectAllBoxWrapper>

            //   {tempResult.map((i, j) => {
            //     return (
            //       <MeterageProductWrapper key={`meter-${j}`}>
            //         <CartMeterageProduct
            //           rollCheckArr={rollCheckArr}
            //           setRollCheckArr={setRollCheckArr}
            //           order={j}
            //         />
            //       </MeterageProductWrapper>
            //     );
            //   })}
            // </>
            <>
              <SampleInfoMessage>
                <Image src={ic_info} alt={"ic_info"} />
                Samples can be ordered from 10-20 pieces.
              </SampleInfoMessage>
              {sampleTotalCount > 0 && (
                <SelectAllBoxWrapper>
                  <Checkbox
                    type="checkbox"
                    id="sample_all"
                    onChange={() => setSampleAllCheck(!sampleAllCheck)}
                  />
                  <Label
                    htmlFor="sample_all"
                    isChecked={sampleAllCheck}
                    img={ic_check_wht.src}
                    onClick={() => sampleCheckAll()}
                  />
                  Select all
                </SelectAllBoxWrapper>
              )}

              {sampleList.map((el: any, index: number) => {
                return (
                  <SampleProudctWrapper key={`sample-${index}`}>
                    <CartSampleProduct
                      el={el}
                      sampleList={sampleList}
                      setSampleList={setSampleList}
                      sampleCheckArr={sampleCheckArr}
                      setSampleCheckArr={setSampleCheckArr}
                      index={index}
                      setSampleTotalCount={setSampleTotalCount}
                    />
                  </SampleProudctWrapper>
                );
              })}
            </>
          )}
          {/** 카트에 담긴거 없을 때 */}
          <NoDataBox
            render={
              (cartValue === 0 && noRoll) || (cartValue === 1 && noSample)
            }
          >
            <NoDataImageWrapper>
              <Image
                src={ic_logo_gray}
                width={84}
                height={84}
                alt="nodata_logo_gray"
              />
            </NoDataImageWrapper>
            <NoDataText>
              There is no
              <br />
              information to display
            </NoDataText>
          </NoDataBox>
        </Main>
      </Container>
      <Line />
      <ButtonContainer>
        <RemovePurchaseButtonWrapper>
          <RemoveButton onClick={() => removeHandler()}>
            Remove({cartValue == 0 ? rollSelectCount : sampleSelectCount})
          </RemoveButton>
          <PurchaseButton onClick={() => purchaseHandler()}>
            Process to purchase(
            {cartValue == 0 ? rollSelectCount : sampleSelectCount})
          </PurchaseButton>
        </RemovePurchaseButtonWrapper>
      </ButtonContainer>
      <PopUpBox isActive={isActive}>
        <ContentBox>
          <PopUpMessage>
            Samples can be ordered from
            <br />
            <Bold>10-20</Bold> pieces.
          </PopUpMessage>
          <ButtonWrapper onClick={() => setIsActive(false)}>
            <PopUpButton>OK</PopUpButton>
          </ButtonWrapper>
        </ContentBox>
      </PopUpBox>
    </>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin: 0 auto;
  padding-top: 30px;
  max-width: 637px;
  min-height: 350px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;
const Main = styled.div`
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ImageWrapper = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    font-size: 22px;
    line-height: 26px;
    margin-left: 8px;
  }
`;
const NoDataBox = styled.div<{ render: boolean }>`
  display: ${(props) => {
    return props.render ? "block" : "none";
  }};
  padding-top: 60px;
`;
const NoDataImageWrapper = styled.div`
  width: 84px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
const NoDataText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.154px;
  color: #a4b0b2;
`;
const AllMeterSampleButtonWrapper = styled.div<{ isActive: number }>`
  display: flex;
  gap: 8px;
  margin-bottom: ${(props) => {
    return props.isActive == 1 ? "10px" : "20px";
  }};
`;
const MeterageButton = styled.button<{ isActive: number }>`
  display: block;
  padding: 0;
  width: 100%;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #121822;
  border-radius: 2px;
  box-sizing: border-box;

  font-size: 12px;
  line-height: 14px;
  color: #121822;

  font-weight: ${(props) => {
    return props.isActive == 0 ? "700" : "400";
  }};

  border: ${(props) => {
    return props.isActive == 0 ? "1px solid #121822" : "1px solid #dee8ec";
  }};
  cursor: pointer;
`;
const SampleButton = styled.button<{ isActive: number }>`
  display: block;
  padding: 0;
  width: 100%;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  color: #121822;

  font-weight: ${(props) => {
    return props.isActive == 1 ? "700" : "400";
  }};

  border: ${(props) => {
    return props.isActive == 1 ? "1px solid #121822" : "1px solid #dee8ec";
  }};

  cursor: pointer;
`;

const SelectAllBoxWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  height: 40px;
  box-sizing: border-box;
  background-color: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: #121822;
`;
const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label<{ isChecked: boolean; img: string }>`
  display: inline-block;
  margin-right: 6px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: ${(props) => {
    return props.isChecked == true ? "none" : "1px solid #dee8ec;";
  }};
  border-radius: 2.66667px;

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

const SampleInfoMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 5.5px;
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0f697c;
`;
const MeterageProductWrapper = styled.div``;
const SampleProudctWrapper = styled.div``;
const Line = styled.div`
  margin-top: 30px;
  width: 100%;
  border-bottom: 1px solid #dee8ec;
`;
const ButtonContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  @media screen and (max-width: 768px) {
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;
const RemovePurchaseButtonWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  max-width: 637px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  box-sizing: border-box;
  gap: 8px;

  padding-left: 210px;
  @media screen and (max-width: 1279px) {
    padding-left: 180px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 0px;
  }
`;
const RemoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 48px;
  background-color: #ffffff;
  border: 1px solid #dee8ec;
  border-radius: 2.99748px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    flex-shrink: 1;
    width: 30%;
    min-width: 94px;
  }
`;
const PurchaseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 279px;
  height: 48px;
  background-color: #e1ff20;
  border: 0.79402px solid #d4f01e;
  box-sizing: border-box;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 70%;
    min-width: 178px;
  }
`;

const PopUpBox = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "flex" : "none";
  }};
  z-index: 3;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ContentBox = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 320px;
  box-sizing: border-box;
  background-color: #ffffff;
`;
const PopUpMessage = styled.div`
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #121822;
`;
const Bold = styled.span`
  color: #ff5c01;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;
const PopUpButton = styled.button`
  width: 280px;
  height: 36px;
  background-color: #e1ff20;
  border: 0.79402px solid #d4f01e;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
  cursor: pointer;
`;

export default useCart;
