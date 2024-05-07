import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import {
  ic_camera_play_wht,
  ic_check_wht,
  ic_close_wht,
  ic_down_link,
  ic_image_upload_wht,
  ic_link,
  ic_link_gray,
  ic_minus,
  ic_plus,
  ic_x_photo_m,
} from "../../assets";
import PopUpSelectColor from "../../components/seller_center/PopUpSelectColor";
import PopUpSelectComposition from "../../components/seller_center/PopUpSelectComposition";
import {
  PopUpSelectCountry,
  PopUpSelectDesign,
  PopUpSelectProject,
  PopUpSelectWidth,
  VideoPreview,
} from "../../components/seller_center";
import {
  colorsRequest,
  imageUploadRequest,
  productRegisterRequest,
  videoUploadRequest,
} from "../../utils/api";
import axios from "axios";
import { useRouter } from "next/router";
const useAdd_product = () => {
  const [productInfo, setProductInfo] = useState<any>({
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
    price: "",
    options: [
      {
        colorNo: 0,
        length: "",
        lengthUnitType: "METER",
        amount: 0,
        quantity: "",
        supportSample: false,
        samplePrice: 0,
        sampleQuantity: 0,
        files: [
          // {
          //   type: "IMAGE",
          //   imageUrl: "",
          //   resourceUrl: "",
          //   width: 0,
          //   height: 0,
          // },
        ],
      },
    ],
  });

  const [selectOption, setSelectOption] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [colors, setColors] = useState<any>(); // 컬러 리스트
  const commonInfoRef = useRef<any>([]); // 에러케이스 공통 입력 담길 ref
  const colorInfoLengthRef = useRef<any>([]); // 컬러 옵션의 length 입력 담길 ref
  const [validationRealTime, setValidationRealTime] = useState(false); // 유효성 검사 실시간 렌더링 기준이 되는 값, true면 실시간으로 렌더링됨
  const [clickIndex, setClickIndex] = useState(-1); // 클릭한 이미지 인덱스
  const [clickVideoIndex, setClickVideoIndex] = useState(-1); // 클릭한 이미지 인덱스

  const imageRef = useRef<any>([]);
  const videoRef = useRef<any>([]);
  const lengthRef = useRef<any>([]);
  const rollRef = useRef<any>([]);

  const [validation, setValidation] = useState<{ [key: string]: number }>({
    title: 0,
    description: 0,
    composition: 0,
    design: 0,
    project: 0,
    country: 0,
    width: 0,
    weight: 0,
    price: 0,
  });

  const router = useRouter();

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
    if (productInfo.options[0].colorNo === 0) {
      return;
    }

    if (productInfo.options[productInfo.options.length - 1].colorNo === 0) {
      setSelectCategory("color");
      setSelectOption(productInfo.options.length - 1);
    }
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

  // TODO: price인 경우 - copy 할 때는 세팅 전에 price에 $붙이고 세팅하면 될 듯
  /** price input 숫자, . 만 입력 및 앞에 $ 표기 */
  const inputPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "$") {
      e.target.value = "";
      setProductInfo({ ...productInfo, price: "" });
      return;
    }
    e.target.value = e.target.value.replace(/[^.0-9]/g, "");
    setProductInfo({ ...productInfo, price: e.target.value });
    e.target.value = "$" + e.target.value;
  };

  /** length 숫자, . 만 입력되게 */
  const inputLengthHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.target.value = e.target.value.replace(/[^.0-9]/g, "");
    productInfo.options[index].length = e.target.value;
    setProductInfo({ ...productInfo });
  };

  /** 컬러 추가 */
  const addColorHandler = () => {
    // 컬러 개수 10개면 리턴
    if (productInfo.options.length === 10) {
      return;
    }

    productInfo.options.push({
      colorNo: 0,
      length: "",
      lengthUnitType: "METER",
      amount: 0,
      quantity: "",
      supportSample: false,
      samplePrice: 0,
      sampleQuantity: 0,
      files: [
        // {
        //   type: "IMAGE",
        //   imageUrl: "",
        //   resourceUrl: "",
        //   width: 0,
        //   height: 0,
        // },
      ],
    });
    setProductInfo({ ...productInfo });
  };

  /** 컬러 삭제 */
  const removeColorHandler = (index: number) => {
    // 컬러 옵션 하나 남아있는 경우 삭제 하지 않고 colorNo를 0으로
    if (productInfo.options.length === 1) {
      productInfo.options[index].colorNo = 0;
      setProductInfo({ ...productInfo });
      return;
    }
    productInfo.options.splice(index, 1);
    setProductInfo({ ...productInfo });

    // 선택한 컬러 옵션이랑 삭제하고자하는 컬러 옵션이랑 같으면
    console.log(selectOption);
    console.log(index);
    if (selectOption === index) {
      console.log(index - 1);
      setSelectOption(index - 1);
      console.log(index - 1);
    }
  };

  useEffect(() => {
    console.log(selectOption);
  }, [selectOption]);

  /** 상품 개수 빼기 */
  const minusQuantity = (index: number) => {
    // 0이면 리턴
    if (productInfo.options[index].quantity === "") {
      return;
    }
    productInfo.options[index].quantity =
      Number(productInfo.options[index].quantity) - 1;
    setProductInfo({ ...productInfo });
  };

  /** 상품 개수 더하기 */
  const plusQuantity = (index: number) => {
    productInfo.options[index].quantity =
      Number(productInfo.options[index].quantity) + 1;
    setProductInfo({ ...productInfo });
  };

  useEffect(() => {
    console.log(productInfo.options);
  }, [productInfo]);
  const samplePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    productInfo.options[selectOption].samplePrice = Number(e.target.value);
    setProductInfo({ ...productInfo });
  };

  /** 이미지 업로드 관리 */
  const imageFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log(Array.from(e.target.files || []));
    // imageFiles.push(Array.from(e.target.files || []));
    // imageFiles([...imageFiles]);
  };

  const [previewImages, setPreviewImages] = useState<[string[]]>([[]]); // 이미지 미리보기
  const [previewVideos, setPreviewVideos] = useState<[string[]]>([[]]); // 비디오 미리보기
  const [imageFiles, setImageFiles] = useState<any>([[]]);
  const [videoFiles, setVideoFiles] = useState<any>([[]]);

  // TODO: 파일 추가 기능

  /** 파일 업로드 */
  function uploadFile(
    files: any,
    previews: [string[]],
    setPreviews: React.Dispatch<React.SetStateAction<[string[]]>>,
    contentFiles: any,
    setContentFiles: React.Dispatch<React.SetStateAction<any>>
  ) {
    // 파일 개수 10개일 경우
    if (
      contentFiles[selectOption] &&
      contentFiles[selectOption].length === 10
    ) {
      return;
    }

    // 파일개수 없는 경우
    if (
      previews[selectOption] === undefined ||
      previews[selectOption].length === 0
    ) {
      // 미리보기 세팅 최대 10개만
      previews[selectOption] = [];
      for (let i = 0; i < (files.length > 10 ? 10 : files.length); i++) {
        previews[selectOption].push(URL.createObjectURL(files[i]));
      }
      setPreviews([...previews]);
      // 파일 배열 형태로 세팅 최대 10개
      contentFiles[selectOption] = Array.from(files || []).slice(0, 10);
      setContentFiles([...contentFiles]);
      return;
    }

    // 파일 개수 있는 경우
    // 미리보기 세팅 최대 10개
    for (
      let i = 0;
      i <
      (files.length + contentFiles[selectOption].length > 10
        ? 10 - contentFiles[selectOption].length
        : files.length);
      i++
    ) {
      console.log(i);
      previews[selectOption].push(URL.createObjectURL(files[i]));
    }
    setPreviews([...previews]);
    // 파일 배열 형태로 세팅
    contentFiles[selectOption].push(
      ...Array.from(files || []).slice(
        0,
        10 - contentFiles[selectOption].length
      )
    );
    setContentFiles([...contentFiles]);

    return;
  }

  /** 비디오 업로드 */
  function uploadVideoFile(
    files: any,
    previews: [string[]],
    setPreviews: React.Dispatch<React.SetStateAction<[string[]]>>,
    contentFiles: any,
    setContentFiles: React.Dispatch<React.SetStateAction<any>>
  ) {
    // 파일 1개 있을 경우
    if (contentFiles[selectOption] && contentFiles[selectOption].lengh === 1) {
      return;
    }

    // 파일개수 없는 경우
    if (
      previews[selectOption] === undefined ||
      previews[selectOption].length === 0
    ) {
      // 미리보기 세팅 최대 1개만
      previews[selectOption] = [];
      previews[selectOption].push(URL.createObjectURL(files[0]));

      setPreviews([...previews]);
      // 비디오 파일 세팅
      setContentFiles([...Array.from(files || [])]);

      return;
    }
  }

  useEffect(() => {
    console.log(imageFiles);
  }, [imageFiles]);

  useEffect(() => {
    console.log(videoFiles);
  }, [videoFiles]);

  /** 파일 삭제 */
  const deleteFile = (
    index: number,
    previews: [string[]],
    setPreviews: React.Dispatch<React.SetStateAction<[string[]]>>,
    contentFiles: any,
    setContentFiles: React.Dispatch<React.SetStateAction<any>>
  ) => {
    console.log("삭제");
    // 미리보기 삭제
    previews[selectOption] = [
      ...previews[selectOption].slice(0, index),
      ...previews[selectOption].slice(index + 1),
    ];
    setPreviews([...previews]);

    // file array 삭제
    contentFiles[selectOption] = [
      ...contentFiles[selectOption].slice(0, index),
      ...contentFiles[selectOption].slice(index + 1),
    ];
    setContentFiles([...contentFiles]);
  };

  /** 파일 삭제: 동영상 */
  const deleteFileVideo = (
    index: number,
    previews: [string[]],
    setPreviews: React.Dispatch<React.SetStateAction<[string[]]>>,
    contentFiles: any,
    setContentFiles: React.Dispatch<React.SetStateAction<any>>
  ) => {
    console.log("삭제");
    // 미리보기 삭제
    previews[selectOption] = [];
    setPreviews([...previews]);

    // file array 삭제
    contentFiles[selectOption] = [];
    setContentFiles([...contentFiles]);
  };

  // title: false,
  // description: false,
  // composition: false,
  // design: false,
  // project: false,
  // country: false,
  // width: false,
  // weight: false,
  // price: false,

  /** 유효성 검사 composition */
  const checkValidationComposition = () => {
    let sum = 0;
    for (const el of productInfo.materials) {
      sum += Number(el.value);
    }
    if (sum === 100) {
      return true;
    }
    return false;
  };

  /** 유효성 검사 옵션 컬러 */
  const checkValidationColor = (i: number) => {
    if (productInfo.options[i].colorNo === 0) {
      return false;
    }
    return true;
  };
  /** 유효성 검사 옵션 길이 */
  const checkValidationLength = (i: number) => {
    if (productInfo.options[i].length === "") {
      return false;
    }
    return true;
  };
  /** 유효성 검사 옵션 롤 */
  const checkValidationRoll = (i: number) => {
    if (productInfo.options[i].quantity === "") {
      return false;
    }
    return true;
  };
  /** 유효성 검사 옵션 이미지 파일 */
  const checkValidationImageFiles = (i: number) => {
    if (imageFiles[i]?.length === 0 || imageFiles[i] === undefined) {
      return false;
    }
    return true;
  };
  /** 유효성 검사 옵션 비디오 파일 */
  const checkValidationVideoFiles = (i: number) => {
    if (videoFiles[i]?.length === 0 || videoFiles[i] === undefined) {
      return false;
    }
    return true;
  };

  /** 전체 유효성 검사 */
  const validationCheck = () => {
    // 실시간 유효성 검사 결과 렌더링 시작
    setValidationRealTime(true);

    let result = true; // 유효성 검사 결과 값

    // title
    if (productInfo.title.length === 0) {
      result = false;
      commonInfoRef.current[0].focus();
      console.log("title");
      return result;
    }
    // description
    if (productInfo.description.length === 0) {
      result = false;
      commonInfoRef.current[1].focus();
      console.log("description");
      return result;
    }
    // composition
    if (!checkValidationComposition()) {
      result = false;
      commonInfoRef.current[2].scrollIntoView({
        block: "center",
        inline: "start",
      });
      console.log("composition");
      return result;
    }
    // design
    if (productInfo.designNo === 0) {
      result = false;
      commonInfoRef.current[3].scrollIntoView({
        block: "center",
        inline: "start",
      });
      console.log("design");
      return result;
    }
    // project
    if (productInfo.projectNo === 0) {
      result = false;
      commonInfoRef.current[4].scrollIntoView({
        block: "center",
        inline: "start",
      });
      console.log("project");
      return result;
    }

    // country
    if (productInfo.originNo === 0) {
      result = false;
      commonInfoRef.current[5].scrollIntoView({
        block: "center",
        inline: "start",
      });
      console.log("country");
      return result;
    }
    // width
    if (productInfo.width === 0) {
      result = false;
      commonInfoRef.current[6].scrollIntoView({
        block: "center",
        inline: "start",
      });
      return result;
    }
    // weight
    if (productInfo.weight.length === 0) {
      result = false;
      commonInfoRef.current[7].scrollIntoView({
        block: "center",
        inline: "start",
      });
      return result;
    }
    // price
    if (productInfo.price.length === 0) {
      result = false;
      commonInfoRef.current[8].scrollIntoView({
        block: "center",
        inline: "start",
      });
      return result;
    }
    // 컬러 옵션별 유효성
    for (let i = 0; i < productInfo.options.length; i++) {
      // color
      if (!checkValidationColor(i)) {
        result = false;
        return result;
      }

      // length
      if (!checkValidationLength(i)) {
        result = false;
        setSelectOption(i);

        return result;
      }

      // roll available
      if (!checkValidationRoll(i)) {
        result = false;
        setSelectOption(i);

        return result;
      }

      // image file
      if (!checkValidationImageFiles(i)) {
        result = false;
        return result;
      }

      // video file
      if (!checkValidationVideoFiles(i)) {
        result = false;
        return result;
      }
    }

    console.log(result);

    return result;
  };

  /** 이미지 서버에 저장 */
  const imageUploadRequestHandler = () => {
    const at = localStorage.getItem("at");
    const multiImageUploadRequest = () => {
      let arr = [];
      for (const fileArr of imageFiles) {
        for (const file of fileArr) {
          arr.push(file);
        }
      }

      return arr.map((el: any, index: number) => {
        const formData = new FormData();
        formData.append("images", el);
        console.log(el);
        console.log(formData.get("images"));

        return imageUploadRequest(at, formData);
      });
    };

    const multiVideoUploadRequest = () => {
      let arr = [];
      for (const fileArr of videoFiles) {
        for (const file of fileArr) {
          arr.push(file);
        }
      }

      return arr.map((el: any, index: number) => {
        const formData = new FormData();
        formData.append("videos", el);
        console.log(el);
        console.log(formData.get("videos"));

        return videoUploadRequest(at, formData);
      });
    };

    axios.all(multiImageUploadRequest()).then((res: any) => {
      console.log(res);

      let index = 0;
      for (let x = 0; x < imageFiles.length; x++) {
        for (let y = 0; y < imageFiles[x].length; y++) {
          const result = res[index]?.data.result;
          console.log(result);

          productInfo.options[x].files.push({
            type: "IMAGE",
            imageUrl: result.resourceUrl,
            resourceUrl: result.resourceUrl,
            width: result.width,
            height: result.height,
          });
          index += 1;
        }
      }
      axios.all(multiVideoUploadRequest()).then((res: any) => {
        console.log(res);
        let index = 0;
        for (let x = 0; x < videoFiles.length; x++) {
          for (let y = 0; y < videoFiles[x].length; y++) {
            const result = res[index]?.data.result;

            productInfo.options[x].files.push({
              type: "VIDEO",
              resourceUrl: result,
            });
            index += 1;
          }
        }
      });

      console.log(productInfo);
      // TODO: 현재 동영상 업로드가 안됨, 예상 문제로는 동영상 파라미터 width, weight 빠져서 그런걸 수도 ? 처음부터 resourceURL확인해서 작업해보자
      // 상품 등록 요청
      productRegisterRequest(at, productInfo).then((res) => {
        console.log(res);
        // 성공 case
        if (res?.data.status === 200) {
          router.push("/seller_center/home");
        }
      });
    });
  };

  /** 상품등록 요청 */
  const productRegisterHandler = () => {
    validationCheck() && console.log("성공");
    // && imageUploadRequestHandler(); 임시 비활성화
  };

  const imageUploadTest = () => {
    console.log(imageFiles);
    const data = new FormData();
    data.append("images", imageFiles[0][0]);
    const at = localStorage.getItem("at");
    imageUploadRequest(at, data).then((res) => {
      console.log(res);
    });
  };

  /** 롤 숫자만 입력되게 */
  const rollInputHandler = (e: any, i: number) => {
    if (e.target.value === "0") {
      return;
    }
    e.target.value = e.target.value.replace(/[^0-9]/g, "");

    productInfo.options[i].quantity = e.target.value;

    console.log(productInfo.options[i]);
    setProductInfo({ ...productInfo });
  };

  useEffect(() => {
    if (lengthRef.current[selectOption].value === "") {
      lengthRef.current[selectOption].focus();
      return;
    }
    if (rollRef.current[selectOption].value === "") {
      rollRef.current[selectOption].focus();
      return;
    }
  }, [selectOption]);

  /** 숫자만 입력되게 */
  // const inputRollHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.target.value = e.target.value.replace(/[^.0-9]/g, "");
  //   setProductInfo({ ...productInfo, weight: e.target.value });
  // };

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
            ref={(el) => (commonInfoRef.current[0] = el)}
          />
          <ErrorCase0
            error={validationRealTime && productInfo.title.length === 0}
          >
            Error case
          </ErrorCase0>
          <TitleInputLine />
          <Description>Description</Description>
          <DescriptionInput
            placeholder="(예시: 펜톤컬러, 색상 디테일)"
            onChange={(e) => descriptionCheckHandler(e)}
            value={productInfo.description}
            ref={(el) => (commonInfoRef.current[1] = el)}
          />
          <DescriptionInputCount>
            {`${productInfo.description.length}`}/1000
          </DescriptionInputCount>
          <ErrorCase0
            error={validationRealTime && productInfo.description.length === 0}
          >
            Error case
          </ErrorCase0>
        </TitleDescriptionContainer>
        <InputWrapper>
          <InputTitle ref={(el) => (commonInfoRef.current[2] = el)}>
            Composition
          </InputTitle>
          <InputContentWrapper onClick={() => setSelectCategory("composition")}>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <ErrorCase error={validationRealTime && !checkValidationComposition()}>
          Error case
        </ErrorCase>
        <InputWrapper>
          <InputTitle ref={(el) => (commonInfoRef.current[3] = el)}>
            Design
          </InputTitle>
          <InputContentWrapper onClick={() => setSelectCategory("design")}>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <ErrorCase error={validationRealTime && productInfo.designNo === 0}>
          Error case
        </ErrorCase>
        <InputWrapper onClick={() => setSelectCategory("project")}>
          <InputTitle ref={(el) => (commonInfoRef.current[4] = el)}>
            Project
          </InputTitle>
          <InputContentWrapper>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <ErrorCase error={validationRealTime && productInfo.projectNo === 0}>
          Error case
        </ErrorCase>
        <InputWrapper onClick={() => setSelectCategory("country")}>
          <InputTitle ref={(el) => (commonInfoRef.current[5] = el)}>
            Country of origin
          </InputTitle>
          <InputContentWrapper>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <ErrorCase error={validationRealTime && productInfo.originNo === 0}>
          Error case
        </ErrorCase>
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
        <ErrorCase error={false}>Error case</ErrorCase>

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
        <ErrorCase error={false}>Error case</ErrorCase>
        <InputWrapper>
          <InputTitle ref={(el) => (commonInfoRef.current[6] = el)}>
            Width (Inch)
          </InputTitle>
          <InputContentWrapper onClick={() => setSelectCategory("width")}>
            <InputContent>Select</InputContent>
            <Image src={ic_link_gray} alt="ic_link_gray" />
          </InputContentWrapper>
        </InputWrapper>
        <ErrorCase error={validationRealTime && productInfo.width === 0}>
          Error case
        </ErrorCase>
        <InputWrapper>
          <InputTitle ref={(el) => (commonInfoRef.current[7] = el)}>
            Weight (g/m2)
          </InputTitle>
          <InputContentWrapper2>
            <WeightInput
              placeholder="Input weight"
              onChange={(e) => inputWeightHandler(e)}
              value={productInfo.weight}
            />
            <Unit>g/m2</Unit>
          </InputContentWrapper2>
        </InputWrapper>
        <ErrorCase
          error={validationRealTime && productInfo.weight.length === 0}
        >
          Error case
        </ErrorCase>
        <InputWrapper>
          <InputTitle ref={(el) => (commonInfoRef.current[8] = el)}>
            Price ($)
          </InputTitle>
          <InputContentWrapper2>
            <PriceInput
              placeholder="$0"
              onChange={(e) => inputPriceHandler(e)}
            />
            <Unit>/m</Unit>
          </InputContentWrapper2>
        </InputWrapper>
        <ErrorCase error={validationRealTime && productInfo.price.length === 0}>
          Error case
        </ErrorCase>
        <InputColorContainer>
          <ColorButtonWrapper>
            <ColorTitle>Color</ColorTitle>
            <AddColorButton
              onClick={() => addColorHandler()}
              display={productInfo.options[0].colorNo === 0 ? false : true}
            >
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
                      el.colorNo === 0 && setSelectCategory("color");
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

                    {el.colorNo === 0 ? (
                      <IconWrapper>
                        <Image
                          src={ic_down_link}
                          alt="ic_down_link"
                          width={11}
                          height={6}
                        />
                      </IconWrapper>
                    ) : (
                      <IconWrapper
                        onClick={(e) => {
                          e.stopPropagation();
                          removeColorHandler(index);
                        }}
                      >
                        <Image
                          src={ic_x_photo_m}
                          alt="remove_ic"
                          width={20}
                          height={20}
                        />
                      </IconWrapper>
                    )}
                  </ColorTab>
                );
              })}
          </ColorTabWrapper>
        </InputColorContainer>

        {/** 컬러 옵션 하위 값들 */}
        {productInfo.options &&
          productInfo.options.map((el: any, index: number) => {
            return (
              <OptionInputContainer
                index={index}
                selectOption={selectOption}
                render={el.colorNo > 0 || index !== 0}
                key={`${index}vbnnbm`}
                // ref={(el) => {
                //   validationRef.current[index] = el;
                // }}
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
                      <Value>{`${
                        productInfo.price ? `$${productInfo.price}` : ""
                      }`}</Value>
                      <Unit>/m</Unit>
                    </ValueWrapper>
                  </ContentWrapper>
                </WidthWeightPriceContainer>
                <LengthInputWrapper>
                  <Length>Length</Length>
                  <LengthUnitWrapper>
                    <LengthInput
                      placeholder="0"
                      onChange={(e) => inputLengthHandler(e, index)}
                      ref={(el) => (lengthRef.current[index] = el)}
                    />
                    <LengthUnit>m</LengthUnit>
                  </LengthUnitWrapper>
                </LengthInputWrapper>
                <ErrorCase2
                  error={validationRealTime && !checkValidationLength(index)}
                >
                  Error case
                </ErrorCase2>
                <TotalPriceWrapper>
                  <TotalPriceName>TotalPrice</TotalPriceName>
                  <TotalPriceUnitWrapper>
                    <TotalPrice>
                      {productInfo.options[index].length && productInfo.price
                        ? `$${
                            Number(productInfo.options[index].length) *
                            Number(productInfo.price)
                          }`
                        : ""}
                    </TotalPrice>
                    <RollUnit>/Roll</RollUnit>
                    <InchMeterUnit>
                      ({`${productInfo.width}`}inch*
                      {`${
                        productInfo.options[index].length
                          ? productInfo.options[index].length
                          : 0
                      }`}
                      m)
                    </InchMeterUnit>
                  </TotalPriceUnitWrapper>
                </TotalPriceWrapper>
                <Roll>Roll available</Roll>
                <RollInputWrapper>
                  <RollInputBox>
                    <PlusMinusButton>
                      <Image
                        src={ic_minus}
                        alt="ic_minus"
                        onClick={() => minusQuantity(index)}
                      />
                    </PlusMinusButton>
                    <RollInput
                      onChange={(e) => rollInputHandler(e, index)}
                      value={productInfo.options[index].quantity}
                      count={productInfo.options[index].quantity}
                      placeholder="0"
                      ref={(el) => (rollRef.current[index] = el)}
                    />
                    <PlusMinusButton>
                      <Image
                        src={ic_plus}
                        alt="ic_minus"
                        onClick={() => plusQuantity(index)}
                      />
                    </PlusMinusButton>
                  </RollInputBox>
                  <ErrorCase3
                    error={validationRealTime && !checkValidationRoll(index)}
                  >
                    Error case
                  </ErrorCase3>
                </RollInputWrapper>
                {/* <SampleButtonWrapper>
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
                </SamplePriceWrapper> */}
                <UploadImageVideoWrapper>
                  <ImageButton htmlFor={`imageUpload${index}`}>
                    <ImageVideoInput
                      id={`imageUpload${index}`}
                      type="file"
                      accept=".jpg, .png"
                      multiple
                      disabled={
                        imageFiles[index] && imageFiles[index].length === 10
                          ? true
                          : false
                      }
                      // onChange={(e) => imageFileHandler(e)}
                      onChange={(e) =>
                        uploadFile(
                          e.target.files,
                          previewImages,
                          setPreviewImages,
                          imageFiles,
                          setImageFiles
                        )
                      }
                    />
                    <Image
                      src={ic_image_upload_wht}
                      alt="ic_image_upload_wht"
                    />
                  </ImageButton>
                  {previewImages[selectOption] &&
                    previewImages[selectOption].map(
                      (el: any, index: number) => {
                        return (
                          <ImageComponent>
                            <ImageButton
                              key={`${index}-298`}
                              onClick={() => setClickIndex(index)}
                            >
                              <RemoveButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteFile(
                                    index,
                                    previewImages,
                                    setPreviewImages,
                                    imageFiles,
                                    setImageFiles
                                  );
                                }}
                              >
                                <Image
                                  src={ic_close_wht}
                                  alt="ic_close_wht"
                                  width={10}
                                  height={10}
                                />
                              </RemoveButton>
                              <Image
                                src={el}
                                alt="ic_image_upload_wht"
                                width={80}
                                height={80}
                              />
                            </ImageButton>
                            <BackGround
                              index={index}
                              clickIndex={clickIndex}
                              onClick={() => setClickIndex(-1)}
                            >
                              <BigImage tabIndex={0}>
                                <Image
                                  src={el}
                                  alt="bigImage"
                                  layout="fill"
                                  objectFit="cover"
                                  objectPosition="center"
                                />
                              </BigImage>
                            </BackGround>
                          </ImageComponent>
                        );
                      }
                    )}
                </UploadImageVideoWrapper>
                <ImageVideoText>
                  Please upload clear photos so that buyers can see the details
                  of your products.(max10)
                </ImageVideoText>
                <ErrorCase4
                  error={
                    validationRealTime && !checkValidationImageFiles(index)
                  }
                >
                  Error case
                </ErrorCase4>
                <UploadImageVideoWrapper>
                  <ImageButton htmlFor={`videoUpload${index}`}>
                    <Image src={ic_camera_play_wht} alt="ic_camera_play_wht" />
                  </ImageButton>
                  <ImageVideoInput
                    id={`videoUpload${index}`}
                    type="file"
                    accept=".mp4"
                    onChange={(e) =>
                      uploadVideoFile(
                        e.target.files,
                        previewVideos,
                        setPreviewVideos,
                        videoFiles,
                        setVideoFiles
                      )
                    }
                    disabled={
                      videoFiles[selectOption] &&
                      videoFiles[selectOption].length === 1
                        ? true
                        : false
                    }
                  />
                  {previewVideos[selectOption] &&
                    previewVideos[selectOption].map(
                      (el: any, index: number) => {
                        return (
                          <VideoPreview
                            key={`${index}-773`}
                            el={el}
                            deleteFile={deleteFileVideo}
                            index={index}
                            clickVideoIndex={clickVideoIndex}
                            setClickVideoIndex={setClickVideoIndex}
                            previewVideos={previewVideos}
                            setPreviewVideos={setPreviewVideos}
                            videoFiles={videoFiles}
                            setVideoFiles={setVideoFiles}
                          />

                          // <ImageButton onClick={() => videoHandler(index)}>
                          //   <RemoveButton
                          //     onClick={() =>
                          //       deleteFile(
                          //         index,
                          //         previewVideos,
                          //         setPreviewVideos,
                          //         videoFiles,
                          //         setVideoFiles
                          //       )
                          //     }
                          //   >
                          //     <Image
                          //       src={ic_close_wht}
                          //       alt="ic_close_wht"
                          //       width={10}
                          //       height={10}
                          //     />
                          //   </RemoveButton>
                          //   <PlayButton>
                          //     <Image
                          //       src={ic_camera_play_wht}
                          //       alt="ic_camera_play_wht"
                          //     />
                          //   </PlayButton>

                          //   <Video
                          //     src={el}
                          //     width="80px"
                          //     height="80px"
                          //     ref={(el) => {
                          //       setVideoState(el);
                          //     }}
                          //   >
                          //     {/* <source src={el} type="video/mp4" /> */}
                          //   </Video>
                          // </ImageButton>
                        );
                      }
                    )}
                </UploadImageVideoWrapper>

                <ImageVideoText>
                  Uploading at least one video is required.(max1)
                </ImageVideoText>
                <ErrorCase5
                  error={
                    validationRealTime && !checkValidationVideoFiles(index)
                  }
                >
                  Error case
                </ErrorCase5>
                <SellProductButton onClick={() => productRegisterHandler()}>
                  Sell Product
                </SellProductButton>
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
  margin-bottom: 10px;
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
const ErrorCase0 = styled.div<{ error: boolean }>`
  visibility: ${(props) => {
    return props.error ? "visible" : "hidden";
  }};
  margin-top: ${(props) => {
    return props.error ? "7px" : "4px";
  }};
  height: ${(props) => {
    return props.error ? "" : "0px";
  }};
  margin-bottom: 16px;
  color: #ff2f01;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  &:nth-of-type(2) {
    margin-top: ${(props) => {
      return props.error ? "7px" : "0px";
    }};
    margin-bottom: 20px;
  }
`;
const ErrorCase = styled.div<{ error: boolean }>`
  visibility: ${(props) => {
    return props.error ? "visible" : "hidden";
  }};
  margin-top: ${(props) => {
    return props.error ? "10px" : "0px";
  }};
  height: ${(props) => {
    return props.error ? "" : "0px";
  }};
  margin-bottom: 16px;
  padding-left: 20px;
  color: #ff2f01;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
`;
const ErrorCase2 = styled.div<{ error: boolean }>`
  visibility: ${(props) => {
    return props.error ? "visible" : "hidden";
  }};
  margin-top: ${(props) => {
    return props.error ? "10px" : "0px";
  }};
  margin-bottom: 16px;
  height: ${(props) => {
    return props.error ? "" : "0px";
  }};

  color: #ff2f01;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
`;
const ErrorCase3 = styled.div<{ error: boolean }>`
  visibility: ${(props) => {
    return props.error ? "visible" : "hidden";
  }};
  margin-top: ${(props) => {
    return props.error ? "8.5px" : "0px";
  }};
  margin-bottom: ${(props) => {
    return props.error ? "12px" : "23.5px";
  }};
  height: ${(props) => {
    return props.error ? "" : "0px";
  }};

  color: #ff2f01;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
`;
const ErrorCase4 = styled.div<{ error: boolean }>`
  visibility: ${(props) => {
    return props.error ? "visible" : "hidden";
  }};
  margin-top: ${(props) => {
    return props.error ? "12px" : "0px";
  }};
  margin-bottom: 20px;
  height: ${(props) => {
    return props.error ? "" : "0px";
  }};

  color: #ff2f01;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
`;
const ErrorCase5 = styled.div<{ error: boolean }>`
  visibility: ${(props) => {
    return props.error ? "visible" : "hidden";
  }};
  margin-top: ${(props) => {
    return props.error ? "12px" : "";
  }};
  margin-bottom: 20px;
  height: ${(props) => {
    return props.error ? "" : "0px";
  }};

  color: #ff2f01;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
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
  height: 30px;
`;
const ColorTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 18.2px;
`;
const AddColorButton = styled.div<{ display: boolean }>`
  display: ${(props) => {
    return props.display ? "flex" : "none";
  }};

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
  position: relative;

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
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 15px;
`;
const OptionInputContainer = styled.div<{
  index: number;
  selectOption: number;
  render: boolean;
}>`
  display: ${(props) => {
    return (props.index !== props.selectOption || !props.render) && "none";
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
  color: #ff2f01;
  font-size: 14px;
  font-weight: 700;
  line-height: 18.2px;
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
  border-bottom: 1px solid #f2f6f8;
  box-sizing: border-box;
`;
const RollInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  color: #000000;

  &::placeholder {
    color: #a4b0b2;
  }
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
  cursor: pointer;
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
const ImageComponent = styled.div``;

const ImageButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 2px;
  background-color: #a4b0b2;
  overflow: hidden;
  cursor: pointer;
`;
const ImageVideoInput = styled.input`
  display: none;
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
const PlayButton = styled.div`
  position: absolute;
`;
const BackGround = styled.div<{ index: number; clickIndex: number }>`
  z-index: 3;
  display: ${(props) => {
    return props.index === props.clickIndex ? "block" : "none";
  }};
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`;
const BigImage = styled.div`
  position: absolute;
  width: 50vw;
  &::after {
    display: block;
    content: "";

    padding-bottom: 100%;
  }

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ImageVideoText = styled.div`
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
  cursor: pointer;
`;
const Video = styled.video`
  width: 80px;
  height: 80px;
`;

export default useAdd_product;
