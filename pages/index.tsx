import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { home_repunch_image } from "../assets";
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
          <BigText>
            +370,000t /<br />
            year
          </BigText>
          <MiddleText>
            Clothing waste is thrown
            <br />
            away every year.
          </MiddleText>
          <BigText>
            200
            <br />
            year
          </BigText>
          <MiddleText>
            Time taken for fiber
            <br />
            decomposition
          </MiddleText>
          <BigText>
            1.5°C /<br />
            year
          </BigText>
          <MiddleText>
            Increase in typhoons due to
            <br />
            rising global temperature
          </MiddleText>
        </Scene3>
      </SceneContainer>
      <SceneContainer>
        <Scene4>
          <BigText>
            Our
            <br />
            solution
          </BigText>
          <MiddleText>
            What sets us apart is our commitment
            <br />
            to sustainability.
          </MiddleText>
          <SmallText>
            We stock up on as much recyclable fabric as possible.
          </SmallText>
          <SmallText>We provide you with access to old fabrics.</SmallText>
          <SmallText>We create new products from old fabrics.</SmallText>
        </Scene4>
      </SceneContainer>
      <SceneContainer>
        <Scene5>
          <BigText>
            10,000+
            <br />
            Products
          </BigText>
          <MiddleText>
            What sets us apart is our commitment
            <br />
            to sustainability.
          </MiddleText>
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
  top: 154px;
`;
const Scene4 = styled.div`
  position: sticky;
  top: 154px;
`;
const Scene5 = styled.div`
  position: sticky;
  top: 154px;
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
const BigText = styled.div`
  font-family: "Kaiti TC";
  font-size: 25.898px;
  font-weight: 400;
  line-height: 20.718px;
  padding-left: 63px;
  margin-bottom: 26px;
  @media screen and (max-width: 768px) {
    padding-left: 40px;
    margin-bottom: 20px;
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
const MiddleText = styled.div`
  font-family: Inter;
  font-size: 8.633px;
  font-weight: 400;
  padding-left: 63px;
  @media screen and (max-width: 768px) {
    padding-left: 40px;
  }
`;
const SmallText = styled.div`
  font-family: "Kaiti TC";
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
