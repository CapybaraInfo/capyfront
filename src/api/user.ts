import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    avatar: string;
    username: string;
    nickname: string;
    roles: Array<string>;
    accessToken: string;
    refreshToken: string;
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expires: Date;
  };
};

export type TokenResponse = {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly userData: UserData;
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

export const getLogin = async (data?: object): Promise<UserResult> => {
  const result = await http.request<TokenResponse>("post", "/api/login", {
    data
  });
  let jsonData = JSON.parse(atob(result.accessToken.split(".")[1]));
  let exp = jsonData.exp;
  return {
    success: true,
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expires: new Date(exp * 1000),
      username: result.userData.username,
      nickname: result.userData.fullName,
      roles: [result.userData.authority],
      avatar: ""
    }
  };
};

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
