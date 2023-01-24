import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import {
  btn_favorite_act_sm,
  ic_favorite_wht,
  ic_minus,
  ic_plus,
} from "../../assets";

const useId = () => {
  const router = useRouter();
  const { id } = router.query;
  const [length, setLength] = useState<string>("1.0");

  const minus = () => {
    setLength((Number(length) - 1).toFixed(1).toString());
  };
  const plus = () => {
    setLength((Number(length) + 1).toFixed(1).toString());
  };

  useEffect(() => {
    console.log(typeof length);
  }, [length]);

  return (
    <>
      <Container>
        <ProductInfoContainer>
          <ImageVideoWrapper>
            <BigImagevideo>
              <LikeButton>
                <Image src={btn_favorite_act_sm} alt={"logo_favorite"} />
              </LikeButton>
            </BigImagevideo>
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
            <LengthWrapper>
              <LengthTitle>Length (m)</LengthTitle>
              <ButtonInputWrapper>
                <MinusButton onClick={() => minus()}>
                  <Image src={ic_minus} alt={"minus_button"} />
                </MinusButton>
                <LengthInput
                  type="number"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <PlusButton onClick={() => plus()}>
                  <Image src={ic_plus} alt={"plus_button"} />
                </PlusButton>
              </ButtonInputWrapper>
            </LengthWrapper>
            <PricePurchaseWrapper>
              <PriceWrapper>
                <Price>$ 4.06</Price>
                <Vat>EX VAT</Vat>
              </PriceWrapper>
              <PurchaseButton>Add to cart</PurchaseButton>
            </PricePurchaseWrapper>
            <RequestSample>
              Request sample /&nbsp;
              <BoldText>$ 8.38</BoldText>
            </RequestSample>
          </ProductInfoPurchaseContainer>
        </ProductInfoContainer>
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
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  max-width: 865px;
  @media screen and (max-width: 1279px) {
    display: block;
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
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
const ImageVideoWrapper = styled.div``;
const BigImagevideo = styled.div`
  position: relative;
  border: 1px solid black;
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
const LikeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: rgba(10, 68, 89, 0.2);
  border-radius: 22px;
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
  padding-bottom: 40px;

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
  color: #0a4459;
`;
const Line = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #dee8ec;
`;
const InfoWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
`;
const InfoTitle = styled.div`
  margin-right: 22.84px;
  flex-shrink: 0;
  width: 80px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.011em;

  color: #a4abba;
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
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 17.5px;
  padding-right: 17.5px;
  align-items: center;
  width: 280px;
  height: 61px;
  border: 0.79402px solid #dee8ec;
  border-radius: 1.58804px;
  box-sizing: border-box;
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
const PricePurchaseWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
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
  border: none;
  border-radius: 1.58804px;
  background-color: #0a4459;

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  text-align: center;
  letter-spacing: -0.011em;

  color: #ffffff;
`;
const RequestSample = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border: none;
  border: 0.79402px solid #8aa1aa;
  border-radius: 1.58804px;
  box-sizing: border-box;
  background-color: #ffffff;

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.011em;

  color: #0a4459;
`;
const BoldText = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
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

  color: #0a4459;
`;
const ShortLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #d7e0e3;
`;
const DeliveryReturnsInfoTitle = styled.div`
  flex-shrink: 0;
  margin-left: 15px;
  margin-right: 15px;
  width: 140px;
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
export default useId;
