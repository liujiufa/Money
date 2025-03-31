import axois from "../utils/axiosExport";
interface LoginData {
  password: string;
  refereeUserAddress: string;
  userAddress: string;
  userPower: number;
}

export function Login(data: any) {
  return axois.request({
    url: "/user/login",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function signBindReferee(data: any) {
  return axois.request({
    url: "/user/signBindReferee",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
/* 判断上级地址是否有效 */
export function isRefereeAddress(data: any) {
  return axois.request({
    url: `/user/isRefereeAddress`,
    method: "post",
    data: {
      ...data,
    },
  });
}

export function receive(data: LoginData) {
  return axois.request({
    url: "/user/isRefereeAddress/{address}",
    method: "post",
    data: {
      ...data,
    },
  });
}
export function checkAddress(inviteCode: string) {
  return axois.request({
    url: `/user/checkAddress/${inviteCode}`,
    method: "get",
  });
}
export function isNewUser(userAddress: string) {
  return axois.request({
    url: `/user/isNewUser/${userAddress}`,
    method: "get",
  });
}
export function getProductOff() {
  return axois.request({
    url: `/product/getProductOff`,
    method: "get",
  });
}
export function getNftBase() {
  return axois.request({
    url: `/nft/getNftBase`,
    method: "get",
  });
}
export function drawAward(data: any) {
  return axois.request({
    url: `/mine/draw`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function getDrawData() {
  return axois.request({
    url: `/user/getDrawData`,
    method: "get",
  });
}
export function getUserInfo() {
  return axois.request({
    url: `/user/getUserInfo`,
    method: "get",
  });
}
export function getRefereeInfo() {
  return axois.request({
    url: `/user/getRefereeInfo`,
    method: "get",
  });
}
export function getRefereeList(data: any) {
  return axois.request({
    url: `/user/getRefereeList`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function draw(data: any) {
  return axois.request({
    url: `/pledge/draw`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function checkAddressLogin(address: any) {
  return axois.request({
    url: `/user/checkAddressLogin/${address}`,
    method: "get",
  });
}
export function getUserAccountList() {
  return axois.request({
    url: `/user/getUserAccountList`,
    method: "get",
  });
}
export function getPriceInfo() {
  return axois.request({
    url: `/user/getPriceInfo`,
    method: "get",
  });
}
export function getAllLuckRecord() {
  return axois.request({
    url: `/luck/getAllLuckRecord`,
    method: "get",
  });
}
export function getLuckNum() {
  return axois.request({
    url: `/luck/getLuckNum`,
    method: "get",
  });
}
export function getLuckResult() {
  return axois.request({
    url: `/luck/getLuckResult`,
    method: "get",
  });
}
export function cleanUseRecord(dataId: any) {
  return axois.request({
    url: `/ai/cleanUseRecord/${dataId}`,
    method: "get",
  });
}

export function exchangeLuck(data: any) {
  return axois.request({
    url: `/luck/exchangeLuck`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function luck(data: any) {
  return axois.request({
    url: `/luck/luck`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function getUserLuckRecord(data: any) {
  return axois.request({
    url: `/luck/getUserLuckRecord`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function getScoreUseRecord(data: any) {
  return axois.request({
    url: `/luck/getScoreUseRecord`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function FunAi(data: any) {
  return axois.request({
    url: `/ai/useAi`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function drawPledge(data: any) {
  return axois.request({
    url: `/pledge/drawPledge`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function getHistoryPledgeOrder(data: any) {
  return axois.request({
    url: `/pledge/getHistoryPledgeOrder`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function getPledgeEarnRecord(data: any) {
  return axois.request({
    url: `/pledge/getPledgeEarnRecord`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function getAiList() {
  return axois.request({
    url: `/ai/getAiList`,
    method: "get",
  });
}
export function getPledgeBaseList() {
  return axois.request({
    url: `/pledge/getPledgeBaseList`,
    method: "get",
  });
}
export function getAiUseRecord(dataId: any) {
  return axois.request({
    url: `/ai/getAiUseRecord/${dataId}`,
    method: "get",
  });
}
