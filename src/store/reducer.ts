import {
  LOGINSUCCESS,
  reducerParameterType,
  message,
  ADDMESSAGE,
  DELMESSAGE,
  SETLODING,
  SAVEPRICE,
  SETISBIND,
} from "./actions";
//初始值接口
export interface stateType {
  address: string;
  message: Array<message>;
  token: string;
  qbToken: string;
  price: string;
  showLoding: Boolean;
  isBind: Boolean;
}
//初始值
const initialState: stateType = {
  address: "",
  message: [],
  token: "",
  qbToken: "",
  showLoding: false,
  isBind: false,
  price: "",
};
let reducer = (state = initialState, action: reducerParameterType) => {
  switch (action.type) {
    //登录成功保存地址和token
    case LOGINSUCCESS:
      return { ...state, ...action.value };
    case SAVEPRICE:
      return { ...state, price: action.value };
    case ADDMESSAGE:
      return { ...state, message: [...state.message, action.value] };
    case DELMESSAGE:
      return {
        ...state,
        message: state.message.filter((item) => {
          return item.index !== action.value;
        }),
      };
    case SETLODING:
      return { ...state, showLoding: action.value };
    case SETISBIND:
      return { ...state, isBind: action.value };
    default:
      return state;
  }
};

export default reducer;
