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
import money_logo from "../assets/image/Home/money_logo.png";
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
    <div className="home all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="home_content">
        <div className="title">
          Money Coin
          <br />
          来源PART 3
        </div>
        <div className="swiperBox">
          <Carousel
            autoplay={{ dotDuration: true }}
            autoplaySpeed={3000}
            draggable={true}
          >
            <div>
              <div className="box1">
                <img src={money_logo} alt="" className="coin_logo" />
                <div className="coin_name">Money coin</div>
                <div className="title1">从贝壳到算法:货币权力的千年博弈</div>
                <div className="title2">A)文明的货币化进程</div>
                <div className="text1">
                  在幼发拉底河畔的考古现场，考古学家出土了公元前3500年的泥板契约--用楔形文字记录的银锭交易协议。
                  这些刻有古苏美尔神庙纹章的金属片是人类最早的“货币”雏形，也意味着是城邦统治者掌握经济命脉的物化象征。当中国商朝(约前1600年)开始铸造青铜贝币，古希腊城邦发行银币，货币已然超越了交易媒介的本质，成为政治权力的延伸工具。正如货币学家乔治·塞尔金所言:"货币从来不是中性的，它始终是权力的化身。
                </div>
                <div className="text2">
                  <span>·数据真相：</span>
                  根据国际清算银行(BIS)数据，全球外汇市场日交易量突破6.6万亿美元，其中70%以上由跨国银行与对冲基金操控。
                </div>
                <div className="text3">
                  在这场"货币战争"中，普通民众的财富在货币贬值浪潮中不断缩水--过去20年，全球通胀率累计达127%，而前1%富豪的财富占比却从1990年的30%攀升至2024年的44%。
                </div>
              </div>
            </div>
            <div>
              <div className="box1">
                <img src={money_logo} alt="" className="coin_logo" />
                <div className="coin_name">Money coin</div>
                <div className="title1">从贝壳到算法:货币权力的千年博弈</div>
                <div className="title2">B)技术乌托邦的光辉与阴影</div>

                <div className="text2" style={{ margin: " 0px 0px 0.67rem" }}>
                  <span>·比特币白皮书标题"Bitcoin"：</span>A Peer-to-Peer
                  Electronic Cash
                  System!中，“Peer-to-Peer”三个字母曾点燃无数人的自由梦想。当美联储前主席耶伦称其为“技术创新”，却选择性忽视了其底层设计缺陷。
                </div>
                <div className="text2" style={{ margin: " 0px 0px 0.67rem" }}>
                  <span>·通缩螺旋困境：</span>
                  固定2100万枚总量导致每枚BTC价值在飙升稳定在数万美元水平，然而大量的比特币早已流入未开发的休眠地址。
                </div>
                <div className="text2" style={{ margin: " 0px 0px 0.67rem" }}>
                  <span>·能源诅咒：</span>
                  比特币网络年耗电量(127太瓦时)一度超过挪威全国用电量(114太瓦时)，相当于每秒燃烧3.4万个家庭供暖锅炉。
                </div>
                <div className="text2" style={{ margin: " 0px" }}>
                  <span>·财富集中悖论：</span>
                  2023年加密货币鲸鱼机构(持有10万BTC以上)财富总额达3800亿美元，相当于冰岛全国GDP的12倍。
                </div>
              </div>
            </div>
            <div>
              <div className="box1">
                <img src={money_logo} alt="" className="coin_logo" />
                <div className="coin_name">Money coin</div>
                <div className="title1">从贝壳到算法:货币权力的千年博弈</div>
                <div className="title2">C)VC阶层的数字殖民</div>
                <div className="text1">
                  当比特币试图用代码取代人类机构的信用背书时，现实证明，资本从未远离权力游戏。2013年Coinbase上市前，风险资本向加密领域注入了28亿美元这些资金如同数字时代的西班牙白银，迅速沉淀为少数机构的垄断资本。
                </div>
                <div className="text3" style={{ margin: "1.33rem 0px" }}>
                  MoneyToken用"算法即信用"取代"机构即信用":
                </div>
                <div className="text2" style={{ margin: " 0px 0px 0.67rem" }}>
                  <span>·社区共识机制：</span>
                  通过PoF(公平证明)共识，让每个节点的算力贡献直接决定信用权重。
                </div>
                <div className="text2" style={{ margin: " 0px 0px 0.67rem" }}>
                  <span>·动态信用评分：</span>
                  基于用户行为数据(如交易频率、节点维护时长)生成可验证的信用画像。
                </div>
                <div className="text2" style={{ margin: " 0px 0px 0.67rem" }}>
                  <span>·反垄断算法：</span>
                  链上强制执行“单实体流通量上限”，防止任何一方操控市场。
                </div>
              </div>
            </div>
          </Carousel>
        </div>
        <div className="title title1">MoneyToken的哲学突破</div>

        <div className="swiperBox">
          <div>
            <div className="box1">
              <img src={core_icon} alt="" className="coin_logo" />
              <div className="coin_name">Core value</div>
              <div className="title1">解构中心化信用:到底谁来掌管货币?</div>
              <div className="title2 title2_text_left">
                传统金融体系建立在"中心化信用"的宗教式崇拜之上:
              </div>
              <div className="text2">
                <span>·美联储的“神谕”：</span>
                美元霸权本质上是基于美国国债的全球信仰体系，美国国家债务/GDP
                ratio已超过123%，信仰根基正在动摇;银行的“炼金术”:通过资产证券化将次级贷款变为“优质资产”2008年金融危机证明这种信用创造不过是空中楼阁。
              </div>
              <div className="text2">
                <span>·比特币的“去中心化幻象”：</span>
                虽然代码取代了央行，但70%的算力仍集中在少数矿池，形成了新型的中心化垄断。
              </div>
              <div className="text2">
                <span>
                  ·MoneyToken用"算法即信用"取代"机构即信用"社区共识机制"：
                </span>
                通过PoF(公平证明)共识，让每个节点的算力贡献直接决定信用权重。
              </div>
              <div className="text2">
                <span>·动态信用评分：</span>
                基于用户行为数据(如交易频率、节点维护时长)生成可验证的信用画像。
              </div>
              <div className="text2">
                <span>·反垄断算法：</span>
                链上强制执行“单实体流通量上限”防止任何一方操控市场。
              </div>
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
