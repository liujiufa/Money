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
            以全球视野 <br />
            释放资金的最大潜力
          </div>
          <div className="banner_btn pointer">Fair Lanch</div>
        </div>
        <div className="block1">
          <div className="block1_title">
            <img src={block1_icon} alt="" />
            项目概述
          </div>
          <div className="block1_subtitle">从贝壳到算法:货币权力的千年博弈</div>
          <div className="block1_item">
            <div className="block1_item_title">A)文明的货币化进程</div>
            在幼发拉底河畔的考古现场，考古学家出土了公元前3500年的泥板契约--用楔形文字记录的银锭交易协议。
            <br />
            这些刻有古苏美尔神庙纹章的金属片是人类最早的“货币”雏形，也意味着是城邦统治者掌握经济命脉的物化象征。当中国商朝(约前1600年)开始铸造青铜贝币，古希腊城邦发行银币，货币已然超越了交易媒介的本质，成为政治权力的延伸工具。正如货币学家乔治·塞尔金所言:"货币从来不是中性的，它始终是权力的化身。
          </div>
          <div className="block1_item">
            <div className="block1_item_title">B)技术乌托邦的光辉与阴影</div>
            <div className="block1_item_p">
              <span>·比特币白皮书标题“Bitcoin”：</span>A Peer-to-Peer Electronic
              Cash
              System!中，“Peer-to-Peer”三个字母曾点燃无数人的自由梦想。当美联储前主席耶伦称其为“技术创新”，却选择性忽视了其底层设计缺陷。
            </div>
            <div className="block1_item_p">
              <span>·通缩螺旋困境：</span>
              固定2100万枚总量导致每枚BTC价值在飙升稳定在数万美元水平，然而大量的比特币早已流入未开发的休眠地址。
            </div>
            <div className="block1_item_p">
              <span>·能源诅咒：</span>
              比特币网络年耗电量(127太瓦时)一度超过挪威全国用电量(114太瓦时)，相当于每秒燃烧3.4万个家庭供暖锅炉。
            </div>
            <div className="block1_item_p">
              <span>·财富集中悖论：</span>
              2023年加密货币鲸鱼机构(持有10万BTC以上)财富总额达3800亿美元，相当于冰岛全国GDP的12倍。
            </div>
          </div>
          <div className="block1_item">
            <div className="block1_item_title">C)VC阶层的数字殖民</div>
            <div className="block1_item_p">
              当比特币试图用代码取代人类机构的信用背书时，现实证明，资本从未远离权力游戏。2013年Coinbase上市前，风险资本向加密领域注入了28亿美元这些资金如同数字时代的西班牙白银，迅速沉淀为少数机构的垄断资本。
            </div>
          </div>
          <div className="block1_item">
            <div className="block1_item_p">
              <div className="block1_item_p_title">·数据真相：</div>
              根据国际清算银行(BIS)数据，全球外汇市场日交易量突破6.6万亿美元，其中70%以上由跨国银行与对冲基金操控。
              <br />
              在这场"货币战争"中，普通民众的财富在货币贬值浪潮中不断缩水——过去20年，全球通胀率累计达127%，而前1%富豪的财富占比却从1990年的30%攀升至2024年的44%。
            </div>
          </div>
          <img src={block1_img} alt="" />
        </div>
        <div className="block2">
          <div className="block2_title">
            <img src={block1_icon} alt="" />
            加密行业困境与挑战
          </div>
          <div className="block2_item mt133">
            在人类文明的长河中，货币始终是权力的密码。从苏美尔银锭到数字美元，从青铜贝币到比特币矿场，货币权力的博弈从未停歇。
          </div>
          <div className="block2_item">
            当下，加密行业进入临界点，比特币未能打破中心化垄断，反而催生了算力寡头；DeFi流动性挖矿沦为资本游戏，NFT热潮化作投机泡沫。无数的名人meme项目批量归零，散户在血腥的零和博弈中沦为待宰羔羊。
          </div>
          <img src={block2_img} alt="" />
          <div className="block2_item mt133 mb0">
            世界正处于一场前所未有的社会实验的边缘，“Money”的出现将颠覆原有的社会信任和金融框架。这一变革的核心在于，传统的金融体系将面临新的挑战，“Money”不仅仅是一种货币形式，更是一种重新定义信任机制的工具。与此同时，双轨货币体系“由传统国家支持的中央银行货币和比特币等去中心化的加密货币共同组成”将在这一转变中扮演关键角色。这种体系结合了中央权威的稳定性与去中心化技术的灵活性，为未来的经济格局提供了全新的可能性。
          </div>
        </div>

        <div className="block3">
          <div className="block3_title">
            <img src={block1_icon} alt="" />
            MoneyToken的哲学突破
          </div>
          <div className="block3_item mt133">
            <div className="block3_item_title">
              A)解构中心化信用:到底谁来掌管货币?
            </div>
            <div className="block3_item_subtitle">
              传统金融体系建立在“中心化信用”的宗教式崇拜之上:
            </div>
            <div className="block3_item_p">
              <span>·美联储的“神谕”：</span>
              美元霸权本质上是基于美国国债的全球信仰体系，美国国家债务/GDP
              ratio已超过123%，信仰根基正在动摇。
            </div>
            <div className="block3_item_p">
              <span>·银行的“炼金术”：</span>
              通过资产证券化将次级贷款变为“优质资产”2008年金融危机证明这种信用创造不过是空中楼阁。
            </div>
            <img src={block3_img} alt="" />
            <div className="block3_item_p">
              <span>·比特币的“去中心化幻象”：</span>
              虽然代码取代了央行，但70%的算力仍集中在少数矿池，形成了新型的中心化垄断。
            </div>
            <div className="block3_item_p">
              <span>·MoneyToken用“算法即信用”取代"机构即信用"：</span>
              社区共识机制:通过PoF(公平证明)共识，让每个节点的算力贡献直接决定信用权重。
            </div>
            <div className="block3_item_p">
              <span>·动态信用评分：</span>
              基于用户行为数据(如交易频率、节点维护时长)生成可验证的信用画像。
            </div>
            <div className="block3_item_p">
              <span>·反垄断算法：</span>
              链上强制执行“单实体流通量上限防止任何一方操控市场。
            </div>
          </div>
        </div>

        <div className="block4">
          <div className="block4_title">
            <img src={block1_icon} alt="" />
            Money应用场景
          </div>
          {/* <div className="block4_title1">3.2 价值捕获策略</div> */}
          <div className="block4_item">
            <div className="block4_item_title mt133 mb033">
              A)代币在生态内多场景流通
            </div>
            <div className="block4_item_p mb033">
              {" "}
              MoneyToken
              通过丰富的应用场景促进代币高效流通，提升内在价值与市场需求。在支付场景中，用户可使用代币购买商品与服务如在生态内电商平台、服务提供商处直接支付，享受便捷交易体验商家获代而收入，扩大代币使用范围与接受度。
            </div>
            <div className="block4_item_p">
              {" "}
              在质押场景中，用户质押代币给节点或智能合约获收益与权益，同时在项目治理中获投票权与决策权，增强持有价值与市场需求。在治理场景中，代币是社区治理工具，持有者通过投票、提案参与重大决策与发展方向制定，包括但不限于讨论上线新功能、调整分配机制等议题时，代币数量决定投票权重，激励长期持有，关注项目发展，提升价值与影响力。
            </div>
          </div>
          <div className="block4_item mt133">
            <div className="block4_item_title mb033">
              B)支付、质押、治理等应用
            </div>
            <div className="block4_item_p mb033">
              {" "}
              MoneyToken
              积极探索创新应用，拓展代币价值捕获途径。在借贷应用中，用户可抵押代币获贷款，或提供贷款资金获利息收益，促进资金流动与利用效率提升。
            </div>
            <div className="block4_item_p">
              {" "}
              在流动性挖矿应用中，用户为流动性池提供代币流动性获挖矿奖励增加市场流动性与交易深度，吸引更多资金参与，形成良性循环推动生态持续繁荣，不断提升代币价值与市场需求。
            </div>
          </div>
          <img src={block4_img} alt="" />
        </div>
        <div className="block5">
          <div className="block5_title">
            <img src={block1_icon} alt="" />
            极客成员
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor1} alt="" />
              Jeremy Richardson
            </div>
            Jeremy拥有哥伦比亚大学的计算机科学硕士学位。他在大数据分析和机器学习领域有超过8年的经验，尤其擅长复杂数据集的处理。在加入项目之前，他曾在Salesforce担任高级数据科学家，领导多个成功的项目。
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor2} alt="" />
              Nathan Matthews
            </div>
            Nathan在网络安全领域有着20年的实战经验。他拥有麻省理工学院的相关博士学位，曾在Palo
            Alto Networks工作，专注于防火墙和侵入检测系统的研发。
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor3} alt="" />
              Samuel Wright
            </div>
            Samuel是一名资深数据库管理员，对MySQL和PostgreSQL有深厚的技术积累。他从佛罗里达大学获得学位，并曾在Uber的数据团队工作，管理大规模数据基础设施。
          </div>
          <div className="block5_item">
            <div className="block5_item_person">
              <img src={avtor4} alt="" />
              Oliver Peterson
            </div>
            毕业于斯坦福大学的Oliver，是一个资深的全栈开发者，擅长使用React和Node.js创建高性能应用。他曾在Netflix工作，参与多个前端项目的设计和实施。
          </div>
        </div>

        <div className="block6">
          <div className="block6_title">
            <img src={block1_icon} alt="" />
            加入我们
          </div>
          <div className="block6_item">
            <img src={block6_img} alt="" />
            加入我们见证“Money”如何演变并影响全球经济和社会结构。这一过程不仅关乎货币的革新，更关乎权力、信任和社会关系的重塑。无论你是关注金融科技的从业者，还是对社会变革感兴趣的观察者，这场实验都将为你揭示一个前所未有的世界。
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
