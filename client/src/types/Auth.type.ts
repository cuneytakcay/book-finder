export interface IAuth {
  token: string | null;
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
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  library: ILibraryItem[];
}

export interface ILibraryItem {
  bookId: string;
  selectedOption: string;
}
