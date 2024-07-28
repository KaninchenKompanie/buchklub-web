export type User = {
  name: string;
};

export type UserLogin = {
  name: string;
  password: string;
};

export type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export type TokenDataDto = {
  access_token: string;
  refresh_token: string;
};
