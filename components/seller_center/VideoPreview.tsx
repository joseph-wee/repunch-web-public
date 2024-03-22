import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ic_camera_play_wht, ic_close_wht } from "../../assets";
import Image from "next/image";

const VideoPreview = ({
  el,
  deleteFile,
  index,
  previewVideos,
  setPreviewVideos,
  videoFiles,
  setVideoFiles,
}: {
  el: any;
  deleteFile: any;
  index: any;
  previewVideos: any;
  setPreviewVideos: any;
  videoFiles: any;
  setVideoFiles: any;
}) => {
  const [nowPlaying, setNowPlaying] = useState(false); // 플레이 유무
  const [active, setActive] = useState(false); // 활성화 유무
  const ref = useRef<HTMLVideoElement>(null); // 동영상 정보

  /** 비디오 컨트롤러 */
  const videoHandler = () => {
    // 플레이중인 경우
    if (nowPlaying) {
      ref.current?.pause();
      setNowPlaying(false);
      return;
    }
    // 멈춰있는 경우
    ref.current?.play();
    setNowPlaying(true);
    return;
  };

  return (
    // <BackGround active={true}>
    <ImageButton onClick={() => videoHandler()}>
      <RemoveButton
        onClick={() =>
          deleteFile(
            index,
            previewVideos,
            setPreviewVideos,
            videoFiles,
            setVideoFiles
          )
        }
      >
        <Image src={ic_close_wht} alt="ic_close_wht" width={10} height={10} />
      </RemoveButton>
      <PlayButton>
        <Image src={ic_camera_play_wht} alt="ic_camera_play_wht" />
      </PlayButton>

      <Video src={el} width="80px" height="80px" ref={ref}>
        {/* <source src={el} type="video/mp4" /> */}
      </Video>
    </ImageButton>
    // {/* </BackGround> */}
  );
};
const BackGround = styled.div<{ active: boolean }>`
  display: ${(props) => {
    return props.active ? "flex" : "none";
  }};
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ImageButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 2px;
  background-color: #a4b0b2;
  overflow: hidden;
  cursor: pointer;
`;
const ImageVideoInput = styled.input`
  display: none;
`;
const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 8px;
  right: 6px;
  border-radius: 100%;
  background-color: #121822;
`;
const PlayButton = styled.div`
  position: absolute;
`;
const ImageVideoText = styled.div`
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  letter-spacing: -0.132px;
  color: #a4b0b2;
  &:last-of-type {
    margin: 0;
  }
`;
const SellProductButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border-radius: 2px;
  border: 0.794px solid #d4f01e;
  background-color: #e1ff20;
  height: 48px;
  font-size: 14px;

  font-weight: 700;
  line-height: 18.2px;
`;
const Video = styled.video`
  width: 80px;
  height: 80px;
`;

export default VideoPreview;
