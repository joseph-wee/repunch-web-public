import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { cube, home_repunch_image, square } from "../assets";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { Filter, ProductList } from "../components";

export default function Home() {
  const [scroll, setScroll] = useState(0);

  const scrollHandler = () => {
    setScroll(window.scrollY);
    console.log(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
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
      <SceneContainer1>
        <ImageWrapper scroll={scroll}>
          <Image src={home_repunch_image} width={381} height={38.1} />
        </ImageWrapper>
        <SceneContainer>
          <Scene1>
            <BigText>
              We are more than
              <br />
              just a textile
              <br />
              marketplace.
            </BigText>
            <MiddleText>
              What sets us apart is our commitment to sustainability.
              <br />
              We specialize in clothing fabrics, offering a diverse
              <br />
              range of materials to meet your needs.
            </MiddleText>
          </Scene1>
        </SceneContainer>
        <SceneContainer>
          <Scene2>
            <BigText>
              Enviromental
              <br />
              Responsibility
            </BigText>
            <MiddleText>
              What sets us apart is our commitment to sustainability.
              <br />
              We specialize in clothing fabrics, offering a diverse
              <br />
              range of materials to meet your needs.
            </MiddleText>
          </Scene2>
        </SceneContainer>
      </SceneContainer1>
      <SceneContainer>
        <Scene3>
          <FlexWrapper>
            <TextWrapper>
              <BigText2>
                +370,000t
                <br />/ year
              </BigText2>
              <MiddleText3>
                Clothing waste is thrown
                <br />
                away every year.
              </MiddleText3>
            </TextWrapper>
            <TextWrapper>
              <BigText2>
                200
                <br />
                year
              </BigText2>
              <MiddleText3>
                Time taken for fiber
                <br />
                decomposition
              </MiddleText3>
            </TextWrapper>
            <TextWrapper>
              <BigText2>
                1.5°C
                <br />
                /year
              </BigText2>
              <MiddleText3>
                Increase in typhoons due to
                <br />
                rising global temperature
              </MiddleText3>
            </TextWrapper>
          </FlexWrapper>
        </Scene3>
      </SceneContainer>
      <SceneContainer>
        <Scene4>
          <BigText3>
            Our
            <br />
            solution
          </BigText3>
          <MiddleText3>
            What sets us apart is our commitment
            <br />
            to sustainability.
          </MiddleText3>
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
        </Scene4>
      </SceneContainer>
      <SceneContainer>
        <Scene5>
          <BigText10000>
            10,000+
            <br />
            Products
          </BigText10000>
          <MiddleText10000>
            What sets us apart is our commitment
            <br />
            to sustainability.
          </MiddleText10000>
          {/** 여기에 상품 목록 */}
          {/* <button>Shop Products</button> */}
        </Scene5>
      </SceneContainer>
      <SceneContainer>
        <Scene6>
          <BigText>
            On-line
            <br />
            meeting request
          </BigText>
          <MiddleText>
            We will contact you to schedule an online meeting whenever possible.
          </MiddleText>
          <MiddleText2>Inquary</MiddleText2>
          <SmallText2>
            Please let us know what you are curious about, such
            <br />
            as production, fabric swatches, etc.
          </SmallText2>
          <MiddleText2>Business industry and detail</MiddleText2>
          <SmallText2>
            If you tell us about your business, we can prepare in
            <br />
            advance and provide you with detailed information.
          </SmallText2>
          <MiddleText2>Business industry and detail</MiddleText2>
          <SmallText2>
            If you tell us about your business, we can prepare in advance and
            provide you with detailed information.
          </SmallText2>
          <MiddleText2>Arrange meeting</MiddleText2>
          <SmallText2>
            please let us know the date and time when the
            <br />
            meeting can be held online and we will contact you.
          </SmallText2>
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
  margin-bottom: 100vh;
  height: 300vh;
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
  top: 108px;
  @media screen and (max-width: 768px) {
    top: 101px;
  }
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
const BigText = styled.div`
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  padding-left: 54px;
  margin-bottom: 26px;
  @media screen and (max-width: 768px) {
    padding-left: 41px;
    margin-bottom: 20px;
  }
`;
const BigText2 = styled.div`
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
  text-align: center;
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  margin-bottom: 8px;
  @media screen and (max-width: 768px) {
    margin-bottom: 2px;
  }
`;
const MiddleText2 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    padding-left: 40px;
  }
`;
const MiddleText3 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;

  @media screen and (max-width: 768px) {
    padding-left: 25px;
    margin-bottom: 29px;
  }
`;
const MiddleText5 = styled.div`
  text-align: center;
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 15.955px;
  font-weight: 400;
  margin-bottom: 54px;
  @media screen and (max-width: 768px) {
    font-size: 8.633px;
    padding-left: 40px;
    margin-bottom: 31px;
  }
`;
const BigText3 = styled.div`
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  margin-bottom: 14px;
  padding-left: 54px;
  @media screen and (max-width: 768px) {
    padding-left: 25px;
    margin-bottom: 12px;
  }
`;
const BigText10000 = styled.div`
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  margin-bottom: 14px;
  padding-left: 54px;
  @media screen and (max-width: 768px) {
    padding-left: 25px;
    margin-bottom: 12px;
  }
`;
const MiddleText10000 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 15.955px;
  font-weight: 400;
  margin-bottom: 54px;
  @media screen and (max-width: 768px) {
    font-size: 8.633px;
    padding-left: 25px;
    margin-bottom: 31px;
  }
`;
const MiddleText4 = styled.div`
  color: #000000; // 이거 의도한 색깔 ?
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    margin-bottom: 30px;
    padding-left: 25px;
  }
`;
const InfoContainer = styled.div`
  max-width: 338px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
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
const MiddleText = styled.div`
  font-family: Inter;
  font-size: 8.633px;
  font-weight: 400;
  padding-left: 63px;
  @media screen and (max-width: 768px) {
    padding-left: 41px;
  }
`;
const SmallText = styled.div`
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
