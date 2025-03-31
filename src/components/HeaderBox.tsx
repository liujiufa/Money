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
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../store/reducer";
import { Contracts } from "../web3";
import { createLoginSuccessAction, savePriceAction } from "../store/actions";
import BigNumber from "big.js";
import copy from "copy-to-clipboard";
import demo from "../assets/image/demo.svg";

import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import {
  curentBSCChainId,
  curentETHChainId,
  customNetwork_BSC,
  customNetwork_BSC_TEST,
  GoTo,
  isMain,
  LOCAL_KEY,
} from "../config";
import { useViewport } from "./viewportContext";
import Web3 from "web3";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSBCBox } from "./FlexBox";
import CodeInputBox from "./CodeInputBox";
import { useSign } from "../hooks/useSign";
import { useNoGas } from "../hooks/useNoGas";
import useTipLoding from "./ModalContent";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import newLogo from "../assets/image/layout/logo.png";
import slider_logo from "../assets/image/layout/slider_logo.png";
import open_icon from "../assets/image/layout/open.png";
import close_icon from "../assets/image/layout/close.png";
import tw from "../assets/image/layout/tw.png";
import tg from "../assets/image/layout/tg.png";
import wallet from "../assets/image/layout/wallet.png";
import { bscTestnet, bsc, mainnet, holesky } from "@reown/appkit/networks";
const { Header, Content } = Layout;

let refereeUserAddress: any;

const LogoContainer = styled(FlexCCBox)`
  width: fit-content;
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
  .menu_switch {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0rem 0rem 0rem 0rem;
  }
  .logo {
    width: 3.17rem;
    height: 3.17rem;
    border-radius: 0rem 0rem 0rem 0rem;
    margin-left: 0.83rem;
  }
`;

const HeaderContainer = styled(Header)`
  margin: 0px auto;
  backdrop-filter: blur(10px);
  padding: 0;
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  max-width: 450px;
  height: 4.33rem;
  background: #03050c;
  border-radius: 0rem 0rem 0rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  .HeaderNav {
    padding: 0rem 1.33rem;
  }
`;

const SetBox = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  line-height: normal;
  .menuBox {
    width: 1.66667rem;
    height: 1.66667rem;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .activeConnect {
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .walletInfo {
      font-family: "Space Grotesk";
      font-size: 14px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      > div {
        font-family: "Space Grotesk";
        font-size: 12px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #999999;
      }
    }
  }
  .langDrowDrop {
    width: 1.66667rem;
    height: 1.66667rem;
    flex-shrink: 0;
    > img {
      width: 100%;
    }
  }
  .Connect {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: fit-content;
    height: 3.33rem;
    background: #1da464;
    border-radius: 1.67rem 1.67rem 1.67rem 1.67rem;
    font-family: Sora, Sora;
    font-weight: 600;
    font-size: 1.17rem;
    color: #ffffff;
    line-height: 1.37rem;
    text-align: left;
    font-style: normal;
    text-transform: none;
    padding: 0 1.33rem;
    img {
      width: 1.67rem;
      height: 1.67rem;
      margin-left: 0.83rem;
    }
  }
  .LangDropDown {
    .ant-dropdown-menu {
      background: #f0f0f0;
      color: #000;
      font-family: "Alibaba PuHuiTi 2.0";
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1rem; /* 100% */
      padding: 0.92rem 0px;
      border-radius: 12px;
      opacity: 1;
      background: #fff;
      border: 2px solid #d9d9d9;
      .ant-dropdown-menu-item {
        padding: 0;
        .LangItem {
          cursor: pointer;
          margin-bottom: 1.17rem;
          padding: 0 0.83rem;
        }
        /* 语言切换下拉 */

        &:last-child {
          .LangItem {
            margin-bottom: 0px;
          }
        }
        .LangItem {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #000;
          font-family: Roboto;
          font-size: 1rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1rem; /* 100% */
          img {
            width: 1.16667rem;
            height: 1.16667rem;
            flex-shrink: 0;
            margin-right: 0.33rem;
          }
        }
      }
    }
  }

  > div {
    margin-left: 0.5rem;
  }
`;

const MyLayout = styled(Layout)``;

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

export const ModalContainer_Title = styled(FlexBox)`
  width: 100%;
  align-items: flex-start;
  font-family: "Space Grotesk";
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

const MobileSlider = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 4.33rem;

  /* right: 50%;
  transform: translateX(255px); */
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

  /* max-width: 450px; */
  max-width: ${({ isOpen }) => (isOpen ? "450px" : "0px")};
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  opacity: 1;
  z-index: 99;

  transition: width 1.5s;
  display: flex;
  justify-content: flex-end;
  .menus {
    overflow: auto;
    height: calc(100vh - 4.33rem);
    /* border-radius: 16px 0px 0px 16px; */
    background: #000;
    width: 100%;
    padding: 5rem 0rem;
    z-index: 99;
    .links {
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0rem 0rem 0rem 0rem;
        &:first-child {
          margin-right: 1.17rem;
        }
      }
    }
  }
`;
const MobileSlider_Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: Sora, Sora;
    font-weight: 600;
    font-size: 1.33rem;
    color: #ffffff;
    line-height: 1.56rem;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin-bottom: 1.33rem;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Sora, Sora;
      font-weight: 600;
      font-size: 1.33rem;
      color: #ffffff;
      line-height: 1.56rem;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }
  .active {
    /* border: 1px solid #fff; */
    color: #1da464;
  }

  .about {
    padding: 0px 2rem;
    margin-top: 2.67rem;

    .about_us_title {
      display: flex;
      align-items: center;
      div {
        color: #000;
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem; /* 100% */
        &:last-child {
          margin-left: 0.33rem;
          flex: 1;
          height: 0.08333rem;
          background: #d9d9d9;
          opacity: 0.5;
        }
      }
    }
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2rem;
      img {
        width: 2.66rem;
        height: 2.66rem;
      }
    }
  }
`;

declare let window: any;
const MainLayout: any = () => {
  const web3 = new Web3();
  const codeInputRef = useRef<any>(null);
  let dispatch = useDispatch();
  let token = useSelector<any>((state) => state.token);
  let { t, i18n } = useTranslation();
  let [ItemActive, setItemActive] = useState("/");
  const [InputValue, setInputValue] = useState<any>(null);
  const Navigate = useNavigate();
  const { width } = useViewport();
  const { signFun } = useSign();
  const { isNoGasFun } = useNoGas();
  const { walletProvider } = useAppKitProvider("eip155");
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { open, close } = useAppKit();
  const { disconnect } = useDisconnect();
  const [BindModal, setBindModal] = useState(false);
  const location = useLocation();
  const pathname = startWord(location.pathname);

  const [showMask, setShowMask] = useState(false);
  const [RewardRecordModalState, setRewardRecordModalState] = useState(false);
  const [OpenList, setOpenList] = useState<any>([]);
  const [UserInfo, setUserInfo] = useState<any>({});

  function changeLanguage(lang: any) {
    window.localStorage.setItem(LOCAL_KEY, lang.key);
    i18n.changeLanguage(lang.key);
  }
  const openFun = (type: any) => {
    let Arr: any = OpenList;
    if (Arr?.some((item: any) => Number(item) === Number(type))) {
      Arr = Arr?.filter((item: any) => Number(item) !== Number(type));
    } else {
      Arr = [...Arr, type];
    }

    setOpenList(Arr);
    console.log(Arr, "Arr");
  };

  let langObj = [
    { value: "简体中文", key: "zh-CN" },
    { value: "繁体中文", key: "zh-TW" },
    { value: "English", key: "en" },
    // { value: "日本語", key: "ja" },
    // { value: "한국인", key: "kr" },
    // { value: "Nederlands", key: "lang1" },
    // { value: "Polski", key: "lang2" },
    // { value: "Português (Brazil)", key: "lang3" },
    // { value: "Italiano", key: "lang4" },
    // { value: "Bahasa Indonesia", key: "lang5" },
  ];
  const menu3 = (
    <Menu
      onClick={changeLanguage}
      items={langObj.map((item: any) => {
        return {
          label: <span className="LangItem ReallyLangItem">{item.value}</span>,
          key: item?.key,
        };
      })}
    />
  );

  const headerNavObj: any = [
    {
      name: "项目介绍",
      pathname: "/",
      menu: "menu pointer",
      menuActive: "menu pointer active",
    },
    {
      name: "IDO募集",
      pathname: "/IDO",
      menu: "menu pointer",
      menuActive: "menu pointer active",
    },
    {
      name: "Community governance",
      pathname: "/Consensus",
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
  ];

  // 导航
  const navigateFun = (path: string) => {
    Navigate("/View" + path);
  };

  function menuActive(path: string) {
    if (ItemActive === path) {
      return headerNavObj?.find(
        (item: any) => String(item?.pathname) === String(path)
      )?.menuActive;
    } else {
      return headerNavObj?.find(
        (item: any) => String(item?.pathname) === String(path)
      )?.menu;
    }
  }
  const getInitData = () => {};

  useEffect(() => {
    if (!!pathname) {
      setItemActive(pathname ?? "/");
    }
  }, [pathname, token]);

  useEffect(() => {
    if (!!token) {
      getInitData();
    }
  }, [token]);

  return (
    <MyLayout>
      <HeaderContainer>
        <div className="HeaderNav">
          <LogoContainer>
            <img
              src={showMask ? close_icon : open_icon}
              alt=""
              onClick={() => {
                setShowMask(!showMask);
              }}
              className="menu_switch"
            />

            <img
              onClick={() => {
                setShowMask(false);
                Navigate("/View/");
              }}
              src={newLogo}
              className="logo"
            />
          </LogoContainer>

          <SetBox>
            {web3ModalAccount ? (
              <div
                className="Connect  pointer "
                onClick={() => {
                  // open();
                }}
              >
                {AddrHandle(web3ModalAccount as string, 6, 4)}{" "}
                <img src={wallet} alt="" />{" "}
              </div>
            ) : (
              <div
                className="Connect  pointer "
                onClick={() => {
                  open();
                }}
              >
                {t("连接钱包")}
                <img src={wallet} alt="" />{" "}
              </div>
            )}

            {/* <Dropdown
              overlay={menu3}
              placement="bottom"
              overlayClassName="LangDropDown ChainDropDown"
              trigger={["click"]}
              arrow={false}
              getPopupContainer={(triggerNode: any) => triggerNode}
            >
              <div className="langDrowDrop pointer">
                <img src={languageIcon} alt="" />
              </div>
            </Dropdown> */}
          </SetBox>
        </div>
      </HeaderContainer>

      <MobileSlider isOpen={showMask}>
        <div
          className="menus"
          onClick={() => {
            setShowMask(false);
          }}
        >
          <MobileSlider_Menu>
            {headerNavObj?.map((item: any, index: any) => (
              <div
                key={index}
                className={menuActive(item?.pathname)}
                onClick={() => {
                  if (!item?.isSoon) {
                    navigateFun(item?.pathname);
                    setShowMask(false);
                  } else {
                    return addMessage(t("敬请期待"));
                  }
                }}
              >
                <div>{t(item?.name)}</div>
              </div>
            ))}
          </MobileSlider_Menu>
          <div className="links">
            <img src={tw} alt="" />
            <img src={tg} alt="" />
          </div>
        </div>
        {!!showMask && (
          <div
            className="Mask"
            onClick={() => {
              setShowMask(false);
            }}
          ></div>
        )}
      </MobileSlider>
    </MyLayout>
  );
};
export default MainLayout;
