import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  btn_play_l,
  btn_stop_l,
  ic_camera_play_wht,
  ic_close_wht,
  ic_play_fullscreen,
} from "../../assets";
import Image from "next/image";

const VideoPreview = ({
  el,
  deleteFile,
  index,
  clickVideoIndex,
  setClickVideoIndex,
  previewVideos,
  setPreviewVideos,
  videoFiles,
  setVideoFiles,
}: {
  el: any;
  deleteFile: any;
  index: number;
  clickVideoIndex: number;
  setClickVideoIndex: any;
  previewVideos: any;
  setPreviewVideos: any;
  videoFiles: any;
  setVideoFiles: any;
}) => {
  const [nowPlaying, setNowPlaying] = useState(false); // 플레이 유무
  const [active, setActive] = useState(false); // 활성화 유무
  const ref = useRef<HTMLVideoElement>(null); // 동영상 정보

  const [currentTime, setCurrentTime] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [fullScreenValue, setFullScreenValue] = useState(false);

  const totalTime = (ref && ref.current && ref.current.duration) || 0;
  const videoElement = ref && ref.current;

  const containerRef = useRef<any>();

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

  // play icon 클릭했을떄 실행되는 함수
  const onPlayIconClick = () => {
    if (videoElement) {
      if (nowPlaying) {
        setNowPlaying(false);
        ref.current.pause();
      } else {
        setNowPlaying(true);
        ref.current.play();
      }
    }
  };

  /** 동영상 시간 업데이트 함수 */
  const addTimeUpdate = () => {
    const observedVideoElement = ref && ref.current;

    if (observedVideoElement) {
      const test = () => {
        setCurrentTime(observedVideoElement.currentTime);
      };
      observedVideoElement.addEventListener("timeupdate", test);

      return () =>
        observedVideoElement?.removeEventListener("timeupdate", test);
    }
  };

  // progress 이동시켰을때 실행되는 함수
  const onProgressChange = (percent: number) => {
    if (!showControl) {
      setShowControl(true);
    }

    if (videoElement) {
      const playingTime = videoElement.duration * (percent / 100);
      videoElement.currentTime = playingTime;
      setCurrentTime(playingTime);
    }
  };

  // 마우스를 올렸을때 실행되는 함수
  const onMouseUp = () => {
    if (videoElement) {
      // controller를 옮긴 시점에 currentTime이 최신화 되지 않아, 이를 위해 수정
      videoElement.currentTime = currentTime;
      nowPlaying ? videoElement.play() : videoElement.pause();
    }
    console.log("마우스 업");
  };

  // 마우스를 내렸을때 실행되는 함수
  const onMouseDown = () => {
    if (videoElement) {
      videoElement.pause();
    }
    console.log("마우스 다운");
  };

  /** 동영상 전체화면 */
  const fullScreenHandler = () => {
    if (!containerRef.current?.ownerDocument.fullscreen) {
      containerRef.current?.requestFullscreen();
      console.log(containerRef);
      return;
    }
    if (containerRef.current?.ownerDocument.fullscreen) {
      document.exitFullscreen();

      return;
    }
  };

  useEffect(() => {
    console.log(index);
    console.log(clickVideoIndex);
  }, []);
  return (
    // <BackGround active={true}>
    <>
      <ImageButton
        onClick={() => {
          setClickVideoIndex(index);
          setNowPlaying(true);
          addTimeUpdate();
        }}
      >
        <RemoveButton
          onClick={(e) => {
            e.stopPropagation();

            deleteFile(
              index,
              previewVideos,
              setPreviewVideos,
              videoFiles,
              setVideoFiles
            );
          }}
        >
          <Image src={ic_close_wht} alt="ic_close_wht" width={10} height={10} />
        </RemoveButton>
        <PlayButtonSmall>
          <Image src={ic_camera_play_wht} alt="ic_camera_play_wht" />
        </PlayButtonSmall>

        <Video
          src={el}
          width="80px"
          height="80px"
          ref={ref}
          onClick={() => setClickVideoIndex(index)}
        >
          {/* <source src={el} type="video/mp4" /> */}
        </Video>
      </ImageButton>
      {/* </BackGround> */}

      <BackGround
        isActive={index === clickVideoIndex}
        onClick={() => setClickVideoIndex(-1)}
      />

      <VideoContainer ref={containerRef} isActive={index === clickVideoIndex}>
        <Video
          id="video"
          ref={ref}
          loop={true}
          onClick={() => {
            onPlayIconClick();
            setShowControl(true);
            addTimeUpdate();
          }}
          muted
          autoPlay
          // onMouseOver={() => console.log("마우스오버")}
          // onMouseOut={() => setShowControl(false)}
          onMouseMove={() => setShowControl(true)}
        >
          <source src={el} type="video/mp4" />
          error
        </Video>
        <PlayButton
          showControl={showControl}
          nowPlaying={nowPlaying}
          onMouseOver={() => setShowControl(true)}
          onClick={() => {
            onPlayIconClick();
            setShowControl(true);
            addTimeUpdate();
          }}
        >
          <Image src={btn_play_l} alt="play_button" />
        </PlayButton>
        <PauseButton
          showControl={showControl}
          nowPlaying={nowPlaying}
          onMouseOver={() => setShowControl(true)}
          onClick={() => {
            onPlayIconClick();
            setShowControl(true);
            addTimeUpdate();
          }}
        >
          <Image src={btn_stop_l} alt="play_button" />
        </PauseButton>
        <ControllerWrapper showControl={showControl}>
          <ProgressBar
            onChange={(e) => onProgressChange(parseInt(e.target.value, 10))}
            onMouseDown={() => onMouseDown()}
            onMouseUp={() => onMouseUp()}
            type="range"
            min="0"
            max="100"
            step="0.01"
            value={(currentTime / totalTime || 0) * 100}
            fullScreenValue={fullScreenValue}
          />
          <FullScreenButton onClick={() => fullScreenHandler()}>
            <Image src={ic_play_fullscreen} alt="fullscreen" />
          </FullScreenButton>
        </ControllerWrapper>
      </VideoContainer>

      {/* <BackGround
        index={index}
        clickIndex={clickVideoIndex}
        onClick={() => {
          setClickVideoIndex(-1);
          setNowPlaying(false);
        }}
      >
        <VideoContainer ref={containerRef}>
          <BigVideo
            full={index === clickVideoIndex}
            id="video"
            key={index}
            ref={ref}
            loop={true}
            autoPlay
            muted
            onClick={(e) => {
              onPlayIconClick();
              setShowControl(true);
              addTimeUpdate();
            }}
            // onMouseOver={() => console.log("마우스오버")}
            onMouseOut={() => setShowControl(false)}
            onMouseMove={() => setShowControl(true)}
          >
            <source src={el} type="video/mp4" />
            error
          </BigVideo>
          <PlayButton
            showControl={showControl}
            nowPlaying={nowPlaying}
            onMouseOver={() => setShowControl(true)}
            onClick={() => {
              onPlayIconClick();
              setShowControl(true);
              addTimeUpdate();
            }}
          >
            <Image src={btn_play_l} alt="play_button" />
          </PlayButton>
          <PauseButton
            showControl={showControl}
            nowPlaying={nowPlaying}
            onMouseOver={() => setShowControl(true)}
            onClick={() => {
              onPlayIconClick();
              setShowControl(true);
              addTimeUpdate();
            }}
          >
            <Image src={btn_stop_l} alt="play_button" />
          </PauseButton>
          <ControllerWrapper showControl={showControl}>
            <ProgressBar
              onChange={(e) => onProgressChange(parseInt(e.target.value, 10))}
              onMouseDown={() => onMouseDown()}
              onMouseUp={() => onMouseUp()}
              onMouseOver={() => setShowControl(true)}
              type="range"
              min="0"
              max="100"
              step="0.01"
              value={(currentTime / totalTime || 0) * 100}
              fullScreenValue={fullScreenValue}
            />
            <FullScreenButton onClick={() => fullScreenHandler()}>
              <Image src={ic_play_fullscreen} alt="fullscreen" />
            </FullScreenButton>
          </ControllerWrapper>
        </VideoContainer>
      </BackGround> */}
    </>
  );
};
const BackGround = styled.div<{ isActive: boolean }>`
  z-index: 3;
  display: ${(props) => {
    return props.isActive ? "block" : "none";
  }};
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;
const VideoContainer = styled.div<{ isActive: boolean }>`
  z-index: 3;
  display: ${(props) => {
    return props.isActive ? "block" : "none";
  }};
  position: fixed;
  width: 50vw;
  height: 50vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const BigImage = styled.div`
  position: absolute;
  width: 50vw;
  &::after {
    display: block;
    content: "";

    padding-bottom: 100%;
  }

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ImageButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 2px;
  /* background-color: #a4b0b2; */
  overflow: hidden;
  cursor: pointer;
`;
const ImageVideoInput = styled.input`
  display: none;
`;
const RemoveButton = styled.div`
  z-index: 2;
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
const PlayButtonSmall = styled.div`
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
  position: absolute;
  width: 100%;
  height: 100%;
`;
const BigVideo = styled.video<{ full: boolean }>`
  ${(props) => {
    return props.full
      ? `position: absolute;
  width: 50vw;
  &::after {
    display: block;
    content: "";

    padding-bottom: 100%;
  }

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);`
      : "";
  }};
`;

const PlayButton = styled.div<{ showControl: boolean; nowPlaying: boolean }>`
  visibility: ${(props) => {
    return props.showControl && !props.nowPlaying == true
      ? "visible"
      : "hidden";
  }};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;
const PauseButton = styled.div<{ showControl: boolean; nowPlaying: boolean }>`
  visibility: ${(props) => {
    return props.showControl && props.nowPlaying == true ? "visible" : "hidden";
  }};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;
const ControllerWrapper = styled.div<{ showControl: boolean }>`
  display: flex;
  visibility: ${(props) => {
    return props.showControl == true ? "visible" : "hidden";
  }};
  padding-left: 20px;
  padding-right: 10px;
  box-sizing: border-box;
  gap: 20px;
  position: absolute;
  bottom: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const ProgressBar = styled.input<{ value: number; fullScreenValue: boolean }>`
  width: 100%;
  margin: 0;
  height: 4px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background-clip: content-box;
  box-sizing: border-box;
  border-radius: 5px;
  accent-color: #121822;
  -webkit-appearance: none;
  background: ${(props) => {
    return `linear-gradient(to right, #FFFFFF ${props.value}%,  rgba(255, 255, 255, 0.3) ${props.value}%);`;
  }};
  width: ${(props) => {
    return props.fullScreenValue ? "visible" : "hidden";
  }};
`;
const FullScreenButton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default VideoPreview;
