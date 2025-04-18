import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import type { MenuProps } from "antd";
import {
  AddrHandle,
  addMessage,
  GetQueryString,
  showLoding,
  NumSplic,
  getFullNum,
  startWord,
} from "../utils/tool";
import {
  Login,
  checkAddressLogin,
  checkAddress,
  getUserInfo,
  isNewUser,
  isRefereeAddress,
  signBindReferee,
} from "../API/index";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../store/reducer";
import { Contracts } from "../web3";
import {
  createLoginSuccessAction,
  createSetBindAction,
  savePriceAction,
} from "../store/actions";
import BigNumber from "big.js";
import copy from "copy-to-clipboard";

import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import { useViewport } from "../components/viewportContext";
import Web3 from "web3";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../components/FlexBox";
import CodeInputBox from "../components/CodeInputBox";
import { useSign } from "../hooks/useSign";
import { useNoGas } from "../hooks/useNoGas";
import useTipLoding from "../components/ModalContent";
import BindModal from "../components/BindModal";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import { curentBSCChainId } from "../config";

const { Header, Content } = Layout;

let refereeUserAddress: any;

const MyLayout = styled(Layout)`
  position: relative;
`;

export const ModalContainer_Title_Container = styled(FlexCCBox)`
  width: 100%;
  > img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  > svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

export const ModalContainer_Title = styled(FlexSBCBox)`
  width: 100%;
  color: #000;
  font-family: "Alibaba PuHuiTi 3.0";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 100% */
`;

const AllModal = styled(Modal)`
  z-index: 10000;
  .ant-modal-content {
    overflow: hidden;
    border-radius: 12px;
    opacity: 1;
    border-radius: 1.66667rem;
    background: #fff;
    padding: 0px;

    .ant-modal-body {
      position: relative;
      padding: 2.67rem 2rem 2rem;
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

const ModalContainer_Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled(FlexCCBox)`
  width: 100%;
  padding: 1.42rem;
  margin: 2rem 0px;
  color: #000;
  text-align: center;
  font-family: "Alibaba PuHuiTi 3.0";
  font-size: 1.16667rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.16667rem; /* 100% */
  border-radius: 1.33333rem;
  background: #f9fafc;
`;

const Btn = styled(FlexCCBox)`
  width: fit-content;
  opacity: 1;
  width: 100%;
  padding: 0.83rem;
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
  cursor: pointer;
  color: #fff;
  font-family: "Alibaba PuHuiTi 3.0";
  font-size: 1.16667rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem; /* 171.429% */
`;

const ConfirmBtn = styled(FlexCCBox)`
  width: 100%;
  > div {
    width: 100%;
  }
`;
const InputBox_Top = styled(FlexBox)`
  width: 100%;
  align-items: flex-start;
  /* padding-bottom: 5.42rem; */
  textarea {
    width: 100%;
    flex: 1;
    color: #000;
    font-family: "Alibaba PuHuiTi 3.0";
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.16667rem; /* 100% */
    background: transparent;
    outline: none;
    border: none;
    padding: 0px;
    margin-right: 5px;
    &::placeholder {
      color: #000;
      font-family: "Alibaba PuHuiTi 3.0";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.16667rem; /* 100% */
      opacity: 0.6;
    }
  }
  div {
    color: #000;
    text-align: center;
    font-family: "Alibaba PuHuiTi 3.0";
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.16667rem; /* 100% */
  }
`;

declare let window: any;
let isBindInterval: any = null;
const MainLayout: any = () => {
  const inputsRef: any = useRef();
  const web3 = new Web3();
  const codeInputRef = useRef<any>(null);
  let dispatch = useDispatch();
  let token = useSelector<any>((state) => state.token);
  let { t, i18n } = useTranslation();
  const [InputValue, setInputValue] = useState<any>(null);
  const Navigate = useNavigate();
  const { width } = useViewport();

  const { signFun } = useSign();
  const { isNoGasFun } = useNoGas();
  const { walletProvider } = useAppKitProvider("eip155");
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const [BindModalState, setBindModalState] = useState(false);
  const [showMask, setShowMask] = useState(false);
  const [IsUpLevel, setIsUpLevel] = useState(false);
  const [UserInfo, setUserInfo] = useState<any>({});

  const getInitData = async () => {
    let abi_data1: any = null;

    try {
      abi_data1 = await Contracts.example?.viewUserInfo(
        web3ModalAccount as string
      );
    } catch (e: any) {}
    console.log(abi_data1, "viewUserInfo");

    if (!!abi_data1?.isBind) {
      dispatch(createSetBindAction(!!abi_data1?.isBind));
    } else {
      // Bind();
      setBindModalState(true);
    }
  };

  const Bind = async () => {
    let tag = await web3.utils.isAddress(window.location.pathname.slice(1));
    if (tag) {
      refereeUserAddress = window.location.pathname.slice(1);
    } else {
      refereeUserAddress = await Contracts.example?.topAdd(
        web3ModalAccount as string
      );
    }
    let abi_res: any = null;
    try {
      showLoding(true);
      if (!!(await isNoGasFun())) return showLoding(false);

      abi_res = await Contracts.example?.bind(
        web3ModalAccount as string,
        refereeUserAddress
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
      setBindModalState(false);
      return addMessage(t("绑定上级成功"));
    } else if (abi_res?.status === false) {
      showLoding(false);
      return addMessage(t("failed"));
    }
  };

  useEffect(() => {
    if (!!web3ModalAccount) {
      new Contracts(walletProvider);
      getInitData();
    }
  }, [web3ModalAccount, chainId]);
  return (
    <MyLayout>
      <Content className="MainContent">
        <Outlet />
        {!!showMask && (
          <div
            className="Mask"
            onClick={() => {
              setShowMask(false);
            }}
          ></div>
        )}
      </Content>

      <BindModal
        IdoData={refereeUserAddress}
        Bind={Bind}
        ShowTipModal={BindModalState}
        close={() => {
          setBindModalState(false);
        }}
      />
    </MyLayout>
  );
};
export default MainLayout;
