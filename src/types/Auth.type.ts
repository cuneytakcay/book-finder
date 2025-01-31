export interface IAuth {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  status: {
    success: boolean;
    message: string | null;
  };
  errors: IError[];
  user: IAuthorizedUser | null;
}

export interface IError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IAuthorizedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
