import { signupRequest } from "./api";

/** 공통: 뒤로가기 */
export const goBack = () => {
  window.history.back();
};

/** 회원가입: 처음 input 유효성 검사 */
export const valueValidation = (
  value: string | undefined,
  validationStart: boolean,
  setValueValidationResult: React.Dispatch<React.SetStateAction<number>> // 사용가능 유무
) => {
  if (validationStart && Boolean(value)) {
    setValueValidationResult(1);
    return;
  }
  if (validationStart && !Boolean(value)) {
    setValueValidationResult(0);
    return;
  }
  if (!Boolean(value)) {
    setValueValidationResult(2);
    return;
  }
};

// /** 회원가입: 성 유효성 검사 */
// export const firstNameValidation = (
//   firstName: string, // 성
//   setFirstNameValidationResult: React.Dispatch<React.SetStateAction<boolean>> // 성 사용가능 유무
// ) => {
//   if (Boolean(firstName)) {
//     // 값이 있으면 true 비어있으면 false
//     setFirstNameValidationResult(true);
//   } else {
//     setFirstNameValidationResult(false);
//   }
// };

// /** 회원가입: 이름 유효성 검사 */
// export const lastNameValidation = (
//   lastName: string, // 이름
//   setLastNameValidationResult: React.Dispatch<React.SetStateAction<boolean>> // 이름 사용가능 유무
// ) => {
//   if (Boolean(lastName)) {
//     // 값이 있으면 true 비어있으면 false
//     setLastNameValidationResult(true);
//   } else {
//     setLastNameValidationResult(false);
//   }
// };

// /** 회원가입: 국가코드 유효성 검사 */
// export const countryCodeValidation = (
//   countryCode: string | undefined, // 국가 코드
//   setCountryCodeValidationResult: React.Dispatch<React.SetStateAction<boolean>> // 국가코드 사용가능 유무
// ) => {
//   if (Boolean(countryCode)) {
//     // 값이 있으면 true 비어있으면 false
//     setCountryCodeValidationResult(true);
//   } else {
//     setCountryCodeValidationResult(false);
//   }
// };

// /** 회원가입: 회사이름 유효성 검사 */
// export const companyNameValidation = (
//   companyName: string, // 국가 코드
//   setCompanyNameValidationResult: React.Dispatch<React.SetStateAction<boolean>> // 회사이름 사용가능 유무
// ) => {
//   if (Boolean(companyName)) {
//     // 값이 있으면 true 비어있으면 false
//     setCompanyNameValidationResult(true);
//   } else {
//     setCompanyNameValidationResult(false);
//   }
// };

// /** 회원가입: 회사업종 구분 코드 유효성 검사 */
// export const industryCodeValidation = (
//   industryCode: string, // 회사업종 구분 코드
//   setIndustryCodeValidationResult: React.Dispatch<React.SetStateAction<boolean>> // 회사업종 구분 코드 사용가능 유무
// ) => {
//   if (Boolean(industryCode)) {
//     // 값이 있으면 true 비어있으면 false
//     setIndustryCodeValidationResult(true);
//   } else {
//     setIndustryCodeValidationResult(false);
//   }
// };

/** 회원가입: 홈페이지 url 유효성 검사 */
export const homepageUrlValidation = (
  homepageUrl: string, // 홈페이지 url
  setHomepageUrlValidationResult: React.Dispatch<React.SetStateAction<number>> //  홈페이지 url 사용가능 유무
) => {
  let regexp = /^.+\.+./; // 홈페이지 url 정규식
  if (regexp.test(homepageUrl)) {
    // 정규식 통과하면 1 아니면 2
    setHomepageUrlValidationResult(1);
  } else {
    setHomepageUrlValidationResult(2);
  }
};

// /** 회원가입: 국가전화코드 유효성 검사 */
// export const countryPhoneNumberValidation = (
//   countryPhoneNumber: string | undefined, // 국가전화코드
//   setCountryCodeValidationResult: React.Dispatch<React.SetStateAction<boolean>> // 국가전화코드 사용가능 유무
// ) => {
//   if (Boolean(countryPhoneNumber)) {
//     // 값이 있으면 true 비어있으면 false
//     setCountryCodeValidationResult(true);
//   } else {
//     setCountryCodeValidationResult(false);
//   }
// };

// /** 회원가입: 전화번호 유효성 검사 */
// export const phoneNumberValidation = (
//   phoneNumber: string, // 전화번호
//   setCountryPhoneNumberValidationResult: React.Dispatch<
//     React.SetStateAction<boolean>
//   > // 전화번호 사용가능 유무
// ) => {
//   if (Boolean(phoneNumber)) {
//     // 값이 있으면 true 비어있으면 false
//     setCountryPhoneNumberValidationResult(true);
//   } else {
//     setCountryPhoneNumberValidationResult(false);
//   }
// };

/** 회원가입: 유저id(이메일주소) 유효성 검사*/
export const userIdValidation = (
  userId: string, // 전화번호
  validationStart: boolean,
  setUserIdValidationResult: React.Dispatch<React.SetStateAction<number>>
  // 전화번호 사용가능 유무
) => {
  let regexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 유효성 검사 정규식
  if (validationStart && (regexp.test(userId) || !Boolean(userId))) {
    setUserIdValidationResult(0);
    return;
  }
  if (validationStart && !regexp.test(userId)) {
    setUserIdValidationResult(2);
    return;
  }
  if (regexp.test(userId)) {
    setUserIdValidationResult(1);
    return;
  }
  if (!regexp.test(userId)) {
    setUserIdValidationResult(2);
    return;
  }
};

/** 회원가입: 비밀번호 유효성 검사*/
export const passwordValidation = (
  passowrd: string, // 비밀번호
  validationStart: boolean,
  setUserIdValidationResult: React.Dispatch<React.SetStateAction<number>>
  // 비밀번호 사용가능 유무
) => {
  let regexp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/; // 비밀번호 유효성 검사 정규식
  if (validationStart && (regexp.test(passowrd) || !Boolean(passowrd))) {
    setUserIdValidationResult(0);
    return;
  }
  if (validationStart && !regexp.test(passowrd)) {
    setUserIdValidationResult(2);
    return;
  }
  if (regexp.test(passowrd)) {
    setUserIdValidationResult(1);
    return;
  }
  if (!regexp.test(passowrd)) {
    setUserIdValidationResult(2);
    return;
  }
};

/** 회원가입: 비밀번호확인 유효성 검사*/
export const passwordConfirmValidation = (
  passowrd: string, // 비밀번호
  passwordConfirm: string, // 비밀번호확인
  validationStart: boolean,
  setPasswordConfirmValidationResult: React.Dispatch<
    React.SetStateAction<number>
  >
  // 비밀번호확인 사용가능 유무
) => {
  if (validationStart && !Boolean(passowrd)) {
    setPasswordConfirmValidationResult(0);
    return;
  }
  if (
    validationStart &&
    passowrd == passwordConfirm &&
    Boolean(passwordConfirm) &&
    Boolean(passowrd)
  ) {
    setPasswordConfirmValidationResult(1);
    return;
  }
  if (
    validationStart &&
    (passowrd != passwordConfirm || Boolean(passwordConfirm))
  ) {
    setPasswordConfirmValidationResult(2);
    return;
  }
  if (
    passowrd == passwordConfirm &&
    Boolean(passwordConfirm) &&
    Boolean(passowrd)
  ) {
    // 비밀번호와 비밀번호 확인이 같으면 1 아니면 2
    setPasswordConfirmValidationResult(1);
    return;
  }
  if (passowrd != passwordConfirm || !Boolean(passwordConfirm)) {
    setPasswordConfirmValidationResult(2);
    return;
  }
};

/** 로그인 유무 판별 */
export const loginCheck = () => {
  const keep = document.cookie.match("(^|;) ?" + "keep" + "=([^;]*)(;|$)");

  if (localStorage.getItem("at") && keep) {
    return true;
  }
  if (localStorage.getItem("at") && sessionStorage.getItem("keep")) {
    return true;
  }
  return false;
};
