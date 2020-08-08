export interface User {
  userID: number;
  role: number;
  nick: string;
  avatar: string;
  birthday: number;
  age: number;
  gender: number;
  level: number;
  isgold: number;
  identityTitle?: any;
  identityColor: number;
  needSetPassword: number;
  needSetUserInfo: number;
}

export interface UserAPI {
  msg: string;
  _key: string;
  user: User;
  session_key: string;
  status: number;
}