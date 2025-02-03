export interface IAuth {
  user: IAuthanticatedUser | null;
  isLoading: boolean;
  error: string | null;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IAuthanticatedUser {
  token: string;
  message: string;
  email: string;
}
