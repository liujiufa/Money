import React, { useEffect, useRef, useState } from "react";
import HeaderBox from "../components/HeaderBox";
import { Carousel } from "antd";
import "../assets/style/IDO.scss";
import { useNavigate } from "react-router-dom";
import CodeModal from "../components/CodeModal";
import { useSelector } from "react-redux";
import { getRefereeInfo, getRefereeList } from "../API";
import {
  AddrHandle,
  EthertoWei,
  NumSplic1,
  addMessage,
  dateFormat,
  showLoding,
} from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import { useTranslation } from "react-i18next";
import go_to from "../assets/image/IDO/go_to.png";
import copy_icon from "../assets/image/IDO/copy_icon.png";
import usdt from "../assets/image/IDO/usdt.png";
import money from "../assets/image/IDO/money.png";
import money_logo from "../assets/image/Home/money_logo.png";
import core_icon from "../assets/image/Home/core_icon.png";
// import money_logo from "../assets/image/IDO/money_logo.png";
import copy from "copy-to-clipboard";
import BuyIdoModal from "../components/BuyIdoModal";
import BuyIdoSuccess from "../components/BuyIdoSuccess";
import IdoRecord from "../components/IdoRecord";
import { Contracts } from "../web3";
import Web3 from "web3";
import { contractAddress } from "../config";
import useUSDTGroup from "../hooks/useUSDTGroup";
import { useNoGas } from "../hooks/useNoGas";
import styled from "styled-components";

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
    /* margin: 2.5rem 0px; */
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

const Home = () => {
  const BuyIDORecordRef: any = useRef(null);

  const { t } = useTranslation();
  const isBind = useSelector((state: any) => state?.isBind);
  const Navigate = useNavigate();
  const [BuyIdoModalState, setBuyIdoModalState] = useState(false);
  const [IdoRecordState, setIdoRecordState] = useState(false);
  const [BuyIdoSuccessModalState, setBuyIdoSuccessModalState] = useState(false);
  const [IdoData, setIdoData] = useState<any>({});
  const [UserInfo, setUserInfo] = useState<any>({});
  const [IdoRecordData, setIdoRecordData] = useState<any>({});
  const [UseNum, setUseNum] = useState(0);

  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const {
    TOKENBalance,
    TOKENAllowance,
    handleApprove,
    handleTransaction,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress?.Money_IDO, contractAddress?.USDT);
  const { isNoGasFun } = useNoGas();

  const getInitData = async () => {
    let abi_data: any = null;
    let abi_data1: any = null;
    let abi_data3: any = null;

    try {
      abi_data = await Contracts.example?.idoInfo(web3ModalAccount as string);
    } catch (e: any) {}
    console.log(abi_data, "ido_info");
    setUseNum(NumSplic1(EthertoWei(abi_data?.subsMinLimit ?? "0"), 4));
    setIdoData(abi_data || {});
    try {
      abi_data1 = await Contracts.example?.viewUserInfo(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data1, "abi_data1");
    setUserInfo(abi_data1 || {});

    try {
      abi_data3 = await Contracts.example?.viewIdoRecord(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data3, "abi_data3");
    setIdoRecordData(abi_data3 || {});
  };

  const BuyFun = (price: any) => {
    handleTransaction(
      Number(price ?? 0) + "",
      async (call: any) => {
        let abi_res: any = null;
        try {
          showLoding(true);
          if (!!(await isNoGasFun())) return showLoding(false);

          // let res: any = await aiRecharge({
          //   num: num,
          // });

          abi_res = await Contracts.example?.buy(
            web3ModalAccount as string,
            price
          );
        } catch (error: any) {
          showLoding(false);
          if (error?.code === 4001) {
            showLoding(false);
            return addMessage(t("failed"));
          }
        }
        if (!!abi_res?.status) {
          await call();
          showLoding(false);
          getInitData();
          // fun();
          setBuyIdoModalState(false);
          setBuyIdoSuccessModalState(true);
          // return addMessage(t("购买成功"));
        } else if (abi_res?.status === false) {
          showLoding(false);
          return addMessage(t("failed"));
        }
      },
      () => {
        showLoding(true);
      },
      () => {
        showLoding(false);
      }
    );
  };

  useEffect(() => {
    if (!!web3ModalAccount && isBind) {
      getInitData();
    } else {
      setIdoData({});
    }
  }, [web3ModalAccount, isBind]);
  return (
    <div className="ido all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="ido_content">
        <div className="title">Fair Launch</div>
        {/* <div className="introduce">欢迎加入Money Coin预售与质押平台</div> */}
        <div className="introduce">{t("ido12")}</div>
        <div className="invite_box">
          <div className="invite_title">
            {t("ido13")}：{" "}
            <div
              onClick={() => {
                Navigate("/View/InviteRecord");
              }}
            >
              {t("ido14")} <img src={go_to} alt="" />
            </div>
          </div>
          <div className="invite_content">
            {Number(IdoRecordData?.usdtAmount) > 0
              ? window.location.origin +
                "/" +
                AddrHandle(web3ModalAccount as string, 6, 6)
              : "--"}{" "}
            <img
              src={copy_icon}
              alt=""
              onClick={() => {
                if (!web3ModalAccount) {
                  return addMessage(t("Please connect wallet"));
                } else if (Number(IdoRecordData?.usdtAmount) > 0) {
                  copy(window.location.origin + "/" + web3ModalAccount);
                  addMessage(t("Copied successfully"));
                } else {
                  return addMessage(t("ido15"));
                }
              }}
            />
          </div>
        </div>

        <div className="sell">
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
                  placeholder={t("ido16")}
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
                    if (amount > 1000) return;
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
              className={
                Number(IdoRecordData?.usdtAmount) > 0 ? "btn btn_buyed" : "btn"
              }
              onClick={() => {
                if (Number(IdoRecordData?.usdtAmount) <= 0) {
                  if (
                    Number(UseNum) >=
                      Number(EthertoWei(IdoData?.subsMinLimit ?? "0") ?? 0) &&
                    /^(100|[2-9]00|1000)$/.test(UseNum + "")
                  ) {
                    BuyFun(UseNum);
                  } else {
                    return addMessage(
                      t(
                        "认购金额{{min}}U-{{max}}U之间整百,最小购买金额{{min}}U",
                        {
                          min: EthertoWei(IdoData?.subsMinLimit ?? "0") ?? 0,
                          max: EthertoWei(IdoData?.subsMaxLimit ?? "0") ?? 0,
                        }
                      )
                    );
                  }
                }
              }}
            >
              Confirm
            </div>
          </ModalContainer_Content>

          {/* <div
            className={
              Number(IdoRecordData?.usdtAmount) > 0 ? "btn btn_buyed" : "btn"
            }
            onClick={() => {
              if (Number(IdoRecordData?.usdtAmount) <= 0) {
                setBuyIdoModalState(true);
              }
            }}
          >
            confirm
          </div> */}
          <div
            className="buy_record"
            onClick={() => {
              setIdoRecordState(true);
            }}
          >
            {t("认购记录")} <img src={go_to} alt="" />
          </div>
        </div>

        <div className="my_assets">
          <img src={money_logo} alt="" />
          <div className="my_assets_title">{t("我的资产")}</div>
          <div className="assets_list">
            <div className="item item1">
              USDT
              <div>
                {NumSplic1(EthertoWei(UserInfo?.usdtAmount ?? "0"), 4)}{" "}
                <img src={usdt} alt="" />
              </div>
            </div>
            <div className="item item2">
              Money
              <div>
                {NumSplic1(EthertoWei(UserInfo?.moneyAmount ?? "0"), 4)}{" "}
                <img src={money} alt="" />
              </div>
            </div>
          </div>
          <div className="btns">
            <div
              className="btn btn1"
              onClick={() => {
                Navigate("/View/USDTWithdraw");
              }}
            >
              {t("提现")}
            </div>
            <div
              className="btn btn2"
              onClick={() => {
                Navigate("/View/USDTTransfer");
              }}
            >
              {t("互转")}
            </div>
          </div>
          <div
            className="assets_record"
            onClick={() => {
              Navigate("/View/AssetsRecord");
            }}
          >
            {t("资金记录")} <img src={go_to} alt="" />
          </div>
        </div>
      </div>

      <BuyIdoModal
        IdoData={IdoData}
        BuyFun={BuyFun}
        ShowTipModal={BuyIdoModalState}
        close={() => {
          setBuyIdoModalState(false);
        }}
      />
      <BuyIdoSuccess
        // PledgeFun={PledgeFun}
        ShowTipModal={BuyIdoSuccessModalState}
        close={() => {
          setBuyIdoSuccessModalState(false);
        }}
      />
      <IdoRecord
        ref={BuyIDORecordRef}
        // PledgeFun={PledgeFun}
        ShowTipModal={IdoRecordState}
        close={() => {
          setIdoRecordState(false);
        }}
      />
    </div>
  );
};

export default Home;
