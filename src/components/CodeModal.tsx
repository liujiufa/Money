import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "./FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import { useSelector } from "react-redux";
import { useViewport } from "./viewportContext";
import QRCode from "react-qr-code";
import { useAppKitAccount } from "@reown/appkit/react";
import { addMessage } from "../utils/tool";
import copy from "copy-to-clipboard";
const AllModal = styled(Modal)`
  z-index: 10000;
  .ant-modal-content {
    overflow: hidden;
    opacity: 1;
    border-radius: 1.66667rem;
    background: #fff;
    padding: 0px;
    .ant-modal-body {
      padding: 2rem;
    }
  }
`;

const ModalContainer = styled(FlexBox)`
  /* position: relative; */
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContainer_Close = styled(FlexCCBox)`
  position: absolute;
  z-index: 100;
  top: 2.83rem;
  right: 2.42rem;
  z-index: 100;
`;

export const ModalContainer_Title = styled(FlexBox)`
  width: 100%;
  color: #000;
  font-family: "Alibaba PuHuiTi 3.0";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 100% */
`;

const ModalContainer_Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  .subtitle {
    color: #000;
    font-family: "Alibaba PuHuiTi 3.0";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.66667rem; /* 166.667% */
    opacity: 0.6;
    margin: 1.33rem 0px 2rem;
  }
  .svgBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.33333rem;
    background: #f9fafc;
    padding: 1.67rem;
    .inner {
      padding: 1rem;
      border-radius: 1.2rem;
      background: #fff;
      svg {
        width: 15rem;
        height: 15rem;
        flex-shrink: 0;
        /* border-radius: 1rem; */
      }
    }
  }
  .inviteAddress {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.66667rem; /* 166.667% */
    margin-top: 1.33rem;
    > div {
      width: 100%;

      color: #000;
      text-align: center;
      font-family: Roboto;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.66667rem; /* 166.667% */
    }
  }
  .btns {
    display: flex;
    align-items: center;
    margin-top: 1.67rem;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10.41667rem;
      height: 3.66667rem;
      &:first-child {
        color: #000;
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2rem; /* 171.429% */
        border-radius: 1.33333rem;
        background: #f9fafc;
        margin-right: 1.25rem;
      }
      &:last-child {
        color: #fff;
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2rem; /* 171.429% */
        border-radius: 1.33333rem;
        background: linear-gradient(
          91deg,
          #04efb5 1.56%,
          #06eab6 15.03%,
          #0cddba 29.45%,
          #16c8c1 44.84%,
          #24abcb 60.22%,
          #3684d8 75.61%,
          #4b56e7 90.99%,
          #573ff0 97.73%
        );
      }
    }
  }
`;
let NodeInter: any = null;
export default function ModalContent(props: any) {
  const { t } = useTranslation();
  const { width } = useViewport();
  const [PageNum, setPageNum] = useState(1);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const token = useSelector((state: any) => state?.token);

  const getRecordFun = () => {};
  useEffect(() => {
    if (!!token) {
      getRecordFun();
    } else {
      // setRecordList3({});
    }
    return () => {
      clearInterval(NodeInter);
    };
  }, [token, PageNum, props?.ShowTipModal]);
  return (
    <AllModal
      visible={props?.ShowTipModal}
      className="Modal"
      centered
      width={"26.08333rem"}
      closable={false}
      footer={null}
    >
      <ModalContainer>
        <ModalContainer_Title>
          {t("二维码分享")}
          <ModalContainer_Close>
            {" "}
            <img
              src={closeIcon}
              alt=""
              onClick={() => {
                props.close();
              }}
            />
          </ModalContainer_Close>
        </ModalContainer_Title>
        <ModalContainer_Content>
          <div className="subtitle">
            {t("请使用Web3钱包扫描二维码，并在区块浏览器登陆Dapp")}
          </div>

          {/* <img src={codeImg} alt="" /> */}
          <div className="svgBox">
            {" "}
            <div className="inner">
              <QRCode
                value={window.location.origin + "/" + web3ModalAccount}
                bgColor="#fff"
                fgColor="#000"
              />
            </div>
          </div>
          <div className="inviteAddress">
            {t("邀请地址")}:<div>{web3ModalAccount}</div>
          </div>
          <div className="btns">
            <div
              onClick={() => {
                props.close();
              }}
            >
              {t("关闭")}
            </div>
            <div
              onClick={() => {
                if (!web3ModalAccount) {
                  return addMessage(t("Please connect wallet"));
                } else {
                  copy(window.location.origin + "/" + web3ModalAccount);
                  addMessage(t("Copied successfully"));
                }
              }}
            >
              {t("复制链接")}
            </div>
          </div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
}
