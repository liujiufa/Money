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
  font-family: Sora, Sora;
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

  .tip {
    font-family: Sora, Sora;
    font-weight: 400;
    font-size: 1.5rem;
    color: #ffffff;
    line-height: 1.76rem;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin: 5.3rem 0px;
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
    setUseNum(1);
  }, [props?.ShowTipModal]);
  return (
    <AllModal
      visible={props?.ShowTipModal}
      className="Modal"
      centered
      width={"26.08333rem"}
      closable={false}
      footer={null}
      destroyOnClose={true}
    >
      <ModalContainer>
        <ModalContainer_Title>
          <img
            src={close_icon}
            alt=""
            onClick={() => {
              props?.close();
            }}
          />
        </ModalContainer_Title>
        <ModalContainer_Content>
          <div className="tip">认购成功</div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
});
export default ModalContent;
