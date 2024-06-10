import { http } from "@/utils/http";

export type UserResult = {
  success: boolean; data: {
    /** 头像 */
    avatar: string; /** 用户名 */
    username: string; /** 昵称 */
    nickname: string; /** 当前登录用户的角色 */
    roles: Array<string>; /** `token` */
    accessToken: string; /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string; /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean; data: {
    /** `token` */
    accessToken: string; /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string; /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type TokenResponse = {
  readonly acessToken: string; readonly refreshToken: string; readonly userData: UserData;
};

export type UserData = {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly authority: Role;
  readonly username: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export enum Role {
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
  STAFF = "STAFF"
}

/** 登录 */
export const getLogin = async (data?: object): Promise<UserResult> => {
  const result = await http.request<TokenResponse>("post", "/api/login", {
    data
  });
  let jsonData = JSON.parse(atob(result.acessToken.split(".")[1]));
  let exp =  jsonData.exp;
  return {
    success: true,
    data: {
      accessToken: result.acessToken,
      refreshToken: result.refreshToken,
      expires: new Date(exp * 1000),
      username: result.userData.username,
      nickname: result.userData.fullName,
      roles: [result.userData.authority],
      avatar: ""
    }
  };
};

/** 刷新`token` */
export const refreshTokenApi = async (data?: {
  refreshToken: string;
}): Promise<RefreshTokenResult> => {
  const result = await http.request<RefreshTokenResponse>(
    "get",
    `/api/login/refresh-token/${data.refreshToken}`
  );
  let jsonData = JSON.parse(atob(result.refreshToken.split(".")[1]));
  let exp = jsonData.exp;
  return {
    success: true,
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expires: new Date(exp * 1000)
    }
  };
};
