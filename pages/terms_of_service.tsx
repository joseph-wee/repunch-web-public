import React from "react";
import styled from "styled-components";

const terms_of_service = () => {
  return (
    <Container>
      <Title>Terms of Service</Title>
      <Line />
      <Text>1. Service Introduction</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Repunch (hereinafter referred to as the &apos;Website&apos; or
          &apos;Service&apos;) is an online platform provided by Repunch located
          in the Republic of Korea, offering the sale of fabrics. By using this
          website, you agree to and comply with the following Terms and
          Conditions.
        </Text>
      </Wrapper>

      <Text>2. Acceptance of Terms</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          By using the Repunch website, you are considered to have read and
          understood all of these Terms and Conditions. If you do not agree to
          these Terms and Conditions, you should not use the website.
          Additionally, the use of the website by the user implies acceptance of
          any changes made to these Terms and Conditions as they use the
          website. Users are advised to regularly review these Terms and
          Conditions to stay informed of any updates.
        </Text>
      </Wrapper>

      <Text>3. Use of the Service</Text>
      <Text>3.1 User Responsibilities</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          By using the Repunch website, you agree to comply with the laws and
          regulations of the Republic of Korea. You must not misuse the website
          for illegal or improper purposes. You are responsible for keeping your
          Repunch account information (user ID and password) secure and not
          sharing it with others. All activities carried out from your user
          account are your responsibility.
        </Text>
      </Wrapper>

      <Text>3.2 Product Purchases</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Fabric products available through the Repunch website can be purchased
          after reviewing the product descriptions and prices. Accurate delivery
          and payment information must be provided when purchasing products.
        </Text>
      </Wrapper>

      <Text>4. Intellectual Property</Text>
      <Text>4.1 Rights of Repunch</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          All content, logos, trademarks, text, images, and other elements on
          the Repunch website are protected by intellectual property rights held
          by Repunch or their respective content owners. You must not reproduce,
          modify, distribute, transmit, or sell any of this content without the
          prior written consent of Repunch.
        </Text>
      </Wrapper>

      <Text>4.2 User-Generated Content</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Content posted by users on the Repunch website (reviews, comments,
          etc.) remains the intellectual property of the respective user.
          However, by posting content, users grant Repunch a free license to use
          the content on the website.
        </Text>
      </Wrapper>

      <Text>5. Privacy Protection</Text>
      <Text>5.1 Collection and Protection of Personal Information</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Users are encouraged to review the Repunch Privacy Policy, which
          provides information on the collection, use, protection, transmission,
          and storage of personal information.
        </Text>
      </Wrapper>

      <Text>6. Service Discontinuation and Liability</Text>
      <Text>6.1 Service Discontinuation</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Repunch reserves the right to discontinue or modify the service
          without prior notice, and Repunch will not be liable for any losses or
          damages resulting from such actions.
        </Text>
      </Wrapper>

      <Text>6.2 Disclaimer</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Repunch, its affiliates, partners, and representatives are not
          responsible for interruptions, data loss, bugs, inaccuracies or
          omissions in website information, or any direct or indirect damages
          resulting from the use or access to the website, including
          unauthorized access or modifications by third parties, regardless of
          whether users were informed of the possibility of such damages.
        </Text>
      </Wrapper>

      <Text>7. Governing Law and Dispute Resolution</Text>
      <Text>7.1 Applicable Law</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          The Repunch Terms & Conditions of Use are governed by the laws of the
          Republic of Korea.
        </Text>
      </Wrapper>

      <Text>7.2 Dispute Resolution</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Users of the Repunch website agree that disputes related to website
          content and use will be resolved in the courts of the Republic of
          Korea.
        </Text>
      </Wrapper>

      <Text>8. Reporting Illegal Content</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Users of the Repunch website can report illegal content by contacting
          contact@repunch.com. Please use this content as a reference to draft
          the &apos;Terms & Conditions of Use&apos; for the Repunch website. It
          is advisable to seek legal advice for proper legal compliance
        </Text>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  max-width: 428px;
  margin: 0 auto;
  color: #121822;
  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;
const Line = styled.div`
  border-top: 1px dashed #dee8ec;
  margin-bottom: 20px;
`;
const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const DotWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 18.2px;
`;
const Dot = styled.div`
  margin-left: 9px;
  margin-right: 9px;
  flex-shrink: 0;
  width: 2.7px;
  height: 2.7px;
  background-color: #131922;
`;

export default terms_of_service;
