import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { ic_check_wht, ic_link_gray, ic_plus } from "../../assets";
const add_product = () => {
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    materials: [
      {
        materialNo: 0,
        value: 0,
      },
    ],
    weight: "",
    designNo: 0,
    projectNo: 0,
    originNo: 0,
    transparent: false,
    certificated: false,
    width: 0,
    widthUnitType: "INCH",
    options: [
      {
        colorNo: 0,
        length: 0,
        lengthUnitType: "METER",
        amount: 0,
        quantity: 0,
        supportSample: false,
        samplePrice: 0,
        sampleQuantity: 0,
        files: [
          {
            type: "IMAGE",
            imageUrl: "",
            resourceUrl: "",
            width: 0,
            height: 0,
          },
        ],
      },
    ],
  });

  const [amount, setAmount] = useState("");

  useEffect(() => {
    console.log(productInfo);
  }, [productInfo]);

  /** Description 글자수 체크 */
  const descriptionCheckHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 1000) {
      setProductInfo({ ...productInfo, description: e.target.value });
    }
  };

  /** transparent 체크 핸들러 */
  const transparentCheckHandler = () => {
    setProductInfo({ ...productInfo, transparent: !productInfo.transparent });
  };

  /** certification 체크 핸들러 */
  const certificationCheckHandler = () => {
    setProductInfo({ ...productInfo, certificated: !productInfo.certificated });
  };

  /** 숫자, . 만 입력되게 */
  const inputWeightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^.0-9]/g, "");
    setProductInfo({ ...productInfo, weight: e.target.value });
  };

  // TODO:price인 경우
  // copy 할 때는 세팅 전에 amount에 $붙이고 세팅하면 될 듯
  const inputAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "$") {
      e.target.value = "";
      setAmount("");
      return;
    }
    e.target.value = "$" + e.target.value.replace(/[^.0-9]/g, "");
    setAmount(e.target.value);
  };

  return (
    <Container>
      <TitleDescriptionContainer>
        <Title>Title</Title>
        <TitleInput placeholder="Title" />
        <TitleInputLine />
        <Description>Description</Description>
        <DescriptionInput
          placeholder="(예시: 펜톤컬러, 색상 디테일)"
          onChange={(e) => descriptionCheckHandler(e)}
          value={productInfo.description}
        />
        <DescriptionInputCount>
          {`${productInfo.description.length}`}/1000
        </DescriptionInputCount>
      </TitleDescriptionContainer>
      <InputWrapper>
        <InputTitle>Composition</InputTitle>
        <InputContentWrapper>
          <InputContent>Select</InputContent>
          <Image src={ic_link_gray} alt="ic_link_gray" />
        </InputContentWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Design</InputTitle>
        <InputContentWrapper>
          <InputContent>Select</InputContent>
          <Image src={ic_link_gray} alt="ic_link_gray" />
        </InputContentWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Project</InputTitle>
        <InputContentWrapper>
          <InputContent>Select</InputContent>
          <Image src={ic_link_gray} alt="ic_link_gray" />
        </InputContentWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Country of origin</InputTitle>
        <InputContentWrapper>
          <InputContent>Select</InputContent>
          <Image src={ic_link_gray} alt="ic_link_gray" />
        </InputContentWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Transparent</InputTitle>
        <InputContentWrapper>
          <Label htmlFor={`transparent`}>
            <CustomCheckBox
              isChecked={productInfo.transparent}
              img={ic_check_wht.src}
            />
          </Label>
          <Checkbox
            type="checkbox"
            id={`transparent`}
            onChange={() => transparentCheckHandler()}
          />
        </InputContentWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Repunch certification</InputTitle>
        <InputContentWrapper>
          <Label htmlFor={`certification`}>
            <CustomCheckBox
              isChecked={productInfo.certificated}
              img={ic_check_wht.src}
            />
          </Label>
          <Checkbox
            type="checkbox"
            id={`certification`}
            onChange={() => certificationCheckHandler()}
          />
        </InputContentWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Width (Inch)</InputTitle>
        <InputContentWrapper>
          <InputContent>Select</InputContent>
          <Image src={ic_link_gray} alt="ic_link_gray" />
        </InputContentWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Weight (g/m2)</InputTitle>
        <InputContentWrapper2>
          <WeightInput
            placeholder="Input weight"
            onChange={(e) => inputWeightHandler(e)}
            value={productInfo.weight}
          />
          <Unit>g/m2</Unit>
        </InputContentWrapper2>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Price ($)</InputTitle>
        <InputContentWrapper2>
          <PriceInput
            placeholder="$0"
            onChange={(e) => inputAmountHandler(e)}
            value={amount}
          />
          <Unit>/m</Unit>
        </InputContentWrapper2>
      </InputWrapper>
      <InputColorContainer>
        <ColorButtonWrapper>
          <ColorTitle>Color</ColorTitle>
          <AddColorButton>
            <Image src={ic_plus} alt="ic_plus" />
            <AddColor>Add color</AddColor>
          </AddColorButton>
        </ColorButtonWrapper>
        <ColorTabWrapper>
          <ColorTab>
            <ColorCircle />
            <ColorName>Choose color</ColorName>
          </ColorTab>
        </ColorTabWrapper>
      </InputColorContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding-top: 16px;
  max-width: 1030px;
  color: #121822;
`;
const TitleDescriptionContainer = styled.div`
  margin-bottom: 16px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
`;
const Title = styled.div`
  margin-bottom: 7px;
`;
const TitleInput = styled.input`
  margin-bottom: 8px;
  padding: 0;
  width: 100%;
  height: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  border: none;
  &::placeholder {
    color: #a4b0b2;
  }
`;
const TitleInputLine = styled.div`
  margin-bottom: 20px;
  border-bottom: 1.172px solid #f2f6f8;
`;
const Description = styled.div`
  margin-bottom: 5px;
`;
const DescriptionInput = styled.textarea`
  width: 100%;
  height: 74px;
  border: none;
  resize: none;
  &::placeholder {
    color: #a4b0b2;
  }
`;
const DescriptionInputCount = styled.div`
  color: #a4b0b2;
  font-size: 10px;
`;
const InputWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1.172px solid #f2f6f8;
  box-sizing: border-box;
`;
const InputTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const InputContentWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const InputContentWrapper2 = styled.div`
  display: flex;
  align-items: center;
`;

const InputContent = styled.div`
  margin-right: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #a4b0b2;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;
const CustomCheckBox = styled.div<{ isChecked: boolean; img: string }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: ${(props) => {
    return props.isChecked == true ? "none" : "1px solid #E0E0E0;";
  }};
  border-radius: 2px;

  background-color: ${(props) => {
    return props.isChecked == true ? "#121822" : "#FFFFFF";
  }};

  background-image: ${(props) => {
    return props.isChecked == true ? `url(${props.img})` : "";
  }};
  background-size: 9.5px 7.4px;
  background-position: center;
  background-repeat: no-repeat;
`;
const Checkbox = styled.input`
  display: none;
`;
const WeightInput = styled.input`
  margin-right: 8.25px;
  border: none;
  width: 85px;
  text-align: right;
  font-size: 14px;
  &::placeholder {
    color: #a4b0b2;
  }
  &:focus {
    outline: none;
  }
`;
const Unit = styled.div`
  font-size: 14px;
`;
const Dollar = styled.div`
  font-size: 14px;
`;
const PriceInput = styled.input`
  margin-right: 5.5px;
  border: none;
  text-align: right;
  width: 85px;
  font-size: 14px;
  &::placeholder {
    color: #a4b0b2;
  }
  &:focus {
    outline: none;
  }
`;
const InputColorContainer = styled.div`
  margin-bottom: 20px;
  background-color: #f2f6f8;
`;
const ColorButtonWrapper = styled.div`
  padding-top: 11px;
  padding-bottom: 11px;
  padding-left: 20px;
  padding-right: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ColorTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 18.2px;
`;
const AddColorButton = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 6px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #dee8ec;
  background: #ffffff;
`;
const AddColor = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
`;
const ColorTabWrapper = styled.div`
  display: flex;
  gap: 1px;
`;
const ColorTab = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 15px;
  box-sizing: border-box;
  width: 148px;
  height: 49px;
  background-color: #ffffff;
`;
const ColorCircle = styled.div`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 100%;
  background-color: #fafafa;
`;
const ColorName = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  color: #a4b0b2;
`;

export default add_product;
