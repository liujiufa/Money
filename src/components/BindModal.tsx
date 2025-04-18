import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "./FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import { useSelector } from "react-redux";
import { useViewport } from "./viewportContext";
import QRCode from "react-qr-code";
import { useAppKitAccount } from "@reown/appkit/react";
import close_icon from "../assets/image/close.png";
import React from "react";
import { AddrHandle, EthertoWei, NumSplic1, addMessage } from "../utils/tool";

const AllModal = styled(Modal)`
  z-index: 10000;
  .ant-modal-content {
    overflow: hidden;
    opacity: 1;
    background: #1a1f2e;
    border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
    border: 0.08rem solid #434f6f;
    padding: 0px;

    .ant-modal-body {
      padding: 2rem 1.33rem 2.67rem;
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

export const ModalContainer_Title = styled(FlexCCBox)`
  width: 100%;
  font-family: "Sora", "Sora";
  font-weight: 400;
  font-size: 1.5rem;
  color: #ffffff;
  line-height: 1.76rem;
  text-align: center;
  font-style: normal;
  text-transform: none;
  img {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1.67rem;
    height: 1.67rem;
  }
`;

const ModalContainer_Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  .input_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1f2e;
    border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
    border: 0.08rem solid #20283f;
    padding: 1.67rem 1.33rem;
    font-family: "Sora", "Sora";
    font-weight: 400;
    font-size: 1.17rem;
    color: #50af95;
    line-height: 1.37rem;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin: 2.5rem 0px;
    div {
      display: flex;
      align-items: center;
      img {
      }
    }
    input {
      border: none;
      outline: none;
      background: transparent;
      font-family: "Sora", "Sora";
      font-weight: 600;
      font-size: 1.17rem;
      color: #fff;
      line-height: 1.37rem;
      text-align: center;
      font-style: normal;
      text-transform: none;
      &::placeholder {
        font-family: "Sora", "Sora";
        font-weight: 600;
        font-size: 1.17rem;
        color: #585e69;
        line-height: 1.37rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 3.83rem;
    padding: 0px 5.08rem;
    background: #fe7a2e;
    border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
    font-family: "Sora", "Sora";
    font-weight: 600;
    font-size: 1.17rem;
    color: #ffffff;
    line-height: 1.37rem;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
`;

let NodeInter: any = null;
const ModalContent = React.forwardRef((props: any, ref: any) => {
  const { t } = useTranslation();
  const { width } = useViewport();
  const [PageNum, setPageNum] = useState(1);
  const [UseNum, setUseNum] = useState(1);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const token = useSelector((state: any) => state?.token);

  useImperativeHandle(
    ref,
    () => ({
      UseNum: UseNum,
    }),
    [UseNum]
  );
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
  useEffect(() => {
    setUseNum(NumSplic1(EthertoWei(props.IdoData?.subsMinLimit ?? "0"), 4));
  }, [props?.ShowTipModal, props.IdoData?.subsMinLimit]);
  return (
    <AllModal
      visible={props?.ShowTipModal}
      className="Modal"
      centered
      width={"22.08333rem"}
      closable={false}
      footer={null}
      destroyOnClose={true}
    >
      <ModalContainer>
        <ModalContainer_Title>
          {t("Please bind the recommended address")}
          <img
            src={close_icon}
            alt=""
            onClick={() => {
              props?.close();
            }}
            className="pointer"
          />
        </ModalContainer_Title>
        <ModalContainer_Content>
          <div className="input_box">
            {AddrHandle("0x8d4044d24a839a0332e04374fab9a8b021345232", 10, 10)}
          </div>
          <div
            className="btn"
            onClick={() => {
              props?.Bind();
            }}
          >
            {t("Confirm")}
          </div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
});
export default ModalContent;
