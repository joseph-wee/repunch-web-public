import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { paymentRequest2 } from "../../utils/api";
import styled from "styled-components";

const useCallback = () => {
  const router = useRouter();

  const paymentHandler = () => {
    const token = router.asPath.split("&")[0].split("token=")[1];
    const payerId = router.asPath.split("&")[1].split("PayerID=")[1]; // paypal에서는 PayerID로 넘어옴 하지만 api로 넘길 때는 payerID 앞에 소문자임, 뒤가 대문자

    paymentRequest2(localStorage.getItem("at"), token, payerId).then(
      (res: any) => {
        console.log(res);
        //성공 case
        if (res?.data.result.status == "COMPLETED") {
          window.opener.parent.sendToPaymentCompletePage();
          window.close();
          return;
        }
      }
    );
  };

  useEffect(() => {
    paymentHandler();
  }, []);
  return <Container></Container>;
};

const Container = styled.div`
  z-index: 999;
  position: fixed;
  background-color: #ffffff;
  top: 0;
  width: 100%;
  height: 100vh;
`;

export default useCallback;
