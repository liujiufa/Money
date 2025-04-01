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
import copy from "copy-to-clipboard";
import BuyIdoModal from "../components/BuyIdoModal";
import BuyIdoSuccess from "../components/BuyIdoSuccess";
import IdoRecord from "../components/IdoRecord";
import { Contracts } from "../web3";
import Web3 from "web3";
import { contractAddress } from "../config";
import useUSDTGroup from "../hooks/useUSDTGroup";
import { useNoGas } from "../hooks/useNoGas";

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
        <div className="title">IDO募集</div>
        <div className="introduce">欢迎加入Snek Coin预售与质押平台</div>
        <div className="introduce">
          ——
          我们致力于打造透明、公正、链上可查的数字资产生态。无论是IDO认购还是灵活质押，每一步操作都将为您带来实实在在的收益，开启您的数字资产增值之旅。
        </div>
        <div className="invite_box">
          <div className="invite_title">
            邀请链接：{" "}
            <div
              onClick={() => {
                Navigate("/View/InviteRecord");
              }}
            >
              邀请记录 <img src={go_to} alt="" />
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
                  return addMessage(t("请先激活"));
                }
              }}
            />
          </div>
        </div>
        <div className="my_assets">
          <img src={core_icon} alt="" />
          <div className="my_assets_title">我的资产</div>
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
              提现
            </div>
            <div
              className="btn btn2"
              onClick={() => {
                Navigate("/View/USDTTransfer");
              }}
            >
              互转
            </div>
          </div>
          <div
            className="assets_record"
            onClick={() => {
              Navigate("/View/AssetsRecord");
            }}
          >
            资产记录 <img src={go_to} alt="" />
          </div>
        </div>
        {/* <div className="sell">
          <img src={money_logo} alt="" />
          <div className="sell_title">Money Coin预售</div>
          <div className="sell_info">
            <div>
              总发行量：{" "}
              <div>
                {isBind
                  ? NumSplic1(EthertoWei(IdoData?.launchAmount ?? "0"), 4) +
                    " " +
                    "Money"
                  : "--"}
              </div>
            </div>
            <div>
              预售价格：{" "}
              <div>
                {isBind ? NumSplic1(IdoData?.price, 4) + " " + "USDT" : "--"}{" "}
              </div>
            </div>
            <div>
              开始时间：{" "}
              <div>
                {isBind
                  ? dateFormat(
                      "YYYY/mm/dd",
                      new Date(Number(IdoData?.beginTime ?? 0) * 1000)
                    )
                  : "--"}
              </div>
            </div>
            <div>
              结束时间：{" "}
              <div>
                {isBind
                  ? dateFormat(
                      "YYYY/mm/dd",
                      new Date(Number(IdoData?.endTime ?? 0) * 1000)
                    )
                  : "--"}
              </div>
            </div>
          </div>
          <div
            className={
              Number(IdoRecordData?.usdtAmount) > 0 ? "btn btn_buyed" : "btn"
            }
            onClick={() => {
              if (Number(IdoRecordData?.usdtAmount) <= 0) {
                setBuyIdoModalState(true);
              }
            }}
          >
            Fair Lanch
          </div>
          <div
            className="buy_record"
            onClick={() => {
              setIdoRecordState(true);
            }}
          >
            认购记录 <img src={go_to} alt="" />
          </div>
        </div> */}
        <div className="buy_rule">
          <div className="buy_rule_title">IDO认购说明：</div>
          <div className="value">1.每个用户可以享受50%的直推奖励。</div>
          <div className="value">
            2.直推3个人解锁3层见点奖励。 直推5个人解锁5层见点奖励。
            直推10个人解锁10层见点奖励。
          </div>
          <div className="value">3.每个用户只能认购一次。</div>
          <div className="value">4.认购后Money Coin每天释放5%额度。</div>
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
