import React, { useEffect } from "react";
import styled from "styled-components";
import { SideBar, CartMeterageProduct, CartSampleProduct } from "../components";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back, ic_check_wht, ic_info } from "../assets";
import { goBack } from "../utils/functions";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMeterage, setSample } from "../features/login/cartSlice";
import { useRouter } from "next/router";

const useCart = () => {
  const [isActive, setIsActive] = useState(false);
  const [rollAllCheck, setRollAllCheck] = useState(false);
  const [sampleAllCheck, setSampleAllCheck] = useState(false);

  const [rollCheckArr, setRollCheckArr] = useState([false]);
  const [sampleCheckArr, setSampleCheckArr] = useState([false]);

  const { value: cartValue } = useAppSelector((state) => state.cartValue);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [rollTotalCount, setRollTotalCount] = useState(3);
  const [sampleTotalCount, setSampleTotalCount] = useState(3);

  const [rollSelectCount, setRollSelectCount] = useState(0);
  const [sampleSelectCount, setSampleSelectCount] = useState(0);

  const cartPurchaseHandler = () => {
    if (cartValue == 0) {
      router.push("/check_out");
    }
    if (cartValue == 1) {
      setIsActive(true);
    }
  };

  let tempResult = [1, 2, 3];

  /** api 콜 이후에 체크리스트 할당 */
  useEffect(() => {
    setRollCheckArr(new Array(tempResult.length).fill(false));
    setSampleCheckArr(new Array(tempResult.length).fill(false));
  }, []);

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

              {tempResult.map((i, j) => {
                return (
                  <MeterageProductWrapper key={`meter-${j}`}>
                    <CartMeterageProduct
                      rollCheckArr={rollCheckArr}
                      setRollCheckArr={setRollCheckArr}
                      order={j}
                    />
                  </MeterageProductWrapper>
                );
              })}
            </>
          ) : (
            <>
              <SampleInfoMessage>
                <Image src={ic_info} alt={"ic_info"} />
                Samples can be ordered from 10-20 pieces.
              </SampleInfoMessage>
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

              {tempResult.map((i, j) => {
                return (
                  <SampleProudctWrapper key={`sample-${j}`}>
                    <CartSampleProduct
                      sampleCheckArr={sampleCheckArr}
                      setSampleCheckArr={setSampleCheckArr}
                      order={j}
                    />
                  </SampleProudctWrapper>
                );
              })}
            </>
          )}
        </Main>
      </Container>
      <Line />
      <ButtonContainer>
        <RemovePurchaseButtonWrapper>
          <RemoveButton>
            Remove({cartValue == 0 ? rollSelectCount : sampleSelectCount})
          </RemoveButton>
          <PurchaseButton onClick={() => cartPurchaseHandler()}>
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
            <Link href="/checkout_sample" style={{ textDecoration: "none" }}>
              <PopUpButton>OK</PopUpButton>
            </Link>
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
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 767px) {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    boxsizing: border-box;
  }
`;
const Main = styled.div`
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
    font-size: 22px;
    line-height: 26px;
    margin-left: 8px;
  }
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
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 767px) {
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
