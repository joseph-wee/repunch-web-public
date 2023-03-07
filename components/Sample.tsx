import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { test_thumbnail } from "../assets";

const Sample = () => {
  return <Image src={test_thumbnail} alt={"test"} width={48} height={48} />;
};

export default Sample;
