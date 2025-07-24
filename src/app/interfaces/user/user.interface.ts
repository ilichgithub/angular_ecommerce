
export interface IUser {
  username: string;
  password: string;
}

export interface IUserResponse extends IUser {
  refreshToken: string;
  accessToken: string;
  message: string;
}