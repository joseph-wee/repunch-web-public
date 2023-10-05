import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Sample = ({ data }: any) => {
  return (
    <ImageWrapper>
      <Image src={data.thumbnail} alt={"test"} width={48} height={48} />
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
