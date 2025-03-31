import React, { useState, useEffect, useRef } from "react";
import "../assets/style/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../store/reducer";
import styled, { keyframes } from "styled-components";
import { useViewport } from "../components/viewportContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ContainerBox,
  FlexBox,
  FlexCCBox,
  FlexSASBox,
  FlexSBCBox,
} from "../components/FlexBox";
import return_icon from "../assets/image/Record/return_icon.png";
import usdt from "../assets/image/IDO/usdt.png";
import money from "../assets/image/IDO/money.png";
import Web3 from "web3";
import { contractAddress } from "../config";
import { Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
import { getRefereeList, getScoreUseRecord, getUserLuckRecord } from "../API";
import {
  AddrHandle,
  EthertoWei,
  NumSplic1,
  addMessage,
  dateFormat,
  showLoding,
} from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../components/NoData";
import { Contracts } from "../web3";
import { useNoGas } from "../hooks/useNoGas";
const HomeContainer = styled(FlexBox)`
  position: relative;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-bottom: 3.67rem;
`;
const HomeContainer_Content = styled.div`
  width: 100%;
  padding: 0px 1.33rem;
  margin-top: 1.33rem;
  .btns {
    margin: 1.33rem 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10.83rem;
      height: 3rem;
      background: #1868b7;
      border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
      font-family: Sora, Sora;
      font-weight: 400;
      font-size: 1.17rem;
      color: #ffffff;
      line-height: 1.37rem;
      text-align: left;
      font-style: normal;
      text-transform: none;

      &:first-child {
        margin-right: 0.83rem;
      }
    }
    .btn2 {
      border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
      border: 0.08rem solid #999999;
      background-color: transparent;
      font-family: Sora, Sora;
      font-weight: 400;
      font-size: 1.17rem;
      color: #ffffff;
      line-height: 1.37rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
  .withdraw_box {
    padding: 1.33rem;

    background: #1a1f2e;
    border-radius: 1.17rem 1.17rem 1.17rem 1.17rem;
    .withdraw_box_top {
      margin-bottom: 1.77rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: Sora, Sora;
      font-weight: 400;
      font-size: 1.33rem;
      color: #ffffff;
      line-height: 1.56rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
      div {
        font-family: Sora, Sora;
        font-weight: 400;
        font-size: 1rem;
        color: #585e69;
        line-height: 1.17rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
    .withdraw_box_bottom {
      input {
        font-family: Sora, Sora;
        font-weight: 600;
        font-size: 1.67rem;
        color: #ffffff;
        line-height: 1.95rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
        border: none;
        outline: none;
        background: transparent;
        &::placeholder {
        }
      }
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;

        font-family: Sora, Sora;
        font-weight: 400;
        font-size: 1.17rem;
        color: #50af95;
        line-height: 1.37rem;
        text-align: right;
        font-style: normal;
        text-transform: none;
        img {
          width: 1.67rem;
          height: 1.67rem;
          margin-right: 0.17rem;
        }
      }
    }
  }
  .result {
    padding: 1.33rem;
    background: #1a1f2e;
    border-radius: 1.17rem 1.17rem 1.17rem 1.17rem;
    margin-top: 1.33rem;
    .result-top {
      font-family: Sora, Sora;
      font-weight: 400;
      font-size: 1.17rem;
      color: #9199a7;
      line-height: 1.37rem;
      text-align: right;
      font-style: normal;
      text-transform: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-family: Sora, Sora;
        font-weight: 400;
        font-size: 1.17rem;
        color: #ffffff;
        line-height: 1.37rem;
        text-align: right;
        font-style: normal;
        text-transform: none;
      }
    }
    .devider {
      margin: 1.17rem 0px;
      border: 0.08rem solid #20283f;
    }
  }
  .withdraw_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-family: Sora, Sora;
    font-weight: 600;
    font-size: 1.17rem;
    color: #ffffff;
    line-height: 1.37rem;
    text-align: center;
    font-style: normal;
    text-transform: none;
    height: 3.83rem;
    background: #fe7a2e;
    box-shadow: 0rem 0rem 0.33rem 0rem #fe7a2e;
    border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
    border: 0.08rem solid #ff8d4d;
    margin-top: 20.5rem;
  }
`;
const ReturnBox = styled(FlexSBCBox)`
  padding: 1.17rem 1.33rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Sora, Sora;
  font-weight: 400;
  font-size: 1.5rem;
  color: #ffffff;
  line-height: 1.76rem;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: transparent;
  div {
    flex: 1;
    font-family: Sora, Sora;
    font-weight: 400;
    font-size: 1.5rem;
    color: #ffffff;
    line-height: 1.76rem;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 0rem 0rem 0rem 0rem;
  }
  .null {
    flex: auto;
    max-width: 2rem;
    height: 2rem;
    border-radius: 0rem 0rem 0rem 0rem;
  }
`;

export const PaginationContainer = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  .ant-pagination {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    .ant-pagination-prev,
    .ant-pagination-next {
      display: flex;
      align-items: center;
      min-width: 2.66667rem;
      width: 2.66667rem;
      height: 2.66667rem;
      margin-right: 0.33rem;
      a {
        color: #fff;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal; /* 100% */
      }
    }
    .ant-pagination-disabled {
      a {
        opacity: 0.5;
      }
    }
    .ant-pagination-item,
    .ant-pagination-jump-next {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      /* border: none; */

      min-width: 2.66667rem;
      width: 2.66667rem;
      height: 2.66667rem;
      flex-shrink: 0;
      margin-right: 0.33rem;

      border-radius: 0.66667rem;
      border: 1px solid #d9d9d9;
      background: #fff;
      a {
        color: #000;
        text-align: center;
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.83333rem; /* 157.143% */
      }
    }
    .ant-pagination-jump-next-custom-icon {
      border: none;
    }
    .ant-pagination-item-active {
      border-radius: 0.66667rem;
      border: 1px solid #d9d9d9;
      background: #000;
      a,
      span {
        color: #fff;
        text-align: center;
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.83333rem; /* 157.143% */
      }
    }
    .ant-pagination-jump-next
      .ant-pagination-item-container
      .ant-pagination-item-ellipsis,
    .ant-pagination-jump-prev
      .ant-pagination-item-container
      .ant-pagination-item-ellipsis {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      text-align: center;
      font-family: "CKTKingkong";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }

    .ant-pagination-options-quick-jumper {
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      font-family: "CKTKingkong";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      input {
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: #1b1b1b;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .ant-select {
    display: none;
  }
`;
let tokenList: any = [
  {
    name: "USDT",
    tokenAddress: contractAddress?.USDT,
  },
  {
    name: "Money",
    tokenAddress: contractAddress?.Money,
  },
];
export default function Rank() {
  const web3 = new Web3();

  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { isBind } = useSelector<stateType, stateType>((state) => state);
  const [Tip, setTip] = useState("");
  const [IsSearchState, setIsSearchState] = useState(true);
  const [Active, setActive] = useState<any>("USDT");
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [InputAmount, setInputAmount] = useState(0);
  const [UserInfo, setUserInfo] = useState<any>({});
  const [CoinListObj, setCoinListObj] = useState<any>([]);
  const { isNoGasFun } = useNoGas();
  // const getCoinList = async () => {
  //   let Arr = [];
  //   if (!!web3ModalAccount) {
  //     for (let item of tokenList) {
  //       // debugger;
  //       let value1: any = 0;

  //       try {
  //         value1 = await Contracts.example.balanceOf(
  //           web3ModalAccount as string,
  //           item?.tokenAddress
  //           // "0x27e199Afb97612542d8dcD88C8DCE83b4b516992"
  //         );
  //       } catch (error: any) {}
  //       console.log(value1, "value");
  //       item = {
  //         ...item,
  //         balance: Web3.utils.fromWei(value1 + "", "ether") || 0,
  //       };
  //       Arr.push(item);
  //     }
  //     setCoinListObj(Arr || []);
  //   } else {
  //     setCoinListObj(tokenList);
  //   }
  // };

  const getInitData = async () => {
    let abi_data1: any = null;
    try {
      abi_data1 = await Contracts.example?.viewUserInfo(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data1, "abi_data1");
    setUserInfo(abi_data1 || {});
    if (Active === "Money") {
      setInputAmount(
        NumSplic1(EthertoWei(abi_data1?.moneyAmount ?? "0"), 4) ?? 0
      );
    }
  };
  const withdrawFun = async () => {
    let amount: any =
      Active === "USDT"
        ? NumSplic1(EthertoWei(UserInfo?.usdtAmount ?? "0"), 4)
        : NumSplic1(EthertoWei(UserInfo?.moneyAmount ?? "0"), 4);
    if (Number(InputAmount ?? 0) <= 0) return addMessage(t("无法领取"));
    if (Number(InputAmount) > Number(amount))
      return addMessage(t("超过可用余额"));
    let abi_res: any = null;
    try {
      showLoding(true);
      if (!!(await isNoGasFun())) return showLoding(false);

      if (Active === "USDT") {
        abi_res = await Contracts.example?.withdrawUsdt(
          web3ModalAccount as string,
          InputAmount
        );
      } else {
        abi_res = await Contracts.example?.withdrawMoney(
          web3ModalAccount as string,
          InputAmount
        );
      }
    } catch (error: any) {
      if (error?.code === 4001) {
        showLoding(false);
        return addMessage(t("failed"));
      }
    }
    showLoding(false);
    if (!!abi_res?.status) {
      getInitData();
      setInputAmount(0);
      return addMessage(Active + t("提现成功"));
    } else if (abi_res?.status === false) {
      showLoding(false);
      return addMessage(t("failed"));
    }
  };

  useEffect(() => {
    if (!!web3ModalAccount && isBind) {
      getInitData();
      // getCoinList();
    } else {
      setUserInfo({});
      setCoinListObj([]);
    }
  }, [web3ModalAccount, isBind, Active]);

  return (
    <HomeContainer>
      <ReturnBox>
        <img
          src={return_icon}
          alt=""
          onClick={() => {
            Navigate(-1);
          }}
        />

        <div> {t("USDT提现")}</div>

        <div className="null"></div>
      </ReturnBox>

      <HomeContainer_Content>
        <div className="btns">
          <div
            className={Active === "USDT" ? "btn btn1" : "btn btn2"}
            onClick={() => {
              setActive("USDT");
            }}
          >
            USDT
          </div>
          <div
            className={Active === "Money" ? "btn btn1" : "btn btn2"}
            onClick={() => {
              setActive("Money");
            }}
          >
            Money
          </div>
        </div>
        <div className="withdraw_box">
          <div className="withdraw_box_top">
            提现{" "}
            <div>
              可用余额:{" "}
              {NumSplic1(
                EthertoWei(
                  (Active === "USDT"
                    ? UserInfo?.usdtAmount
                    : UserInfo?.moneyAmount) ?? "0"
                ),
                4
              )}
            </div>
          </div>
          <div className="withdraw_box_bottom">
            <input
              type="text"
              value={InputAmount}
              onChange={(e: any) => {
                setInputAmount(e.target.value);
              }}
              readOnly={Active === "USDT" ? false : true}
            />{" "}
            <div>
              <img src={Active === "USDT" ? usdt : money} alt="" />{" "}
              {Active === "USDT" ? "USDT" : "Money"}
            </div>
          </div>
        </div>
        <div className="result">
          <div className="result-top">
            手续费 <span>5%</span>
          </div>
          <div className="devider"></div>
          <div className="result-top">
            提现到账
            <span>
              {NumSplic1(
                (Number(InputAmount) * (1 - 0.05)).toFixed(10) ?? 0,
                4
              )}{" "}
              {Active === "USDT" ? "USDT" : "Money"}
            </span>
          </div>
        </div>

        <div
          className="withdraw_btn"
          onClick={() => {
            withdrawFun();
          }}
        >
          提现
        </div>
      </HomeContainer_Content>
    </HomeContainer>
  );
}
