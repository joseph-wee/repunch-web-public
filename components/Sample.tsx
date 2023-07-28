import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { test_thumbnail } from "../assets";

const Sample = () => {
  return (
    <ImageWrapper>
      <Image src={test_thumbnail} alt={"test"} width={48} height={48} />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  border-radius: 2px;
  overflow: hidden;
  width: 48px;
  height: 48px;
`;

export default Sample;
