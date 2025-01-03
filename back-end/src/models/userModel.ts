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

interface Subcategory {
  subcategory_id?: number; // Primary key, optional for creation
  subcategory_name: string; // Name of the subcategory
}

interface Transaction {
  transaction_id: number;
  email: string;
  date_time: string;
  amount: string;
  transaction_type: string;
  description: string;
  subcategory_id: number;
  balance: string;
  subcategory_name: string;
  category_id: number;
  category_name: string;
}


export { User, OTPRecord,Transaction };
