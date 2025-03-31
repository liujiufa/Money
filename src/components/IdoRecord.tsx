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
import { Contracts } from "../web3";
import { EthertoWei, NumSplic1, dateFormat } from "../utils/tool";

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
  margin-bottom: 1.5rem;
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
  .items {
    width: 100%;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: Sora, Sora;
      font-weight: 400;
      font-size: 1.33rem;
      color: #999999;
      line-height: 1.56rem;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-bottom: 1.17rem;
      &:last-child {
        margin-bottom: 0px;
      }
      span {
        font-family: Sora, Sora;
        font-weight: 400;
        font-size: 1.33rem;
        color: #ffffff;
        line-height: 1.56rem;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }
`;

let NodeInter: any = null;
const ModalContent = React.forwardRef((props: any, ref: any) => {
  const { t } = useTranslation();
  const { width } = useViewport();
  const [PageNum, setPageNum] = useState(1);
  const [UseNum, setUseNum] = useState(1);
  const [IdoRecordData, setIdoRecordData] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const isBind = useSelector((state: any) => state?.isBind);

  useImperativeHandle(
    ref,
    () => ({
      UseNum: UseNum,
      amount: IdoRecordData?.usdtAmount,
    }),
    [UseNum]
  );
  const getRecordFun = () => {};

  const getInitData = async () => {
    let abi_data: any = null;
    try {
      abi_data = await Contracts.example?.viewIdoRecord(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data, "abi_data");
    setIdoRecordData(abi_data || {});
  };

  useEffect(() => {
    if (!!web3ModalAccount && isBind) {
      getInitData();
    } else {
      setIdoRecordData({});
    }
  }, [web3ModalAccount, props?.ShowTipModal, isBind]);
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
          {t("IDO记录")}
          <img
            src={close_icon}
            alt=""
            onClick={() => {
              props?.close();
            }}
          />
        </ModalContainer_Title>
        <ModalContainer_Content>
          <div className="items">
            <div className="item">
              {" "}
              时间：{" "}
              <span>
                {Number(IdoRecordData?.usdtAmount ?? 0) > 0
                  ? dateFormat(
                      "YYYY/mm/dd",
                      new Date(Number(IdoRecordData?.time ?? 0) * 1000)
                    )
                  : "--"}
              </span>
            </div>
            <div className="item">
              {" "}
              USDT：{" "}
              <span>
                {Number(IdoRecordData?.usdtAmount ?? 0) > 0
                  ? NumSplic1(EthertoWei(IdoRecordData?.usdtAmount ?? "0"), 4)
                  : "--"}
              </span>
            </div>
            <div className="item">
              {" "}
              Money：{" "}
              <span>
                {" "}
                {Number(IdoRecordData?.usdtAmount ?? 0) > 0
                  ? NumSplic1(EthertoWei(IdoRecordData?.moneyAmount ?? "0"), 4)
                  : "--"}
              </span>
            </div>
            <div className="item">
              {" "}
              已释放：{" "}
              <span>
                {Number(IdoRecordData?.usdtAmount ?? 0) > 0
                  ? NumSplic1(
                      EthertoWei(IdoRecordData?.releaeAmount ?? "0"),
                      4
                    ) +
                    " " +
                    "Money"
                  : "--"}{" "}
              </span>
            </div>
            <div className="item">
              {" "}
              剩余额度：{" "}
              <span>
                {Number(IdoRecordData?.usdtAmount ?? 0) > 0
                  ? NumSplic1(EthertoWei(IdoRecordData?.lockAmount ?? "0"), 4) +
                    " " +
                    "Money"
                  : "--"}{" "}
              </span>
            </div>
          </div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
});
export default ModalContent;
