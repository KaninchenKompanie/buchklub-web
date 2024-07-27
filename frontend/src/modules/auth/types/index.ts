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
