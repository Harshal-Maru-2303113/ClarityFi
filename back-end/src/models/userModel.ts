interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  age:string;
  gender:string;
  photUrl:string;
  isVerified: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface OTPRecord {
  email: string;
  otp: string;
  expiresAt: Date;
}

export { User, OTPRecord };
