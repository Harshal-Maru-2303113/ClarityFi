"use client";

import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiArrowUp,
  FiArrowDown,
  FiCalendar,
  FiFilter,
} from "react-icons/fi";
import Navigation from "#/components/Navigation";

export default function TransactionsPage() {
  const transactions = [
    {
      id: 1,
      name: "Salary Deposit",
      amount: 5000,
      type: "income",
      date: "2024-01-15",
      category: "Salary",
    },
    {
      id: 2,
      name: "Rent Payment",
      amount: 1200,
      type: "expense",
      date: "2024-01-01",
      category: "Housing",
    },
    {
      id: 3,
      name: "Grocery Shopping",
      amount: 150,
      type: "expense",
      date: "2024-01-10",
      category: "Food",
    },
    {
      id: 4,
      name: "Freelance Work",
      amount: 800,
      type: "income",
      date: "2024-01-08",
      category: "Side Hustle",
    },
  ];

  return (
    <div className="flex">
      <Navigation />
      <div className="flex-1 md:ml-64 p-4">
        <div className="p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[1400px] mx-auto"
          >
            <div className="bg-gray-900 rounded-2xl shadow-xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Transactions
                </h1>
                <div className="flex gap-3">
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                    <FiFilter className="inline mr-2" />
                    Filter
                  </button>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                    + New Transaction
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-800">
                      <th className="py-4 px-4 text-left">Date</th>
                      <th className="py-4 px-4 text-left">Name</th>
                      <th className="py-4 px-4 text-left">Category</th>
                      <th className="py-4 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition-all"
                      >
                        <td className="py-4 px-4 text-gray-300">
                          <FiCalendar className="inline mr-2" />
                          {transaction.date}
                        </td>
                        <td className="py-4 px-4 text-white">
                          {transaction.name}
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {transaction.category}
                        </td>
                        <td
                          className={`py-4 px-4 text-right font-semibold ${
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}$
                          {transaction.amount}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
