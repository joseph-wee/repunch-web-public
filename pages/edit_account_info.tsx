import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  ProductList,
  RecentOrders,
  SelectBox,
  SelectBoxCountryCodeNum,
  SelectBoxEdit,
  SideBar,
} from "../components";
import { ic_down_bk, ic_up_bk } from "../assets";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back } from "../assets";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { goBack } from "../utils/functions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useEdit_account_info = () => {
  const [sortIsActive, setSortIsActive] = useState(true);

  const [firstName, setFirstName] = useState<string>("jkim"); // 성
  const [lastName, setLastName] = useState<string>("jkim"); // 이름
  const [countryCode, setCounryCode] = useState<string>("KR"); // 국가코드
  const [companyName, setCompanyName] = useState<string>("test"); // 회사이름
  const [industryCode, setIndustryCode] = useState<string | undefined>(""); // 회사 업종구분 코드
  const [homepageUrl, setHomepageUrl] = useState<string>("test"); // 회사 홈페이지 url
  const [countryPhoneNumber, setCountryPhoneNumber] = useState<
    string | undefined
  >(""); // 국가 전화코드
  const [phoneNumber, setPhoneNumber] = useState<string>("01012345678"); // 전화번호
  const [userId, setUserId] = useState<string>("jkim"); // 유저ID(이메일주소)
  const [password, setPassowrd] = useState<string>(""); // 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState<string>(""); // 비밀번호 확인
  const [role, setRole] = useState<string>("USER"); // 유저 권한

  const router = useRouter();

  const [firstNameValidationResult, setfirstNameValidationResult] =
    useState<number>(0); // 성 유효성 체크
  const [lastNameValidationResult, setLastNameValidationResult] =
    useState<number>(0); // 이름 유효성 체크
  const [countryCodeValidationResult, setCounryCodeValidationResult] =
    useState<number>(0); // 국가코드 유효성 체크
  const [companyNameValidationResult, setCompanyNameValidationResult] =
    useState<number>(0); // 회사이름 유효성 체크
  const [industryCodeValidationResult, setIndustryCodeValidationResult] =
    useState<number>(0); // 회사 업종구분 코드 유효성 체크
  const [homepageUrlValidationResult, setHomepageUrlValidationResult] =
    useState<number>(0); // 회사 홈페이지 url 유효성 체크
  const [
    countryPhoneNumberValidationResult,
    setCountryPhoneNumberValidationResult,
  ] = useState<number>(0); // 국가 전화코드 유효성 체크
  const [phoneNumberValidationResult, setPhoneNumberValidationResult] =
    useState<number>(0); // 전화번호 유효성 체크
  const [userIdValidationResult, setUserIdValidationResult] =
    useState<number>(0); // 유저ID(이메일주소) 유효성 체크
  const [passwordValidationResult, setPassowrdValidationResult] =
    useState<number>(0); // 비밀번호 유효성 체크
  const [passwordConfirmValidationResult, setPasswordConfirmValidationResult] =
    useState<number>(0); // 비밀번호 확인 유효성 체크

  const [validationStart, setValidationStart] = useState(false); // 입력시마다 검사 시작
  const [moveScreen, setMoveScreen] = useState(0); // errorcase 발생시 해당 입력칸으로 이동하기위한 상태

  const [authPageIsActive, setAuthPageIsActive] = useState<boolean>(false);
  const [popUpIsActive, setPopUpIsActive] = useState<boolean>(false);

  const ref = useRef<null[] | HTMLDivElement[]>([]); // errorcase div 배열형식으로 담김

  const { value: isLogin } = useAppSelector((state) => state.isLogin);
  const dispatch = useAppDispatch();

  /** 나라 리스트 숫자 코드는 업데이트 필요 */
  const countryList: ListCountryArray = [
    { name: "Republic of Korea", code: "KR", code_num: "82" },
    { name: "United States of America", code: "US", code_num: "1" },
    { name: "Greece", code: "GR", code_num: "99" },
    { name: "Netherlands", code: "NL", code_num: "99" },
    { name: "Nepal", code: "NP", code_num: "22" },
    { name: "Norway", code: "NO", code_num: "22" },
    { name: "Danmark", code: "DK", code_num: "22" },
    { name: "Germany", code: "DE", code_num: "49" },
    { name: "Laos", code: "LA", code_num: "22" },
    { name: "Malaysia", code: "MY", code_num: "22" },
    { name: "Mexico", code: "MX", code_num: "22" },
    { name: "Republic of the Union of Myanmar", code: "MM", code_num: "22" },
    { name: "Bangladesh", code: "BD", code_num: "22" },
    { name: "Viet Nam", code: "VN", code_num: "84" },
    { name: "Belgium", code: "BE", code_num: "22" },
    {
      name: "United Kingdom of Great Britain and Northern Ireland",
      code: "GB",
      code_num: "44",
    },
    { name: "Australia", code: "AU", code_num: "61" },
    { name: "Austria", code: "AT", code_num: "22" },
    { name: "Uzbekistan", code: "UZ", code_num: "22" },
    { name: "Egypt", code: "EG", code_num: "22" },
    { name: "Italy", code: "IT", code_num: "22" },
    { name: "India", code: "IN", code_num: "91" },
    { name: "Indonesia", code: "ID", code_num: "22" },
    { name: "Japan", code: "JP", code_num: "22" },
    { name: "China", code: "CN", code_num: "86" },
    { name: "Cambodia", code: "KH", code_num: "22" },
    { name: "Canada", code: "CA", code_num: "1" },
    { name: "Taiwan", code: "TW", code_num: "22" },
    { name: "Thailand", code: "TH", code_num: "886" },
    { name: "Turkey", code: "TR", code_num: "22" },
    { name: "Portugal", code: "PT", code_num: "22" },
    { name: "Poland", code: "PL", code_num: "22" },
    { name: "Puerto Rico", code: "PR", code_num: "22" },
    { name: "France", code: "FR", code_num: "33" },
    { name: "Finland", code: "FI", code_num: "22" },
    { name: "Philippines", code: "PH", code_num: "63" },
    { name: "Hong Kong", code: "HK", code_num: "852" },
  ];
  /** 회사 카테고리 리스트 업데이트 필요 */
  const companyCategoryList: ListCountryArray = [
    { name: "empty", code: "empty1" },
    { name: "empty1", code: "empty2" },
    { name: "empty2", code: "empty3" },
    { name: "empty3", code: "empty4" },
    { name: "empty4", code: "empty5" },
  ];

  const test = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(countryCode);
    console.log(companyName);
    console.log(industryCode);
    console.log(homepageUrl);
    console.log(countryPhoneNumber);
    console.log(phoneNumber);
    console.log(userId);
    console.log(password);
    console.log(passwordConfirm);
    console.log(role);
  };

  /** 회원가입 요청 api */
  const registerApiRequest = () => {
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_KEY + "signup",
      data: {
        firstName: firstName,
        lastName: lastName,
        countryCode: countryCode,
        companyName: companyName,
        industryCode: industryCode,
        homepageUrl: homepageUrl,
        countryPhoneNumber: countryPhoneNumber,
        phoneNumber: phoneNumber,
        userId: userId,
        password: password,
        passwordConfirm: passwordConfirm,
        role: role,
      },
    })
      .then(function (response) {
        if (response.data.status == 200) {
          alert("회원가입에 성공하였습니다.(임시 메세지)");
          router.push("/login");
        } else if (response.data.status == 500) {
          alert("중복된 아이디 입니다.(임시 메세지)");
        }
      })
      .catch(function (error) {
        alert("통신에 실패하였습니다.(임시 메세지)");
        console.log(error);
      });
  };

  /** 국가코드에따라 국가 전화 코드 할당하는 함수 */
  const phoneNumberHandler = () => {
    countryList.forEach((i) => {
      i.code == countryCode ? setCountryPhoneNumber(i.code_num) : "";
    });
  };

  /** 인풋 숫자만 되게하는 함수 */
  const inputHandlerOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(onlyNumber);
  };

  /**값 비어있는지 검사 후에 회원가입 요청 api 호출 */
  const registerApiRequestHandler = () => {
    if (firstName.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (lastName.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (countryCode ? false : true) {
      alert("값을 모두 채워주세요");
    } else if (countryPhoneNumber ? false : true) {
      alert("값을 모두 채워주세요");
    } else if (phoneNumber.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (userId.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (password.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (passwordConfirm.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (role.length == 0) {
      alert("값을 모두 채워주세요");
    } else {
      // registerApiRequest();
      alert("회원가입에 성공하였습니다.(임시 메세지)");
      router.push("/login");
    }
  };

  /** 국가코드 바뀔때마다 phoneNumberHandler 호출 */
  useEffect(() => {
    phoneNumberHandler();
  }, [countryCode]);

  /** firstName 유효성 검사 */
  const validationFirstname = () => {
    let regexp = /^[A-Za-z]{1,20}$/;
    if (regexp.test(firstName)) {
      setfirstNameValidationResult(1);
      return true;
    }
    setfirstNameValidationResult(2);
    return false;
  };
  /** lastName 유효성 검사 */
  const validationLastName = () => {
    let regexp = /^[A-Za-z]{1,20}$/;
    if (regexp.test(lastName)) {
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
    if (companyName.length < 50) {
      setCompanyNameValidationResult(1);
      return true;
    }
    setCompanyNameValidationResult(2);
    return false;
  };
  /** company url 유효성 검사 */
  const validationHomepageUrl = () => {
    if (homepageUrl.length < 50) {
      setHomepageUrlValidationResult(1);
      return true;
    }
    setHomepageUrlValidationResult(2);
    return false;
  };
  /** country phone number 유효성 검사 */
  const validationCoutryPhoneNumber = () => {
    if (Boolean(countryPhoneNumber)) {
      setCountryPhoneNumberValidationResult(1);
      return true;
    }
    setCountryPhoneNumberValidationResult(2);
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
  /** userId 유효성 검사 */
  const validationUserId = () => {
    let regexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 유효성 검사 정규식
    if (regexp.test(userId)) {
      setUserIdValidationResult(1);
      return true;
    }
    setUserIdValidationResult(2);
    return false;
  };
  /** password 유효성 검사 */
  const validationPassword = () => {
    let regexp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/; // 비밀번호 유효성 검사 정규식 영문,숫자,특수문자 포함
    if (regexp.test(password)) {
      setPassowrdValidationResult(1);
      return true;
    }
    setPassowrdValidationResult(2);
    return false;
  };
  /** passwordConfirm 유효성 검사 */
  const validationPasswordConfirm = () => {
    let regexp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/; // 비밀번호 유효성 검사 정규식 영문,숫자,특수문자 포함
    if (password == passwordConfirm && regexp.test(passwordConfirm)) {
      setPasswordConfirmValidationResult(1);
      return true;
    }
    setPasswordConfirmValidationResult(2);
    return false;
  };

  /** 모든 유효성 검사 */
  const validationAll = () => {
    let validationResult = new Array(10);
    validationResult[0] = validationFirstname();
    validationResult[1] = validationLastName();
    validationResult[2] = validationCountry();
    validationResult[3] = validationCompanyName();
    validationResult[4] = validationHomepageUrl();
    validationResult[5] = validationCoutryPhoneNumber();
    validationResult[6] = validationPhoneNumber();

    //유효성 결과 false값있으면 그 input으로 포커스, 모두 true면 return true
    for (let i = 0; i < 7; i++) {
      if (validationResult[i] == false) {
        console.log(ref.current[i]);
        ref.current[i]?.focus();
        ref.current[i]?.scrollIntoView({
          block: "center",
          inline: "start",
        });
        break;
      }
      if (i == 6) {
        return true;
      }
    }
  };

  /** 확인버튼 클릭시 유효성검사 모두 통과했는지 확인 후 가입api요청 아니면 모두 재검사 */
  const validationCheckAndSignupRequest = () => {
    validationAll() && router.push("/account_detail");
  };

  return (
    <Container>
      <Main>
        <TitleWrapper>
          <ImageWrapper onClick={() => goBack()}>
            <Image src={btn_web_back} alt={"btn_web_back"} />
          </ImageWrapper>
          <Title>Edit information</Title>
        </TitleWrapper>
        <Line />
        <Wrapper>
          <InputContainer>
            <InputTitle>First name</InputTitle>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z]/gi, "");
                setFirstName(e.target.value);
              }}
              ref={(element) => {
                ref.current[0] = element;
              }}
            />
            <ErrorCase isActive={firstNameValidationResult}>
              ErrorCase
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle>Last name</InputTitle>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z]/gi, "");
                setLastName(e.target.value);
              }}
              ref={(element) => {
                ref.current[1] = element;
              }}
            />
            <ErrorCase isActive={lastNameValidationResult}>ErrorCase</ErrorCase>
          </InputContainer>
        </Wrapper>
        <InputContainer>
          <InputTitle
            ref={(element) => {
              ref.current[2] = element;
            }}
          >
            Country
          </InputTitle>
          <SelectBoxEdit
            list={countryList}
            value={countryCode}
            setValue={setCounryCode}
            validationStart={validationStart}
            setValidationResult={setCounryCodeValidationResult}
          />
          <ErrorCase isActive={countryCodeValidationResult}>
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Company name</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            ref={(element) => {
              ref.current[3] = element;
            }}
          />
          <ErrorCase isActive={companyNameValidationResult}>
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Company Category</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <SelectBox
            value={industryCode}
            list={companyCategoryList}
            setValue={setIndustryCode}
            validationStart={validationStart}
            setValidationResult={setIndustryCodeValidationResult}
          />
          <ErrorCase
            isActive={industryCodeValidationResult}
            ref={(element) => {
              ref.current[4] = element;
            }}
          >
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Company URL</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input
            type="text"
            value={homepageUrl}
            onChange={(e) => {
              setHomepageUrl(e.target.value);
            }}
            ref={(element) => {
              ref.current[5] = element;
            }}
          />
          <ErrorCase isActive={homepageUrlValidationResult}>
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Phone number</InputTitle>
          <Wrapper>
            <InputContainerCountryCodeNum>
              <SelectBoxCountryCodeNum
                list={countryList}
                value={countryPhoneNumber}
                setValue={setCountryPhoneNumber}
                validationStart={validationStart}
                setValidationResult={setCounryCodeValidationResult}
                countryCode={countryCode}
                setCountryCode={setCounryCode}
              />
              <ErrorCase isActive={countryPhoneNumberValidationResult}>
                ErrorCase
              </ErrorCase>
            </InputContainerCountryCodeNum>
            <InputContainerPhoneNumber>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  inputHandlerOnlyNumber(e);
                }}
                ref={(element) => {
                  ref.current[6] = element;
                }}
              />
              <ErrorCase isActive={phoneNumberValidationResult}>
                ErrorCase
              </ErrorCase>
            </InputContainerPhoneNumber>
          </Wrapper>
        </InputContainer>

        <ButtonWrapper>
          <Button>
            <Link href="/account_detail" style={{ textDecoration: "none" }}>
              <LinkStyling>Cancel</LinkStyling>
            </Link>
          </Button>

          <Button onClick={() => validationCheckAndSignupRequest()}>
            Done
          </Button>
        </ButtonWrapper>
      </Main>
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
const SelectBoxCountryCodeNumTemporary = styled.div`
  margin-right: 8px;
  box-sizing: border-box;
  width: 120px;
  flex: 0 0 120px;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  @media screen and (max-width: 768px) {
    margin-right: 8.5px;
    width: 77px;
    flex: 0 0 77px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 40px;
  max-width: 427px;
  @media screen and (max-width: 768px) {
    display: block;
    max-width: 100%; // 사이드바 추가하는거면 나중에 여기 삭제
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
  line-height: 26px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    font-size: 22px;
    line-height: 26px;
    margin-left: 8px;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;
const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;

  &:nth-of-type(1) {
    margin-right: 10px;
  }
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

const InputOptionalText = styled.div`
  display: inline-block;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;

  color: #a4abba;
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

  &:disabled {
    background-color: #ffffff;
  }
`;

const InputContainerCountryCodeNum = styled.div``;
const InputContainerPhoneNumber = styled.div`
  width: 100%;
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
const Line = styled.div`
  margin-bottom: 20px;
  border-top: 1px dashed #dee8ec;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 11px;
`;

const Button = styled.button`
  display: flex;
  height: 48px;
  width: 100%;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: "Roboto";
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #121822;

  background-color: #e1ff20;
  border: 1px solid #d4f01e;
  border-radius: 2px;

  overflow: hidden;
  cursor: pointer;

  &:nth-of-type(1) {
    font-weight: 400;
    color: #121822;
    border: 1px solid #dee8ec;
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

export default useEdit_account_info;
