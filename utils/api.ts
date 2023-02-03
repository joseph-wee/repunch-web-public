import axios, { AxiosError } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_KEY;

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
