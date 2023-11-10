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
import { useEffect, useState } from "react";
import { Filter, ProductList } from "../components";

const useAbout_us = () => {
  const [sortIsActive, setSortIsActive] = useState(true);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const [scroll, setScroll] = useState(0); // 스크롤
  const [innerHeight, setInnerHeihgt] = useState(0); // 브라우저 높이

  useEffect(() => {
    window.addEventListener("scroll", () => setScroll(window.scrollY));
    window.addEventListener("resize", () => setInnerHeihgt(window.innerHeight));
    setInnerHeihgt(window.innerHeight);
  }, []);

  useEffect(() => {
    console.log((innerHeight * 2.7) / scroll);
  }, [scroll]);

  // useEffect(() => {
  //   console.log(innerHeight * 3 + "inner");
  // }, [innerHeight]);

  return (
    <Container totalHeight={innerHeight * 21.5}>
      {/** scene1 : 비디오 */}

      <Scene scroll={scroll} location1={0} location2={innerHeight * 1.5} url="">
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
          <source src={require("../public/testVideo.mp4")} type="video/mp4" />
          error
        </Video>
      </Scene>
      {/** scene2 */}
      <Scene
        scroll={scroll}
        location1={innerHeight * 2.5}
        location2={innerHeight * 8.5}
        url={scene2}
      >
        <ImageWrapper>
          <Image src={scene2} alt="scene2Img" layout="fill" />
        </ImageWrapper>
        <Content
          scroll={scroll}
          location1={innerHeight * 3}
          location2={innerHeight * 4}
        >
          <Image src={img_repunch_logo} alt="logo" />
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
            embracing innovation and sustainability.{" "}
          </Text>
        </Content>
        <Content
          scroll={scroll}
          location1={innerHeight * 6}
          location2={innerHeight * 7}
        >
          <Image src={sceneVector} alt="logo" />
        </Content>
        <Content
          scroll={scroll}
          location1={innerHeight * 7.5}
          location2={innerHeight * 8.5}
        >
          <Title>ESG</Title>
          <Text>
            Our core philosophy revolves around Environmental, Social, and
            Governance (ESG) principles, ensuring that our business thrives
            while making a positive impact on the planet and society.
          </Text>
        </Content>
      </Scene>
      {/** scene3 */}
      <Scene
        scroll={scroll}
        location1={innerHeight * 9.5}
        location2={innerHeight * 11.5}
        url={scene2}
      >
        <ImageWrapper>
          <Image src={scene3} alt="scene2Img" layout="fill" />
        </ImageWrapper>
        <Content
          scroll={scroll}
          location1={innerHeight * 10}
          location2={innerHeight * 11}
        >
          <Title>Our Unique Approach</Title>
          <Text>
            What sets us apart is our commitment to sustainability. We
            specialize in clothing fabrics, offering a diverse range of
            materials to meet your needs. But what truly distinguishes us is our
            dedication to repurposing and reusing leftover fabrics from
            production.
          </Text>
        </Content>
      </Scene>
      {/** scene4 */}
      <Scene
        scroll={scroll}
        location1={innerHeight * 12.5}
        location2={innerHeight * 15}
        url={scene2}
      >
        <ImageWrapper>
          <Image src={scene4} alt="scene2Img" layout="fill" />
        </ImageWrapper>
        <Content
          scroll={scroll}
          location1={innerHeight * 13}
          location2={innerHeight * 14}
        >
          <Title>Environmental Responsibility</Title>
          <Text>
            The textile industry is notorious for its environmental footprint,
            with vast amounts of fabric waste discarded annually. We recognize
            the need for change. By repurposing surplus materials, we contribute
            to a greener planet by reducing fabric waste and minimizing the
            harmful impact on our environment.
          </Text>
        </Content>
      </Scene>
      {/** scene5 */}
      <Scene
        scroll={scroll}
        location1={innerHeight * 16}
        location2={innerHeight * 23}
        url={scene2}
      >
        <ImageWrapper>
          <Image src={scene5} alt="scene2Img" layout="fill" />
        </ImageWrapper>
        <Content
          scroll={scroll}
          location1={innerHeight * 16.5}
          location2={innerHeight * 17.5}
        >
          <Image src={sceneVector2} alt="logo" />
        </Content>
        <Content
          scroll={scroll}
          location1={innerHeight * 18}
          location2={innerHeight * 19}
        >
          <Title>Customer-Centric Service</Title>
          <Text>
            We believe in empowering our customers. That&apos;s why we offer a
            unique service. If you&apos;ve purchased scrap fabrics from us and
            found them to your liking, you can request additional production
            using the same materials. This sustainable approach allows you to
            enjoy quality textiles while reducing waste.
          </Text>
        </Content>
        <Content
          scroll={scroll}
          location1={innerHeight * 19.5}
          location2={innerHeight * 20.5}
        >
          <Title>Join Us in This Journey</Title>
          <Text>
            By choosing Repunch, you aren&apos;t just acquiring textiles;
            you&apos;re becoming part of a sustainable movement. Together, we
            can create a brighter future for the textile industry, one that
            benefits both your business and the world we share. Join us in
            reimagining textiles, reducing waste, and building a more
            sustainable tomorrow.
          </Text>
        </Content>
      </Scene>
      {/** scene6 */}
      {/** scene7 */}
      {/** scene8 */}
      {/** scene9 */}
    </Container>
  );
};
const Container = styled.div<{ totalHeight: number }>`
  background-color: #fafafa;
  max-width: 100vw;
  height: ${(props) => {
    return props.totalHeight == 0 ? "3000px" : `${props.totalHeight}px`;
  }};
`;

const Scene = styled.div<{
  scroll: number;
  location1: number;
  location2: number;
  url: any;
}>`
  // location1보다 스크롤값이 낮은경우
  ${(props) => {
    return (
      props.scroll < props.location1 &&
      `position: absolute; top: ${props.location1}px;`
    );
  }};
  // location1과 location2 스크롤 사이인 경우
  ${(props) => {
    return props.scroll >= props.location1 && `position: fixed; top: 0px`;
  }};
  // location2 보다 스크롤이 큰경우
  ${(props) => {
    return (
      props.scroll > props.location2 &&
      `position: absolute; top: ${props.location2}px`
    );
  }};
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
const ImageWrapper = styled.div`
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
`;

const Title = styled.div`
  margin-bottom: 23px;
  color: #ffffff;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Text = styled.div`
  max-width: 555px;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default useAbout_us;
