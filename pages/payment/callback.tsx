import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { paymentRequest2 } from "../../utils/api";

const useCallback = () => {
  const router = useRouter();

  const paymentHandler = () => {
    paymentRequest2(localStorage.getItem("at")).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    const token = router.asPath.split("&")[0].split("token=")[1];
    const PayerID = router.asPath.split("&")[1].split("PayerID=")[1];

    paymentHandler();
  }, []);
  return <div>callback</div>;
};

export default useCallback;
