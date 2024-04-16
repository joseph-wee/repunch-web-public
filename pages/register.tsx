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
  enableButton,
  disableButton,
} from "../utils/functions";
import { signupRequest, loginRequest, originsRequest } from "../utils/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
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

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // 회원가입 요청 두번 방지를 위한 로딩값

  const router = useRouter();
  const ref = useRef<null[] | HTMLDivElement[]>([]); // errorcase div 배열형식으로 담김
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { value: isLogin } = useAppSelector((state) => state.isLogin);
  const dispatch = useAppDispatch();

  /** 회사 카테고리 리스트 업데이트 필요 */
  const companyCategoryList: ListCountryArray = [
    { name: "empty", code: "empty1" },
    { name: "empty1", code: "empty2" },
    { name: "empty2", code: "empty3" },
    { name: "empty3", code: "empty4" },
    { name: "empty4", code: "empty5" },
  ];

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

  /** 인풋 숫자만 되게하는 함수 */
  const inputHandlerOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(onlyNumber);
  };

  /** 인증 확인버튼 클릭 시 확인 유무에따라 팝업 혹은 페이지 이동 */
  const authConfirmHandler = (userId: string, password: string) => {
    // loginRequest(userId, password).then((res) => {
    //   if (Boolean(res?.data)) {
    //     if (res?.data.status == 200) {
    //       // 200 안뜨긴 하는데 회원가입이니깐... 지워야하나?
    //       sessionStorage.setItem("at", res.data.result.access_token);
    //       sessionStorage.setItem("rt", res.data.result.refresh_token);
    //       dispatch(login());
    //       router.push("/");
    //     } else if (res?.data.status == 401) {
    //       // 무슨 에러 처리를 해야할까?
    //     }
    //   } else if (res?.response.data.status == 403) {
    //     setPopUpIsActive(true);
    //   }
    // });
    router.push("/");
  };

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
    let regexp = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,20}$/; // 비밀번호 유효성 검사 정규식 영문,숫자,특수문자 포함
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
    if (password == passwordConfirm && passwordConfirm.length > 0) {
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
    validationResult[7] = validationUserId();
    validationResult[8] = validationPassword();
    validationResult[9] = validationPasswordConfirm();

    //유효성 결과 false값있으면 그 input으로 포커스, 모두 true면 return true
    for (let i = 0; i < 10; i++) {
      console.log("??");
      if (validationResult[i] == false) {
        console.log(i);
        ref.current[i]?.focus();
        ref.current[i]?.scrollIntoView({
          block: "center",
          inline: "start",
        });
        setLoading(false);
        break;
      }
      if (i == 9) {
        return true;
      }
    }
  };

  /** 확인버튼 클릭시 유효성검사 모두 통과했는지 확인 후 가입api요청 아니면 모두 재검사 */
  const validationCheckAndSignupRequest = () => {
    disableButton(buttonRef);
    let validationAllValue = validationAll();
    if (validationAllValue == true) {
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
        console.log(res);
        if (res?.data?.status == 200) {
          loginRequest(userId, password).then((res) => {
            if (Boolean(res?.data)) {
              if (res?.data.status == 401) {
                setAuthPageIsActive(true);
              }
            } else if (res?.response.data.status == 403) {
              setAuthPageIsActive(true);
            }
          });
          enableButton(buttonRef);
          return;
        }
        if (res?.data.status == 500) {
          setUserIdValidationResult(3);
          ref.current[7]?.focus();
          ref.current[7]?.scrollIntoView({
            block: "center",
            inline: "start",
          });
          enableButton(buttonRef);
          return;
        }
      });
    }
    enableButton(buttonRef);
  };

  /** 국가 선택에따라 국가 전화번호 세팅 */
  useEffect(() => {
    countryCode &&
      setCountryPhoneNumber(
        originsCallingCode.find((x: any) =>
          x.countryCodeArr.includes(countryCode)
        ).callingCode
      );
  }, [countryCode]);

  /** 영어만 허용 */
  const charBlocker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /[^A-Za-z]/gi;
    e.target.value = e.target.value.replace(reg, "");
  };

  /** 영어, 숫자만 허용 */
  const charNumberBlocker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /[^A-Za-z0-9]/gi;
    e.target.value = e.target.value.replace(reg, "");
  };

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
              onChange={(e) => {
                charNumberBlocker(e);
                setFirstName(e.target.value);
              }}
              maxLength={30}
              ref={(element) => {
                ref.current[0] = element;
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
              onChange={(e) => {
                charNumberBlocker(e);
                setLastName(e.target.value);
              }}
              maxLength={30}
              ref={(element) => {
                ref.current[1] = element;
              }}
            />
            <ErrorCase isActive={lastNameValidationResult}>
              Please enter your last name.
            </ErrorCase>
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
          <InputTitle>Company name</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input
            type="text"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            maxLength={50}
            ref={(element) => {
              ref.current[3] = element;
            }}
          />
          <ErrorCase isActive={companyNameValidationResult}>
            Please enter your company name.
          </ErrorCase>
        </InputContainer>
        {/* <InputContainer>
          <InputTitle>Company Category</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <SelectBox
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
        </InputContainer> */}
        <InputContainer>
          <InputTitle>Company URL</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input
            type="text"
            onChange={(e) => {
              e.target.value = e.target.value.replace(
                /[^\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=0-9A-Za-z]/gi,
                ""
              );
              setHomepageUrl(e.target.value);
            }}
            maxLength={50}
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
          <PhoneWrapper>
            <InputContainerCountryCodeNum>
              <SelectBoxCountryCodeNum
                list={originsCallingCode}
                value={countryPhoneNumber}
                setValue={setCountryPhoneNumber}
                validationStart={validationStart}
                setValidationResult={setCountryPhoneNumberValidationResult}
                countryCode={countryCode}
                setCountryCode={setCounryCode}
              />
              <ErrorCase isActive={countryPhoneNumberValidationResult}>
                Please select your country number.
              </ErrorCase>
            </InputContainerCountryCodeNum>
            <InputContainerPhoneNumber>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                  inputHandlerOnlyNumber(e);
                }}
                maxLength={50}
                ref={(element) => {
                  ref.current[6] = element;
                }}
              />
              <ErrorCase isActive={phoneNumberValidationResult}>
                Please enter your phone number.
              </ErrorCase>
            </InputContainerPhoneNumber>
          </PhoneWrapper>
        </InputContainer>
        <Line />
        <InputContainer>
          <InputTitle>ID</InputTitle>
          <InputOptionalText>(Mail Address)</InputOptionalText>
          <Input
            type="email"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            maxLength={50}
            ref={(element) => {
              ref.current[7] = element;
            }}
          />
          <ErrorCase isActive={userIdValidationResult}>
            {userIdValidationResult === 2
              ? "Please enter a valid email address."
              : "This email is already in use."}
          </ErrorCase>
        </InputContainer>
        <InputContainer>
          <InputTitle>Password</InputTitle>

          <Input
            type="password"
            onChange={(e) => {
              setPassowrd(e.target.value);
            }}
            maxLength={20}
            ref={(element) => {
              ref.current[8] = element;
            }}
          />
          <PasswordNotice isActive={passwordValidationResult}>
            The password must be at least 8 characters including uppercase
            letters, lowercase letters, and numbers.
          </PasswordNotice>
        </InputContainer>
        <InputContainer>
          <InputTitle>Password confirm</InputTitle>

          <Input
            type="password"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            maxLength={20}
            ref={(element) => {
              ref.current[9] = element;
            }}
          />
          <ErrorCase isActive={passwordConfirmValidationResult}>
            The passwords are not the same.
          </ErrorCase>
        </InputContainer>
        <Wrapper>
          <Button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <LinkStyling>Cancel</LinkStyling>
            </Link>
          </Button>
          <Button
            ref={buttonRef}
            onClick={() => !loading && validationCheckAndSignupRequest()}
          >
            Confirm
          </Button>
        </Wrapper>
        <TextContainer>
          <Text>
            By Apply(Sign up as a member), you agree to our <br />
          </Text>
          <Link href="/terms_of_service" style={{ textDecoration: "none" }}>
            <LinkText>Terms of Service</LinkText>
          </Link>

          <Text>and</Text>
          <Link href="/privacy_policy" style={{ textDecoration: "none" }}>
            <LinkText>Privacy Policy</LinkText>
          </Link>
        </TextContainer>
      </Container>
      <AuthContainer isActive={authPageIsActive}>
        <AuthWrapper>
          {/* <AuthTitle>Repunch</AuthTitle>
          <Name>J Kim</Name> */}
          {/* <ConfirmWrapper> */}
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
          <AuthButton onClick={() => router.push("/")}>Home</AuthButton>
          {/* </ConfirmWrapper> */}
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

  color: #121822;
`;
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;

  @media screen and (max-width: 768px) {
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

  @media screen and (max-width: 768px) {
    position: static;
    font-family: "Roboto";
    font-size: 12px;
    line-height: 130%;
  }
`;
const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;
const PhoneWrapper = styled.div`
  display: flex;
  gap: 8px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const InputContainerCountryCodeNum = styled.div`
  width: 100%;
`;
const InputContainerPhoneNumber = styled.div`
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
  display: ${(props) => {
    return props.isActive === 0 || props.isActive === 1 ? "none" : "block";
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
const PasswordNotice = styled.div<{ isActive: number }>`
  margin-top: 10px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: ${(props) => {
    return props.isActive == 2 ? "#ff5c01" : "#A4B0B2";
  }};
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
  color: #121822;

  background-color: #e1ff20;
  border: 1px solid #d4f01e;
  border-radius: 2px;

  overflow: hidden;
  cursor: pointer;

  &:nth-of-type(1) {
    margin-right: 12px;
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
const LinkText = styled.span`
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
  @media screen and (max-width: 768px) {
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
  @media screen and (max-width: 768px) {
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

  color: #121822;
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

  color: #121822;
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

  color: #121822;
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

  color: #121822;

  overflow: hidden;

  background-color: #e1ff20;
  border: 1px solid #d4f01e;

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
  line-height: 13px;

  text-align: center;
  text-decoration-line: underline;

  color: #121822;
`;

export default useRegister;
