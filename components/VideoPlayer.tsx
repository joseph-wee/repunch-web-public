import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRef } from "react";
import { btn_play_l, btn_stop_l, ic_play_fullscreen } from "../assets";
import Image from "next/image";

const VideoPlayer = ({
  isActive,
  select,
}: {
  isActive: boolean;
  select: any;
}) => {
  const [nowPlaying, setNowPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [fullScreenValue, setFullScreenValue] = useState(false);
  const [tValue, setTValue] = useState(0);

  const [imageClicked, setImageClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);

  const totalTime = (ref && ref.current && ref.current.duration) || 0;
  const videoElement = ref && ref.current;

  useEffect(() => {});

  // const classProps = classNames(styles.video, className);

  const startTime = Math.floor(currentTime);

  // useEffect(() => {
  //   console.log(currentTime);
  // }, [currentTime]);

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

  const moveTest = () => {
    const observedVideoElement = ref && ref.current;

    if (observedVideoElement) {
      const test5 = () => {
        setTimeout(() => {
          console.log("test");
        }, 1000);
      };
      observedVideoElement.addEventListener("mousemove", test5);
      console.log("실행댐");

      return observedVideoElement?.removeEventListener("mousemove", test5);
    }
  };

  useEffect(() => {
    addTimeUpdate();
    // moveTest();
  }, []);

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

  // control bar visible 관련 함수
  const handleControlVisible = () => {
    if (!showControl) {
      setShowControl(true);
      setTimeout(() => {
        setShowControl(false);
      }, 1500);
    }
  };

  const [volumeClicked, setVolumeClicked] = useState(false);

  // volume 클릭 관련 함수
  const handleVolume = () => {
    if (volumeClicked) {
      if (videoElement) {
        videoElement.muted = true;
      }
      setVolumeClicked(false);
    } else {
      if (videoElement) {
        videoElement.muted = false;
      }
      setVolumeClicked(true);
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

  /** showControlHandler */
  const showControlHandler = () => {
    // clearTimeout(showTimeHandler)
  };

  /** 동영상 UI노출 및 숨김 */
  const playerUIVisibleHandler = () => {
    // const observedVideoElement = ref && ref.current;

    // if (observedVideoElement) {
    //   const test = () => {
    //     setTimeout(() => {
    //       console.log("test");
    //     }, 2000);
    //   };
    //   observedVideoElement.addEventListener("pointermove", () => test);

    //   return () =>
    //     observedVideoElement?.removeEventListener("pointermove", () => test);
    // }
    let timer1;

    const runTimer = () => {
      timer1 = window.setTimeout(() => {
        console.log("test");
      }, 1000);
    };
    window.clearTimeout(timer1);
    runTimer();
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

  const timeTest = () => {
    const setTime = setTimeout(() => {
      console.log("test");
    }, 1000);
    return () => {
      clearTimeout(setTime);
    };
  };

  useEffect(() => {
    if (showControl == true) {
      const timer = setTimeout(() => {
        setShowControl(false);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showControl]);

  /** 이미지 클릭 핸들러 */
  const imageClickHandler = (num: number) => {
    console.log(window.innerWidth);
    if (num == 0) {
      window.innerWidth > 767 && setImageClicked(true);
      return;
    }
    if (num == 1) {
      setImageClicked(false);
      return;
    }
  };

  return (
    <>
      <ImageContaienr
        isActive={select ? select.type : ""}
        onClick={() => imageClickHandler(0)}
      >
        <Image
          src={select ? select.imageUrl : ""}
          alt="image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </ImageContaienr>
      <VideoContainer ref={containerRef} isActive={select ? select.type : ""}>
        <Video
          id="video"
          key={select ? select.videoUrl : ""}
          ref={ref}
          loop={true}
          onClick={() => {
            onPlayIconClick();
            setShowControl(true);
            addTimeUpdate();
          }}
          // onMouseOver={() => console.log("마우스오버")}
          // onMouseOut={() => setShowControl(false)}
          onMouseMove={() => setShowControl(true)}
        >
          <source src={select ? select.videoUrl : ""} type="video/mp4" />
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

      <BackGround
        imageClicked={imageClicked}
        onClick={() => imageClickHandler(1)}
      >
        <ClickedImageContaienr
          isActive={select ? select.type : ""}
          imageClicked={imageClicked}
        >
          <Image
            src={select ? select.imageUrl : ""}
            alt="image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </ClickedImageContaienr>
      </BackGround>
    </>
  );
};
const BackGround = styled.div<{ imageClicked: boolean }>`
  z-index: 3;
  display: ${(props) => {
    return props.imageClicked ? "block" : "none";
  }};
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`;

const ImageContaienr = styled.div<{ isActive: string }>`
  margin-bottom: 4px;
  position: absolute;
  width: 100%;
  height: 100%;

  display: ${(props) => {
    return props.isActive == "thumbnail" ? `block` : `none`;
  }};
`;
const ClickedImageContaienr = styled.div<{
  isActive: string;
  imageClicked: boolean;
}>`
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

  display: ${(props) => {
    return props.isActive == "thumbnail" && props.imageClicked
      ? `block`
      : `none`;
  }};
`;
const VideoContainer = styled.div<{ isActive: string }>`
  ${(props) => {
    return props.isActive == "video" ? `display: block` : `display: none`;
  }}
`;
const Video = styled.video`
  margin-bottom: 4px;
  position: absolute;
  width: 100%;
  height: 100%;
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

export default VideoPlayer;
