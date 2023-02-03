/* --------------------------- 회원가입 페이지 --------------------------- */

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { SelectBox, SelectBoxCountryCodeNum } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  valueValidation,
  homepageUrlValidation,
  userIdValidation,
  passwordValidation,
  passwordConfirmValidation,
} from "../utils/functions";
import { signupRequest, loginRequest } from "../utils/api";
import { useAppDispatch, useAppSelector } from "../pages/redux/hooks";
import { login } from "../features/login/loginSlice";
import { PopUp } from "../components";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useRegister = () => {
  const [firstName, setFirstName] = useState<string>(""); // 성
  const [lastName, setLastName] = useState<string>(""); // 이름
  const [countryCode, setCounryCode] = useState<string | undefined>(""); // 국가코드
  const [companyName, setCompanyName] = useState<string>(""); // 회사이름
  const [industryCode, setIndustryCode] = useState<string | undefined>(""); // 회사 업종구분 코드
  const [homepageUrl, setHomepageUrl] = useState<string>(""); // 회사 홈페이지 url
  const [countryPhoneNumber, setCountryPhoneNumber] = useState<
    string | undefined
  >(""); // 국가 전화코드
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호
  const [userId, setUserId] = useState<string>(""); // 유저ID(이메일주소)
  const [password, setPassowrd] = useState<string>(""); // 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState<string>(""); // 비밀번호 확인
  const [role, setRole] = useState<string>("USER"); // 유저 권한

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

  const router = useRouter();
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

  /** 확인버튼 클릭시 유효성검사 모두 통과했는지 확인 후 가입api요청 아니면 모두 재검사 */
  const validationCheckAndSignupRequest = () => {
    if (
      firstNameValidationResult == 1 &&
      lastNameValidationResult == 1 &&
      countryCodeValidationResult == 1 &&
      companyNameValidationResult == 1 &&
      industryCodeValidationResult == 1 &&
      homepageUrlValidationResult == 1 &&
      countryPhoneNumberValidationResult == 1 &&
      phoneNumberValidationResult == 1 &&
      userIdValidationResult == 1 &&
      passwordValidationResult == 1 &&
      passwordConfirmValidationResult == 1
    ) {
      signupRequest(
        firstName,
        lastName,
        countryCode,
        companyName,
        industryCode,
        homepageUrl,
        countryPhoneNumber,
        phoneNumber,
        userId,
        password,
        passwordConfirm,
        role
      ).then((res) => {
        if (res?.data?.status == 200) {
          alert("회원가입에 성공하였습니다.(임시 메세지)");
          loginRequest(userId, password).then((res) => {
            if (Boolean(res?.data)) {
              if (res?.data.status == 401) {
                alert("로그인에 실패하였습니다.(임시 메세지)");
              }
            } else if (res?.response.data.status == 403) {
              setAuthPageIsActive(true);
            }
          });
        } else if (res?.data.status == 500) {
          alert(res?.data.message + " (임시 메세지)");
        }
      });
    } else {
      valueValidation(firstName, setfirstNameValidationResult);
      valueValidation(lastName, setLastNameValidationResult);
      valueValidation(countryCode, setCounryCodeValidationResult);
      valueValidation(companyName, setCompanyNameValidationResult);
      valueValidation(industryCode, setIndustryCodeValidationResult);
      homepageUrlValidation(homepageUrl, setHomepageUrlValidationResult);
      valueValidation(
        countryPhoneNumber,
        setCountryPhoneNumberValidationResult
      );
      valueValidation(phoneNumber, setPhoneNumberValidationResult);
      userIdValidation(userId, setUserIdValidationResult);
      passwordValidation(password, setPassowrdValidationResult);
      passwordConfirmValidation(
        password,
        passwordConfirm,
        setPasswordConfirmValidationResult
      );
      setMoveScreen((prev) => prev + 1); // errorcase 입력칸으로 화면이동시키기 위해 값 변경
    }
  };

  /** 인증 확인버튼 클릭 시 확인 유무에따라 팝업 혹은 페이지 이동 */
  const authConfirmHandler = (userId: string, password: string) => {
    loginRequest(userId, password).then((res) => {
      if (Boolean(res?.data)) {
        if (res?.data.status == 200) {
          // 200 안뜨긴 하는데 회원가입이니깐... 지워야하나?
          sessionStorage.setItem("at", res.data.result.access_token);
          sessionStorage.setItem("rt", res.data.result.refresh_token);
          dispatch(login());
          router.push("/");
        } else if (res?.data.status == 401) {
          // 무슨 에러 처리를 해야할까?
        }
      } else if (res?.response.data.status == 403) {
        setPopUpIsActive(true);
      }
    });
  };

  /** 국가코드 바뀔때마다 phoneNumberHandler 호출 */
  useEffect(() => {
    phoneNumberHandler();
  }, [countryCode]);

  /** 성 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      valueValidation(firstName, setfirstNameValidationResult);
    }
  }, [firstName]);

  /** 이름 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      valueValidation(lastName, setLastNameValidationResult);
    }
  }, [lastName]);

  /** 국가코드 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      valueValidation(countryCode, setCounryCodeValidationResult);
    }
  }, [countryCode]);

  /** 회사이름 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      valueValidation(companyName, setCompanyNameValidationResult);
    }
  }, [companyName]);

  /** 회사업종구분코드 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      valueValidation(industryCode, setIndustryCodeValidationResult);
    }
  }, [industryCode]);

  /** 홈페이지url 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      homepageUrlValidation(homepageUrl, setHomepageUrlValidationResult);
    }
  }, [homepageUrl]);

  /** 국가전화코드 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      valueValidation(
        countryPhoneNumber,
        setCountryPhoneNumberValidationResult
      );
    }
  }, [countryPhoneNumber]);

  /** 전화번호 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      valueValidation(phoneNumber, setPhoneNumberValidationResult);
    }
  }, [phoneNumber]);

  /** 아이디 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      userIdValidation(userId, setUserIdValidationResult);
    }
  }, [userId]);

  /** 비밀번호 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      passwordValidation(password, setPassowrdValidationResult);
    }
  }, [password]);

  /** 비밀번호확인 입력할때 마다 유효성 검사 */
  useEffect(() => {
    if (validationStart) {
      passwordConfirmValidation(
        password,
        passwordConfirm,
        setPasswordConfirmValidationResult
      );
    }
  }, [passwordConfirm]);

  /** error case 발생하면 해당 입력칸으로 이동 */
  useEffect(() => {
    if (moveScreen != 0) {
      let top = 9;
      ref.current?.forEach((i, j) => {
        if (Boolean(i?.clientHeight) && j < top) {
          top = j;
        }
      });
      ref.current[top]?.scrollIntoView({ block: "center" });
    }
  }, [moveScreen]);

  return (
    <>
      <Container isActive={authPageIsActive}>
        <Title>Register</Title>
        <WelcomeText>Welcome to Repunch</WelcomeText>
        <Wrapper>
          <InputContainer>
            <InputTitle>First name</InputTitle>
            <Input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setValidationStart(true)}
            />
            <ErrorCase
              isActive={firstNameValidationResult}
              ref={(element) => {
                ref.current[0] = element;
              }}
            >
              ErrorCase
            </ErrorCase>
          </InputContainer>
          <InputContainer>
            <InputTitle>Last name</InputTitle>
            <Input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => setValidationStart(true)}
            />
            <ErrorCase
              isActive={lastNameValidationResult}
              ref={(element) => {
                ref.current[1] = element;
              }}
            >
              ErrorCase
            </ErrorCase>
          </InputContainer>
        </Wrapper>
        <InputContainer>
          <InputTitle>Country</InputTitle>
          <SelectBox list={countryList} setValue={setCounryCode} />
          <ErrorCase
            isActive={countryCodeValidationResult}
            ref={(element) => {
              ref.current[2] = element;
            }}
          >
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Company name</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
            onFocus={() => setValidationStart(true)}
          />
          <ErrorCase
            isActive={companyNameValidationResult}
            ref={(element) => {
              ref.current[3] = element;
            }}
          >
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Company Category</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <SelectBox list={companyCategoryList} setValue={setIndustryCode} />
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
            onChange={(e) => setHomepageUrl(e.target.value)}
            onFocus={() => setValidationStart(true)}
          />
          <ErrorCase
            isActive={homepageUrlValidationResult}
            ref={(element) => {
              ref.current[5] = element;
            }}
          >
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Phone number</InputTitle>
          <Wrapper>
            <SelectBoxCountryCodeNum
              list={countryList}
              value={countryPhoneNumber}
              setValue={setCountryPhoneNumber}
            />
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => inputHandlerOnlyNumber(e)}
              onFocus={() => setValidationStart(true)}
            />
          </Wrapper>
          <ErrorCase
            isActive={
              countryPhoneNumberValidationResult == 2 ||
              phoneNumberValidationResult == 2
                ? 2
                : 1
            }
            ref={(element) => {
              ref.current[6] = element;
            }}
          >
            ErrorCase
          </ErrorCase>
        </InputContainer>
        {/**삭제할것인지 아닌지 체크필요 id와 email 입력이 둘다 email로 받기 때문 */}
        {/* <InputContainer>
          <InputTitle>Email</InputTitle>

          <Input type="email" onChange={(e) => setUserId(e.target.value)}/>
        </InputContainer> */}
        <Line />
        <InputContainer>
          <InputTitle>ID</InputTitle>
          <InputOptionalText>(Mail Address)</InputOptionalText>
          <Input
            type="email"
            onChange={(e) => setUserId(e.target.value)}
            onFocus={() => setValidationStart(true)}
          />
          <ErrorCase
            isActive={userIdValidationResult}
            ref={(element) => {
              ref.current[7] = element;
            }}
          >
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Password</InputTitle>

          <Input
            type="password"
            onChange={(e) => setPassowrd(e.target.value)}
            onFocus={() => setValidationStart(true)}
          />
          <ErrorCase
            isActive={passwordValidationResult}
            ref={(element) => {
              ref.current[8] = element;
            }}
          >
            It must contain at least 8 digits and no more than 20 digits, one
            uppercase and lowercase letter and one special character. (test
            message)
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Password confirm</InputTitle>

          <Input
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onFocus={() => setValidationStart(true)}
          />
          <ErrorCase
            isActive={passwordConfirmValidationResult}
            ref={(element) => {
              ref.current[9] = element;
            }}
          >
            ErrorCase
          </ErrorCase>
        </InputContainer>
        <Wrapper>
          <Button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <LinkStyling>Cancel</LinkStyling>
            </Link>
          </Button>
          <Button onClick={() => validationCheckAndSignupRequest()}>
            Confirm
          </Button>
        </Wrapper>
        <TextContainer>
          <Text>
            By Apply(Sign up as a member), you agree to our <br />
          </Text>
          <LinkText href="https://www.naver.com" target="_blank">
            Terms of Service
          </LinkText>
          <Text>and</Text>
          <LinkText href="https://www.naver.com" target="_blank">
            Privacy Policy
          </LinkText>
        </TextContainer>
      </Container>
      <AuthContainer isActive={authPageIsActive}>
        <AuthWrapper>
          <AuthTitle>Repunch</AuthTitle>
          <Name>J Kim</Name>
          <ConfirmWrapper>
            <Id>ID (E-mail)</Id>
            <Email>{userId}</Email>
            <AuthText>
              An authentication email has been sent to
              <br />
              your email address.
              <br />
              You can use all services freely after the
              <br />
              authentication process.
            </AuthText>
            <AuthButton onClick={() => authConfirmHandler(userId, password)}>
              Confirm
            </AuthButton>
          </ConfirmWrapper>
        </AuthWrapper>
        <TextInform>
          If you entered the wrong email address, please
          <br />
          contact the email below
        </TextInform>
        <EmailRepunch>support@repunch.co.kr</EmailRepunch>
      </AuthContainer>
      <PopUp
        title={"Not verified yet"}
        text={"Wait a little longer or resend"}
        isActive={popUpIsActive}
        setIsActive={setPopUpIsActive}
      />
    </>
  );
};

const Container = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "none" : "block";
  }};
  position: relative;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 427px;

  color: #0a4459;
`;
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;

  @media screen and (max-width: 767px) {
    margin-bottom: 4px;
  }
`;
const WelcomeText = styled.div`
  position: absolute;
  top: 28px;
  right: 20px;
  margin-bottom: 20px;

  font-family: "Roboto Slab";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  color: #a4abba;

  @media screen and (max-width: 767px) {
    position: static;
    font-family: "Roboto";
    font-size: 12px;
    line-height: 130%;
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
`;
const ErrorCase = styled.div<{ isActive: number }>`
  visibility: ${(props) => {
    return props.isActive == 2 ? "visible" : "hidden";
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

  background-color: #0a4459;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  overflow: hidden;
  cursor: pointer;

  &:nth-of-type(1) {
    margin-right: 12px;
    font-weight: 400;
    color: #0a4459;
    background-color: #f2f6f8;

    @media screen and (max-width: 767px) {
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
  color: #0a4459;
  line-height: 130%;
`;

const TextContainer = styled.div`
  margin-bottom: 40px;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #a4abba;
  text-align: center;
`;
const Text = styled.span`
  margin-left: 3.8px;
  margin-right: 3.8px;
`;
const LinkText = styled.a`
  font-weight: 700;
  text-decoration: none;
  text-decoration-line: underline;

  color: #a4abba;
`;

const AuthContainer = styled.div<{ isActive: boolean }>`
  display: ${(props) => {
    return props.isActive == true ? "block" : "none";
  }};
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: 20px;
  padding-left: 20px;
  @media screen and (max-width: 767px) {
    padding-top: 20px;
  }
`;
const AuthWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 29px;
  padding-top: 15px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: #f2f6f8;
  max-width: 427px;
  border: 0.79402px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    padding-top: 11px;
  }
`;
const AuthTitle = styled.div`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  color: #0a4459;
`;
const Name = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #1eab92;
`;
const ConfirmWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 20px;
  background-color: #ffffff;

  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
`;
const Id = styled.div`
  display: flex;
  align-itmes: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #0a4459;
`;
const Email = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-itmes: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #ff5c01;
`;
const AuthText = styled.div`
  margin-bottom: 12px;
  text-align: center;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  color: #0a4459;
`;

const AuthButton = styled.button`
  display: flex;
  margin: 0 auto;
  width: 180px;
  height: 40px;

  box-sizing: border-box;

  align-items: center;
  justify-content: center;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;

  color: #ffffff;

  overflow: hidden;

  background-color: #1eab92;
  border: none;
  border-radius: 2px;

  cursor: pointer;
`;

const TextInform = styled.div`
  margin-bottom: 6px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  text-align: center;

  color: #8aa1aa;
`;
const EmailRepunch = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px%;

  text-align: center;
  text-decoration-line: underline;

  color: #0a4459;
`;

export default useRegister;
