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
import left_icon from "../assets/image/Record/left_icon.png";
import right_icon from "../assets/image/Record/right_icon.png";
import usdt from "../assets/image/IDO/usdt.png";
import money from "../assets/image/IDO/money.png";
import Web3 from "web3";
import { contractAddress } from "../config";
import { Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
import { getRefereeList, getScoreUseRecord, getUserLuckRecord } from "../API";
import { AddrHandle, addMessage, dateFormat } from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../components/NoData";
import { Contracts } from "../web3";
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
    .indirect {
      .item {
        color: #999999;
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
      justify-content: center;
      min-width: 1.33rem;
      width: 1.33rem;
      height: 1.33rem;
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

      min-width: 1.33rem;
      width: 1.33rem;
      height: 1.33rem;
      flex-shrink: 0;
      margin-right: 0.33rem;

      /* background: #292929; */
      border-radius: 0.12rem;
      border: 0.04rem solid #a6a6a6;
      a {
        font-family: Source Han Sans SC, Source Han Sans SC;
        font-weight: 500;
        font-size: 0.67rem;
        color: #a6a6a6;
        line-height: 0.78rem;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
    .ant-pagination-jump-next-custom-icon {
      border: none;
    }
    .ant-pagination-item-active {
      background: #a6a6a6;
      border-radius: 0.12rem 0.12rem 0.12rem 0.12rem;
      a,
      span {
        font-family: Source Han Sans SC, Source Han Sans SC;
        font-weight: 500;
        font-size: 0.67rem;
        color: #000000;
        line-height: 0.78rem;
        text-align: center;
        font-style: normal;
        text-transform: none;
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
      font-family: Source Han Sans SC, Source Han Sans SC;
      font-weight: 500;
      font-size: 0.67rem;
      color: #a6a6a6;
      line-height: 0.78rem;
      text-align: center;
      font-style: normal;
      text-transform: none;
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
        border-radius: 0.12rem;
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
const BoxIcon = styled(FlexCCBox)`
  img {
    width: 0.66rem;
    height: 0.66rem;
  }
`;

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
  const [PageNum, setPageNum] = useState(1);
  const [InviteRecord, setInviteRecord] = useState<any>([]);
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
        <BoxIcon>
          <img src={left_icon} alt="" />
        </BoxIcon>
      );
    }
    if (type === "next") {
      return (
        <BoxIcon>
          <img src={right_icon} alt="" />
        </BoxIcon>
      );
    }
    return originalElement;
  };
  const getInitData = async () => {
    let abi_data: any = null;
    try {
      abi_data = await Contracts.example?.viewInviteRecord(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data, "abi_data");
    let Arr: any = [];
    abi_data["0"]?.map((item: any, index: any) => {
      Arr.push({
        address: item,
        time: abi_data["1"][index],
        type: abi_data["2"][index],
      });
    });
    setInviteRecord(Arr || []);
  };

  useEffect(() => {
    if (!!web3ModalAccount && isBind) {
      getInitData();
    } else {
      setInviteRecord([]);
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

        <div> {t("邀请记录")}</div>

        <div className="null"></div>
      </ReturnBox>

      <HomeContainer_Content>
        <div className="table">
          <div className="table_title items">
            <div className="item">时间</div>
            <div className="item">用户地址</div>
            <div className="item">类型</div>
          </div>
          <div className="devider"></div>
          {InviteRecord?.map((item: any, index: any) => (
            <div
              className={
                !!item?.type
                  ? "table_content items"
                  : "table_content items indirect"
              }
              key={index}
            >
              <div className="item">
                {dateFormat(
                  "YYYY/mm/dd",
                  new Date(Number(item?.time ?? 0) * 1000)
                )}
              </div>
              <div className="item">{AddrHandle(item?.address, 6, 6)}</div>
              <div className="item">{!!item?.type ? "激活" : "未激活"}</div>
            </div>
          ))}
          {/* <div className="table_content items indirect">
            <div className="item">2025/03/30</div>
            <div className="item">0xsr...3025</div>
            <div className="item">间推</div>
          </div> */}
        </div>

        <PaginationContainer>
          <Pagination
            // current={PageNum}
            pageSize={10}
            // onChange={onChange}
            total={InviteRecord?.length ?? 0}
            showQuickJumper={false}
            defaultCurrent={1}
            itemRender={itemRender}
          />
        </PaginationContainer>
      </HomeContainer_Content>
    </HomeContainer>
  );
}
