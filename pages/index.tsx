import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import {
  arrowShop,
  cube,
  home_repunch_image,
  logo,
  logo_lime,
  nature_image,
  solution_image,
  square,
} from "../assets";
import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import { productsRequest } from "../utils/api";
import Product from "../components/Product";

export default function Home() {
  const [scroll, setScroll] = useState(0); // 스크롤 값
  const [windowY, setWindowY] = useState(0);
  const [productList, setProductList] = useState<any>();
  const [observe1, setObserve1] = useState(false);
  const [observe2, setObserve2] = useState(false);
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();

  /** 스크롤값 세팅 */
  const scrollHandler = () => {
    setScroll(window.scrollY);
    setWindowY(window.innerHeight);
    console.log(window.scrollY);
    console.log(window.innerHeight);
    console.log(window.scrollY / window.innerHeight);
    // console.log(window.scrollY - window.innerHeight * 7);
  };

  /** 스크롤 감지 */
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  /** 상품 리스트 호출 및 세팅 */
  useEffect(() => {
    productsRequest(
      null,
      "LATEST",
      3,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ).then((res?) => {
      const data = res?.data.result.data;
      setProductList([...data]);
    });
  }, []);

  /** 감지기1 */
  useEffect(() => {
    const observer1 = new IntersectionObserver(([{ isIntersecting }]) => {
      isIntersecting ? setObserve1(true) : setObserve1(false);
    });
    observer1.observe(ref1.current);
    return () => {
      observer1.disconnect();
    };
  }, []);
  /** 감지기2 */
  useEffect(() => {
    const observer2 = new IntersectionObserver(([{ isIntersecting }]) => {
      isIntersecting ? setObserve2(true) : setObserve2(false);
    });
    observer2.observe(ref2.current);
    return () => {
      observer2.disconnect();
    };
  }, []);

  return (
    <Container>
      <Head>
        <title>Repunch-dev</title>
        <meta name="description" content="repunch 웹개발 테스트 사이트" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/** 1씬 */}
      <SceneContainer1>
        <ImageWrapper scroll={scroll}>
          <Image src={home_repunch_image} width={381} height={38.1} />
        </ImageWrapper>
        <SceneContainer>
          <Scene1>
            <BigText1>
              We are more than
              <br />
              just a textile
              <br />
              marketplace.
            </BigText1>
            <MiddleText1>
              What sets us apart is our commitment to sustainability.
              <br />
              We specialize in clothing fabrics, offering a diverse
              <br />
              range of materials to meet your needs.
            </MiddleText1>
          </Scene1>
        </SceneContainer>
        {/** 2씬 */}
        <SceneContainer>
          <Scene2>
            <BigText2>
              Enviromental
              <br />
              Responsibility
            </BigText2>
            <MiddleText2>
              What sets us apart is our commitment to sustainability.
              <br />
              We specialize in clothing fabrics, offering a diverse
              <br />
              range of materials to meet your needs.
            </MiddleText2>
          </Scene2>
        </SceneContainer>
      </SceneContainer1>
      {/** 3씬 */}
      <SceneContainer>
        <Scene3>
          <FlexWrapper>
            <TextWrapper>
              <BigText3>
                +370,000t
                <br />/ year
              </BigText3>
              <MiddleText3>
                Clothing waste is thrown
                <br />
                away every year.
              </MiddleText3>
            </TextWrapper>
            <TextWrapper>
              <BigText3>
                200
                <br />
                year
              </BigText3>
              <MiddleText3>
                Time taken for fiber
                <br />
                decomposition
              </MiddleText3>
            </TextWrapper>
            <TextWrapper>
              <BigText3>
                1.5°C
                <br />
                /year
              </BigText3>
              <MiddleText3>
                Increase in typhoons due to
                <br />
                rising global temperature
              </MiddleText3>
            </TextWrapper>
          </FlexWrapper>
        </Scene3>
        <NatureCircle observe={observe1} ref={ref1}>
          <Image
            src={nature_image}
            width={236}
            height={236}
            alt="nature_image"
          />
        </NatureCircle>
        {/* <GrayCircle /> */}
        <LimeCircle observe={observe2} ref={ref2} />
      </SceneContainer>
      {/** 4씬 */}
      <SceneContainer>
        <Scene4>
          <BigText4>
            Our
            <br />
            solution
          </BigText4>
          <MiddleText4>
            What sets us apart is our commitment
            <br />
            to sustainability.
          </MiddleText4>
          <InfoContainer>
            <InfoWrapper>
              <IconWrapper>
                <Image src={cube} width={16.54} height={18.45} alt="cube" />
              </IconWrapper>
              <SmallText>
                We stock up on as much recyclable fabric as possible.
              </SmallText>
            </InfoWrapper>
            <InfoWrapper>
              <IconWrapper>
                <Image src={square} width={21.2} height={21.2} alt="square" />
              </IconWrapper>
              <SmallText>We provide you with access to old fabrics.</SmallText>
            </InfoWrapper>
            <InfoWrapper>
              <IconWrapper>
                <Image src={cube} width={16.54} height={18.45} alt="cube" />
              </IconWrapper>
              <SmallText>We create new products from old fabrics.</SmallText>
            </InfoWrapper>
          </InfoContainer>
          <SolutionImageWrapperDesk src={solution_image.src} />

          <SolutionImageWrapperMobile src={solution_image.src} />
        </Scene4>
      </SceneContainer>
      {/** 5씬 */}
      <SceneContainer5>
        <Scene5>
          <BigText5>
            10,000+
            <br />
            Products
          </BigText5>
          <MiddleText5>
            What sets us apart is our commitment
            <br />
            to sustainability.
          </MiddleText5>
          {/** 여기에 상품 목록 */}
          <ProductWrapperDesk>
            {productList &&
              productList.map((el: any, index: number) => {
                return (
                  <Product
                    product={el}
                    setColorNo={0}
                    key={`asdf-=9${index}`}
                  />
                );
              })}
          </ProductWrapperDesk>
          <ProductWrapperMobile>
            {productList &&
              productList.map((el: any, index: number) => {
                return index !== 2 ? (
                  <Product
                    product={el}
                    setColorNo={0}
                    key={`asdf-=9${index}`}
                  />
                ) : (
                  ""
                );
              })}
          </ProductWrapperMobile>
          <ShopButtonWrapper>
            <ShopButton>
              <ShopIconWrapper>
                <Image src={arrowShop} width={18} height={13} />
              </ShopIconWrapper>
              <ShopText>Shop Products</ShopText>
            </ShopButton>
          </ShopButtonWrapper>
        </Scene5>
        <LogoImageWrapperDesk scroll={scroll} windowY={windowY}>
          <Image src={logo_lime} width={733.134} height={966.418} />
        </LogoImageWrapperDesk>
        <LogoImageWrapperMobile scroll={scroll}>
          <Image src={logo_lime} width={386.567} height={483.209} />
        </LogoImageWrapperMobile>
      </SceneContainer5>
      {/** 6씬 */}
      <SceneContainer>
        <Scene6>
          <BigText6>
            On-line
            <br />
            meeting request
          </BigText6>

          <MiddleText6>
            We will contact you to schedule
            <br />
            an online meeting whenever possible.
          </MiddleText6>
          <FlexWrapper6>
            <Number>1</Number>
            <TextWrapper6>
              <MiddleText6_1>Inquary</MiddleText6_1>
              <SmallText2>
                Please let us know what you are curious about, such
                <br />
                as production, fabric swatches, etc.
              </SmallText2>
            </TextWrapper6>
          </FlexWrapper6>
          <FlexWrapper6>
            <Number>2</Number>
            <TextWrapper6>
              <MiddleText6_1>Business industry and detail</MiddleText6_1>
              <SmallText2>
                If you tell us about your business, we can prepare in
                <br />
                advance and provide you with detailed information.
              </SmallText2>
            </TextWrapper6>
          </FlexWrapper6>
          <FlexWrapper6>
            <Number>3</Number>
            <TextWrapper6>
              <MiddleText6_1>Arrange meeting</MiddleText6_1>
              <SmallText2>
                please let us know the date and time when the
                <br />
                meeting can be held online and we will contact you.
              </SmallText2>
            </TextWrapper6>
          </FlexWrapper6>
        </Scene6>
      </SceneContainer>
    </Container>
  );
}

const Container = styled.div`
  color: #121822;
  background-color: #fafafa;
`;
const SceneContainer1 = styled.div`
  contain: paint;
  height: 800vh;
`;
const SceneContainer = styled.div`
  contain: paint;
  position: relative;
  margin-bottom: 100vh;
  height: 300vh;
  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 20vh;
  }
`;
const SceneContainer5 = styled.div`
  contain: paint;
  position: relative;
  margin-bottom: 100vh;
  height: 300vh;
  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 20vh;
  }
`;
const Scene1 = styled.div`
  position: sticky;
  top: 154px;
`;
const Scene2 = styled.div`
  position: sticky;
  top: 199px;
`;
const Scene3 = styled.div`
  position: sticky;
  top: 50%;
  transform: translate(0, -10%);
  @media screen and (max-width: 768px) {
    top: 50%;
    transform: translate(0, -50%);
  }
`;
const Scene4 = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
`;
const Scene5 = styled.div`
  position: sticky;
  top: 124px;
  @media screen and (max-width: 768px) {
    top: 101px;
  }
`;
const Scene6 = styled.div`
  position: sticky;
  top: 154px;
`;
const ImageWrapper = styled.div<{ scroll: number }>`
  position: sticky;
  top: 352px;
  width: 381px;
  height: 38.1px;
  transform-origin: top left;
  transition: all 1s;
  transform: ${(props) => {
    return `translateX(calc(100vw - ${props.scroll / 25}vw)) rotate(-30deg)`;
  }};
`;
const FlexWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const TextWrapper = styled.div`
  @media screen and (max-width: 768px) {
    margin-bottom: 26px;
  }
`;
const BigText1 = styled.div`
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  padding-left: 63px;
  margin-bottom: 26px;
  @media screen and (max-width: 768px) {
    padding-left: 41px;
    margin-bottom: 20px;
  }
`;
const BigText2 = styled.div`
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  padding-left: 63px;
  margin-bottom: 26px;
  @media screen and (max-width: 768px) {
    padding-left: 41px;
    margin-bottom: 20px;
  }
`;
const BigText3 = styled.div`
  text-align: center;
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  margin-bottom: 14px;
  @media screen and (max-width: 768px) {
    margin-bottom: 6px;
  }
`;
const BigText4 = styled.div`
  z-index: 1;
  padding-top: 108px;
  font-family: "Kaiti TC";
  font-size: 47.866px;
  font-weight: 400;
  line-height: 47.866px;
  margin-bottom: 13px;
  padding-left: 54px;
  @media screen and (max-width: 768px) {
    margin-top: 101px;
    margin-bottom: 12px;
    padding-left: 25px;
    font-size: 25.898px;
    line-height: 25.898px;
  }
`;
const BigText5 = styled.div`
  margin-bottom: 8px;
  padding-left: 54px;
  font-family: "Kaiti TC";
  font-size: 47.866px;
  font-weight: 400;
  line-height: 47.866px;
  @media screen and (max-width: 768px) {
    padding-left: 25px;
    margin-bottom: 2px;
    font-size: 25.898px;
    line-height: 20.718px;
  }
`;
const BigText6 = styled.div`
  font-family: "Kaiti TC";
  font-size: 47.866px;
  font-weight: 400;
  line-height: 38.293px;
  margin-bottom: 13px;
  padding-left: 54px;
  @media screen and (max-width: 768px) {
    padding-left: 25px;
    font-size: 25.898px;
    font-weight: 400;
    line-height: 25.898px;
    margin-bottom: 2px;
  }
`;
const MiddleText1 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;
  padding-left: 63px;
  @media screen and (max-width: 768px) {
    padding-left: 40px;
  }
`;
const MiddleText2 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;
  padding-left: 63px;
  @media screen and (max-width: 768px) {
    padding-left: 40px;
  }
`;
// const MiddleText2 = styled.div`
//   color: #000000; // 이거 의도한 색깔 ?
//   font-family: Inter;
//   font-size: 10px;
//   font-weight: 400;
//   @media screen and (max-width: 768px) {
//     padding-left: 40px;
//   }
// `;
const MiddleText3 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  @media screen and (max-width: 768px) {
    margin-bottom: 29px;
  }
`;
const MiddleText4 = styled.div`
  z-index: 1;
  font-family: Inter;
  font-size: 15.955px;
  font-weight: 400;
  padding-left: 54px;
  margin-bottom: 28px;
  @media screen and (max-width: 768px) {
    margin-bottom: 30px;
    padding-left: 25px;
    font-size: 8.633px;
  }
`;
const MiddleText5 = styled.div`
  font-family: Inter;
  font-size: 15.955px;
  font-weight: 400;
  margin-bottom: 54px;
  padding-left: 54px;
  @media screen and (max-width: 768px) {
    font-size: 8.633px;
    padding-left: 25px;
    margin-bottom: 30px;
  }
`;
const MiddleText6 = styled.div`
  font-family: Inter;
  font-size: 15.955px;
  font-weight: 400;
  margin-bottom: 60px;
  padding-left: 54px;
  @media screen and (max-width: 768px) {
    padding-left: 25px;
    font-size: 8.633px;
    font-weight: 400;
    margin-bottom: 44px;
  }
`;
const MiddleText6_1 = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 6px;
  @media screen and (max-width: 768px) {
    margin-bottom: 4px;
    color: #000;
    font-family: Inter;
    font-size: 10px;
  }
`;

const InfoContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 338px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  margin-left: 54px;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-left: 25px;
    margin-right: 25px;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
  padding-top: 11px;
  padding-bottom: 11px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`;
const IconWrapper = styled.div`
  margin-left: 4px;
  display: flex;
  width: 21.2px;
  height: 21.2px;
  align-items: center;
  justify-content: center;
`;

const SmallText = styled.div`
  font-family: Inter;
  font-size: 11.179px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 8.633px;
    line-height: 20.718px;
  }
`;
const SmallText2 = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 8px;
    font-weight: 400;
  }
`;

const ProductWrapperDesk = styled.div`
  width: 578px;
  margin-bottom: 40px;
  margin-left: 54px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 4px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const ProductWrapperMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: grid;
    margin-left: 25px;
    margin-right: 25px;
    margin-bottom: 22px;
    grid-template-columns: 1fr 1fr;
    column-gap: 4px;
  }
`;
const ShopButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  width: 578px;
  margin-left: 54px;
  @media screen and (max-width: 768px) {
    width: auto;
    margin-left: 25px;
    margin-right: 25px;
  }
`;
const ShopButton = styled.div`
  display: flex;
  align-items: center;
  gap: 16.5px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    gap: 11px;
  }
`;
const ShopIconWrapper = styled.div``;
const ShopText = styled.div`
  font-family: Inter;
  font-size: 16.769px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-family: Inter;
    font-size: 11.179px;
  }
`;
const FlexWrapper6 = styled.div`
  display: flex;
  gap: 18px;
  margin-left: 54px;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
    margin-left: 25px;
    gap: 12px;
    margin-bottom: 20px;
  }
`;
const TextWrapper6 = styled.div``;
const Number = styled.div`
  font-family: Inter;
  font-size: 21px;
  font-weight: 400;
  border-radius: 100%;
  background-color: #e1ff20;
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 26px;
    height: 26px;
    font-size: 14px;
    font-weight: 400;
  }
`;
const NatureCircle = styled.div<{ observe: boolean }>`
  z-index: 1;
  position: sticky;
  width: 236px;
  height: 236px;
  border-radius: 100%;
  overflow: hidden;
  transform: translateX(-73px);
  transition: all 4s;

  top: ${(props) => {
    return props.observe ? `0px` : `500px`;
  }};

  @media screen and (max-width: 768px) {
    width: 118px;
    height: 118px;
    transform: translateX(-25px);
  }
`;
const GrayCircle = styled.div`
  position: sticky;

  top: 150px;
  width: 236px;
  height: 236px;
  border-radius: 100%;
  background-color: #dee8ec;
  transform: translateX(-73px);
  @media screen and (max-width: 768px) {
    width: 118px;
    height: 118px;
    transform: translateX(-25px);
  }
`;
const LimeCircle = styled.div<{ observe: boolean }>`
  position: sticky;
  left: 100%;
  width: 236px;
  height: 236px;
  border-radius: 100%;
  background-color: #e1ff20;
  transform: translateX(10px);
  transition: all 4s;

  top: ${(props) => {
    return props.observe ? `300px` : `500px`;
  }};
  @media screen and (max-width: 768px) {
    width: 118px;
    height: 118px;
    transform: translateX(40px);
  }
`;

const SolutionImageWrapperDesk = styled.div<{ src: string }>`
  position: absolute;
  width: 917px;
  height: 209.022px;
  transform-origin: top left;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  transform: translate(125px, 210px) rotate(-30deg);

  background-image: ${(props) => {
    return `url(${props.src})`;
  }};
  background-size: 100%;
  background-position: 0% 42%;
  background-repeat: no-repeat;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const SolutionImageWrapperMobile = styled.div<{ src: string }>`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    width: 458px;
    height: 104.511px;
    transform-origin: top left;

    overflow: hidden;
    transform: translate(123px, 220px) rotate(-30deg);

    background-image: ${(props) => {
      return `url(${props.src})`;
    }};
    background-size: 100%;
    background-position: 0% 42%;
    background-repeat: no-repeat;
  }
`;
const LogoImageWrapperDesk = styled.div<{ scroll: number; windowY: number }>`
  position: sticky;
  width: 733px;
  height: 966px;
  top: 0px;
  transform-origin: top left;
  transform: ${(props) => {
    return `translateY(-330px) translateX(calc(100vw - ${
      (props.scroll - props.windowY * 14.1) / 25
    }vw)) rotate(-30deg)`;
  }};
`;
const LogoImageWrapperMobile = styled.div<{ scroll: number }>`
  display: none;
`;
