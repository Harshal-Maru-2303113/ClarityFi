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
  transaction_id?: number; // Primary key, optional for creation
  date_time: Date; // Date and time of the transaction
  amount: number; // Transaction amount
  transaction_type: 'credit' | 'debit'; // Transaction type
  description?: string; // Optional description
  subcategory_id: number; // Foreign key referencing `subcategory_id`
  balance?: number; // Optional balance after the transaction
}


export { User, OTPRecord };
