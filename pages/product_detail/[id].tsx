import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import {
  btn_favorite_act_sm,
  btn_favorite_inact_sm,
  btn_review,
  ic_check_web_color,
  ic_favorite_wht,
  ic_info,
  ic_minus,
  ic_plus,
} from "../../assets";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setMeterage, setSample } from "../../features/login/cartSlice";
import { productDetailRequest } from "../../utils/api";
import { VideoPlayer } from "../../components";

const useId = () => {
  const [popUpIsActive, setPopUpIsActive] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const [length, setLength] = useState<string>("1");
  const { value: cartValue } = useAppSelector((state) => state.cartValue);

  const [videoUrl, setVideoUrl] = useState("");

  //////// 개발용 임시 데이터, 코드

  const colorList = ["emerald", "green", "red"];
  const [colorCheckedList, setColorCheckedList] = useState([
    true,
    false,
    false,
  ]);

  const [productClicked, setProductClicked] = useState([
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [price, setPrice] = useState(10);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [colorCheckedList]);

  useEffect(() => {
    setPrice(Number(count) * 10);
  }, [count]);

  const checkHandler = (order: number) => {
    let temp = colorCheckedList;
    temp.forEach((i, j) => {
      if (i == true) {
        temp[j] = false;
      }
    });
    temp[order] = true;
    setColorCheckedList([...temp]);
  };

  const clickHandler = (order: number) => {
    let temp = productClicked;
    if (order >= 0 && order <= 1) {
      for (let i = 0; i <= 1; i++) {
        temp[i] = false;
      }
    }
    if (order >= 2 && order <= 5) {
      for (let i = 2; i <= 5; i++) {
        temp[i] = false;
      }
    }
    if (order >= 6 && order <= 11) {
      for (let i = 6; i <= 11; i++) {
        temp[i] = false;
      }
    }
    temp[order] = true;
    setProductClicked([...temp]);
  };

  ////////

  const dispatch = useAppDispatch();
  const cartStateHandler = () => {
    if (popUpIsActive == 1) {
      dispatch(setMeterage());
    }
    if (popUpIsActive == 2) {
      dispatch(setSample());
    }
  };

  const minus = () => {
    if (count == 1) {
      return;
    }
    setCount(count - 1);
  };
  const plus = () => {
    setCount(count + 1);
  };

  const productDetailRequestHandler = (productNo: string | undefined) => {
    productDetailRequest(productNo).then((res) => {
      console.log(res.data.result.files);
      setVideoUrl(res.data.result.files[1].resourceUrl);
    });
  };

  const continueShoppingHandler = () => {
    setPopUpIsActive(0);
    setCount(1);
  };

  useEffect(() => {
    let productNo = window.location.href.split("/").pop();
    // productDetailRequestHandler(productNo);
  }, []);

  // useEffect(() => {
  //   console.log(videoUrl);
  // }, [videoUrl]);

  return (
    <>
      <Container>
        <ProductInfoContainer>
          <ImageVideoWrapper>
            <BigImagevideoWrapper>
              {/* <VideoPlayer isActive={true} url={videoUrl} state={videoUrl} /> */}
              <LikeButton>
                <Image src={btn_favorite_inact_sm} alt={"logo_favorite"} />
              </LikeButton>
            </BigImagevideoWrapper>
            <SmallImageVideoWrapper>
              <SmallImageVideo />
              <SmallImageVideo />
              <SmallImageVideo />
              <SmallImageVideo />
              <SmallImageVideo />
            </SmallImageVideoWrapper>
          </ImageVideoWrapper>
          <ProductInfoPurchaseContainer>
            <Title>Leopard Viscose Crepe-Rose</Title>
            <Line />
            <InfoWrapper>
              <InfoTitle>Composition</InfoTitle>
              <InfoContent>
                <RatioWrapper>
                  <Ratio>EL 9%</Ratio>
                  <Ratio>PA 94%</Ratio>
                </RatioWrapper>
              </InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Certification</InfoTitle>
              <InfoContent>Repp verifyed</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Available</InfoTitle>
              <InfoContent>155.00m</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Supplies</InfoTitle>
              <InfoContent>Patterns</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Project</InfoTitle>
              <InfoContent>Patterns</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Color</InfoTitle>
              <InfoContent>Red</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Design</InfoTitle>
              <InfoContent>Check</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Width</InfoTitle>
              <InfoContent>36 inches / 90cm</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Weight</InfoTitle>
              <InfoContent>36 inches / 90cm</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Yarn</InfoTitle>
              <InfoContent>36 inches / 90cm</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Descripttion</InfoTitle>
              <InfoDescription>
                Aruba 93 Azure Blue Stripe Cotton & Linen FabricAruba 93 Azure
                Blue Stripe Cotton & Linen FabricAruba 93 Azure Blue Stripe
                Cotton & Linen Fabric
              </InfoDescription>
            </InfoWrapper>
          </ProductInfoPurchaseContainer>
        </ProductInfoContainer>
        <PurchaseContainer>
          <PurchaseBox>
            <ColorWrapper>
              {colorList.map((i, j) => {
                return (
                  <ColorBox
                    isChecked={colorCheckedList[j]}
                    onClick={() => checkHandler(j)}
                  >
                    <ColorCircle color={i}>
                      <CheckImageWrapper isChecked={colorCheckedList[j]}>
                        <Image
                          src={ic_check_web_color}
                          alt="ic_check_web_color"
                        ></Image>
                      </CheckImageWrapper>
                    </ColorCircle>
                  </ColorBox>
                );
              })}
            </ColorWrapper>
            <ProductWrapper>
              <Product
                isRender={colorCheckedList[0]}
                isActive={productClicked[0]}
                onClick={() => clickHandler(0)}
              >
                <ColorName>Emerald</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[0]}
                isActive={productClicked[1]}
                onClick={() => clickHandler(1)}
              >
                <ColorName>Emerald</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[1]}
                isActive={productClicked[2]}
                onClick={() => clickHandler(2)}
              >
                <ColorName>Green</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[1]}
                isActive={productClicked[3]}
                onClick={() => clickHandler(3)}
              >
                <ColorName>Green</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>{" "}
              <Product
                isRender={colorCheckedList[1]}
                isActive={productClicked[4]}
                onClick={() => clickHandler(4)}
              >
                <ColorName>Green</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[1]}
                isActive={productClicked[5]}
                onClick={() => clickHandler(5)}
              >
                <ColorName>Green</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[2]}
                isActive={productClicked[6]}
                onClick={() => clickHandler(6)}
              >
                <ColorName>Red</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[2]}
                isActive={productClicked[7]}
                onClick={() => clickHandler(7)}
              >
                <ColorName>Red</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[2]}
                isActive={productClicked[8]}
                onClick={() => clickHandler(8)}
              >
                <ColorName>Red</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[2]}
                isActive={productClicked[9]}
                onClick={() => clickHandler(9)}
              >
                <ColorName>Red</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[2]}
                isActive={productClicked[10]}
                onClick={() => clickHandler(10)}
              >
                <ColorName>Red</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
              <Product
                isRender={colorCheckedList[2]}
                isActive={productClicked[11]}
                onClick={() => clickHandler(11)}
              >
                <ColorName>Red</ColorName>
                <MiniCircle />
                <LengthText>20cm*20cm</LengthText>
                <UnitText>(W*L)</UnitText>
              </Product>
            </ProductWrapper>
            <AvailableText>20 Available</AvailableText>
            <LengthWrapper>
              <ButtonInputWrapper>
                <MinusButton onClick={() => minus()}>
                  <Image src={ic_minus} alt={"minus_button"} />
                </MinusButton>
                <LengthInput
                  type="number"
                  step="1"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                />
                <PlusButton onClick={() => plus()}>
                  <Image src={ic_plus} alt={"plus_button"} />
                </PlusButton>
              </ButtonInputWrapper>
              <ProductPriceWrapper>
                <ProductUnit>1 Qty 20 m</ProductUnit>
                <ProductPrice>$ {price}</ProductPrice>
              </ProductPriceWrapper>
            </LengthWrapper>
            <PricePurchaseWrapper>
              <PurchaseButton onClick={() => setPopUpIsActive(1)}>
                Add to cart
              </PurchaseButton>
            </PricePurchaseWrapper>
            <RequestSample onClick={() => setPopUpIsActive(2)}>
              Request sample(Add to cart)&nbsp;
              <BoldText>$ 8.38(-30%)</BoldText>
            </RequestSample>
            <DiscountMessage>-30% Open Promotion Due to ‘23.10</DiscountMessage>
            <SmapleMessage>
              <Image src={ic_info} alt={"ic_info"} />
              Samples can be ordered from 10-20 pieces.
            </SmapleMessage>
          </PurchaseBox>
        </PurchaseContainer>
        <DeliveryReturnsInfoTitleWrapper>
          <ShortLine />
          <DeliveryReturnsInfoTitle>
            Deleivery & Returns
          </DeliveryReturnsInfoTitle>
          <ShortLine />
        </DeliveryReturnsInfoTitleWrapper>
        <DeliveryReturnsInfoText>
          <TextTitle>Shipping:</TextTitle>
          <Text>
            Shipping costs depend on weight so you can get an accurate shipping
            quote from the basket page once you have made your selection. As
            soon as your order is confirmed and we’ve received your payment your
            order will be processed immediately and shipped. All UK shipments
            are sent on a next day delivery service. if you are unlikely to be
            in you can put down a secure location for us to leave the parcel in
            the comments stage in the check out process. International shipments
            are normally sent by courier however in some regions we offer a
            International recorded mail option. International shipments by
            courier will take 2-3 days while shipments sent by International
            recorded mail will take 10-15 days. If you have a specific delivery
            requirement please place your order by e-mail or phone e.g. arrange
            your own shipping.
            <br />
            <br />
          </Text>
          <TextTitle>Returns:</TextTitle>
          <Text>
            If you have ordered the wrong fabric or you don’t need the item
            anymore please feel free to return the fabric and we will credit the
            value back onto your card straight away.
          </Text>
        </DeliveryReturnsInfoText>
      </Container>
      <PopUpBox isActive={popUpIsActive}>
        <ContentBox>
          <PopUpTitle>Added to cart</PopUpTitle>
          <PopUpMessage>
            Would you like to view cart to purchase or
            <br />
            continue shopping?
          </PopUpMessage>
          <ButtonWrapper onClick={() => cartStateHandler()}>
            <Link href="/cart" style={{ textDecoration: "none" }}>
              <PopUpButton>View cart</PopUpButton>
            </Link>
            <PopUpButton onClick={() => continueShoppingHandler()}>
              Continue shopping
            </PopUpButton>
          </ButtonWrapper>
        </ContentBox>
      </PopUpBox>
    </>
  );
};
const Container = styled.div`
  margin: 0 auto;
  padding-top: 40px;
  max-width: 865px;
  @media screen and (max-width: 1279px) {
    display: block;
    padding-top: 20px;
    padding-left: 74px;
    padding-right: 74px;
  }
  @media screen and (max-width: 767px) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;
const ProductInfoContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  @media screen and (max-width: 1279px) {
    margin-bottom: 16px;
  }
  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 43px;
  }
`;
const ImageVideoWrapper = styled.div``;
const BigImagevideoWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  &::after {
    display: block;
    content: "";
    padding-bottom: 250px;
    @media screen and (max-width: 767px) {
      padding-bottom: 100%;
    }
  }
`;
const BigVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const BigImage = styled.div``;
const LikeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: rgba(10, 68, 89, 0.2);
  border-radius: 22px;

  cursor: pointer;
`;
const SmallImageVideoWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 320px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const SmallImageVideo = styled.div`
  width: 68px;
  @media screen and (max-width: 767px) {
    width: 21vw;
  }
  border: 1px solid black;
  box-sizing: border-box;

  position: relative;
  &::after {
    display: block;
    content: "";
    padding-bottom: 68px;
    @media screen and (max-width: 767px) {
      padding-bottom: 100%;
    }
  }
`;
const ProductInfoPurchaseContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 767px) {
    padding-top: 20px;
  }
`;
const Title = styled.div`
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 22px;
  line-height: 29px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const Line = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #dee8ec;
`;
const InfoWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  &:nth-of-type(13) {
    margin-bottom: 0px;
  }
`;
const InfoTitle = styled.div`
  margin-right: 22.84px;
  flex-shrink: 0;
  width: 80px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.011em;

  color: #a4b0b3;
`;
const InfoContent = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  letter-spacing: -0.011em;

  color: #333333;
`;
const InfoDescription = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  letter-spacing: -0.011em;

  color: #333333;
`;
const PurchaseContainer = styled.div`
  padding-left: 340px;
  margin-bottom: 40px;
  @media screen and (max-width: 1279px) {
    padding-left: 0px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const PurchaseBox = styled.div`
  padding: 20px;
  border: 1px solid #dee8ec;
`;
const ColorWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  border-bottom: 1px solid #dee8ec;
  box-sizing: border-box;
  height: 55px;
`;
const ColorBox = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  ${(props) => {
    switch (props.isChecked) {
      case true:
        return `border: 1px solid #dee8ec;
        border-bottom: 1px solid #FFFFFF;`;
      case false:
        return `
          border: none;
        `;
    }
  }};
  box-sizing: border-box;
  cursor: pointer;
`;
const ColorCircle = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: ${(props) => {
    switch (props.color) {
      case "emerald":
        return "#1B8F9F";
      case "green":
        return "#46ca43";
      case "red":
        return "#EC3939";
    }
  }};
`;
const CheckImageWrapper = styled.div<{ isChecked: boolean }>`
  display: ${(props) => {
    return props.isChecked ? "block" : "none";
  }};
`;
const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;
const Product = styled.div<{ isRender: boolean; isActive: boolean }>`
  display: ${(props) => {
    return props.isRender ? "flex" : "none";
  }};
  align-items: center;
  padding: 10px;
  border: ${(props) => {
    return props.isActive ? "1px solid #536c6d" : "1px solid #DEE8EC";
  }};
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
  color: #121822;
  cursor: pointer;
`;
const ColorName = styled.div``;
const MiniCircle = styled.div`
  margin-right: 4px;
  margin-left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #dee8ec;
`;
const LengthText = styled.div``;
const UnitText = styled.div`
  color: #536c6d;
`;
const AvailableText = styled.div`
  margin-bottom: 20px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
`;
const RatioWrapper = styled.div`
  display: flex;
`;
const Ratio = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
  padding-left: 4px;
  padding-right: 4px;
  height: 15px;

  background-color: #fdfbf9;

  border: 0.5px solid #b8a687;
  border-radius: 2px;

  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  color: #b8a687;
`;
const LengthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    display: block;
    height: auto;
    margin-bottom: 16px;
  }
`;
const LengthTitle = styled.div`
  margin-right: 36.5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  letter-spacing: -0.011em;

  color: #000000;
`;
const ButtonInputWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    margin-bottom: 16px;
  }
`;
const MinusButton = styled.button`
  display: flex;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 100%;
  background-color: #f2f6f8;

  cursor: pointer;
`;
const LengthInput = styled.input`
  margin-right: 8px;
  width: 70px;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  text-align: center;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 100%;
  background-color: #f2f6f8;

  cursor: pointer;
`;
const ProductPriceWrapper = styled.div`
  display: flex;
  gap: 11.48px;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
const ProductUnit = styled.div`
  display: flex;
  align-items: end;
  color: #536c6d;
  font-size: 12px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.132px;
  @media screen and (max-width: 767px) {
    display: block;
    text-align: center;
  }
`;
const ProductPrice = styled.div`
  color: #121822;
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.308px;
  @media screen and (max-width: 767px) {
    text-align: center;
  }
`;
const PricePurchaseWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  height: 48px;
`;
const PriceWrapper = styled.div`
  width: 107px;
`;
const Price = styled.div`
  width: 56px;
  height: 26px;

  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.011em;

  color: #ff5c01;
`;
const Vat = styled.div`
  font-weight: 400;
  font-size: 9.52824px;
  line-height: 12px;

  letter-spacing: -0.011em;

  color: #000000;
`;
const PurchaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0.79402px solid #dee8ec;
  border-radius: 1.58804px;
  background-color: #f2f6f8;

  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.011em;

  color: #121822;
  cursor: pointer;
`;
const RequestSample = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px;
  width: 100%;
  height: 48px;
  border: none;
  border: 0.79402px solid #536c6d;
  border-radius: 1.58804px;
  box-sizing: border-box;
  background-color: #ffffff;

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.011em;

  color: #121822;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
const BoldText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ff2f01;
`;
const DiscountMessage = styled.div`
  margin-left: 8px;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #ff2f01;
`;
const SmapleMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 5.5px;
  margin-left: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0f697c;
`;

const DeliveryReturnsInfoTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justfiy-content: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;

  letter-spacing: -0.011em;

  color: #121822;
`;
const ShortLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #d7e0e3;
`;
const DeliveryReturnsInfoTitle = styled.div`
  flex-shrink: 0;
  margin-left: 15px;
  margin-right: 15px;
  width: 208px;

  font-weight: 700;
  font-size: 24px;
  line-height: 43px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const DeliveryReturnsInfoText = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
`;
const TextTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 22px;

  letter-spacing: -0.011em;

  color: #000000;
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;

  letter-spacing: -0.011em;

  color: #000000;
`;

const PopUpBox = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 0 ? "none" : "flex";
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
  padding-bottom: 32px;
  width: 320px;
  height: 204px;
  box-sizing: border-box;
  background-color: #ffffff;
`;
const PopUpTitle = styled.div`
  margin-bottom: 9px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #121822;
`;
const PopUpMessage = styled.div`
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  text-align: center;
  color: #536c6d;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;
const PopUpButton = styled.button`
  width: 263.25px;
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
export default useId;
