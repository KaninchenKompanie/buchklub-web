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

export type Token = {
  access_token: string;
};

export type TokenDataDto = {
  access_token: Token;
  refresh_token: Token;
};

export type TokenContent = {
  id: number;
  name: string;
};
