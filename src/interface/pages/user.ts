export interface IUserRegister {
  name: string;
  email: string;
  dateBirthday: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

export interface IUserResgisterResponse {
  message: string;
  response: {
    token: string;
    id: string;
    email: string;
    name: string;
  }
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  message: string;
  response: {
    token: string;
    id: string;
    email: string;
    name: string;
  }
}

export interface IUserData {
  name: string;
  email: string;
  age: number;
  gender: string;
  dateBirthday: string;
}

export interface IUserDataResponse {
  message: string;
  response: IUserData;
}