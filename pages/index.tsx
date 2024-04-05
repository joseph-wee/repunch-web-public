import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import {
  aperture,
  arrowShop,
  cube,
  home_repunch_image,
  logo,
  logoWhite,
  logo_lime,
  nature_image,
  nature_large,
  solution_image,
  square,
  swatch,
} from "../assets";
import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import { productsRequest } from "../utils/api";
import Product from "../components/Product";

export default function Home() {
  const [scroll, setScroll] = useState(0); // 스크롤 값
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [productList, setProductList] = useState<any>();
  const [observe1, setObserve1] = useState(false);
  const [observe2, setObserve2] = useState(false);
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();

  const [natureCirceY, setNatureCircleY] = useState<number | undefined>(0); // nature circle y좌표
  const [limeCircleY, setLimeCircleY] = useState<number | undefined>(0); // lime circle y좌표
  const [swatchY, setSwatchY] = useState<any>(0); // lime circle y좌표

  /** 스크롤값 세팅 */
  const scrollHandler = () => {
    setScroll(window.scrollY);
    setX(window.innerWidth);
    setY(window.innerHeight);
    // console.log(window.scrollY);
    // console.log(window.innerHeight);
    // console.log(window.scrollY / window.innerHeight);
    // console.log(window.scrollY - window.innerHeight * 7);
  };

  /** 스크롤 감지 */
  useEffect(() => {
    setNatureCircleY(
      document.getElementById("natureCircle")?.getBoundingClientRect().top
    );
    setLimeCircleY(
      document.getElementById("limeCircle")?.getBoundingClientRect().top
    );
    setSwatchY(document.getElementById("swatch")?.getBoundingClientRect().top);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    console.log(scroll - swatchY);
    console.log(x);
    console.log(y);
    console.log(scroll - swatchY - x + y);
    console.log(document.body.clientHeight);
    // console.log(
    //   (Math.abs(scroll - document.body.clientHeight) / x / y) * 10000
    // );
  }, [scroll]);

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
    const observer1 = new IntersectionObserver(([{ intersectionRatio }]) => {
      // console.log(intersectionRatio);
    });
    observer1.observe(ref1.current);
    return () => {
      observer1.disconnect();
    };
  }, [scroll]);
  // /** 감지기2 */
  // useEffect(() => {
  //   const observer2 = new IntersectionObserver(([{ isIntersecting }]) => {
  //     isIntersecting ? setObserve2(true) : setObserve2(false);
  //   });
  //   observer2.observe(ref2.current);
  //   return () => {
  //     observer2.disconnect();
  //   };
  // }, []);

  return (
    <>
      <Container>
        {/** 1씬 */}

        <BigText1>
          We are more than
          <br />
          just a textile
          <br />
          marketplace.
        </BigText1>
        <MiddleText1>
          What sets us apart is our commitment to sustainability. We specialize
          in clothing fabrics, offering a diverse range of materials to meet
          your needs.
        </MiddleText1>
        <ImageWrapper scroll={scroll === 0 ? 0 : (scroll / x) * 180}>
          <Image src={home_repunch_image} objectFit="fill" />
        </ImageWrapper>
        <ImageWrapper2 scroll={scroll === 0 ? 0 : (scroll / x) * 180}>
          <Image src={home_repunch_image} objectFit="fill" />
        </ImageWrapper2>
        <ImageWrapper3 scroll={scroll === 0 ? 0 : (scroll / x) * 180}>
          <Image src={home_repunch_image} objectFit="fill" />
        </ImageWrapper3>
        {/** 2씬 */}

        <BigText1>
          Enviromental
          <br />
          Responsibility
        </BigText1>
        <MiddleText2>
          The textile industry is notorious for its environmental footprint,
          with vast amounts of fabric waste discarded annually.
          <Br />
          We recognize the need for change. By repurposing surplus materials, we
          contribute to a greener planet by reducing fabric waste and minimizing
          the harmful impact on our environment.
        </MiddleText2>

        {/** 3씬 */}
        <Scene3>
          <FlexWrapper>
            <TextWrapper>
              <BigText3>
                +370,000t
                <br />
                /year
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
          <NatureCircle
            scroll={scroll}
            x={x}
            y={natureCirceY}
            url={nature_large.src}
            ref={ref1}
            id="natureCircle"
          >
            {/* <ImageWrapperCircle>
            <Image src={nature_large} objectFit="fill" />
          </ImageWrapperCircle> */}
            <Video id="video" key={""} loop={true} autoPlay muted playsInline>
              <source
                src={require("../public/natureVideo.mp4")}
                type="video/mp4"
              />
            </Video>
          </NatureCircle>
          <LimeCircle
            scroll={scroll}
            x={x}
            y={natureCirceY}
            url={nature_large.src}
            ref={ref2}
            id="limeCircle"
          />
        </Scene3>

        {/* <GrayCircle /> */}

        {/** 4씬 */}

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
              <CubeWrapper>
                <Image src={cube} width={165.4} height={184.5} alt="cube" />
              </CubeWrapper>
            </IconWrapper>
            <SmallText>We stock up recyclable fabric as possible.</SmallText>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <Image src={square} width={100} height={100} alt="square" />
            </IconWrapper>
            <SmallText>We provide you with access to old fabrics.</SmallText>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <ApetureWrapper>
                <Image src={aperture} width={100} height={100} alt="apeture" />
              </ApetureWrapper>
            </IconWrapper>
            <SmallText>We create new products from old fabrics.</SmallText>
          </InfoWrapper>
        </InfoContainer>
        <SolutionImageWrapperDesk>
          <VideoSolution
            id="video"
            key={""}
            loop={true}
            autoPlay
            muted
            playsInline
          >
            <source src={require("../public/silkVideo.mp4")} type="video/mp4" />
          </VideoSolution>
          <LogoWhiteWrapper>
            <Image src={logoWhite} width={200} height={200} />
          </LogoWhiteWrapper>
        </SolutionImageWrapperDesk>
        {/* 
          <SolutionImageWrapperMobile>
            <VideoSolution id="video" key={""} loop={true} autoPlay muted>
              <source src={require("../public/silk.mp4")} type="video/mp4" />
            </VideoSolution>
          </SolutionImageWrapperMobile> */}

        {/** 5씬 */}
        <Scene5>
          <ContentWrapper>
            <BigText5>
              10,000+
              <br />
              Products
            </BigText5>
            <MiddleText5>
              We offer over 10,000 products as solutions for the environment.
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
              <Link href={`/shop`} style={{ textDecoration: "none" }}>
                <ShopButton>
                  <ShopIconWrapper>
                    <Image src={arrowShop} width={18} height={13} />
                  </ShopIconWrapper>
                  <ShopText>Shop Products</ShopText>
                </ShopButton>
              </Link>
            </ShopButtonWrapper>
          </ContentWrapper>

          <LogoImageWrapperDesk>
            <Image src={logo_lime} width={1950} height={2420} />
          </LogoImageWrapperDesk>
        </Scene5>
        {/** 6씬 */}
        <Scene6>
          <ContentWrapper>
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
                <MiddleText6_1>Inquiry</MiddleText6_1>
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
          </ContentWrapper>
          <SwatchContainer
            scroll={
              scroll === 0
                ? 0
                : ((document.body.clientHeight - scroll) / x / y) * 50000
            }
            id="swatch"
            ref={ref1}
          >
            <SwatchImageWrapper>
              <Image
                src={swatch}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </SwatchImageWrapper>
            <SwatchFlexWrapper>
              <SwatchText>Swatch</SwatchText>
              <SwatchLogoWrapper>
                <Image src={logo} width={107.152} height={133.888} />
              </SwatchLogoWrapper>
            </SwatchFlexWrapper>
          </SwatchContainer>
          {/** 너비가 커질수록 커짐 높이가 커질수록 커짐  */}
        </Scene6>
      </Container>
      <TempHeaderBar></TempHeaderBar>
    </>
  );
}
const TempHeaderBar = styled.div`
  position: absolute;

  width: 100%;
  top: 0px;
  height: 64px;
  background-color: #fafafa;
`;
const Container = styled.div`
  padding-top: 90px;
  top: 0px;
  color: #121822;
  background-color: #fafafa;
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const SceneContainer1 = styled.div`
  contain: paint;
  height: 800vh;
`;
const SceneContainer = styled.div`
  position: relative;
  margin-bottom: 100vh;
  height: 300vh;
  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 20vh;
  }
`;
const SceneContainer4 = styled.div`
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
  position: relative;

  margin-bottom: 23.1vw;
  /* position: sticky;
  top: 50%;
  transform: translate(0, -50%);
  @media screen and (max-width: 768px) {
    top: 50%;
    transform: translate(0, -50%);
  } */
  @media screen and (max-width: 768px) {
    margin-bottom: 35.6vw;
  }
`;
const Scene4 = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
`;
const Scene5 = styled.div`
  position: relative;

  margin-bottom: 25.9vw;
  @media screen and (max-width: 768px) {
    margin-bottom: 31vw;
  }
`;
const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const Scene6 = styled.div`
  position: relative;

  padding-bottom: 200px;
  @media screen and (max-width: 768px) {
    padding-bottom: 56vw;
  }
`;
const ImageWrapperMobile = styled.div<{ scroll: number }>`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: sticky;
    top: 60vh;
    width: 381px;
    height: 38.1px;
    transform-origin: top left;
    transition: all 1s;
    transform: ${(props) => {
      return `translateX(calc(100vw - ${props.scroll / 25}vw)) rotate(-30deg)`;
    }};
  }
`;
const ImageWrapper = styled.div<{ scroll: number }>`
  position: absolute;

  width: 99vw;
  height: 9.895vw;
  top: 40vw;
  left: 40vw;
  transform-origin: top left;
  transform: ${(props) => {
    return `rotate(-30deg) translateX(${-props.scroll * 2}vw)`;
  }};
  @media screen and (max-width: 768px) {
    top: 90vw;
    transform: ${(props) => {
      return `rotate(-30deg) translateX(${-props.scroll}vw)`;
    }};
  }
`;
const ImageWrapper2 = styled.div<{ scroll: number }>`
  position: absolute;

  width: 99vw;
  height: 9.895vw;
  top: 40vw;
  left: 40vw;
  transform-origin: top left;
  transform: ${(props) => {
    return `rotate(-30deg) translateX(${-props.scroll * 2 - 102.5}vw)`;
  }};
  @media screen and (max-width: 768px) {
    top: 90vw;
    transform: ${(props) => {
      return `rotate(-30deg) translateX(${-props.scroll - 102.5}vw)`;
    }};
  }
`;
const ImageWrapper3 = styled.div<{ scroll: number }>`
  position: absolute;

  width: 99vw;
  height: 9.895vw;
  top: 40vw;
  left: 40vw;
  transform-origin: top left;
  transform: ${(props) => {
    return `rotate(-30deg) translateX(${-props.scroll * 2 + 102.5}vw)`;
  }};
  @media screen and (max-width: 768px) {
    top: 90vw;
    transform: ${(props) => {
      return `rotate(-30deg) translateX(${-props.scroll + 102.5}vw)`;
    }};
  }
`;
const FlexWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 5vw;
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
  position: relative;

  padding-left: 8.2vw;
  font-family: "Kaiti TC";
  font-size: 9.4vw;
  font-weight: 400;
  line-height: 80%;
  margin-bottom: 4.4vw;
  @media screen and (max-width: 768px) {
    padding-left: 10vw;
    margin-bottom: 3.7vw;
    font-size: 9.3vw;
  }
`;
const BigText2 = styled.div`
  font-family: "Kaiti TC";
  font-size: 6.7vw;
  font-weight: 400;
  line-height: 80%;
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
  font-size: 5vw;
  font-weight: 400;
  line-height: 95%;
  margin-bottom: 1.8vw;
  @media screen and (max-width: 768px) {
    margin-bottom: 3.7vw;
    font-size: 9.3vw;
    font-weight: 400;
  }
`;
const BigText4 = styled.div`
  font-family: "Kaiti TC";
  font-size: 9.4vw;
  font-weight: 400;
  margin-bottom: 2.6vw;
  padding-left: 7vw;
  @media screen and (max-width: 768px) {
    margin-bottom: 3.7vw;
    padding-left: 10vw;
    font-size: 9.3vw;
  }
`;
const BigText5 = styled.div`
  margin-bottom: 1.7vw;
  padding-left: 7vw;
  font-family: "Kaiti TC";
  font-size: 9.3vw;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    padding-left: 10vw;
    margin-bottom: 3.75vw;
    font-size: 9vw;
  }
`;
const BigText6 = styled.div`
  font-family: "Kaiti TC";
  font-size: 9.1vw;
  font-weight: 400;
  line-height: 80%;
  margin-bottom: 2.4vw;
  padding-left: 7vw;
  @media screen and (max-width: 768px) {
    padding-left: 10vw;
    font-size: 9.3vw;
    font-weight: 400;
    margin-bottom: 3.75vw;
    line-height: 100%;
  }
`;
const MiddleText1 = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 15vw;
  padding-left: 8.2vw;
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 2.8vw;
  font-weight: 400;
  max-width: 81vw;
  line-height: 130%;
  @media screen and (max-width: 768px) {
    margin-bottom: 40vw;
    padding-left: 10vw;
    font-size: 3.1vw;
  }
`;
const MiddleText2 = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 25vw;
  padding-left: 8.2vw;
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 2.8vw;
  font-weight: 400;
  max-width: 81vw;
  line-height: 130%;
  @media screen and (max-width: 768px) {
    max-width: 81vw;
    margin-bottom: 40vw;
    padding-left: 10vw;
    font-size: 3.1vw;
  }
`;
const Br = styled.br`
  display: none;
  @media screen and (max-width: 768px) {
    display: inline;
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
  font-size: 1.6vw;
  font-weight: 400;
  text-align: center;
  line-height: 130%;
  @media screen and (max-width: 768px) {
    margin-bottom: 8.1vw;
    font-size: 3.1vw;
  }
`;
const MiddleText4 = styled.div`
  z-index: 1;
  font-family: Inter;
  font-size: 2.8vw;
  font-weight: 400;
  padding-left: 7vw;
  margin-bottom: 3.9vw;
  line-height: 130%;

  @media screen and (max-width: 768px) {
    margin-bottom: 10.6vw;
    padding-left: 10vw;
    font-size: 3.1vw;
  }
`;
const MiddleText5 = styled.div`
  font-family: Inter;
  font-size: 2.85vw;
  font-weight: 400;
  margin-bottom: 7vw;
  padding-left: 7vw;
  max-width: 71vw;
  line-height: 130%;
  @media screen and (max-width: 768px) {
    font-size: 3.1vw;
    padding-left: 10vw;
    margin-bottom: 8.1vw;
  }
`;
const MiddleText6 = styled.div`
  font-family: Inter;
  font-size: 2.9vw;
  font-weight: 400;
  margin-bottom: 11vw;
  padding-left: 7vw;
  line-height: 130%;
  @media screen and (max-width: 768px) {
    padding-left: 10vw;
    font-size: 3.1vw;
    font-weight: 400;
    margin-bottom: 15vw;
    line-height: 130%;
  }
`;
const MiddleText6_1 = styled.div`
  color: #000000;
  font-family: Inter;
  font-size: 3.9vw;
  font-weight: 700;
  margin-bottom: 1.14vw;
  @media screen and (max-width: 768px) {
    margin-bottom: 1.2vw;
    color: #000000;
    font-size: 3.7vw;
  }
`;

const InfoContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 64vw;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  margin-left: 7vw;
  margin-bottom: 8.4vw;
  @media screen and (max-width: 768px) {
    margin-bottom: 9.3vw;
    max-width: 100%;
    margin-left: 10vw;
    margin-right: 10vw;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  gap: 3.12vw;
  align-items: center;
  padding-top: 1.8vw;
  padding-bottom: 1.8vw;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  @media screen and (max-width: 768px) {
    gap: 3.99vw;
    padding-top: 3.4vw;
    padding-bottom: 3.4vw;
  }
`;
const InfoWrapper1 = styled.div`
  display: flex;
  gap: 2.1vw;
  align-items: center;
  padding-top: 1.8vw;
  padding-bottom: 1.8vw;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  @media screen and (max-width: 768px) {
    padding-top: 3.4vw;
    padding-bottom: 3.4vw;
  }
`;
const IconWrapper1 = styled.div`
  margin-left: 0.5vw;
  display: flex;
  width: 2.7vw;
  height: 2.7vw;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    margin-left: 0.1vw;
    width: 5.1vw;
    height: 5.7vw;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  margin-left: 0.97vw;
  width: 5.19vw;
  height: 5.19vw;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    margin-left: 1.25vw;
    width: 6.6vw;
    height: 6.6vw;
  }
`;
const CubeWrapper = styled.div`
  width: 4.04vw;
  height: 4.51vw;
  @media screen and (max-width: 768px) {
    width: 5.16vw;
    height: 5.76vw;
  }
`;
const ApetureWrapper = styled.div`
  width: 5.28vw;
  height: 5.28vw;
  @media screen and (max-width: 768px) {
    width: 6.25vw;
    height: 6.25vw;
  }
`;
const SmallText = styled.div`
  font-family: Inter;
  font-size: 2.1vw;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 2.8vw;
  }
`;
const SmallText2 = styled.div`
  color: #000000;
  font-family: Inter;
  font-size: 2.2vw;
  font-weight: 400;
  line-height: 130%;
  @media screen and (max-width: 768px) {
    font-size: 2.5vw;
    font-weight: 400;
  }
`;

const ProductWrapperDesk = styled.div`
  width: 75.3vw;
  margin-bottom: 5.2vw;
  margin-left: 7vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 0.5vw;
  @media screen and (max-width: 768px) {
    margin-bottom: 6.8vw;
    display: none;
  }
`;
const ProductWrapperMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: grid;
    margin-left: 7.8vw;
    margin-right: 7.8vw;
    margin-bottom: 6.8vw;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.2vw;
  }
`;
const ShopButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  width: 75.3vw;
  margin-left: 7vw;

  @media screen and (max-width: 768px) {
    width: auto;
    margin-left: 7.8vw;
    margin-right: 7.8vw;
  }
`;
const ShopButton = styled.div`
  display: flex;
  align-items: center;
  gap: 2.1vw;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    gap: 3.4vw;
  }
`;
const ShopIconWrapper = styled.div``;
const ShopText = styled.div`
  font-family: Inter;
  font-size: 2.1vw;
  font-weight: 400;
  color: #000000;
  @media screen and (max-width: 768px) {
    font-family: Inter;
    font-size: 3.4vw;
  }
`;
const FlexWrapper6 = styled.div`
  display: flex;
  gap: 3.3vw;
  margin-left: 7vw;
  margin-bottom: 5.7vw;
  @media screen and (max-width: 768px) {
    margin-left: 10vw;
    gap: 3.7vw;
    margin-bottom: 6.2vw;
  }
`;
const TextWrapper6 = styled.div``;
const Number = styled.div`
  font-family: Inter;
  font-size: 3.9vw;
  font-weight: 400;
  color: #ffffff;
  border-radius: 100%;
  background-color: #000000;

  width: 5vw;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 8.1vw;
    height: 8.1vw;
    font-size: 4.3vw;
    font-weight: 400;
  }
`;
const NatureCircle = styled.div<{
  scroll: number;
  x: number;
  y: any;
  url: string;
}>`
  position: absolute;
  width: 30vw;
  height: 30vw;
  border-radius: 100%;
  overflow: hidden;
  top: -27.9vw;
  left: -9.5vw;

  transform: ${(props) => {
    return `translateY(${
      ((props.scroll - props.y + props.x) / props.x) * 10
    }vw)`;
  }};

  @media screen and (max-width: 768px) {
    top: -30vw;
    left: -7.8vw;
    width: 36.8vw;
    height: 36.8vw;
  }
  /* z-index: 1;
  position: sticky;
  width: 236px;
  height: 236px;
  border-radius: 100%;
  overflow: hidden;
  transform: translateX(-73px);
  transition: all 7s;



  @media screen and (max-width: 768px) {
    width: 118px;
    height: 118px;
    transform: translateX(-25px);
  } */
`;

const Video = styled.video`
  width: auto;
  height: 30vw;
  @media screen and (max-width: 768px) {
    width: auto;
    height: 36.8vw;
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
    width: 36.8vw;
    height: 36.8vw;
    transform: translateX(-25px);
  }
`;
const LimeCircle = styled.div<{
  scroll: number;
  x: number;
  y: any;
  url: string;
}>`
  position: absolute;
  width: 30vw;
  height: 30vw;
  border-radius: 100%;
  overflow: hidden;
  top: 5vw;
  right: -1.3vw;
  background-color: #e1ff20;
  transform: ${(props) => {
    return `translateY(${
      ((props.scroll - props.y + props.x) / props.x) * 10
    }vw)`;
  }};
  @media screen and (max-width: 768px) {
    top: 75vw;
    right: -19vw;
    width: 36.8vw;
    height: 36.8vw;
  }
`;

const SolutionImageWrapperDesk = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  height: 42.9vw;
  overflow: hidden;
  margin-bottom: 21vw;
  /* position: absolute;
  width: 135vw;
  height: 209.022px;
  transform-origin: top left;
  left: -15vw;
  bottom: -39vw;
  overflow: hidden;
  transform: rotate(-30deg);

  background-size: 100%;
  background-position: 0% 42%;
  background-repeat: no-repeat;*/
  @media screen and (max-width: 768px) {
    margin-bottom: 26.5vw;
    height: 55vw;
  }
`;
const SolutionImageWrapperMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    width: 135vw;
    height: 104.511px;
    transform-origin: top left;
    left: -15vw;
    bottom: -39vw;

    overflow: hidden;
    transform: rotate(-30deg);

    background-size: 100%;
    background-position: 0% 42%;
    background-repeat: no-repeat;
  }
`;
const VideoSolution = styled.video`
  position: absolute;
  width: 100vw;
  height: auto;

  /* position: absolute;
  top: -10vw;
  width: auto;
  height: 150vw;
  @media screen and (max-width: 768px) {
    width: auto;
    height: 917px;
  } */
`;
const LogoWhiteWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 8.7vw;
  height: 10.9vw;
`;
const LogoImageWrapperDesk = styled.div`
  position: absolute;
  width: 95vw;
  height: 125vw;
  left: 10vw;
  top: 35vw;
  transform-origin: top left;
  transform: rotate(-30deg);
  @media screen and (max-width: 768px) {
    top: 69vw;
    left: -8.5vw;
    width: 120vw;
    height: 150vw;
  }
`;
const LogoImageWrapperMobile = styled.div<{ scroll: number }>`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: sticky;
    width: 386.567px;
    height: 483.209px;
    left: 15vw;
    top: 25vh;
    transform-origin: top left;
    transform: rotate(-30deg);
  }
`;
const SwatchContainer = styled.div<{ scroll: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5.3vw;
  left: 30vw;
  width: 50vw;
  height: 20.4vw;
  border-radius: 16.736px;
  background-color: #e1ff20;
  transform-origin: top left;
  transform: ${(props) => {
    return `rotate(-30deg) translateX(${props.scroll / 2}vw)`;
  }};

  @media screen and (max-width: 768px) {
    left: -5vw;
    top: 130vw;
    transform: ${(props) => {
      return `rotate(-30deg) translateX(${props.scroll / 2}vw)`;
    }};
  }
`;

const SwatchImageWrapper = styled.div`
  position: relative;
  margin-left: 2.1vw;
  width: 20vw;
  height: 16.5vw;
  border-radius: 8.2px;
  overflow: hidden;
`;
const SwatchFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.7vw;
  margin-right: 6.1vw;
`;
const SwatchText = styled.div`
  color: #000000;
  text-align: center;
  font-family: Inter;
  font-size: 2.6vw;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
`;
const SwatchLogoWrapper = styled.div`
  width: 3.4vw;
  height: 4.3vw;
`;
