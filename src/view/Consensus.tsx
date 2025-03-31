import React, { useEffect, useState } from "react";
import HeaderBox from "../components/HeaderBox";
import { Carousel } from "antd";
import "../assets/style/Consensus.scss";
import { useNavigate } from "react-router-dom";
import CodeModal from "../components/CodeModal";
import { useSelector } from "react-redux";
import { getRefereeInfo, getRefereeList } from "../API";
import { AddrHandle, addMessage, dateFormat } from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import { useTranslation } from "react-i18next";
import tag_icon from "../assets/image/Consensus/tag_icon.png";
import core_icon from "../assets/image/Home/core_icon.png";
import copy from "copy-to-clipboard";
const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [QCModalState, setQCModalState] = useState(false);
  const [PageNum, setPageNum] = useState(1);
  const [RefereeList, setRefereeList] = useState<any>({});
  const [RefereeInfo, setRefereeInfo] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();

  const getInitData = () => {
    getRefereeList({ address: "", pageNum: PageNum, pageSize: 10 }).then(
      (res: any) => {
        setRefereeList(res?.data || {});
      }
    );
    getRefereeInfo().then((res: any) => {
      setRefereeInfo(res?.data || {});
    });
  };
  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
      setRefereeList({});
      setRefereeInfo({});
    }
  }, [token, PageNum]);
  return (
    <div className="consensus all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="consensus_content">
        <div className="title">社区共识</div>
        <div className="item_box">
          <img src={tag_icon} alt="" />
          <div className="item_box_title">主权性</div>
          <div className="tip">(Community-Owned)</div>
          <div className="item_box_title">货币即人民</div>
          <div className="devider"></div>
          <div className="value">
            <div>
              <span>·全民持股计划：</span>
              80%代币通过100美元认购向全球开放，确保90%用户持有1-1000枚代币。
            </div>
            <div>
              <span>·治理权民主化：</span>
              锁仓量加权投票+人民司法委员会，实现“劳动即投票权”。
            </div>
            <div>
              <span>·财政透明化：</span>
              社区金库收支明细实时上链，任何人可发起审计提案。
            </div>
          </div>
        </div>
        <div className="item_box">
          <img src={tag_icon} alt="" />
          <div className="item_box_title">生产性</div>
          <div className="tip">(Value-Generating)</div>
          <div className="item_box_title">货币即生产资料</div>
          <div className="devider"></div>
          <div className="value">
            <div>
              <span>·劳动资本化：</span>
              内容创作者获得交易费15%分成，节点运营者享受20%网络手续费。
            </div>
            <div>
              <span>·创新激励池：</span>
              每年5%的代币供应量用于资助DAO自治项目。
            </div>
            <div>
              <span>·生产性证明：</span>
              智能合约自动验证价值贡献，虚假申报将面临代市质押惩罚。
            </div>
          </div>
        </div>
        <div className="item_box">
          <img src={tag_icon} alt="" />
          <div className="item_box_title">普惠性</div>
          <div className="tip">(Inclusive)</div>
          <div className="item_box_title">货币即自由</div>
          <div className="devider"></div>
          <div className="value">
            <div>
              <span>·创业基金：</span>
              创业者可获得MONEY贷款+流量扶持。
            </div>
            <div>
              <span>·跨境结算通道：</span>
              例菲律宾渔民可实时收到迪拜客户的MONEY付款教育激励计划:完成区块链课程的用户解锁一定比例学费返还。
            </div>
            <div>
              <span>·智能合约托管服务：</span>不懂代码也能管理资产。
            </div>
          </div>
        </div>
      </div>

      <CodeModal
        ShowTipModal={QCModalState}
        close={() => {
          setQCModalState(false);
        }}
      />
    </div>
  );
};

export default Home;
