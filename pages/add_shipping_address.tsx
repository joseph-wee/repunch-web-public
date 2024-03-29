import React, { use, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  RecentOrders,
  SideBar,
  SelectBox,
} from "../components";
import { btn_web_back, garbage, ic_check_wht } from "../assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { goBack } from "../utils/functions";
import {
  addAddressRequest,
  loginRefreshRequest,
  originsRequest,
} from "../utils/api";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useAdd_shiping_address = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isExisted, setIsExisted] = useState<boolean>(false);

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [countryCode, setCounryCode] = useState<string | undefined>(""); // 국가코드
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress1, setStreetAddress1] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  const ref = useRef<null[] | HTMLDivElement[]>([]); // errorcase div 배열형식으로 담김

  /** 국가 리스트 */
  const [origins, setOrigins] = useState<any>();
  const [originsCallingCode, setOriginsCallingCode] = useState<any>();

  /** 국가리스트 세팅 */
  useEffect(() => {
    if (sessionStorage.getItem("origins")) {
      const result = [...JSON.parse(sessionStorage.getItem("origins") || "{}")];
      setOrigins(result);
      setOriginsCallingCode(
        result.map((el: any) => {
          let countryCodeArr = [];
          for (const x of result) {
            el.callingCode === x.callingCode &&
              countryCodeArr.push(x.countryCode);
          }
          return {
            name: el.name,
            callingCode: el.callingCode,
            countryCodeArr: countryCodeArr,
          };
        })
      );
    }

    originsRequest().then((res: any) => {
      const result = res?.data.result;
      setOrigins(result);
      setOriginsCallingCode(
        result.map((el: any) => {
          let countryCodeArr = [];
          for (const x of result) {
            el.callingCode === x.callingCode &&
              countryCodeArr.push(x.countryCode);
          }
          return {
            name: el.name,
            callingCode: el.callingCode,
            countryCodeArr: countryCodeArr,
          };
        })
      );
      sessionStorage.setItem("origins", JSON.stringify(result));
    });
  }, []);

  const [titleValidationResult, setTitleValidationResult] = useState<number>(0); // 성 유효성 체크
  const [firstNameValidationResult, setFirstNameValidationResult] =
    useState<number>(0); // 이름 유효성 체크
  const [lastNameValidationResult, setLastNameValidationResult] =
    useState<number>(0); // 이름 유효성 체크
  const [companyNameValidationResult, setCompanyNameValidationResult] =
    useState<number>(0); // 회사이름 유효성 체크
  const [countryCodeValidationResult, setCounryCodeValidationResult] =
    useState<number>(0); // 국가코드 유효성 체크

  const [stateValidationResult, setStateValidationResult] = useState<number>(0);
  const [cityValidationResult, setCityValidationResult] = useState<number>(0);

  const [streetAddress1ValidationResult, setStreetAddress1ValidationResult] =
    useState<number>(0);

  const [streetAddress2ValidationResult, setStreetAddress2ValidationResult] =
    useState<number>(0);

  const [postCodeValidationResult, setPostCodeValidationResult] =
    useState<number>(0);

  const [phoneNumberValidationResult, setPhoneNumberValidationResult] =
    useState<number>(0); // 전화번호 유효성 체크

  const [validationStart, setValidationStart] = useState(false); // 입력시마다 검사 시작

  /** title 유효성 검사 */
  const validationTitle = () => {
    if (Boolean(title)) {
      setTitleValidationResult(1);
      return true;
    }
    setTitleValidationResult(2);
    return false;
  };

  /** firstName 유효성 검사 */
  const validationFirstname = () => {
    if (Boolean(firstName)) {
      setFirstNameValidationResult(1);
      return true;
    }
    setFirstNameValidationResult(2);
    return false;
  };
  /** lastName 유효성 검사 */
  const validationLastName = () => {
    if (Boolean(lastName)) {
      setLastNameValidationResult(1);
      return true;
    }
    setLastNameValidationResult(2);
    return false;
  };
  /** country 유효성 검사 */
  const validationCountry = () => {
    if (Boolean(countryCode)) {
      setCounryCodeValidationResult(1);
      return true;
    }
    setCounryCodeValidationResult(2);
    return false;
  };
  /** company name 유효성 검사 */
  const validationCompanyName = () => {
    if (Boolean(companyName) && companyName.length <= 50) {
      setCompanyNameValidationResult(1);
      return true;
    }
    setCompanyNameValidationResult(2);
    return false;
  };

  /** state, provicne 유효성 검사 */
  const validationState = () => {
    if (Boolean(state)) {
      setStateValidationResult(1);
      return true;
    }
    setStateValidationResult(2);
    return false;
  };

  /** city 유효성 검사 */
  const validationCity = () => {
    if (Boolean(city)) {
      setCityValidationResult(1);
      return true;
    }
    setCityValidationResult(2);
    return false;
  };

  /** postcode 유효성 검사 */
  const validationPostCode = () => {
    if (postCode.length >= 5) {
      setPostCodeValidationResult(1);
      return true;
    }
    setPostCodeValidationResult(2);
    return false;
  };

  /** streetAddress1 유효성 검사 */
  const validationStreetAddress1 = () => {
    if (Boolean(streetAddress1)) {
      setStreetAddress1ValidationResult(1);
      return true;
    }
    setStreetAddress1ValidationResult(2);
    return false;
  };

  /** streetAddress2 유효성 검사 */
  const validationStreetAddress2 = () => {
    if (Boolean(streetAddress2)) {
      setStreetAddress2ValidationResult(1);
      return true;
    }
    setStreetAddress2ValidationResult(2);
    return false;
  };

  /** phone number 유효성 검사 */
  const validationPhoneNumber = () => {
    if (phoneNumber.length > 7) {
      setPhoneNumberValidationResult(1);
      return true;
    }
    setPhoneNumberValidationResult(2);
    return false;
  };

  /** 작업 후 이전 페이지로 이동 */
  const sendToLandingPage = () => {
    const landingPage = router.query.backLink;
    console.log(router.query.backLink);
    // 랜딩 페이지 없을 경우
    if (landingPage == undefined) {
      router.push("/address");
      return;
    }
    // 랜딩 페이지있으면 랜딩 페이지로 이동
    router.push(`${landingPage}`);
  };

  /** 모든 유효성 검사 */
  const validationAll = () => {
    let validationResult = new Array(10);
    validationResult[0] = validationTitle();
    validationResult[1] = validationFirstname();
    validationResult[2] = validationLastName();
    validationResult[3] = validationCompanyName();
    validationResult[4] = validationCountry();
    validationResult[5] = validationState();
    validationResult[6] = validationCity();
    validationResult[7] = validationStreetAddress1();
    validationResult[8] = validationStreetAddress2();
    validationResult[9] = validationPostCode();
    validationResult[10] = validationPhoneNumber();

    //유효성 결과 false값있으면 그 input으로 포커스, 모두 true면 return true
    for (let i = 0; i < 11; i++) {
      if (validationResult[i] == false) {
        console.log(ref.current[i]);
        ref.current[i]?.focus();
        ref.current[i]?.scrollIntoView({
          block: "center",
          inline: "start",
        });
        break;
      }
      if (i == 10) {
        return true;
      }
    }
  };

  /** 확인버튼 클릭시 유효성검사 모두 통과했는지 확인 후 어드레스 추가 아니면 모두 재검사 */
  const addAddressRequestHandler = () => {
    let at;
    let rt: string | null;

    if (sessionStorage.getItem("at")) {
      at = sessionStorage.getItem("at");
      rt = sessionStorage.getItem("rt");
    } else {
      at = localStorage.getItem("at");
      rt = localStorage.getItem("rt");
    }

    let validationAllValue = validationAll();
    if (validationAllValue == true) {
      addAddressRequest(
        at,
        title,
        firstName,
        lastName,
        companyName,
        countryCode,
        state,
        city,
        streetAddress1,
        streetAddress2,
        postCode,
        phoneNumber
      ).then((res) => {
        console.log(res);
        console.log("여기서에러?");
        // 성공 case
        if (res?.data?.status == 200) {
          sendToLandingPage();
          return;
        }

        // 유효하지 않은 토큰 case
        if (res?.data.code == 1003) {
          loginRefreshRequest(rt).then((res) => {
            // 토큰 재발급 성공 case
            // 엑세스 토큰, 리프레쉬 토큰 세팅 후 카트목록 재요청
            if (res?.data.status == 200) {
              at = res.data.result.access_token;
              rt = res.data.result.refresh_token;

              if (sessionStorage.getItem("at")) {
                sessionStorage.setItem("at", at);
                sessionStorage.setItem("rt", `${rt}`);
              } else {
                localStorage.setItem("at", at);
                localStorage.setItem("rt", `${rt}`);
              }
              addAddressRequest(
                at,
                title,
                firstName,
                lastName,
                companyName,
                countryCode,
                state,
                city,
                streetAddress1,
                streetAddress2,
                postCode,
                phoneNumber
              ).then((res) => {
                // 성공 case
                if (res?.data?.status == 200) {
                  sendToLandingPage();
                  return;
                }
              });
            }
          });
        }
        alert("예상치 못한 에러가 발생하였습니다.");
      });
    }
  };

  useEffect(() => {
    console.log(firstName);
    console.log(router.query.backLink);
  }, [firstName]);

  return (
    <Container>
      <SideBar />
      <Main>
        <AddressInit isExisted={isExisted}>
          <TitleWrapper>
            <ImageWrapper onClick={() => goBack()}>
              <Image src={btn_web_back} alt={"btn_web_back"} />
            </ImageWrapper>
            <Title>Add shipping Address</Title>
          </TitleWrapper>
          <ContentTitleBar>Shipping address</ContentTitleBar>
          <InputContainer>
            <InputTitle>Address title</InputTitle>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) => setTitle(e.target.value)}
              ref={(element) => {
                ref.current[0] = element;
              }}
            />
            <ErrorCase isActive={titleValidationResult}>
              Please enter your address title.
            </ErrorCase>
          </InputContainer>
          <Wrapper>
            <InputContainer>
              <InputTitle>First name</InputTitle>
              <Input
                type="text"
                maxLength={30}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
                  setFirstName(e.target.value);
                }}
                ref={(element) => {
                  ref.current[1] = element;
                }}
              />
              <ErrorCase isActive={firstNameValidationResult}>
                Please enter your first name.
              </ErrorCase>
            </InputContainer>
            <InputContainer>
              <InputTitle>Last name</InputTitle>
              <Input
                type="text"
                maxLength={30}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
                  setLastName(e.target.value);
                }}
                ref={(element) => {
                  ref.current[2] = element;
                }}
              />{" "}
              <ErrorCase isActive={lastNameValidationResult}>
                Please enter your last name.
              </ErrorCase>
            </InputContainer>
          </Wrapper>
          <InputContainer>
            <InputTitle>Company name</InputTitle>
            <Input
              type="text"
              maxLength={50}
              onChange={(e) => setCompanyName(e.target.value)}
              ref={(element) => {
                ref.current[3] = element;
              }}
            />{" "}
            <ErrorCase isActive={companyNameValidationResult}>
              Please enter your company name.
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle
              ref={(element) => {
                ref.current[4] = element;
              }}
            >
              Country
            </InputTitle>
            <SelectBox
              list={origins}
              value={countryCode}
              setValue={setCounryCode}
              validationStart={validationStart}
              setValidationResult={setCounryCodeValidationResult}
            />
            <ErrorCase isActive={countryCodeValidationResult}>
              Please select your country.
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle>State /Province</InputTitle>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z]/gi, "");
                setState(e.target.value);
              }}
              ref={(element) => {
                ref.current[5] = element;
              }}
            />{" "}
            <ErrorCase isActive={stateValidationResult}>
              Please enter your state /province.
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle>City</InputTitle>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z]/gi, "");
                setCity(e.target.value);
              }}
              ref={(element) => {
                ref.current[6] = element;
              }}
            />{" "}
            <ErrorCase isActive={cityValidationResult}>
              Please enter your city.
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle>Street address</InputTitle>
            <Input
              type="text"
              maxLength={50}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/gi, "");
                setStreetAddress1(e.target.value);
              }}
              ref={(element) => {
                ref.current[7] = element;
              }}
            />{" "}
            <ErrorCase isActive={streetAddress1ValidationResult}>
              Please enter your street address.
            </ErrorCase>
            <Input
              type="text"
              maxLength={50}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/gi, "");
                setStreetAddress2(e.target.value);
              }}
              ref={(element) => {
                ref.current[8] = element;
              }}
            />
            <ErrorCase isActive={streetAddress2ValidationResult}>
              Please enter your street address.
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle>Postcode</InputTitle>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                setPostCode(e.target.value);
              }}
              ref={(element) => {
                ref.current[9] = element;
              }}
            />{" "}
            <ErrorCase isActive={postCodeValidationResult}>
              Please enter your postcode.
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle>Phone number</InputTitle>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                setPhoneNumber(e.target.value);
              }}
              ref={(element) => {
                ref.current[10] = element;
              }}
            />{" "}
            <ErrorCase isActive={phoneNumberValidationResult}>
              Please enter your phone number.
            </ErrorCase>
          </InputContainer>

          <ButtonWrapper>
            <Button>
              <Link href="/address" style={{ textDecoration: "none" }}>
                <LinkStyling>Cancel</LinkStyling>
              </Link>
            </Button>
            <Button onClick={() => addAddressRequestHandler()}>Confirm</Button>
          </ButtonWrapper>
        </AddressInit>
      </Main>
      <MobileSideBar />
    </Container>
  );
};
const SelectBoxTemporary = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
  max-width: 637px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 768px) {
    display: block;
    padding-left: 20px;
    padding-right: 20px;
    boxsizing: border-box;
  }
`;
const Main = styled.div`
  position: relative;
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 20px;
  }
`;
const AddressInit = styled.div<{ isExisted: boolean }>`
  display: ${(props) => {
    return props.isExisted == true ? "none" : "block";
  }};
`;
const AddressEdit = styled.div<{ isExisted: boolean }>`
  display: ${(props) => {
    return props.isExisted == true ? "block" : "none";
  }};
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ImageWrapper = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    font-size: 22px;
    line-height: 26px;
    margin-left: 8px;
  }
`;
const ContentTitleBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 16px;
  height: 30px;
  background: #f2f6f8;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #121822;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 15px 10px;
`;
const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;
const InputTitle = styled.div`
  display: inline-block;
  margin-right: 3.8px;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;
const Input = styled.input`
  display: inline-block;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;

  &:nth-of-type(2) {
    margin-top: 10px;
  }
`;
const ErrorCase = styled.div<{ isActive: number }>`
  display: ${(props) => {
    return props.isActive == 2 ? "block" : "none";
  }};
  margin-top: 10px;
  height: ${(props) => {
    return props.isActive == 0 || props.isActive == 1 ? "0px" : "";
  }};
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #ff5c01;
`;
const CheckBox = styled.input`
  display: none;
`;
const CheckBoxLabel = styled.label<{ isChecked: boolean }>`
  display: flex;
  margin-bottom: ${(props) => {
    return props.isChecked == true ? "20px" : "22px";
  }};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #121822;
`;
const Box = styled.div<{ isChecked: boolean; img: string }>`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: ${(props) => {
    return props.isChecked == true ? "none" : "1px solid #dee8ec;";
  }};
  border-radius: 2.66667px;

  background-color: ${(props) => {
    return props.isChecked == true ? "#FF5C01" : "#FFFFFF";
  }};

  background-image: ${(props) => {
    return props.isChecked == true ? `url(${props.img})` : "";
  }};
  background-size: 9.5px 7.4px;
  background-position: center;
  background-repeat: no-repeat;
`;
const BillingAddressWrapper = styled.div<{ isChecked: boolean }>`
  display: ${(props) => {
    return props.isChecked == true ? "none" : "block";
  }};
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 11px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: flex;
  margin-bottom: 20px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;

  background-color: #121822;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  overflow: hidden;
  cursor: pointer;

  &:nth-of-type(1) {
    font-weight: 400;
    color: #121822;
    background-color: #f2f6f8;

    @media screen and (max-width: 768px) {
      margin-right: 11px;
    }
  }
`;

const LinkStyling = styled.div`
  display: flex;
  height: 48px;
  width: 208px;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-weight: 400;
  color: #121822;
  line-height: 130%;
`;

export default useAdd_shiping_address;
