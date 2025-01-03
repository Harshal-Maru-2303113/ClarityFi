
interface Category {
    category_id: number;
    name: string;
  }
  
  interface Subcategory {
    subcategory_id: number;
    name: string;
    category_id: number;
  }
  
  const categories: Category[] = [
    { category_id: 7, name: "Communication" },
    { category_id: 9, name: "Financial Expenses" },
    { category_id: 1, name: "Food" },
    { category_id: 3, name: "Housing" },
    { category_id: 8, name: "Internet & Social Media" },
    { category_id: 10, name: "Investments" },
    { category_id: 6, name: "Life & Entertainment" },
    { category_id: 11, name: "Others" },
    { category_id: 2, name: "Shopping" },
    { category_id: 4, name: "Transportation" },
    { category_id: 5, name: "Vehicle" },
  ];
  
  const subcategories: Subcategory[] = [
      { subcategory_id: 1, name: "Groceries", category_id: 1 },
      { subcategory_id: 2, name: "Restaurants", category_id: 1 },
      { subcategory_id: 3, name: "Takeout", category_id: 1 },
      { subcategory_id: 4, name: "Snacks", category_id: 1 },
      { subcategory_id: 5, name: "Beverages", category_id: 1 },
      { subcategory_id: 6, name: "Clothing", category_id: 2 },
      { subcategory_id: 7, name: "Electronics", category_id: 2 },
      { subcategory_id: 8, name: "Home Goods", category_id: 2 },
      { subcategory_id: 9, name: "Beauty & Personal Care", category_id: 2 },
      { subcategory_id: 10, name: "Shoes & Accessories", category_id: 2 },
      { subcategory_id: 11, name: "Gifts", category_id: 2 },
      { subcategory_id: 12, name: "Rent", category_id: 3 },
      { subcategory_id: 13, name: "Mortgage", category_id: 3 },
      { subcategory_id: 14, name: "Property Taxes", category_id: 3 },
      { subcategory_id: 15, name: "Utilities (Electricity, Water)", category_id: 3 },
      { subcategory_id: 16, name: "Maintenance & Repairs", category_id: 3 },
      { subcategory_id: 17, name: "Public Transport", category_id: 4 },
      { subcategory_id: 18, name: "Gas/Fuel", category_id: 4 },
      { subcategory_id: 19, name: "Car Maintenance", category_id: 4 },
      { subcategory_id: 20, name: "Ride Sharing (Uber, Lyft)", category_id: 4 },
      { subcategory_id: 21, name: "Parking Fees", category_id: 4 },
      { subcategory_id: 22, name: "Car Payment", category_id: 5 },
      { subcategory_id: 23, name: "Insurance", category_id: 5 },
      { subcategory_id: 24, name: "Registration", category_id: 5 },
      { subcategory_id: 25, name: "Repairs & Maintenance", category_id: 5 },
      { subcategory_id: 26, name: "Fuel", category_id: 5 },
      { subcategory_id: 27, name: "Movies", category_id: 6 },
      { subcategory_id: 28, name: "Concerts", category_id: 6 },
      { subcategory_id: 29, name: "Sports Events", category_id: 6 },
      { subcategory_id: 30, name: "Hobbies", category_id: 6 },
      { subcategory_id: 31, name: "Fitness & Gym", category_id: 6 },
      { subcategory_id: 32, name: "Subscriptions (Netflix, Spotify)", category_id: 6 },
      { subcategory_id: 33, name: "Phone Bills", category_id: 7 },
      { subcategory_id: 34, name: "Internet Services", category_id: 7 },
      { subcategory_id: 35, name: "Postage & Mailing", category_id: 7 },
      { subcategory_id: 36, name: "Landline Services", category_id: 7 },
      { subcategory_id: 37, name: "Internet Bill", category_id: 8 },
      { subcategory_id: 38, name: "Social Media Advertising", category_id: 8 },
      { subcategory_id: 39, name: "Subscriptions (e.g., Patreon)", category_id: 8 },
      { subcategory_id: 40, name: "Digital Content Purchases", category_id: 8 },
      { subcategory_id: 41, name: "Loan Repayments", category_id: 9 },
      { subcategory_id: 42, name: "Credit Card Payments", category_id: 9 },
      { subcategory_id: 43, name: "Insurance Premiums", category_id: 9 },
      { subcategory_id: 44, name: "Tax Payments", category_id: 9 },
      { subcategory_id: 45, name: "Savings Contributions", category_id: 9 },
      { subcategory_id: 46, name: "Stocks & Bonds", category_id: 10 },
      { subcategory_id: 47, name: "Mutual Funds", category_id: 10 },
      { subcategory_id: 48, name: "Real Estate Investments", category_id: 10 },
      { subcategory_id: 49, name: "Retirement Savings (e.g., 401k, IRA)", category_id: 10 },
      { subcategory_id: 50, name: "Cryptocurrency", category_id: 10 },
      { subcategory_id: 51, name: "Gifts & Donations", category_id: 11 },
      { subcategory_id: 52, name: "Miscellaneous", category_id: 11 },
      { subcategory_id: 53, name: "Charity Contributions", category_id: 11 },
      { subcategory_id: 54, name: "Unexpected Expenses", category_id: 11 }
    ];


export { categories, subcategories };