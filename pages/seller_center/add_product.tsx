import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import {
  ic_camera_play_wht,
  ic_check_wht,
  ic_close_wht,
  ic_image_upload_wht,
  ic_link_gray,
  ic_minus,
  ic_plus,
} from "../../assets";
import PopUpSelectColor from "../../components/seller_center/PopUpSelectColor";
import PopUpSelectComposition from "../../components/seller_center/PopUpSelectComposition";
import {
  PopUpSelectCountry,
  PopUpSelectDesign,
  PopUpSelectProject,
  PopUpSelectWidth,
} from "../../components/seller_center";
import { colorsRequest } from "../../utils/api";
const useAdd_product = () => {
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

  const [selectOption, setSelectOption] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [colors, setColors] = useState<any>(); // 컬러 리스트

  /** 컬러 리스트 세팅, 없으면 불러와서 세팅 */
  useEffect(() => {
    sessionStorage.getItem("colors")
      ? setColors([...JSON.parse(sessionStorage.getItem("colors") || "{}")])
      : colorsRequest().then((res: any) => {
          console.log(res?.data.result);
          sessionStorage.setItem("colors", JSON.stringify(res?.data.result));
          setColors([
            ...res?.data.result.map((el: any) => {
              return { ...el, isChecked: false };
            }),
          ]);
        });
  }, []);

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

  // TODO: price인 경우 - copy 할 때는 세팅 전에 amount에 $붙이고 세팅하면 될 듯
  /** price input 숫자, . 만 입력 및 앞에 $ 표기 */
  const inputAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "$") {
      e.target.value = "";
      setAmount("");
      return;
    }
    e.target.value = "$" + e.target.value.replace(/[^.0-9]/g, "");
    setAmount(e.target.value);
  };

  /** length 숫자, . 만 입력되게 */
  // const inputLengthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.target.value = e.target.value.replace(/[^.0-9]/g, "");
  //   setProductInfo({ ...productInfo, : e.target.value });
  // }

  const addColorHandler = () => {
    productInfo.options.push({
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
    });
    setProductInfo({ ...productInfo });
  };

  const samplePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    productInfo.options[selectOption].samplePrice = Number(e.target.value);
    setProductInfo({ ...productInfo });
  };

  useEffect(() => {
    console.log(productInfo);
  }, [productInfo]);

  return (
    <>
      <PopUpSelectColor
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        selectOption={selectOption}
      />
      <PopUpSelectComposition
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        selectOption={selectOption}
      />
      <PopUpSelectDesign
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        selectOption={selectOption}
      />
      <PopUpSelectProject
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        selectOption={selectOption}
      />
      <PopUpSelectCountry
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        selectOption={selectOption}
      />
      <PopUpSelectWidth
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        selectOption={selectOption}
      />
      <Container>
        <TitleDescriptionContainer>
          <Title>Title</Title>
          <TitleInput
            placeholder="Title"
            onChange={(e) =>
              setProductInfo({ ...productInfo, title: e.target.value })
            }
          />
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
          <InputContentWrapper onClick={() => setSelectCategory("composition")}>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <InputWrapper>
          <InputTitle>Design</InputTitle>
          <InputContentWrapper onClick={() => setSelectCategory("design")}>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <InputWrapper onClick={() => setSelectCategory("project")}>
          <InputTitle>Project</InputTitle>
          <InputContentWrapper>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <InputWrapper onClick={() => setSelectCategory("country")}>
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
          <InputContentWrapper onClick={() => setSelectCategory("width")}>
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
            <AddColorButton onClick={() => addColorHandler()}>
              <Image src={ic_plus} alt="ic_plus" />
              <AddColor>Add color</AddColor>
            </AddColorButton>
          </ColorButtonWrapper>
          {/** 컬러 선택 및 추가 */}
          <ColorTabWrapper>
            {productInfo &&
              productInfo.options.map((el: any, index: number) => {
                return (
                  <ColorTab
                    onClick={() => {
                      setSelectCategory("color");
                      setSelectOption(index);
                    }}
                    key={`${index}vbnuio`}
                  >
                    {el.colorNo === 0 ? (
                      <ColorCircle />
                    ) : (
                      <ColorWrapper>
                        <Image
                          src={colors[el.colorNo - 1].imagePath}
                          alt="color"
                          width={12}
                          height={12}
                        />
                      </ColorWrapper>
                    )}

                    <ColorName>
                      {el.colorNo === 0
                        ? "Choose color"
                        : `${colors[el.colorNo - 1].name}`}
                    </ColorName>
                  </ColorTab>
                );
              })}
          </ColorTabWrapper>
        </InputColorContainer>

        {productInfo.options &&
          productInfo.options.map((el: any, index: number) => {
            return (
              <OptionInputContainer
                index={index}
                selectOption={selectOption}
                key={`${index}vbnnbm`}
              >
                <WidthWeightPriceContainer>
                  <ContentWrapper>
                    <ContentName>Width (Inch)</ContentName>
                    <ValueWrapper>
                      <Value>{`${productInfo.width}`}</Value>
                      <Unit>inch</Unit>
                    </ValueWrapper>
                  </ContentWrapper>
                  <ContentWrapper>
                    <ContentName>Weight (g / m2)</ContentName>
                    <ValueWrapper>
                      <Value>{`${productInfo.weight}`}</Value>
                      <Unit>g/m2</Unit>
                    </ValueWrapper>
                  </ContentWrapper>
                  <ContentWrapper>
                    <ContentName>Price ($)</ContentName>
                    <ValueWrapper>
                      <Value>{`${amount}`}</Value>
                      <Unit>/m</Unit>
                    </ValueWrapper>
                  </ContentWrapper>
                </WidthWeightPriceContainer>
                <LengthInputWrapper>
                  <Length>Length</Length>
                  <LengthUnitWrapper>
                    <LengthInput placeholder="0" />
                    <LengthUnit>m</LengthUnit>
                  </LengthUnitWrapper>
                </LengthInputWrapper>
                <TotalPriceWrapper>
                  <TotalPriceName>TotalPrice</TotalPriceName>
                  <TotalPriceUnitWrapper>
                    <TotalPrice></TotalPrice>
                    <RollUnit>/Roll</RollUnit>
                    <InchMeterUnit>(100inch*30m)</InchMeterUnit>
                  </TotalPriceUnitWrapper>
                </TotalPriceWrapper>
                <Roll>Roll available</Roll>
                <RollInputWrapper>
                  <PlusMinusButton>
                    <Image src={ic_minus} alt="ic_minus" />
                  </PlusMinusButton>
                  <RollInput
                    value={productInfo.options[index].quantity}
                    count={productInfo.options[index].quantity}
                  />
                  <PlusMinusButton>
                    <Image src={ic_plus} alt="ic_minus" />
                  </PlusMinusButton>
                </RollInputWrapper>
                <SampleButtonWrapper>
                  <SampleButton>Provide sample</SampleButton>
                  <SampleButton>Not provide sample</SampleButton>
                </SampleButtonWrapper>
                <SamplePriceWrapper>
                  <InputTitle>Price ($)</InputTitle>
                  <InputContentWrapper2>
                    <PriceInput
                      placeholder="$0"
                      onChange={(e) => samplePriceHandler(e)}
                      value={productInfo.options[selectOption].samplePrice}
                    />
                    <Unit>/each</Unit>
                  </InputContentWrapper2>
                </SamplePriceWrapper>
                <UploadImageVideoWrapper>
                  <ImageButton>
                    <Image
                      src={ic_image_upload_wht}
                      alt="ic_image_upload_wht"
                    />
                  </ImageButton>
                  <ImageButton>
                    <RemoveButton>
                      <Image
                        src={ic_close_wht}
                        alt="ic_close_wht"
                        width={10}
                        height={10}
                      />
                    </RemoveButton>
                    <Image
                      src={ic_image_upload_wht}
                      alt="ic_image_upload_wht"
                    />
                  </ImageButton>
                </UploadImageVideoWrapper>
                <ImageVideoText>
                  Please upload clear photos so that buyers can see the details
                  of your products.(max10)
                </ImageVideoText>

                <UploadImageVideoWrapper>
                  <ImageButton>
                    <Image src={ic_camera_play_wht} alt="ic_camera_play_wht" />
                  </ImageButton>
                  <ImageButton>
                    <RemoveButton>
                      <Image
                        src={ic_close_wht}
                        alt="ic_close_wht"
                        width={20}
                        height={20}
                      />
                    </RemoveButton>
                    <Image src={ic_camera_play_wht} alt="ic_camera_play_wht" />
                  </ImageButton>
                </UploadImageVideoWrapper>
                <ImageVideoText>
                  Uploading at least one video is required.(max1)
                </ImageVideoText>
                <SellProductButton>Sell Product</SellProductButton>
              </OptionInputContainer>
            );
          })}
      </Container>
    </>
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
  margin-bottom: 20px;
  padding: 0;
  padding-top: 7px;
  padding-bottom: 8px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1.172px solid #f2f6f8;
  width: 100%;
  height: 24px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  &::placeholder {
    color: #a4b0b2;
  }
`;
const TitleInputLine = styled.div``;
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
  &:last-of-type {
    margin-right: 7px;
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
  cursor: pointer;
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
  cursor: pointer;
`;
const ColorCircle = styled.div`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 100%;
  background-color: #fafafa;
`;

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 12px;
  height: 12px;
`;
const ColorName = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  color: #a4b0b2;
`;
const OptionInputContainer = styled.div<{
  index: number;
  selectOption: number;
}>`
  display: ${(props) => {
    return props.index !== props.selectOption && "none";
  }};
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;
const WidthWeightPriceContainer = styled.div`
  margin-bottom: 17px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 2px;
  border: 1px solid #deeff7;
  background-color: #f0faff;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentName = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const ValueWrapper = styled.div`
  display: flex;
`;
const Value = styled.div`
  font-size: 14px;
  font-weight: 700;
  &:nth-of-type(1) {
    margin-right: 2px;
  }
  &:nth-of-type(2) {
    margin-right: 1px;
  }
  &:nth-of-type(3) {
    margin-right: 4px;
  }
`;
const LengthInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 11px;
  border-bottom: 1px solid #f2f6f8;
`;
const Length = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  letter-spacing: -0.132px;
`;
const LengthUnitWrapper = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;
const LengthInput = styled.input`
  width: 85px;
  font-size: 14px;
  font-weight: 700;
  line-height: 18.2px;
  border: none;
  text-align: right;
  &::placeholder {
    color: #a4b0b2;
  }
`;
const LengthUnit = styled.div`
  font-weight: 400;
`;
const TotalPriceWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f6f8;
`;
const TotalPriceName = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 15.6px;
  letter-spacing: -0.132px;
`;
const TotalPriceUnitWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const TotalPrice = styled.div`
  margin-right: 3.5px;
`;
const RollUnit = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const InchMeterUnit = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #a4b0b2;
`;
const Roll = styled.div`
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  letter-spacing: -0.132px;
`;
const RollInputWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 23.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #f2f6f8;
  box-sizing: border-box;
`;
const RollInput = styled.input<{ count: number }>`
  width: 100%;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #dee8ec;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => {
    return props.count === 0 ? "#A4B0B2" : "#000000";
  }};
`;
const PlusMinusButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 100%;
  border: 0.794px solid #dee8ec;
  background-color: #f2f6f8;
`;
const SampleButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  height: 42px;
  font-size: 14px;
  font-weight: 400;
`;
const SampleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  border-radius: 2px 0px 0px 2px;
  border: 1px solid #121822;
  background-color: #121822;
  color: #ffffff;
  &:last-of-type {
    border-radius: 0px 2px 2px 0px;
    border: 1px solid #dee8ec;
    background-color: #ffffff;
    color: #121822;
  }
`;
const SamplePriceWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f6f8;
`;
const UploadImageVideoWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;
const ImageButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 2px;
  background-color: #a4b0b2;
  overflow: hidden;
`;
const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 8px;
  right: 6px;
  border-radius: 100%;
  background-color: #121822;
`;
const ImageVideoText = styled.div`
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  letter-spacing: -0.132px;
  color: #a4b0b2;
  &:last-of-type {
    margin: 0;
  }
`;
const SellProductButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border-radius: 2px;
  border: 0.794px solid #d4f01e;
  background-color: #e1ff20;
  height: 48px;
  font-size: 14px;

  font-weight: 700;
  line-height: 18.2px;
`;

export default useAdd_product;
