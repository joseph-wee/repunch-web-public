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
          setMessage("인증이 완료 되었습니다.");
          return;
        }
        if (res?.data.status == 500) {
          setMessage(res?.data.message);
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
