export interface ISignupResponse {
  name: string;
  email: string;
  accessToken: string;
  refreshToken?: string;
}

export interface IUser extends ISignupResponse {
  money: number;
}
