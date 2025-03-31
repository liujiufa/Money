// @ts-nocheck
import "./App.scss";
import "./App.css";
import React from "react";

import { useEffect } from "react";
import "./lang/i18n";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Routers from "./router";
import { GetQueryString, showLoding, startWord } from "./utils/tool";
// import web3 from 'web3';
import { stateType } from "./store/reducer";
import {
  createAddMessageAction,
  createLoginSuccessAction,
  createDelMessageAction,
} from "./store/actions";
import { Login } from "./API";
import Loding from "./components/loding";
import ViewportProvider from "./components/viewportContext";
// import { useNavigate } from "react-router-dom";
// import Home from './view/Home';
import close_icon from "./assets/image/close.png";
import info from "./assets/image/info.svg";

import { t } from "i18next";
import useConnectWallet, { connector } from "./hooks/useConnectWallet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useSign } from "./hooks/useSign";
import { useTitle } from "ahooks";

import * as QB from "quickblox/quickblox";

import { QBConfig } from "./QBconfig";

declare let window: any;

const MessageBox = styled.div`
  position: fixed;
  z-index: 9999999;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);

  .messageItem {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    opacity: 1;
    border-radius: 0.83333rem;
    background: #1a1f2e;
    border: 0.08rem solid #434f6f;
    backdrop-filter: blur(5px);
    width: 28.25rem;
    div {
      word-break: break-all;
      flex: 1;
      color: #fff;
      font-family: "Bakbak One";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.16667rem; /* 100% */
      text-transform: capitalize;
    }
    padding: 2rem 1.67rem;
    img {
      width: 1.67rem;
      height: 1.67rem;
      margin-left: 10px;
    }
    margin-bottom: 8px;
  }
`;

function App() {
  const { t } = useTranslation();
  // useTitle(t("Uni"));

  const web3React = useWeb3React();
  const { connectWallet } = useConnectWallet();
  const { signFun } = useSign();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let state = useSelector<stateType, stateType>((state) => state);

  return (
    <ViewportProvider>
      <div className="App">
        {state?.message?.length > 0 && (
          <MessageBox>
            {state?.message?.map((item, index) => (
              <div className="messageItem" key={index}>
                <div> {item.message}</div>{" "}
                <img
                  src={close_icon}
                  onClick={() => {
                    dispatch(createDelMessageAction(item.index));
                  }}
                  alt=""
                />
              </div>
            ))}
          </MessageBox>
        )}
        <Routers></Routers>
        {state.showLoding && <Loding></Loding>}
      </div>
    </ViewportProvider>
  );
}

export default App;
