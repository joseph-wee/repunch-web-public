import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { paymentRequest2 } from "../../utils/api";
import styled from "styled-components";

const useCallback = () => {
  const router = useRouter();

  const paymentHandler = () => {
    const token = router.asPath.split("&")[0].split("token=")[1];
    const PayerID = router.asPath.split("&")[1].split("PayerID=")[1];

    console.log(token);
    console.log(PayerID);
    console.log(localStorage.getItem("at"));

    paymentRequest2(localStorage.getItem("at"), token, PayerID).then((res?) => {
      console.log(res);
      //성공 case
      if (res?.data.result.status == "COMPLETED") {
        window.parent.sendToPaymentCompletePage();
        window.alert("결제된거임");
        window.close();
        return;
      }
      window.alert("결제안되었음");
    });
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
