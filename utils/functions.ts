import { signupRequest } from "./api";

/** 공통: 뒤로가기 */
export const goBack = () => {
  window.history.back();
};

/** 회원가입: 일반적인 input 유효성 검사 */
export const valueValidation = (
  value: string | undefined,
  setValueValidationResult: React.Dispatch<React.SetStateAction<number>> // 사용가능 유무
) => {
  if (Boolean(value)) {
    // 값이 있으면 1 비어있으면 2
    setValueValidationResult(1);
  } else {
    setValueValidationResult(2);
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

/** 회원가입: 유저id(이메일주소) 유효성 검사 */
export const userIdValidation = (
  userId: string, // 전화번호
  setPasswordValidationResult: React.Dispatch<React.SetStateAction<number>>
  // 전화번호 사용가능 유무
) => {
  let regexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 유효성 검사 정규식
  if (regexp.test(userId)) {
    // 정규식 통과하면 1 아니면 2
    setPasswordValidationResult(1);
  } else {
    setPasswordValidationResult(2);
  }
};

/** 회원가입: 비밀번호 유효성 검사 */
export const passwordValidation = (
  passowrd: string, // 비밀번호
  setUserIdValidationResult: React.Dispatch<React.SetStateAction<number>>
  // 비밀번호 사용가능 유무
) => {
  let regexp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/; // 비밀번호 유효성 검사 정규식
  if (regexp.test(passowrd)) {
    // 정규식 통과하면 1 아니면 2
    setUserIdValidationResult(1);
  } else {
    setUserIdValidationResult(2);
  }
};

/** 회원가입: 비밀번호확인 유효성 검사 */
export const passwordConfirmValidation = (
  passowrd: string, // 비밀번호
  passwordConfirm: string, // 비밀번호확인
  setPasswordConfirmValidationResult: React.Dispatch<
    React.SetStateAction<number>
  >
  // 비밀번호확인 사용가능 유무
) => {
  if (passowrd == passwordConfirm && Boolean(passwordConfirm)) {
    // 비밀번호와 비밀번호 확인이 같으면 1 아니면 2
    setPasswordConfirmValidationResult(1);
  } else {
    setPasswordConfirmValidationResult(2);
  }
};
