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

/** 처음에 실행될 상품(원단) 목록 조회 api */
export const productsRequestFirst = async (count: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/products?count=${count}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 처음이후 실행될 상품(원단) 목록 조회 api  */
export const productsRequestNext = async (count: number, searchAfter: any) => {
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
export const productDetailRequest = async (productNo: string | null) => {
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

/** 현재 유저 정보 조회 */
export const userCheck = async (accessToken: string | null) => {
  try {
    const res = await axios({
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "GET",
      url: `/user/me`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 현재 유저 정보 조회2 */
export const userCheck2 = (accessToken: string | null) => {
  axios
    .get("/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

/** 배송지 추가 */
export const addAddress = async (
  accessToken: string | null,
  title: string,
  firstName: string,
  lastName: string,
  companyName: string,
  countryCode: string,
  state: string,
  streetAddress1: string,
  streetAddress2: string,
  postCode: string,
  phoneNumber: string
) => {
  try {
    const res = await axios({
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "POST",
      url: `/email/reset`,
      data: {
        title: title,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        countryCode: countryCode,
        state: state,
        streetAddress1: streetAddress1,
        streetAddress2: streetAddress2,
        postCode: postCode,
        phoneNumber: phoneNumber,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 장바구니 담기 */
export const carts = async (
  accessToken: string | null,
  productNo: number,
  orderUnitType: string,
  count: number
) => {
  try {
    const res = await axios({
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "POST",
      url: `/carts`,
      data: {
        productNo: productNo,
        orderUnitType: orderUnitType,
        count: count,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 주문 생성 */
// export const createOrder = async (
//   orderUnitType: string,
//   productNo: number,
//   itemAmount: number,
//   count: number,
//   cartNo: number,
//   addressNo: number,
//   firstName: string,
//   lastName: string,
//   postalCode: number,
//   countryCode: string,
//   state: string,
//   streetAddress1: string,
//   streetAddress2: string,
//   phoneNumber: string,
//   deliveryMethod: string,
//   amount: number
// ) => {
//   try {
//     const res = await axios({
//       method: "POST",
//       url: `/orders`,
//       data: {
//         orderUnitType: orderUnitType,
//         items: [
//           {
//             orderUnitType: orderUnitType,
//             productNo: productNo,
//             amount: itemAmount,
//             count: count,
//             cartNo: cartNo,
//             shippingAddress: {
//               addressNo: addressNo,
//               firstName: firstName,
//               lastName: lastName,
//               postalCode: postalCode,
//               countryCode: countryCode,
//               state: state,
//               streetAddress1: streetAddress1,
//               streetAddress2: streetAddress2,
//               phoneNumber: phoneNumber,
//             },
//           },
//         ],
//         deliveryMethod: deliveryMethod,
//         shippingAddress: {
//           addressNo: addressNo,
//           firstName: firstName,
//           lastName: lastName,
//           postalCode: postalCode,
//           countryCode: countryCode,
//           state: state,
//           streetAddress1: streetAddress1,
//           streetAddress2: streetAddress2,
//           phoneNumber: phoneNumber,
//         },
//         amount: amount,
//       },
//     });
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

/** 주문 생성(가결제) */
export const paymentCapture = async (
  orderNo: string,
  paymentMethod: string,
  paymentAmount: number,
  pointAmount: number,
  totalAmount: number
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/orders`,
      data: {
        orderNo: orderNo,
        paymentMethod: paymentMethod,
        paymentAmount: paymentAmount,
        pointAmount: pointAmount,
        totalAmount: totalAmount,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 결제 성공 콜백 api */
export const paymentRequest = async (token: string, payerId: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/payment/request`,
      data: {
        token: token,
        payerId: payerId,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 원단 소재 목록 조회 */
export const materialsRequest = () => {
  axios
    .get("/product/materials")
    .then((res: any) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

/** 주소 목록 조회 */
export const addressListRequest = async (
  acessToken: string | null,
  count: number
) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/user/addresses?count=${count}`,
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 주소 추가 */
export const addAddressRequest = async (
  acessToken: string | null,
  title: string,
  firstName: string,
  lastName: string,
  companyName: string,
  countryCode: string | undefined,
  state: string,
  streetAddress1: string,
  streetAddress2: string,
  postCode: string,
  phoneNumber: string
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/user/addresses`,
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
      data: {
        title: title,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        countryCode: countryCode,
        state: state,
        streetAddress1: streetAddress1,
        streetAddress2: streetAddress2,
        postCode: postCode,
        phoneNumber: phoneNumber,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// /** 주소 추가 */
// export const addCartRequest = async (
//   productOptionNo: string,
//   orderUnitType: string,
//   count: number
// ) => {
//   try {
//     const res = await axios({
//       method: "POST",
//       url: `/carts`,
//       headers: {
//         Authorization: `Bearer ${acessToken}`,
//       },
//       data: {
//         title: title,
//         firstName: firstName,
//         lastName: lastName,
//         companyName: companyName,
//         countryCode: countryCode,
//         state: state,
//         streetAddress1: streetAddress1,
//         streetAddress2: streetAddress2,
//         postCode: postCode,
//         phoneNumber: phoneNumber,
//       },
//     });
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

/** 장바구니 추가 */
export const addCartRequest = async (
  acessToken: string | null,
  productOptionNo: string,
  orderUnitType: string,
  count: number
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/carts`,
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
      data: {
        productOptionNo: productOptionNo,
        orderUnitType: orderUnitType,
        count: count,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 로그인 갱신, 리프레쉬 토큰으로 새로운 엑세스 토큰 발급 받음 */
export const loginRefreshRequest = async (refreshToken: string | null) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/token?refresh_token=${refreshToken}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 장바구니 목록 조회 */
export const cartListRequest = async (
  accessToken: string | null,
  orderUnitType: any,
  count: any,
  searchAfter: any
) => {
  try {
    const res = await axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url:
        searchAfter == 0
          ? `/carts?orderUnitType=${orderUnitType}&count=${count}`
          : `/carts?orderUnitType=${orderUnitType}&count=${count}&searchAfter=${searchAfter}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 장바구니 삭제 */
export const cartDelteRequest = async (
  accessToken: string | null,
  cartNo: number
) => {
  try {
    const res = await axios({
      method: "DELTE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: `/carts/${cartNo}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 컬러 목록 조회 */
export const colorsRequest = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `/product/colors`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 주소 삭제 */
export const deleteAddress = async (
  addressNo: number,
  accessToken: string | null
) => {
  try {
    const res = await axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: `/user/addresses/${addressNo}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 주소 수정 */
export const editAddress = async (
  addressNo: any,
  accessToken: string | null,
  title: string,
  firstName: string,
  lastName: string,
  companyName: string,
  countryCode: string,
  state: string,
  streetAddress1: string,
  streetAddress2: string,
  postCode: string,
  phoneNumber: string
) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `/user/addresses/${addressNo}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        title: title,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        countryCode: countryCode,
        state: state,
        streetAddress1: streetAddress1,
        streetAddress2: streetAddress2,
        postCode: postCode,
        phoneNumber: phoneNumber,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 주문 생성 */
export const createOrder = async (
  accessToken: string | null,
  orderUnitType: string,
  items: any,
  deliveryMethod: string,
  addressNo: number,
  firstName: string,
  lastName: string,
  postalCode: string,
  countryCode: string,
  state: string,
  streetAddress1: string,
  streetAddress2: string,
  phoneNumber: string,
  totalAmount: number
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/orders`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        orderUnitType: orderUnitType,
        items: items,
        deliveryMethod: deliveryMethod,
        shippingAddress: {
          addressNo: addressNo,
          firstName: firstName,
          lastName: lastName,
          postalCode: postalCode,
          countryCode: countryCode,
          // city: "test",
          state: state,
          streetAddress1: streetAddress1,
          streetAddress2: streetAddress2,
          phoneNumber: phoneNumber,
        },
        totalAmount: totalAmount,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 주문 상세 */
export const orderDetailRequest = async (orderNo: string) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/orders/${orderNo}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 주문 목록 - ALL */
export const ordersAllRequest = async (
  accessToken: string | null,
  searchAfter: number
) => {
  try {
    const res = await axios({
      method: "GET",
      url:
        searchAfter == -1
          ? `/orders?count=50`
          : `/orders?count=50&searchAfter=${searchAfter}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 주문 목록 - DELIVERED */
export const ordersDeliveredRequest = async (
  accessToken: string | null,
  searchAfter: number
) => {
  try {
    const res = await axios({
      method: "GET",
      url:
        searchAfter == -1
          ? `/orders?orderStatus=DELIVERED&count=50`
          : `/orders?orderStatus=DELIVERED&count=50&searchAfter=${searchAfter}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 주문 목록 - PICK_UP */
export const ordersPickUpRequest = async (
  accessToken: string | null,
  searchAfter: number
) => {
  try {
    const res = await axios({
      method: "GET",
      url:
        searchAfter == -1
          ? `/orders?orderStatus=PICKUP&count=50`
          : `/orders?orderStatus=DELIVERED&count=50&searchAfter=${searchAfter}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 주문 취소 */
export const orderCancelRequest = async (
  accessToken: string | null,
  orderNo: number
) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `/orders/${orderNo}/cancel`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 주문 결제 - 1단계 */
export const paymentRequest1 = async (
  accessToken: string | null,
  orderNo: number,
  orderNumber: number,
  paymentMethod: string,
  paymentAmount: number,
  pointAmount: number,
  totalAmount: number
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/payment/request`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        orderNo: orderNo,
        orderNumber: orderNumber,
        paymentMethod: paymentMethod,
        paymentAmount: paymentAmount,
        pointAmount: pointAmount,
        totalAmount: totalAmount,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

/** 주문 결제 -2단계 승인 */
export const paymentRequest2 = async (accessToken: string | null) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/payment/request`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        orderUnitType: "ROLL",
        items: [
          {
            orderUnitType: "ROLL",
            productNo: 10000,
            productOptionNo: 2,
            amount: 700,
            count: 1,
            cartNo: 2,
            shippingAddress: {
              addressNo: 1,
              firstName: "Yosup",
              lastName: "Wee",
              postalCode: "12235",
              countryCode: "KR",
              state: "Gyonggi-do Namyangju-si",
              streetAddress1: "Gyeongchun-ro 885beon-gil",
              streetAddress2: "22-7, 103호",
              phoneNumber: "01099088763",
            },
          },
        ],
        deliveryMethod: "AIR",
        shippingAddress: {
          addressNo: 1,
          firstName: "Yosup",
          lastName: "Wee",
          postalCode: "12235",
          countryCode: "KR",
          state: "Gyonggi-do Namyangju-si",
          streetAddress1: "Gyeongchun-ro 885beon-gil",
          streetAddress2: "22-7, 103호",
          phoneNumber: "01099088763",
        },
        totalAmount: 10,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
