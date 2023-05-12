import axios, { AxiosError } from "axios";

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_KEY;
axios.defaults.baseURL = "http://test.api.repunch.io/v1";

/** 회원가입 요청 api */
export const signupRequest = async (
  firstName: string,
  lastName: string,
  countryCode: string | undefined,
  companyName: string,
  industryCode: string | undefined,
  homepageUrl: string,
  countryPhoneNumber: string | undefined,
  phoneNumber: string,
  userId: string,
  password: string,
  passwordConfirm: string,
  role: string
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/signup",
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
    });
    return res;
  } catch (error) {
    alert("통신에 실패하였습니다.(임시 메세지)");
    console.log(error);
  }
};

/** 로그인 요청 api */
export const loginRequest = async (userId: string, password: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/login?userId=${userId}&password=${password}&role=USER`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 이메일 인증 요청 api */
export const authEmailRequest = async (key: string[] | string | undefined) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/email/verify?sessionKey=${key}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 상품(원단) 목록 조회 api */
export const productsRequest = async (count: number, searchAfter: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/products?count=${count}&searchAfter=${searchAfter}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 유저 패스워드 초기화 */
export const pwMailingRequest = async (userId: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/reset-password?email=${userId}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 유저 패스워드 재설정 */
export const pwResetRequest = async (
  sessionKey: undefined | string | string[],
  password: string,
  passwordConfirm: string
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/email/reset`,
      data: {
        sessionKey: sessionKey,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 개인정보 조회 */
export const userInfoRequest = async (acessToken: string | null) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/user/me`,
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 상품(원단) 상세 조회 */
export const productDetailRequest = async (productNo: string | undefined) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/products/${productNo}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
