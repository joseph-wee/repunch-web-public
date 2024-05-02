import React, { useEffect, useState } from "react";
import { authEmailRequest } from "../../utils/api";
import { useRouter } from "next/router";
import styled from "styled-components";

const useKey = () => {
  const [message, setMessage] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    authEmailRequest(router.query.key).then((res) => {
      if (Boolean(res?.data)) {
        if (res?.data.status == 200) {
          setMessage("complete");
          router.push("/login");
          return;
        }
        // TODO: 인증이 안된 케이스에 대한 기획이 필요함
        // 현재 그냥 인증이 안되도 로그인 화면으로 이동하도록 해놓았음.
        if (res?.data.status == 500) {
          setMessage(res?.data.message);
          router.push("/login");
          return;
        }
      }
    });
  }, [router.isReady]);

  return <Container>{message ? message : "loading..."}</Container>;
};

const Container = styled.div`
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 1030px;
  text-align: center;
`;

export default useKey;
