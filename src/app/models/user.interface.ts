export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verificationToken: string;
  isVerified: boolean;
  __v: number;
  verified: string;
}
