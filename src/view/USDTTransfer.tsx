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
  .input_item {
    .input_title {
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
      span {
        font-family: Sora, Sora;
        font-weight: 400;
        font-size: 1.17rem;
        color: #585e69;
        line-height: 1.37rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
    .input_box {
      margin-top: 1rem;
      background: #1a1f2e;
      border-radius: 1.17rem 1.17rem 1.17rem 1.17rem;
      padding: 1.67rem 1.33rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        flex: 1;
        border: none;
        background-color: transparent;
        outline: none;
        font-family: Sora, Sora;
        font-weight: 600;
        font-size: 1.17rem;
        color: #fff;
        line-height: 1.37rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
        &::placeholder {
          font-family: Sora, Sora;
          font-weight: 600;
          font-size: 1.17rem;
          color: #585e69;
          line-height: 1.37rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
      .max {
        font-family: Sora, Sora;
        font-weight: 400;
        font-size: 1.17rem;
        color: #fe7a2e;
        line-height: 1.37rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
  .mt133 {
    margin-top: 1.33rem;
  }
  .transfer_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3.83rem;
    background: #fe7a2e;
    box-shadow: 0rem 0rem 0.33rem 0rem #fe7a2e;
    border-radius: 2.5rem 2.5rem 2.5rem 2.5rem;
    border: 0.08rem solid #ff8d4d;
    padding: 1.17rem;
    font-family: Sora, Sora;
    font-weight: 600;
    font-size: 1.17rem;
    color: #ffffff;
    line-height: 1.37rem;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin: 4.17rem 0px;
  }
  .trasfer_record {
    .record_title {
      font-family: Sora, Sora;
      font-weight: 600;
      font-size: 1.33rem;
      color: #ffffff;
      line-height: 1.56rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 1.33rem;
    }
    .table {
      width: 100%;
      .items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        .item {
          flex: 1;
          font-family: Sora, Sora;
          font-weight: 400;
          font-size: 1.17rem;
          color: #ffffff;
          line-height: 1.17rem;
          text-align: center;
          font-style: normal;
          text-transform: none;
          display: flex;
          align-items: center;
          justify-content: center;
          &:first-child {
            justify-content: flex-start;
          }
          &:last-child {
            justify-content: flex-end;
          }
        }
      }
      .devider {
        height: 0.08rem;
        background: #20283f;
        margin-bottom: 1rem;
      }
      .table_title {
        .item {
          font-family: Sora, Sora;
          font-weight: 400;
          font-size: 1.17rem;
          color: #999999;
          line-height: 1.17rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }
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

export default function Rank() {
  const web3 = new Web3();

  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { isBind } = useSelector<stateType, stateType>((state) => state);
  const [Tip, setTip] = useState("");
  const [InputAddress, setInputAddress] = useState<any>(null);
  const [InputAmount, setInputAmount] = useState<any>(0);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [PageNum, setPageNum] = useState(1);
  const [UserInfo, setUserInfo] = useState<any>({});
  const [TransferRecord, setTransferRecord] = useState<any>([]);
  const { isNoGasFun } = useNoGas();
  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setPageNum(page);
  };

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <FlexCCBox style={{ width: "100%" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M8.83962 2.06621V1.03094C8.83962 0.941211 8.7365 0.891658 8.66685 0.946568L2.62935 5.66219C2.57805 5.70209 2.53655 5.75317 2.50799 5.81154C2.47944 5.86992 2.4646 5.93404 2.4646 5.99902C2.4646 6.06401 2.47944 6.12813 2.50799 6.18651C2.53655 6.24488 2.57805 6.29596 2.62935 6.33585L8.66685 11.0515C8.73783 11.1064 8.83962 11.0568 8.83962 10.9671V9.93184C8.83962 9.86621 8.80882 9.80327 8.75792 9.76309L3.93649 5.99969L8.75792 2.23496C8.80882 2.19478 8.83962 2.13184 8.83962 2.06621Z"
              fill="black"
            />
          </svg>
        </FlexCCBox>
      );
    }
    if (type === "next") {
      return (
        <FlexCCBox style={{ width: "100%" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3.16038 2.06621V1.03094C3.16038 0.941211 3.2635 0.891658 3.33315 0.946568L9.37065 5.66219C9.42195 5.70209 9.46345 5.75317 9.49201 5.81154C9.52056 5.86992 9.5354 5.93404 9.5354 5.99902C9.5354 6.06401 9.52056 6.12813 9.49201 6.18651C9.46345 6.24488 9.42195 6.29596 9.37065 6.33585L3.33315 11.0515C3.26217 11.1064 3.16038 11.0568 3.16038 10.9671V9.93184C3.16038 9.86621 3.19118 9.80327 3.24208 9.76309L8.06351 5.99969L3.24208 2.23496C3.19118 2.19478 3.16038 2.13184 3.16038 2.06621Z"
              fill="black"
            />
          </svg>
        </FlexCCBox>
      );
    }
    return originalElement;
  };
  const getInitData = async () => {
    let abi_data1: any = null;
    let abi_data2: any = null;
    try {
      abi_data1 = await Contracts.example?.viewUserInfo(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data1, "abi_data1");
    setUserInfo(abi_data1 || {});
    try {
      abi_data2 = await Contracts.example?.viewTransferRecord(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data2, "abi_data2");
    let Arr: any = [];
    abi_data2["0"]?.map((item: any, index: any) => {
      Arr.push({
        address: item,
        amount: abi_data2["1"][index],
        time: abi_data2["2"][index],
      });
    });
    setTransferRecord(Arr.reverse() || []);
  };

  const transferFun = async () => {
    let amount: any = NumSplic1(EthertoWei(UserInfo?.usdtAmount ?? "0"), 4);
    if (Number(InputAmount ?? 0) <= 0) return addMessage(t("请输入正确的值"));
    if (Number(InputAmount) > Number(amount))
      return addMessage(t("超过可用余额"));
    let tag = await web3.utils.isAddress(InputAddress);
    if (!tag) return addMessage(t("请输入正确的地址格式"));
    let abi_res: any = null;
    try {
      showLoding(true);
      if (!!(await isNoGasFun())) return showLoding(false);

      abi_res = await Contracts.example?.transfer(
        web3ModalAccount as string,
        InputAddress,
        InputAmount
      );
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
      return addMessage(t("转移USDT成功"));
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
      setTransferRecord([]);
    }
  }, [web3ModalAccount, isBind]);

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

        <div> {t("USDT互转")}</div>

        <div className="null"></div>
      </ReturnBox>

      <HomeContainer_Content>
        <div className="input_item">
          <div className="input_title"> 地址</div>{" "}
          <div className="input_box">
            <input
              type="text"
              placeholder="请输入地址"
              value={InputAddress}
              onChange={(e: any) => {
                setInputAddress(e?.target.value);
              }}
            />
          </div>
        </div>
        <div className="input_item mt133">
          <div className="input_title">
            {" "}
            数量{" "}
            <span>
              可用余额:{NumSplic1(EthertoWei(UserInfo?.usdtAmount ?? "0"), 4)}{" "}
              USDT
            </span>
          </div>{" "}
          <div className="input_box">
            <input
              type="text"
              value={InputAmount}
              placeholder="请输入转移数量"
              onChange={(e: any) => {
                setInputAmount(e.target.value);
              }}
            />{" "}
            <div
              className="max"
              onClick={() => {
                setInputAmount(
                  NumSplic1(EthertoWei(UserInfo?.usdtAmount ?? "0"), 4)
                );
              }}
            >
              全部
            </div>
          </div>
        </div>
        <div
          className="transfer_btn"
          onClick={() => {
            transferFun();
          }}
        >
          转移
        </div>
        <div className="trasfer_record">
          <div className="record_title">转移记录</div>
          <div className="table">
            <div className="table_title items">
              <div className="item">时间</div>
              <div className="item">地址</div>
              <div className="item">数量</div>
            </div>
            <div className="devider"></div>
            {TransferRecord?.map((item: any, index: any) => (
              <div className="table_content items" key={index}>
                <div className="item">
                  {dateFormat(
                    "YYYY/mm/dd",
                    new Date(Number(item?.time ?? 0) * 1000)
                  )}
                </div>
                <div className="item">{AddrHandle(item?.address, 6, 6)}</div>
                <div className="item">
                  {NumSplic1(EthertoWei(item?.amount ?? "0"), 4)} USDT
                </div>
              </div>
            ))}
            {/* <div className="table_content items">
              <div className="item">2025/03/30</div>
              <div className="item">0xsr...3025</div>
              <div className="item">1000 USDT</div>
            </div> */}
          </div>
        </div>
      </HomeContainer_Content>
    </HomeContainer>
  );
}
