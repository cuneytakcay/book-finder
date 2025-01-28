export interface IAuth {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
