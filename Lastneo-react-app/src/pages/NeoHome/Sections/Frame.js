/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import NewItemModal from "../../../components/NewItemModal";
import yellowalert from "../../../assets/yellowalert.png";
import ItemsContainer from "../../../components/ItemsContainer";
import SectionContainer from "../../../components/SectionContainer";
import SmallPinkBtn from "../../../components/SmallPinkBtn";
import { customMedia } from "../../../styles/GlobalStyle";
import images from "../../../assets";

const FramesContainer = styled.div`
  width: 640px;
  height: 562px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.palette.palePink};
  color: ${(props) => props.theme.palette.darkGrey};
  align-items: center;
  position: relative;
  padding: 32px;
  overflow: hidden;

  p.title {
    margin-bottom: 32px;
    font-size: 18px;
    font-weight: 500;
    span {
      color: ${(props) => props.theme.palette.pink};
    }
  }
  ${customMedia.lessThan("mobile")`
    width: calc(100vw - 48px);
    // height: calc((100vw - 48px) * 0.9908);
    height: 443px;
    padding: 24px;
    p.title {
      margin-bottom: 24px;
      font-size: 16px;
    }
  `}
`;
const DescDiv = styled.div`
  /* background: lavender; */
  align-items: center;
  width: 100%;
  border-top: solid 1px ${(props) => props.theme.palette.lightPink};
  padding-top: 32px;
  p.nft-date,
  p.nft-desc {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.gray};
  }
  p.nft-date {
    margin-bottom: 316px;
  }
  p.nft-desc {
    margin-bottom: 16px;
  }
  span.new-alert {
    color: ${(props) => props.theme.palette.pink};
    font-weight: 700;
  }

  ${customMedia.lessThan("mobile")`
  padding-top: 24px;
  p {
    font-size: 12px;
  }
  p.nft-date {
    margin-bottom: 248px;
    font-size: 12px;
  }
  p.nft-desc {
    font-size: 12px;
    margin-bottom: 12px;
  }
  `}
`;
const FrameDiv = styled.div`
  display: grid;
  grid-template-columns: 300px 20px 300px 20px 300px;
  column-gap: 20px;
  align-items: center;

  position: absolute;
  top: 150px;
  img.nft-img {
    width: 300px;
    height: 300px;
    border-radius: 24px;
  }
  img.nft-arr {
    width: 20px;
    height: 20px;
  }

  ${({ noLeft, noRight }) => {
    if (noLeft && noRight) {
      return css`
        span.goLeft-btn {
          visibility: hidden;
        }
        span.goRight-btn {
          visibility: hidden;
        }
      `;
    }
    if (noLeft) {
      return css`
        span.goLeft-btn {
          visibility: hidden;
        }
      `;
    }
    if (noRight) {
      return css`
        span.goRight-btn {
          visibility: hidden;
        }
      `;
    }
  }}

  span.goLeft-btn, span.goRight-btn {
    cursor: pointer;
  }

  ${customMedia.lessThan("mobile")`
  grid-template-columns: 240px 16px 240px 16px 240px;
  column-gap: 8px;
  top: 117px;
  img.nft-img {
    width: 240px;
    height: 240px;
    border-radius: 20px;
  }
  img.nft-arr {
    width: 16px;
    height: 16px;
  }
  `}
`;
const msgGenerator = (idx) => {
  if (idx == 0) {
    return (
      <>
        <p className="msg-web">
          ?????? ???????????? ????????? ?????????. ?????? ????????? ????????? ??????????????????!
        </p>
        <p className="msg-mobile">
          ?????? ???????????? ????????? ?????????. <br />
          ?????? ????????? ????????? ??????????????????!
        </p>
      </>
    );
  } else {
    return (
      <>
        <p className="msg-web">
          ????????? ????????? ????????? ?????????! ????????? ???????????? ????????????!
        </p>
        <p className="msg-mobile">
          ????????? ????????? ????????? ?????????!
          <br />
          ????????? ???????????? ????????????!
        </p>
      </>
    );
  }
};

const isThereNewFrame = (arr) => {
  const newFrame = arr.some((item) => {
    if (item.today_received) {
      return true;
    }
    return false;
  });
  return newFrame;
};
function Frame({ store, owner }) {
  const arr = store.nfts_info;
  // nft ??????(nft_image, created_at, today_received, opensea_link)

  const newFrame = isThereNewFrame(arr);
  const [modal, setModal] = useState(newFrame);
  const [modalMsg, setModalMsg] = useState(-1);
  const [center, setCenter] = useState(0);
  useEffect(() => {
    if (arr.length == 0) {
      setModal(true);
      setModalMsg(0);
    }
  }, []);

  const onClickHandler = () => {
    // arr[center].opensea_link ??? ????????? ??????
    // window.open(arr[center].opensea_link, "_blank");
  };

  const goLeft = () => {
    setCenter(center - 1);
  };
  const goRight = () => {
    setCenter(center + 1);
  };
  return (
    <SectionContainer color="pink" frame owner={owner}>
      <p className="section-title">??????</p>
      <h3 className={!modal ? "broad-margin" : undefined}>
        ?????? ???????????? ??????
        <br />
        ????????? ????????? <span>{arr.length}???</span> ??????????????????
      </h3>
      {modal && (
        <NewItemModal newItem={newFrame}>
          <img src={yellowalert} />
          {msgGenerator(modalMsg)}
        </NewItemModal>
      )}
      {arr.length != 0 && (
        <FramesContainer>
          <p className="title">
            ?????? ???????????? <span>??????</span>??????!
          </p>
          <DescDiv>
            <p className="nft-date">
              {center + 1}??????&nbsp;|&nbsp;
              {arr[center].today_received ? "??????" : arr[center].created_at}
              &nbsp;??????&nbsp;
              {arr[center].today_received ? (
                <span className="new-alert">N</span>
              ) : null}
            </p>
            {arr[center].opensea_link == null ? (
              <p className="nft-desc">
                ????????? nft ????????? ???????????? ??????????????????!
              </p>
            ) : (
              <p className="nft-desc">????????? ?????? ????????? nft??? ??????????????????</p>
            )}
            <SmallPinkBtn
              className="nft-btn"
              onClick={onClickHandler}
              disabled={arr[center].opensea_link == null}
            >
              <a href={arr[center].opensea_link} target="_blank">
                ????????????
              </a>
            </SmallPinkBtn>
          </DescDiv>
          <FrameDiv noLeft={center == 0} noRight={center == arr.length - 1}>
            {center != 0 ? (
              <img src={arr[center - 1].nft_image} className="nft-img" />
            ) : (
              <img src={images.emptyframe} className="nft-img" />
            )}
            <span onClick={goLeft} className="goLeft-btn">
              <img src={images.goleft} className="nft-arr" />
            </span>
            <img src={arr[center].nft_image} className="nft-img" />
            <span onClick={goRight} className="goRight-btn">
              <img src={images.goright} className="nft-arr" />
            </span>
            {center != arr.length - 1 ? (
              <img src={arr[center + 1].nft_image} className="nft-img" />
            ) : (
              <img src={images.emptyframe} className="nft-img" />
            )}
          </FrameDiv>
        </FramesContainer>
      )}
    </SectionContainer>
  );
}

export default Frame;
