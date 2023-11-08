import { useRouter } from "next/router";
import React, { useEffect } from "react";

const callback = () => {
  const router = useRouter();

  useEffect(() => {
    const token = router.asPath.split("&")[0].split("token=")[1];
    const PayerID = router.asPath.split("&")[1].split("PayerID=")[1];
  }, []);
  return <div>callback</div>;
};

export default callback;
