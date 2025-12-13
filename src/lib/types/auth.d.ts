export type LoginResponse = {
  token?: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "user" | "admin" | string;
    isVerified: boolean;
    createdAt: string;
    passwordResetCode?: string | null;
    passwordResetExpires?: string | null;
    resetCodeVerified?: boolean;
    passwordChangedAt?: string | null;
  };
};

export type SignUpResponse = {
  message: string;
  token: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "user" | "admin" | string;
    isVerified: boolean;
    _id: string;
    createdAt: string;
  };
};

export type LoginFields = {
  email: string;
  password: string;
};

type verificationApiFailed = {
  code: number;
  message: string;
};

export type verificationApi = verificationApiFailed | void;
