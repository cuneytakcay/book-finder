export interface IAuth {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  status: {
    success: boolean;
    message: string | null;
  };
  user: IAuthorizedUser | null;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IAuthorizedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
