import React from "react";
import styled from "styled-components";

const terms_of_service = () => {
  return (
    <Container>
      <Title>Terms of Service</Title>
      <Line />
      <Text>
        Tujuan Ketentuan Layanan ini adalah untuk mengatur hak, kewajiban,
        tanggung jawab dan hal-hal lain yang diperlukan antara PT. JOOB GLOBAL
        INDONESIA ("Perseroan") dan "Pengguna" (sebagaimana didefinisikan di
        bawah) sehubungan dengan penggunaan JOOB, layanan aplikasi seluler yang
        disediakan oleh Perseroan.
        <br />1 – Definisi
      </Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          "Bisnis" mengacu pada entitas tempat lowongan pekerjaan didaftarkan
          dengan tujuan mencari kandidat untuk pekerjaan dan menghubungkan
          Pemilik Bisnis, Manajer Bisnis, dan dengan calon Karyawan.
        </Text>
      </Wrapper>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          "Pemilik Bisnis" mengacu pada otoritas yang dapat mendaftarkan Bisnis,
          menambah, mengedit, dan menghapus posting pekerjaan, serta mengelola
          daftar Karyawan dan Manajer Bisnis.
        </Text>
      </Wrapper>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          "Manajer Bisnis" mengacu pada otoritas yang dapat menambah, mengedit,
          dan menghapus posting pekerjaan dan mengelola daftar Karyawan.
        </Text>
      </Wrapper>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          "Pencari Kerja" mengacu pada orang yang mengakses layanan JOOB untuk
          mencari pekerjaan.
        </Text>
      </Wrapper>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          “Karyawan” mengacu pada orang yang telah dipekerjakan di Bisnis.
        </Text>
      </Wrapper>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          "Pengguna" mengacu pada setiap orang atau entitas yang menggunakan
          aspek apa pun dari layanan JOOB.
        </Text>
      </Wrapper>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>“Layanan” mengacu pada segala aspek layanan JOOB.</Text>
      </Wrapper>
      <Text>2 – Ketentuan untuk Pengguna</Text>
      <Wrapper>
        <DotWrapper>
          <Dot />
        </DotWrapper>
        <Text>
          Semua Pengguna tidak boleh menggunakan Layanan dengan cara apa pun
          yang melanggar hak kekayaan intelektual atau hak kepemilikan orang
          lain di yurisdiksi mana pun.
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
