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
import { EthertoWei, NumSplic1, addMessage } from "../utils/tool";

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
    justify-content: space-between;
    background: #1a1f2e;
    border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
    border: 0.08rem solid #20283f;
    padding: 1.67rem 1.33rem;
    font-family: "Sora", "Sora";
    font-weight: 400;
    font-size: 1.17rem;
    color: #50af95;
    line-height: 1.37rem;
    text-align: left;
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
          {t("Fair Launch")}
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
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="pointer"
                onClick={() => {
                  let amount: any = Number(UseNum) - 100;
                  if (amount <= 0) return;
                  setUseNum(amount);
                }}
              >
                <g opacity="0.6">
                  <path
                    d="M14.4461 5.27664C14.0937 4.4435 13.5893 3.69536 12.947 3.05302C12.3047 2.41067 11.5565 1.9063 10.7234 1.55391C9.86053 1.18895 8.94428 1.00391 8.00003 1.00391C7.05578 1.00391 6.13953 1.18895 5.2767 1.55389C4.44356 1.90628 3.69542 2.41066 3.05308 3.053C2.41073 3.69534 1.90636 4.44348 1.55397 5.27662C1.18901 6.13947 1.00397 7.05572 1.00397 7.99997C1.00397 8.94422 1.18901 9.86047 1.55395 10.7233C1.90634 11.5564 2.41072 12.3046 3.05306 12.9469C3.6954 13.5893 4.44355 14.0937 5.27669 14.446C6.13951 14.811 7.05578 14.996 8.00001 14.996C8.94425 14.996 9.86051 14.811 10.7233 14.446C11.5565 14.0937 12.3046 13.5893 12.947 12.9469C13.5893 12.3046 14.0937 11.5565 14.4461 10.7233C14.811 9.86047 14.9961 8.94422 14.9961 7.99997C14.9961 7.05572 14.811 6.13947 14.4461 5.27664ZM8.00003 14.0039C4.68945 14.0039 1.99609 11.3105 1.99609 7.99997C1.99609 4.68939 4.68945 1.99603 8.00003 1.99603C11.3106 1.99603 14.004 4.68939 14.004 7.99997C14.004 11.3105 11.3106 14.0039 8.00003 14.0039Z"
                    fill="#fff"
                  />
                  <path
                    d="M11.5625 7.5H4.4375C4.19588 7.5 4 7.72386 4 8C4 8.27614 4.19588 8.5 4.4375 8.5H11.5625C11.8041 8.5 12 8.27614 12 8C12 7.72386 11.8041 7.5 11.5625 7.5Z"
                    fill="#fff"
                  />
                </g>
              </svg>
              <input
                type="text"
                value={UseNum}
                placeholder={t("home0")}
                onClick={(e: any) => {
                  let filteredValue: any = String(e.target.value)
                    ?.replace(/[+-]/g, "")
                    .replace(/[^0-9]/g, "");
                  setUseNum(filteredValue);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="pointer"
                onClick={() => {
                  let amount: any = Number(UseNum) + 100;
                  setUseNum(amount);
                }}
              >
                <g opacity="0.6">
                  <path
                    d="M14.4461 5.27664C14.0937 4.4435 13.5893 3.69536 12.947 3.05302C12.3047 2.41067 11.5565 1.9063 10.7234 1.55391C9.86053 1.18895 8.94428 1.00391 8.00003 1.00391C7.05578 1.00391 6.13953 1.18895 5.2767 1.55389C4.44356 1.90628 3.69542 2.41066 3.05308 3.053C2.41073 3.69534 1.90636 4.44348 1.55397 5.27662C1.18901 6.13947 1.00397 7.05572 1.00397 7.99997C1.00397 8.94422 1.18901 9.86047 1.55395 10.7233C1.90634 11.5564 2.41072 12.3046 3.05306 12.9469C3.6954 13.5893 4.44355 14.0937 5.27669 14.446C6.13951 14.811 7.05578 14.996 8.00001 14.996C8.94425 14.996 9.86051 14.811 10.7233 14.446C11.5565 14.0937 12.3046 13.5893 12.947 12.9469C13.5893 12.3046 14.0937 11.5565 14.4461 10.7233C14.811 9.86047 14.9961 8.94422 14.9961 7.99997C14.9961 7.05572 14.811 6.13947 14.4461 5.27664ZM8.00003 14.0039C4.68945 14.0039 1.99609 11.3105 1.99609 7.99997C1.99609 4.68939 4.68945 1.99603 8.00003 1.99603C11.3106 1.99603 14.004 4.68939 14.004 7.99997C14.004 11.3105 11.3106 14.0039 8.00003 14.0039Z"
                    fill="#fff"
                  />
                  <path
                    d="M11.5625 7.5H4.4375C4.19588 7.5 4 7.72386 4 8C4 8.27614 4.19588 8.5 4.4375 8.5H11.5625C11.8041 8.5 12 8.27614 12 8C12 7.72386 11.8041 7.5 11.5625 7.5Z"
                    fill="#fff"
                  />
                  <path
                    d="M8.5 11.5625L8.5 4.4375C8.5 4.19588 8.27614 4 8 4C7.72386 4 7.5 4.19587 7.5 4.4375L7.5 11.5625C7.5 11.8041 7.72386 12 8 12C8.27614 12 8.5 11.8041 8.5 11.5625Z"
                    fill="#fff"
                  />
                </g>
              </svg>
            </div>
            USDT
          </div>
          <div
            className="btn"
            onClick={() => {
              console.log(
                Number(UseNum) >=
                  Number(EthertoWei(props.IdoData?.subsMinLimit ?? "0") ?? 0),
                /^(100|[2-9]00|1000)$/.test(UseNum + ""),
                "erer"
              );
              if (
                Number(UseNum) >=
                  Number(EthertoWei(props.IdoData?.subsMinLimit ?? "0") ?? 0) &&
                /^(100|[2-9]00|1000)$/.test(UseNum + "")
              ) {
                props?.BuyFun(UseNum);
              } else {
                return addMessage(
                  t("认购金额{{min}}U-{{max}}U之间整百,最小购买金额{{min}}U", {
                    min: EthertoWei(props.IdoData?.subsMinLimit ?? "0") ?? 0,
                    max: EthertoWei(props.IdoData?.subsMaxLimit ?? "0") ?? 0,
                  })
                );
              }
            }}
          >
            Fair Lanch
          </div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
});
export default ModalContent;
