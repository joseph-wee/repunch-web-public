import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  MobileSideBar,
  OrderInfoBox,
  ProductList,
  RecentOrders,
  SelectBox,
  SelectBoxCountryCodeNum,
  SideBar,
} from "../components";
import { ic_down_bk, ic_up_bk } from "../assets";
import Link from "next/link";
import Image from "next/image";
import { btn_web_back } from "../assets";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { goBack } from "../utils/functions";
import { originsRequest, userInfoRequest } from "../utils/api";

/** 국가, 카테고리 객체 타입 */
export interface List {
  name: string; // 이름
  code: string; // 코드
  code_num?: string; // 코드 번호
}

/** 국가, 카테고리 객체타입을 배열 형태로 확장 */
export interface ListCountryArray extends Array<List> {}

const useAccount_detail = () => {
  const [sortIsActive, setSortIsActive] = useState(true);

  const [firstName, setFirstName] = useState<string>(""); // 성
  const [lastName, setLastName] = useState<string>(""); // 이름
  const [countryCode, setCounryCode] = useState<string | undefined>(""); // 국가코드
  const [countryName, setCountryName] = useState<string | undefined>(""); // 국가이름
  const [companyName, setCompanyName] = useState<string>(""); // 회사이름
  const [industryCode, setIndustryCode] = useState<string | undefined>(""); // 회사 업종구분 코드
  const [homepageUrl, setHomepageUrl] = useState<string>(""); // 회사 홈페이지 url
  const [countryPhoneNumber, setCountryPhoneNumber] = useState<
    string | undefined
  >(""); // 국가 전화코드
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호
  const [userId, setUserId] = useState<string>(""); // 유저ID(이메일주소)
  const [password, setPassowrd] = useState<string>(""); // 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState<string>(""); // 비밀번호 확인
  const [role, setRole] = useState<string>("USER"); // 유저 권한

  const router = useRouter();

  /** 국가 리스트 */
  const [origins, setOrigins] = useState<any>();
  const [originsCallingCode, setOriginsCallingCode] = useState<any>();

  /** 국가리스트 세팅 */
  useEffect(() => {
    if (sessionStorage.getItem("origins")) {
      const result = [...JSON.parse(sessionStorage.getItem("origins") || "{}")];
      setOrigins(result);
      setOriginsCallingCode(
        result.map((el: any) => {
          let countryCodeArr = [];
          for (const x of result) {
            el.callingCode === x.callingCode &&
              countryCodeArr.push(x.countryCode);
          }
          return {
            name: el.name,
            callingCode: el.callingCode,
            countryCodeArr: countryCodeArr,
          };
        })
      );
    }

    originsRequest().then((res: any) => {
      const result = res?.data.result;
      setOrigins(result);
      setOriginsCallingCode(
        result.map((el: any) => {
          let countryCodeArr = [];
          for (const x of result) {
            el.callingCode === x.callingCode &&
              countryCodeArr.push(x.countryCode);
          }
          return {
            name: el.name,
            callingCode: el.callingCode,
            countryCodeArr: countryCodeArr,
          };
        })
      );
      sessionStorage.setItem("origins", JSON.stringify(result));
    });
  }, []);

  /** 회사 카테고리 리스트 업데이트 필요 */
  const companyCategoryList: ListCountryArray = [
    { name: "empty", code: "empty1" },
    { name: "empty1", code: "empty2" },
    { name: "empty2", code: "empty3" },
    { name: "empty3", code: "empty4" },
    { name: "empty4", code: "empty5" },
  ];

  /** 현재 유저 정보 요청 및 세팅 */
  const userInfoHandler = () => {
    let at = localStorage.getItem("at");
    userInfoRequest(at).then((res: any) => {
      const data = res?.data.result;
      // console.log(data);

      data.firstName && setFirstName(data.firstName);
      data.lastName && setLastName(data.lastName);
      data.companyName && setCompanyName(data.companyName);
      // 카테고리 삭제하기로 하지않았나?
      // 카테고리 삭제하는거 아니면 카테고리 세팅 코드 삽입
      data.companyUrl && setHomepageUrl(data.companyUrl);
      data.countryCode && setCounryCode(data.countryCode);
      data.countryCode &&
        setCountryName(origins.find((x: any) => x.countryCode === "KR").name);
      data.countryCode &&
        setCountryPhoneNumber(
          origins.find((x: any) => x.countryCode === "KR").callingCode
        );
      data.phoneNumber && setPhoneNumber(data.phoneNumber);
      data.userId && setUserId(data.userId);
      data.role && setRole(data.role);
    });
  };

  /** 국가코드에따라 국가 전화 코드 할당하는 함수 */
  const phoneNumberHandler = () => {
    origins.forEach((i: any) => {
      i.code == countryCode ? setCountryPhoneNumber(i.code_num) : "";
    });
  };

  /** 인풋 숫자만 되게하는 함수 */
  const inputHandlerOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(onlyNumber);
  };

  /**값 비어있는지 검사 후에 회원가입 요청 api 호출 */
  const registerApiRequestHandler = () => {
    if (firstName.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (lastName.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (countryCode ? false : true) {
      alert("값을 모두 채워주세요");
    } else if (countryPhoneNumber ? false : true) {
      alert("값을 모두 채워주세요");
    } else if (phoneNumber.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (userId.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (password.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (passwordConfirm.length == 0) {
      alert("값을 모두 채워주세요");
    } else if (role.length == 0) {
      alert("값을 모두 채워주세요");
    } else {
      // registerApiRequest();
      alert("회원가입에 성공하였습니다.(임시 메세지)");
      router.push("/login");
    }
  };

  /** 국가코드 바뀔때마다 phoneNumberHandler 호출 */
  useEffect(() => {
    // phoneNumberHandler();
  }, [countryCode]);

  useEffect(() => {
    origins && userInfoHandler();

    // if (originsCallingCode && countryPhoneNumber) {
    //   console.log(originsCallingCode);
    //   console.log(countryPhoneNumber);
    //   console.log(
    //     originsCallingCode
    //       .find((x: any) => x.callingCode.includes(countryPhoneNumber))
    //       .countryCodeArr.join(", ")
    //   );
    // }
    // console.log(
    //   originsCallingCode.find((x: any) => x.callingCode.includes(countryCode))
    // );
  });

  return (
    <Container>
      <SideBar />
      <Main>
        <TitleWrapper>
          <ImageWrapper onClick={() => goBack()}>
            <Image src={btn_web_back} alt={"btn_web_back"} />
          </ImageWrapper>
          <Title>Account Detail</Title>
        </TitleWrapper>
        <Line />
        <Wrapper>
          <InputContainer>
            <InputTitle>First name</InputTitle>
            <Input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              disabled
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Last name</InputTitle>
            <Input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              disabled
            />
          </InputContainer>
        </Wrapper>
        <InputContainer>
          <InputTitle>Country</InputTitle>
          <Input type="text" value={countryName} disabled />
        </InputContainer>
        <InputContainer>
          <InputTitle>Company name</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
            disabled
          />
        </InputContainer>
        {/** 나중에 추가 */}
        {/* <InputContainer>
          <InputTitle>Company Category</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input type="text" value="" disabled />
        </InputContainer> */}
        <InputContainer>
          <InputTitle>Company URL</InputTitle>
          <InputOptionalText>(Optional)</InputOptionalText>
          <Input
            type="text"
            onChange={(e) => setHomepageUrl(e.target.value)}
            value={homepageUrl}
            disabled
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>Phone number</InputTitle>
          <Wrapper>
            <SelectBoxCountryCodeNumTemporary>
              <CallingCode>{`${countryPhoneNumber}`}</CallingCode>
              {originsCallingCode &&
                countryPhoneNumber &&
                `(${originsCallingCode
                  .find((x: any) => x.callingCode.includes(countryPhoneNumber))
                  .countryCodeArr.join(", ")})`}
            </SelectBoxCountryCodeNumTemporary>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => inputHandlerOnlyNumber(e)}
              disabled
            />
          </Wrapper>
        </InputContainer>
        {/**삭제할것인지 아닌지 체크필요 id와 email 입력이 둘다 email로 받기 때문 */}
        {/* <InputContainer>
          <InputTitle>Email</InputTitle>

          <InputEmail
            type="email"
            onChange={(e) => setUserId(e.target.value)}
            value="test"
            disabled
          />
        </InputContainer> */}
        <Link href="/edit_account_info" style={{ textDecoration: "none" }}>
          <EditButton>Edit information</EditButton>
        </Link>
        <Line />
        <InputContainer>
          <InputTitle>ID</InputTitle>
          <InputOptionalText>(Mail Address)</InputOptionalText>
          <InputEmail
            type="email"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
            disabled
          />
        </InputContainer>

        <Link href="/edit_account_password" style={{ textDecoration: "none" }}>
          <EditButton>Edit password</EditButton>
        </Link>
      </Main>
    </Container>
  );
};

const SelectBoxTemporary = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  box-sizing: border-box;
`;

const SelectBoxCountryCodeNumTemporary = styled.div`
  display: flex;
  align-items: center;
  padding-left: 14px;
  margin-right: 8px;
  box-sizing: border-box;
  width: 120px;
  flex: 0 0 120px;
  height: 40px;
  border: 1px solid #dee8ec;
  border-radius: 2px;
  @media screen and (max-width: 768px) {
    margin-right: 8.5px;
    width: 77px;
    flex: 0 0 77px;
  }
  font-size: 14px;
  font-weight: 400;
  color: #121822;
`;

const CallingCode = styled.div`
  width: 35px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 40px;
  max-width: 637px;
  min-height: 350px;
  @media screen and (max-width: 1279px) {
    max-width: 608px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;
const Main = styled.div`
  margin-left: 20px;
  width: 100%;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ImageWrapper = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.011em;
  color: #121822;
  @media screen and (max-width: 768px) {
    margin-left: 8px;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;
const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;

  &:nth-of-type(1) {
    margin-right: 10px;
  }
`;
const InputTitle = styled.div`
  display: inline-block;
  margin-right: 3.8px;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: #121822;
`;

const InputOptionalText = styled.div`
  display: inline-block;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;

  color: #a4b0b2;
`;
const Input = styled.input`
  display: inline-block;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  color: #121822;

  &:disabled {
    background-color: #ffffff;
  }
`;
const InputEmail = styled.input`
  display: inline-block;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #dee8ec;
  border-radius: 2px;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  color: #121822;

  &:disabled {
    background-color: #ffffff;
  }
`;
const EditButton = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.2px;
  color: #a4b0b2;
  text-decoration-line: underline;
`;
const Line = styled.div`
  margin-bottom: 20px;
  border-top: 1px dashed #dee8ec;
`;

export default useAccount_detail;
