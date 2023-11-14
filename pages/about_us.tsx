import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import {
  about_us_image,
  ic_down_bk,
  ic_filter,
  ic_up_bk,
  img_repunch_logo,
  scene2,
  scene3,
  scene4,
  scene5,
  sceneVector,
  sceneVector2,
} from "../assets";
import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import { Filter, HeaderBarAboutUs, ProductList } from "../components";

const useAbout_us = () => {
  const [sortIsActive, setSortIsActive] = useState(true);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [scroll, setScroll] = useState(0); // 스크롤
  const [innerHeight, setInnerHeihgt] = useState(0); // 브라우저 높이
  const [render, setRender] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => setScroll(window.scrollY));
    window.addEventListener("resize", () => setInnerHeihgt(window.innerHeight));
    setInnerHeihgt(window.innerHeight);

    /** 감지 */
    const io = new IntersectionObserver(([{ isIntersecting }]) => {
      isIntersecting && setRender(true);
      !isIntersecting && setRender(false);
    });
    io.observe(ref.current);
  }, []);

  useEffect(() => {
    console.log(render);
  }, [render]);

  // useEffect(() => {
  //   console.log(innerHeight * 3 + "inner");
  // }, [innerHeight]);

  return (
    <>
      <HeaderBarAboutUs render={render} />
      <Container totalHeight={innerHeight * 21.85}>
        {/** scene1 : 비디오 */}
        <SceneContainer top={0} height={innerHeight * 3.5}>
          <Scene url="">
            <Video
              id="video"
              key={""}
              loop={true}
              autoPlay
              muted // 음소거해야만 새로고침해도 자동재생
              // onMouseOver={() => console.log("마우스오버")}
              // onMouseOut={() => setShowControl(false)}
              // onMouseMove={() => setShowControl(true)}
            >
              <source
                src={require("../public/testVideo.mp4")}
                type="video/mp4"
              />
              error
            </Video>
          </Scene>
        </SceneContainer>
        {/** scene2 */}
        <SceneContainer top={innerHeight * 2.5} height={innerHeight * 8}>
          <Scene url={scene2}>
            <BackGroundImageWrapper>
              <Image src={scene2} alt="scene2Img" layout="fill" />
            </BackGroundImageWrapper>
            <Content
              scroll={scroll}
              location1={innerHeight * 3}
              location2={innerHeight * 4}
            >
              <LogoWrapper1>
                <Image src={img_repunch_logo} alt="logo" />
              </LogoWrapper1>
            </Content>
            <Content
              scroll={scroll}
              location1={innerHeight * 4.5}
              location2={innerHeight * 5.5}
            >
              <Title>Our Misson</Title>
              <Text>
                We are more than just a textile marketplace.
                <br /> We are on a mission to redefine the textile industry by
                <br />
                embracing innovation and sustainability.
              </Text>
            </Content>
            <Content
              scroll={scroll}
              location1={innerHeight * 6}
              location2={innerHeight * 7}
            >
              <LogoWrapper2>
                <Image src={sceneVector} alt="logo" />
              </LogoWrapper2>
            </Content>
            <Content
              scroll={scroll}
              location1={innerHeight * 7.5}
              location2={innerHeight * 8.5}
            >
              <Title>ESG</Title>
              <Text>
                Our core philosophy revolves around Environmental, <br />
                Social, and Governance (ESG) principles, ensuring that our{" "}
                <br />
                business thrives while making a positive impact on the
                <br />
                planet and society.
              </Text>
            </Content>
          </Scene>
        </SceneContainer>
        {/** scene3 */}
        <SceneContainer top={innerHeight * 9.5} height={innerHeight * 4}>
          <Scene url={scene2}>
            <BackGroundImageWrapper>
              <Image src={scene3} alt="scene2Img" layout="fill" />
            </BackGroundImageWrapper>
            <Content
              scroll={scroll}
              location1={innerHeight * 10}
              location2={innerHeight * 11}
            >
              <Title>
                Our Unique
                <br />
                Approach
              </Title>
              <Text>
                What sets us apart is our commitment to sustainability.
                <br />
                We specialize in clothing fabrics, offering a diverse
                <br />
                range of materials to meet your needs.
                <br />
                But what truly distinguishes us is our dedication to
                <br />
                repurposing and reusing leftover fabrics from
                <br />
                production.
              </Text>
            </Content>
          </Scene>
        </SceneContainer>
        {/** scene4 */}
        <SceneContainer top={innerHeight * 12.5} height={innerHeight * 4}>
          <Scene url={scene2}>
            <BackGroundImageWrapper>
              <Image src={scene4} alt="scene2Img" layout="fill" />
            </BackGroundImageWrapper>
            <Content
              scroll={scroll}
              location1={innerHeight * 13}
              location2={innerHeight * 14}
            >
              <Title>
                Environmental
                <br />
                Responsibility
              </Title>
              <Text>
                The textile industry is notorious for its environmental
                footprint, with
                <br />
                vast amounts of fabric waste discarded annually.
                <br />
                We recognize the need for change. By repurposing surplus
                <br />
                materials, we contribute to a greener planet by reducing fabric
                <br />
                waste and minimizing the harmful impact on our environment.
              </Text>
            </Content>
          </Scene>
        </SceneContainer>
        {/** scene5 */}
        <SceneContainer top={innerHeight * 15.5} height={innerHeight * 6.5}>
          <Scene url={scene2}>
            <BackGroundImageWrapper>
              <Image src={scene5} alt="scene2Img" layout="fill" />
            </BackGroundImageWrapper>
            <Content
              scroll={scroll}
              location1={innerHeight * 16}
              location2={innerHeight * 17}
            >
              <LogoWrapper3>
                <Image src={sceneVector2} alt="logo" />
              </LogoWrapper3>
            </Content>
            <Content
              scroll={scroll}
              location1={innerHeight * 17.5}
              location2={innerHeight * 18.5}
            >
              <Title>
                Customer-Centric
                <br />
                Service
              </Title>
              <Text>
                We believe in empowering our customers. That&apos;s why we offer
                a unique service.
                <br />
                If you&apos;ve purchased scrap fabrics from us and found them to
                your liking, you can
                <br />
                request additional production using the same materials.
                <br />
                This sustainable approach allows you to enjoy quality textiles
                while reducing waste.
              </Text>
            </Content>
            <Content
              scroll={scroll}
              location1={innerHeight * 19}
              location2={innerHeight * 21.5}
            >
              <Title>
                Join Us in
                <br />
                This Journey
              </Title>
              <Text>
                By choosing Repunch, you aren&apos;t just acquiring textiles;
                you&apos;re
                <br />
                becoming part of a sustainable movement.
                <br />
                Together, we can create a brighter future for the textile
                industry,
                <br />
                one that benefits both your business and the world we share.
                <br />
                Join us in reimagining textiles, reducing waste, and building a
                <br />
                more sustainable tomorrow.
              </Text>
            </Content>
          </Scene>
        </SceneContainer>
        {/** 감지 바 */}
        {/** scene6 */}
        {/** scene7 */}
        {/** scene8 */}
        {/** scene9 */}
      </Container>

      <div ref={ref}></div>
    </>
  );
};
const Container = styled.div<{ totalHeight: number }>`
  background-color: #fafafa;
  max-width: 100vw;
  height: ${(props) => {
    return props.totalHeight == 0 ? "3000px" : `${props.totalHeight}px`;
  }};
`;
const SceneContainer = styled.div<{ top: number; height: number }>`
  position: absolute;
  top: ${(props) => {
    return `${props.top}px`;
  }};
  height: ${(props) => {
    return `${props.height}px`;
  }};
`;
const Scene = styled.div<{
  url: any;
}>`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: ${(props) => {
    return `url(${props.url})`;
  }};
  background-size: 100vw 100vh;
  overflow-x: hidden;
`;

const Video = styled.video`
  width: auto;
  height: 100vh;
`;
const BackGroundImageWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;
const Content = styled.div<{
  scroll: number;
  location1: number;
  location2: number;
}>`
  position: absolute;
  // location1보다 스크롤값이 낮은경우
  ${(props) => {
    return props.scroll < props.location1 && `opacity: 0;`;
  }};
  // location1과 location2 스크롤 사이인 경우
  ${(props) => {
    return (
      props.scroll >= props.location1 &&
      `opacity: ${
        (props.scroll - props.location1) /
        ((props.location2 - props.location1) / 5)
      };`
    );
  }};
  // location2 보다 스크롤이 큰경우
  ${(props) => {
    return (
      props.scroll > props.location2 &&
      `opacity: ${
        (props.location2 -
          props.scroll +
          (props.location2 - props.location1) / 5) /
        ((props.location2 - props.location1) / 5)
      };`
    );
  }};
  transition: 0.1s;
`;
// const Title1 = styled.div`
//   /* margin-top: 27.7vh; */
//   margin-bottom: 23px;
//   color: #ffffff;
//   text-align: center;
//   font-family: "Inter";
//   font-size: 48px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
// `;
// const Text1 = styled.div`
//   max-width: 555px;
//   color: #ffffff;
//   text-align: center;
//   font-family: "Inter";
//   font-size: 20px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
// `;
const LogoWrapper1 = styled.div`
  @media screen and (max-width: 768px) {
    width: 86.2px;
    height: 108px;
  }
`;
const LogoWrapper2 = styled.div`
  @media screen and (max-width: 768px) {
    width: 86.2px;
    height: 108px;
  }
`;
const LogoWrapper3 = styled.div`
  @media screen and (max-width: 768px) {
    width: 113px;
    height: 113px;
  }
`;
const Title = styled.div`
  margin-bottom: 23px;
  color: #ffffff;
  text-align: center;
  font-family: "Inter";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 26px;
  }
`;
const Text = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media screen and (max-width: 768px) {
    font-size: 8.6px;
  }
`;

export default useAbout_us;
