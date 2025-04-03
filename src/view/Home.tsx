import React, { useEffect, useState } from "react";
import HeaderBox from "../components/HeaderBox";
import { Carousel } from "antd";
import "../assets/style/Home.scss";
import { useNavigate } from "react-router-dom";
import CodeModal from "../components/CodeModal";
import { useSelector } from "react-redux";
import { getRefereeInfo, getRefereeList } from "../API";
import { AddrHandle, addMessage, dateFormat } from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import { useTranslation } from "react-i18next";
import block1_icon from "../assets/image/Home/block1_icon.png";
import block1_img from "../assets/image/Home/block1_img.png";
import block2_img from "../assets/image/Home/block2_img.png";
import block3_img from "../assets/image/Home/block3_img.png";
import block4_img from "../assets/image/Home/block4_img.png";
import avtor1 from "../assets/image/Home/avtor1.png";
import avtor2 from "../assets/image/Home/avtor2.png";
import avtor3 from "../assets/image/Home/avtor3.png";
import avtor4 from "../assets/image/Home/avtor4.png";
import block6_img from "../assets/image/Home/block6_img.png";
import copy from "copy-to-clipboard";
import tw from "../assets/image/layout/tw.png";
import tg from "../assets/image/layout/tg.png";
import doc from "../assets/image/layout/doc.png";
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
    <div className="home all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="home_content">
        <div className="banner">
          <div className="banner_title">
            {t("以全球视野")} <br />
            {t("释放Money的最大潜力")}
          </div>
          <div
            className="banner_btn pointer"
            onClick={() => {
              Navigate("/View/IDO");
            }}
          >
            Fair Launch
          </div>
        </div>

        <div className="links">
          <img
            src={tw}
            alt=""
            onClick={() => {
              window.open("https://x.com/moneytokennet");
            }}
          />
          <img
            src={tg}
            alt=""
            onClick={() => {
              window.open("https://t.me/moneytokennet");
            }}
          />
          <img
            src={doc}
            alt=""
            onClick={() => {
              window.open("./MoneyToken.pdf");
            }}
          />
        </div>
        <div className="block1">
          <div className="block1_title">
            <img src={block1_icon} alt="" />
            {t("项目概述")}
          </div>
          <div className="block1_subtitle">
            {t("从贝壳到算法货币权力的千年博弈")}
          </div>
          <div className="block1_item">
            <div className="block1_item_title">{t("A)文明的货币化进程")}</div>
            {t(
              "在幼发拉底河畔的考古现场，考古学家出土了公元前3500年的泥板契约--用楔形文字记录的银锭交易协议。"
            )}
            <br />
            {t("这些刻")}
          </div>
          <div className="block1_item">
            <div className="block1_item_title">
              {t("B)技术乌托邦的光辉与阴影")}
            </div>
            <div className="block1_item_p">
              <span>{t("·比特币白皮书标题“Bitcoin”")}：</span>
              {t("A Peer-to-Peer Electronic")}
            </div>
            <div className="block1_item_p">
              <span>{t("·通缩螺旋困境")}：</span>
              {t(
                "固定2100万枚总量导致每枚BTC价值在飙升稳定在数万美元水平，然而大量的比特币早已流入未开发的休眠地址。"
              )}
            </div>
            <div className="block1_item_p">
              <span>{t("·能源诅咒")}：</span>
              {t(
                "比特币网络年耗电量(127太瓦时)一度超过挪威全国用电量(114太瓦时)，相当于每秒燃烧3.4万个家庭供暖锅炉。"
              )}
            </div>
            <div className="block1_item_p">
              <span>{t("·财富集中悖论")}：</span>
              {t(
                "2023年加密货币鲸鱼机构(持有10万BTC以上)财富总额达3800亿美元，相当于冰岛全国GDP的12倍。"
              )}
            </div>
          </div>
          <div className="block1_item">
            <div className="block1_item_title">{t("C)VC阶层的数字殖民")}</div>
            <div className="block1_item_p">{t("当比特币试图")}</div>
          </div>
          <div className="block1_item">
            <div className="block1_item_p">
              <div className="block1_item_p_title">{t("·数据真相")}：</div>
              {t("根据国际清算")}
              <br />
              {t("在这场'货币战争'中")}
            </div>
          </div>
          <img src={block1_img} alt="" />
        </div>
        <div className="block2">
          <div className="block2_title">
            <img src={block1_icon} alt="" />
            {t("加密行业困境与挑战")}
          </div>
          <div className="block2_item mt133">
            {t(
              "在人类文明的长河中，货币始终是权力的密码。从苏美尔银锭到数字美元，从青铜贝币到比特币矿场，货币权力的博弈从未停歇。"
            )}
          </div>
          <div className="block2_item">{t("当下，加密行业进入临界点")}</div>
          <img src={block2_img} alt="" />
          <div className="block2_item mt133 mb0">
            {t("世界正处于一场前所未有的社会实验的边缘")}
          </div>
        </div>

        <div className="block3">
          <div className="block3_title">
            <img src={block1_icon} alt="" />
            {t("MoneyToken的哲学突破")}
          </div>
          <div className="block3_item mt133">
            <div className="block3_item_title">
              {t("A)解构中心化信用:到底谁来掌管货币?")}
            </div>
            <div className="block3_item_subtitle">
              {t("传统金融体系建立在“中心化信用”的宗教式崇拜之上:")}
            </div>
            <div className="block3_item_p">
              <span>{t("·美联储的“神谕”")}：</span>
              {t("美元霸权本质上")}
            </div>
            <div className="block3_item_p">
              <span>{t("·银行的“炼金术”")}：</span>
              {t(
                "通过资产证券化将次级贷款变为“优质资产”2008年金融危机证明这种信用创造不过是空中楼阁。"
              )}
            </div>
            <img src={block3_img} alt="" />
            <div className="block3_item_p">
              <span>{t("·比特币的“去中心化幻象”")}：</span>
              {t(
                "虽然代码取代了央行，但70%的算力仍集中在少数矿池，形成了新型的中心化垄断。"
              )}
            </div>
            <div className="block3_item_p">
              <span>{t("·MoneyToken用“算法即信用”取代'机构即信用'")}：</span>
              {t(
                "社区共识机制:通过PoF(公平证明)共识，让每个节点的算力贡献直接决定信用权重。"
              )}
            </div>
            <div className="block3_item_p">
              <span>{t("·动态信用评分")}：</span>
              {t(
                "基于用户行为数据(如交易频率、节点维护时长)生成可验证的信用画像。"
              )}
            </div>
            <div className="block3_item_p">
              <span>{t("·反垄断算法")}：</span>
              {t("链上强制执行“单实体流通量上限防止任何一方操控市场。")}
            </div>
          </div>
        </div>

        <div className="block4">
          <div className="block4_title">
            <img src={block1_icon} alt="" />
            {t("Money应用场景")}
          </div>
          {/* <div className="block4_title1">3.2 价值捕获策略</div> */}
          <div className="block4_item">
            <div className="block4_item_title mt133 mb033">
              {t("A)代币在生态内多场景流通")}
            </div>
            <div className="block4_item_p mb033">
              {" "}
              {t("MoneyToken通过丰富")}
            </div>
            <div className="block4_item_p"> {t("在质押场景中")}</div>
          </div>
          <div className="block4_item mt133">
            <div className="block4_item_title mb033">
              {t("B)支付、质押、治理等应用")}
            </div>
            <div className="block4_item_p mb033"> {t("home3")}</div>
            <div className="block4_item_p"> {t("home4")}</div>
          </div>
          <img src={block4_img} alt="" />
        </div>
        <div className="block5">
          <div className="block5_title">
            <img src={block1_icon} alt="" />
            {t("home5")}
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor1} alt="" />
              Jeremy Richardson
            </div>
            {t("home6")}
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor2} alt="" />
              Nathan Matthews
            </div>
            {t("home7")}
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor3} alt="" />
              Samuel Wright
            </div>
            {t("home8")}
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor4} alt="" />
              Oliver Peterson
            </div>
            {t("home9")}
          </div>
        </div>

        <div className="block6">
          <div className="block6_title">
            <img src={block1_icon} alt="" />
            {t("home10")}
          </div>
          <div className="block6_item">
            <img src={block6_img} alt="" />
            {t("home11")}
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
