import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import {
  btn_favorite_act_sm,
  btn_favorite_inact_sm,
  btn_play_l,
  btn_review,
  btn_review_sm,
  ic_check_web_color,
  ic_favorite_wht,
  ic_info,
  ic_minus,
  ic_plus,
} from "../../assets";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setMeterage, setSample } from "../../features/login/cartSlice";
import {
  addCartRequest,
  loginRefreshRequest,
  materialsRequest,
  productDetailRequest,
} from "../../utils/api";
import { VideoPlayer } from "../../components";

const useId = () => {
  const [popUpIsActive, setPopUpIsActive] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const [length, setLength] = useState<string>("1");
  const { value: cartValue } = useAppSelector((state) => state.cartValue);

  const [videoUrl, setVideoUrl] = useState("");
  const [px, setPx] = useState(0);
  const [leftTarget, setLeftTarget] = useState(0);
  const [rightTarget, setRightTarget] = useState(4);
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  const [imgVideoClicked, setImgVideoClicked] = useState(1);

  const [info, setInfo] = useState<any>();

  const [like, setLike] = useState(false); // 좋아요

  const ref = useRef<any>();

  const [materials, setMaterials] = useState<any>();

  //////// 개발용 임시 데이터, 코드

  const [colorList, setColorList] = useState<any>([]);
  const [optionList, setOptionList] = useState<any>([]);

  const [price, setPrice] = useState(10);
  const [count, setCount] = useState(1);

  const [seletedOption, setSelectedOption] = useState<any>({});

  const [thumbnailVideoList, setThumbnailVideoList] = useState<any>([]);
  const [select, setSelect] = useState<any>(); // 선택된 썸네일 or 비디오

  useEffect(() => {
    setPrice(Number(count) * 10);
  }, [count]);

  /** 옵션에서 컬러 선택시 액션, 컬러 선택 바뀔 때마다 해당 첫번째 옵션 포커스 효과 핸들러 */
  const colorCheckhandler = (index: number) => {
    let tempColorList = colorList;
    tempColorList.forEach((el: any, index: number) => {
      tempColorList[index].checked = false;
    });

    let temp: any = [];

    tempColorList[index].checked = true;

    let tempOptionList = optionList;
    tempOptionList.forEach((el: any, j: number) => {
      el.color == tempColorList[index].color && temp.push(j);
      optionList[j].clicked = false;
    });

    tempOptionList[temp[0]].clicked = true;

    setOptionList([...tempOptionList]);

    setColorList([...tempColorList]);
    setCount(1);

    thumbnailClickHandler(index);
  };

  /** 옵션 클릭시 해당 옵션 포커스효과 */
  const clickHandler = (index: number) => {
    let tempOptionList = optionList;
    tempOptionList.forEach((el: any, index: number) => {
      tempOptionList[index].clicked = false;
    });
    tempOptionList[index].clicked = true;

    setOptionList([...tempOptionList]);

    setSelectedOption({ ...tempOptionList[index] });
  };

  ////////

  const dispatch = useAppDispatch();
  const cartStateHandler = () => {
    if (popUpIsActive == 1) {
      dispatch(setMeterage());
    }
    if (popUpIsActive == 2) {
      dispatch(setSample());
    }
  };

  const minus = () => {
    if (count == 1) {
      return;
    }
    setCount(count - 1);
  };
  const plus = () => {
    if (count == seletedOption.quantity) return;
    setCount(count + 1);
  };

  /** 상품 상세 호출 및 info에 저장, 옵션 컬러 세팅 */
  const productDetailRequestHandler = () => {
    console.log(window.location.pathname.slice(16));
    let reg = /[0-9]/g;
    productDetailRequest(window.location.pathname.slice(16)).then((res) => {
      console.log(res);
      setInfo(res.data.result);

      // 중복없이 컬러리스트 설정
      let tempOptions = res.data.result.options;
      let tempColorList: any = [];
      tempOptions.forEach((i: any) => {
        !tempColorList.includes(i.color.name) &&
          tempColorList.push({
            color: i.color.name,
            checked: false,
          });
      });
      tempColorList[0].checked = true;

      setColorList([...tempColorList]);

      // 모든 옵션들 리스트 형태로 관리하기 위해 초기화
      let tempOptionList: any = [];
      tempOptions.forEach((el: any) => {
        tempOptionList.push({
          productOptionNo: el.productOptionNo,
          color: el.color.name,
          width: res.data.result.width,
          length: el.length,
          price: el.price,
          quantity: el.quantity,
          samplePrice: el.samplePrice,
          sampleQuantity: el.sampleQuantity,
          clicked: false,
        });
      });
      tempOptionList[0].clicked = true;
      setOptionList([...tempOptionList]);

      /** 선택된 옵션 초기화 */
      setSelectedOption({ ...tempOptionList[0] });

      /** 썸네일 리스트 초기화 */
      let tempThumbnailVideoList = thumbnailVideoList;

      tempOptions.forEach((el: any) => {
        /** 썸네일 이미지 세팅 */
        tempThumbnailVideoList.push({
          color: el.color.name,
          type: "thumbnail",
          imageUrl: el.thumbnailUrl,
          videoUrl: "",
          clicked: false,
        });
        tempThumbnailVideoList.push({
          color: el.color.name,
          type: "thumbnail",
          imageUrl: el.thumbnailUrl,
          videoUrl: "",
          clicked: false,
        });
        tempThumbnailVideoList.push({
          color: el.color.name,
          type: "thumbnail",
          imageUrl: el.thumbnailUrl,
          videoUrl: "",
          clicked: false,
        });
        tempThumbnailVideoList.push({
          color: el.color.name,
          type: "thumbnail",
          imageUrl: el.thumbnailUrl,
          videoUrl: "",
          clicked: false,
        });
        tempThumbnailVideoList.push({
          color: el.color.name,
          type: "thumbnail",
          imageUrl: el.thumbnailUrl,
          videoUrl: "",
          clicked: false,
        });

        /** 동영상 세팅 */
        if (el.files[1]) {
          tempThumbnailVideoList.push({
            color: el.color.name,
            type: "video",
            imageUrl: el.files[0].resourceUrl,
            videoUrl: el.files[1].resourceUrl,
            clicked: false,
          });
        }
      });
      tempThumbnailVideoList[0].clicked = true;
      setSelect({ ...tempThumbnailVideoList[0] });
      setThumbnailVideoList([...tempThumbnailVideoList]);

      // setVideoUrl(res.data.result.files[1].resourceUrl);
    });
  };

  useEffect(() => {
    console.log("?");
    console.log(optionList);
  }, [optionList]);

  // 컬러, 가격, 미터, 양

  /** productDetailRequestHandler 호출 */
  useEffect(() => {
    productDetailRequestHandler();
  }, []);

  const continueShoppingHandler = () => {
    setPopUpIsActive(0);
    setCount(1);
  };

  useEffect(() => {
    // let productNo = window.location.href.split("/").pop();
    // productDetailRequestHandler(productNo);
  }, []);

  // useEffect(() => {
  //   console.log(videoUrl);
  // }, [videoUrl]);

  /** 썸네일 클릭시 이동 및 강조 핸들러 */
  const thumbnailClickHandler = (index: number) => {
    let temp = thumbnailVideoList;
    let parentWidth = ref.current.clientWidth;
    let min = Math.floor((parentWidth + 1) / 69) + 1;
    let remain = 68 - (parentWidth - 69 * (min - 1));

    console.log(parentWidth);
    console.log(min);

    // 클릭 세팅 및 선택된 썸네일 or 동영상 초기화//
    temp = temp.map((el: any) => {
      return { ...el, clicked: false };
    });
    temp[index].clicked = true;
    setThumbnailVideoList([...temp]);
    setSelect({ ...temp[index] });
    //////////

    if (temp.length < min) {
      return;
    }
    if (index == 0) {
      setPx(0);
      console.log(1);
      return;
    }
    if (index == 1) {
      setPx(0);
      console.log(2);
      return;
    }
    if (index > temp.length - min && index <= temp.length - 2) {
      setPx((temp.length - min) * 69 + remain);
      return;
    }
    if (index == temp.length - 1) {
      setPx((temp.length - min) * 69 + remain);
      return;
    }
    setPx((index - 2) * 68 + 46.5);
    console.log(5);
  };

  // 46.5 = 68 - ( 320 - ( 69 * 4 ) )
  // 마지막 이동해야하는 거리 = 68 - ( parentWidth - ( 69 * min )  )

  const test = () => {
    return `100`;
  };

  const materialRequestHandler = () => {
    let res = materialsRequest();
  };

  /** 직물 리스트 */
  const fabricList: any = [
    "CO",
    "LI",
    "SI",
    "CA",
    "LY",
    "WO",
    "EL",
    "PM",
    "PL",
    "NY",
  ];

  /** 임시 컬러 리스트 */
  const tempColorList: any = [
    "Pink",
    "Green",
    "Red",
    "Orange",
    "Purple",
    "Blue",
    "Brown",
    "Yellow",
    "White",
    "Ivory",
    "Gray",
    "Black",
    "Silver",
    "Gold",
  ];

  useEffect(() => {
    info && console.log(info.options);
  }, [info]);

  const availableChanger = (info: any) => {
    let value = 0;
    info.options.forEach((i: any) => {
      value += parseInt(i.quantity);
    });
    return value;
  };

  const [options, setOptions] = useState("");

  useEffect(() => {
    console.log(select && select.type == "thumbnail");
  }, [thumbnailVideoList]);

  /** 장바구니 추가 핸들러 */
  const addCartHandler = () => {
    let at;
    let rt;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    addCartRequest(at, seletedOption.productOptionNo, count).then((res) => {
      // if(res?.data.code == 1003) {
      //   loginRefreshRequest(rt)
      // }
    });
  };

  return (
    <>
      <Container>
        <ProductInfoContainer>
          <ImageVideoWrapper>
            <BigImagevideoWrapper>
              <VideoPlayer isActive={true} select={select} />
              <LikeButton onClick={() => setLike(!like)}>
                <Image
                  src={like ? btn_review_sm : btn_favorite_inact_sm}
                  alt={"logo_favorite"}
                />
              </LikeButton>
            </BigImagevideoWrapper>
            <SmallImageVideoWrapper ref={ref}>
              {thumbnailVideoList.map((el: any, j: number) => {
                return (
                  <SmallImageVideo
                    px={px}
                    onClick={() => thumbnailClickHandler(j)}
                    key={`imageVideo-${j}`}
                  >
                    <BorderBox isClicked={el.clicked}></BorderBox>
                    <PlayButton>
                      {el.type == "video" && (
                        <Image
                          src={btn_play_l}
                          alt="play_button"
                          width={30}
                          height={30}
                        />
                      )}
                    </PlayButton>
                    <Image
                      src={el.imageUrl}
                      width={68}
                      height={68}
                      alt="thumbnail"
                    />
                  </SmallImageVideo>
                );
              })}
            </SmallImageVideoWrapper>
          </ImageVideoWrapper>
          <ProductInfoPurchaseContainer>
            <Title>{info ? info.title : ""}</Title>
            <Line />
            <InfoWrapper>
              <InfoTitle>Composition</InfoTitle>
              <InfoContent>
                <RatioWrapper>
                  {info
                    ? info.materials.map((i: any, j: number) => {
                        return (
                          <Ratio key={`composition-${j}`}>{`${
                            fabricList[parseInt(i.materialNo) - 1]
                          } ${i.value}%`}</Ratio>
                        );
                      })
                    : ""}
                </RatioWrapper>
              </InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Certification</InfoTitle>
              <InfoContent>
                {info && info.certificated && "Repp verifyed"}
              </InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Width/length</InfoTitle>
              <InfoContent>
                {info &&
                  info.options.map((i: any, j: number) => {
                    return (
                      <WidthContent key={`width-${j}`}>
                        {`${info.width}cm*${i.length}m(W*L)`}
                      </WidthContent>
                    );
                  })}
              </InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Weight</InfoTitle>
              <InfoContent>{`${info && info.weight}gms/sq.mt`}</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Transparent</InfoTitle>
              <InfoContent>{`${
                info && info.transparent ? "Yes" : "No"
              }`}</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Available</InfoTitle>
              <InfoContent>{info && `${availableChanger(info)}`}</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Color</InfoTitle>
              <InfoContent>
                {info &&
                  info.options.map((i: any, j: number) => {
                    return (
                      <WidthContent key={`color-${j}`}>
                        {info && `${tempColorList[parseInt(i.colorNo) - 1]}`}
                      </WidthContent>
                    );
                  })}
              </InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Design</InfoTitle>
              <InfoContent>{info && `${info.design.name}`}</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Project</InfoTitle>
              <InfoContent>{info && `${info.project?.name}`}</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Contry of origin</InfoTitle>
              <InfoContent>{info && `${info.origin.name}`}</InfoContent>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>Descripttion</InfoTitle>
              <InfoDescription>{info && `${info.description}`}</InfoDescription>
            </InfoWrapper>
          </ProductInfoPurchaseContainer>
        </ProductInfoContainer>
        <PurchaseContainer>
          <PurchaseBox>
            <ColorWrapper>
              {colorList.map((i: any, j: number) => {
                return (
                  <ColorBox
                    isChecked={i.checked}
                    onClick={() => colorCheckhandler(j)}
                    key={`asdf${j}`}
                  >
                    <ColorCircle color={i.color}>
                      <CheckImageWrapper isChecked={i.checked}>
                        <Image
                          src={ic_check_web_color}
                          alt="ic_check_web_color"
                        ></Image>
                      </CheckImageWrapper>
                    </ColorCircle>
                  </ColorBox>
                );
              })}
            </ColorWrapper>
            <ProductWrapper>
              {optionList &&
                optionList.map((el: any, index: number) => {
                  return (
                    <Product
                      isRender={
                        el.color ==
                        colorList.filter((el: any) => el.checked == true)[0]
                          .color
                      }
                      isActive={el.clicked}
                      onClick={() => clickHandler(index)}
                      key={`reyrtjh${index}`}
                    >
                      <ColorName>{el.color}</ColorName>
                      <MiniCircle />
                      <LengthText>{`${el.width}m*${el.length}m`}</LengthText>
                      <UnitText>(W*L)</UnitText>
                    </Product>
                  );
                })}
            </ProductWrapper>
            <AvailableText>
              {`${seletedOption.quantity} available`}
            </AvailableText>
            <LengthWrapper>
              <ButtonInputWrapper>
                <MinusButton onClick={() => minus()}>
                  <Image src={ic_minus} alt={"minus_button"} />
                </MinusButton>
                <LengthInput
                  type="number"
                  step="1"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                />
                <PlusButton onClick={() => plus()}>
                  <Image src={ic_plus} alt={"plus_button"} />
                </PlusButton>
              </ButtonInputWrapper>
              <ProductPriceWrapper>
                <ProductUnit>{`1 Qty ${seletedOption.length} m`}</ProductUnit>
                <ProductPrice>$ {seletedOption.price * count}</ProductPrice>
              </ProductPriceWrapper>
            </LengthWrapper>
            <PricePurchaseWrapper>
              <PurchaseButton onClick={() => addCartHandler()}>
                Add to cart
              </PurchaseButton>
            </PricePurchaseWrapper>
            <RequestSample onClick={() => setPopUpIsActive(2)}>
              Request sample(Add to cart)&nbsp;
              <BoldText>$ 8.38(-30%)</BoldText>
            </RequestSample>
            <DiscountMessage>-30% Open Promotion Due to ‘23.10</DiscountMessage>
            <SmapleMessage>
              <Image src={ic_info} alt={"ic_info"} />
              Samples can be ordered from 10-20 pieces.
            </SmapleMessage>
          </PurchaseBox>
        </PurchaseContainer>
        <DeliveryReturnsInfoTitleWrapper>
          <ShortLine />
          <DeliveryReturnsInfoTitle>
            Deleivery & Returns
          </DeliveryReturnsInfoTitle>
          <ShortLine />
        </DeliveryReturnsInfoTitleWrapper>
        <DeliveryReturnsInfoText>
          <TextTitle>Shipping:</TextTitle>
          <Text>
            Shipping costs depend on weight so you can get an accurate shipping
            quote from the basket page once you have made your selection. As
            soon as your order is confirmed and we’ve received your payment your
            order will be processed immediately and shipped. All UK shipments
            are sent on a next day delivery service. if you are unlikely to be
            in you can put down a secure location for us to leave the parcel in
            the comments stage in the check out process. International shipments
            are normally sent by courier however in some regions we offer a
            International recorded mail option. International shipments by
            courier will take 2-3 days while shipments sent by International
            recorded mail will take 10-15 days. If you have a specific delivery
            requirement please place your order by e-mail or phone e.g. arrange
            your own shipping.
            <br />
            <br />
          </Text>
          <TextTitle>Returns:</TextTitle>
          <Text>
            If you have ordered the wrong fabric or you don’t need the item
            anymore please feel free to return the fabric and we will credit the
            value back onto your card straight away.
          </Text>
        </DeliveryReturnsInfoText>
      </Container>
      <PopUpBox isActive={popUpIsActive}>
        <ContentBox>
          <PopUpTitle>Added to cart</PopUpTitle>
          <PopUpMessage>
            Would you like to view cart to purchase or
            <br />
            continue shopping?
          </PopUpMessage>
          <ButtonWrapper onClick={() => cartStateHandler()}>
            <Link href="/cart" style={{ textDecoration: "none" }}>
              <PopUpButton>View cart</PopUpButton>
            </Link>
            <PopUpButton onClick={() => continueShoppingHandler()}>
              Continue shopping
            </PopUpButton>
          </ButtonWrapper>
        </ContentBox>
      </PopUpBox>
    </>
  );
};
const Container = styled.div`
  margin: 0 auto;
  padding-top: 40px;
  max-width: 865px;
  @media screen and (max-width: 1279px) {
    display: block;
    padding-top: 20px;
    padding-left: 74px;
    padding-right: 74px;
  }
  @media screen and (max-width: 767px) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;
const ProductInfoContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  @media screen and (max-width: 1279px) {
    margin-bottom: 16px;
  }
  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 43px;
  }
`;
const ImageVideoWrapper = styled.div`
  flex-shrink: 0;
`;
const BigImagevideoWrapper = styled.div`
  position: relative;
  margin-bottom: 4px;
  box-sizing: border-box;
  background-color: #f2f6f8;
  &::after {
    display: block;
    content: "";
    padding-bottom: 250px;
    @media screen and (max-width: 767px) {
      padding-bottom: 100%;
    }
  }
`;
const BigVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const BigImage = styled.div``;
const LikeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: rgba(10, 68, 89, 0.2);
  border-radius: 22px;

  cursor: pointer;
`;
const SmallImageVideoWrapper = styled.div`
  display: flex;
  position: relative;
  width: 320px;
  height: 68px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  overflow-x: overlay;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SmallImageVideo = styled.div<{
  px: number;
}>`
  margin-right: 1px;
  position: relative;
  right: ${(props) => {
    return `${props.px}px`;
  }};
  width: 68px;
  height: 68px;
  background-color: #f2f6f8;
  box-sizing: border-box;
  transition: 0.5s;
`;
const BorderBox = styled.div<{ isClicked: boolean }>`
  position: absolute;
  ${(props) => {
    return props.isClicked && `border: 4px solid #E1FF20`;
  }};
  box-sizing: border-box;
  width: 68px;
  height: 68px;
`;
const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: none;
  padding: 0;
`;
const ProductInfoPurchaseContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 767px) {
    width: auto;
    padding-top: 20px;
  }
`;
const Title = styled.div`
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 22px;
  line-height: 29px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const Line = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #dee8ec;
`;
const InfoWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  &:last-of-type {
    margin-bottom: 0px;
  }
`;
const InfoTitle = styled.div`
  margin-right: 6px;
  flex-shrink: 0;
  width: 101px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.011em;

  color: #a4b0b3;
`;
const InfoContent = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  letter-spacing: -0.011em;

  color: #333333;
`;
const WidthContent = styled.div`
  margin-bottom: 12px;
  &:last-of-type {
    margin-bottom: 0px;
  }
`;
const InfoWidthLengthWrapper = styled.div`
  margin-bottom: 12px;
`;
const InfoDescription = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  letter-spacing: -0.011em;

  color: #333333;
`;
const PurchaseContainer = styled.div`
  padding-left: 340px;
  margin-bottom: 40px;
  @media screen and (max-width: 1279px) {
    padding-left: 0px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const PurchaseBox = styled.div`
  padding: 20px;
  border: 1px solid #dee8ec;
`;
const ColorWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  border-bottom: 1px solid #dee8ec;
  box-sizing: border-box;
  height: 55px;
`;
const ColorBox = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  ${(props) => {
    switch (props.isChecked) {
      case true:
        return `border: 1px solid #dee8ec;
        border-bottom: 1px solid #FFFFFF;`;
      case false:
        return `
          border: none;
        `;
    }
  }};
  box-sizing: border-box;
  cursor: pointer;
`;
const ColorCircle = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  ${(props) => {
    switch (props.color) {
      case "White":
        return `    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background-color: #ffffff;`;
      case "Black":
        return "background-color: #000000";
      case "Gray":
        return "background-color: #C4C4C4";
      case "Beige":
        return "background-color: #F1EBD3";
      case "Brown":
        return "background-color: #825757";
      case "Red":
        return "background-color: #EC3939";
      case "Orange":
        return "background-color: #FE7E36";
      case "Yellow":
        return "background-color: #F9D142";
      case "Pink":
        return "background-color: #FF96FB";
      case "Purple":
        return "background-color: #814FEC";
      case "Blue":
        return "background-color: #293DF0";
      case "Green":
        return "background-color: #46CA43";
      case "Silver":
        return `  background: linear-gradient(
      156.04deg,
      #a9a9a9 10.26%,
      #dedede 43.51%,
      #ffffff 52.57%,
      #e1e1e1 61.64%,
      #9a9a9a 93.16%
    );`;
      case "Gold":
        return `    background: linear-gradient(
      152.18deg,
      #d3a810 5.76%,
      #fff8de 44.11%,
      #ffffff 49.34%,
      #fff9e4 55.45%,
      #d3a810 89.44%
    ); `;
      case "Multi":
        return `    background: linear-gradient(
      154.17deg,
      #ff1001 17.26%,
      #fff500 37.73%,
      #24ff00 57.06%,
      #00bdf9 72.22%,
      #0075ff 90.03%
    );`;
    }
  }};
`;
const CheckImageWrapper = styled.div<{ isChecked: boolean }>`
  display: ${(props) => {
    return props.isChecked ? "block" : "none";
  }};
`;
const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;
const Product = styled.div<{ isRender: boolean; isActive: boolean }>`
  display: ${(props) => {
    return props.isRender ? "flex" : "none";
  }};
  align-items: center;
  padding: 10px;
  border: ${(props) => {
    return props.isActive ? "1px solid #536c6d" : "1px solid #DEE8EC";
  }};
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
  color: #121822;
  cursor: pointer;
`;
const ColorName = styled.div``;
const MiniCircle = styled.div`
  margin-right: 4px;
  margin-left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #dee8ec;
`;
const LengthText = styled.div``;
const UnitText = styled.div`
  color: #536c6d;
`;
const AvailableText = styled.div`
  margin-bottom: 20px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
`;
const RatioWrapper = styled.div`
  display: flex;
`;
const Ratio = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
  padding-left: 4px;
  padding-right: 4px;
  height: 15px;

  background-color: #fdfbf9;

  border: 0.5px solid #b8a687;
  border-radius: 2px;

  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  color: #b8a687;
`;
const LengthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    display: block;
    height: auto;
    margin-bottom: 16px;
  }
`;
const LengthTitle = styled.div`
  margin-right: 36.5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  letter-spacing: -0.011em;

  color: #000000;
`;
const ButtonInputWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    margin-bottom: 16px;
  }
`;
const MinusButton = styled.button`
  display: flex;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 100%;
  background-color: #f2f6f8;

  cursor: pointer;
`;
const LengthInput = styled.input`
  margin-right: 8px;
  width: 70px;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  text-align: center;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 100%;
  background-color: #f2f6f8;

  cursor: pointer;
`;
const ProductPriceWrapper = styled.div`
  display: flex;
  gap: 11.48px;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
const ProductUnit = styled.div`
  display: flex;
  align-items: end;
  color: #536c6d;
  font-size: 12px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.132px;
  @media screen and (max-width: 767px) {
    display: block;
    text-align: center;
  }
`;
const ProductPrice = styled.div`
  color: #121822;
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.308px;
  @media screen and (max-width: 767px) {
    text-align: center;
  }
`;
const PricePurchaseWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  height: 48px;
`;
const PriceWrapper = styled.div`
  width: 107px;
`;
const Price = styled.div`
  width: 56px;
  height: 26px;

  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.011em;

  color: #ff5c01;
`;
const Vat = styled.div`
  font-weight: 400;
  font-size: 9.52824px;
  line-height: 12px;

  letter-spacing: -0.011em;

  color: #000000;
`;
const PurchaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0.79402px solid #dee8ec;
  border-radius: 1.58804px;
  background-color: #f2f6f8;

  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.011em;

  color: #121822;
  cursor: pointer;
`;
const RequestSample = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px;
  width: 100%;
  height: 48px;
  border: none;
  border: 0.79402px solid #536c6d;
  border-radius: 1.58804px;
  box-sizing: border-box;
  background-color: #ffffff;

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.011em;

  color: #121822;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
const BoldText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ff2f01;
`;
const DiscountMessage = styled.div`
  margin-left: 8px;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #ff2f01;
`;
const SmapleMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 5.5px;
  margin-left: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.011em;
  color: #0f697c;
`;

const DeliveryReturnsInfoTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;

  letter-spacing: -0.011em;

  color: #121822;
`;
const ShortLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #d7e0e3;
`;
const DeliveryReturnsInfoTitle = styled.div`
  flex-shrink: 0;
  margin-left: 15px;
  margin-right: 15px;
  width: 208px;

  font-weight: 700;
  font-size: 24px;
  line-height: 43px;
  letter-spacing: -0.011em;
  color: #121822;
`;
const DeliveryReturnsInfoText = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
`;
const TextTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 22px;

  letter-spacing: -0.011em;

  color: #000000;
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;

  letter-spacing: -0.011em;

  color: #000000;
`;

const PopUpBox = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 0 ? "none" : "flex";
  }};
  z-index: 3;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ContentBox = styled.div`
  padding-top: 20px;
  padding-bottom: 32px;
  width: 320px;
  height: 204px;
  box-sizing: border-box;
  background-color: #ffffff;
`;
const PopUpTitle = styled.div`
  margin-bottom: 9px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #121822;
`;
const PopUpMessage = styled.div`
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  text-align: center;
  color: #536c6d;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;
const PopUpButton = styled.button`
  width: 263.25px;
  height: 36px;
  background-color: #e1ff20;
  border: 0.79402px solid #d4f01e;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #121822;
  cursor: pointer;
`;
export default useId;
