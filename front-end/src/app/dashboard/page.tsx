"use client";

import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiCreditCard,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import Navigation from "#/components/Navigation";
import Link from "next/link";
import api from "#/utils/axios";

export default function Dashboard() {
 
  return (
    <div className="flex">
      <Navigation />
      <div className="flex-1 md:ml-64 p-4">
        <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[1400px] mx-auto"
          >
            <div className="bg-gray-900 rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Financial Overview
                </h1>
                <Link href={"/addtransactions"}>
                <button 
                 className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition">
                  + New Transaction
                </button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  {
                    title: "Total Balance",
                    amount: "$24,500",
                    icon: <FiDollarSign size={24} />,
                  },
                  {
                    title: "Monthly Income",
                    amount: "$8,340",
                    icon: <FiTrendingUp size={24} />,
                  },
                  {
                    title: "Total Expenses",
                    amount: "$3,800",
                    icon: <FiCreditCard size={24} />,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm md:text-base">
                          {stat.title}
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-white">
                          {stat.amount}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                {/* Chart Section */}
                <div className="xl:col-span-2 bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-700">
                  <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
                    Spending Analytics
                  </h2>
                  <div className="h-48 md:h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <FiPieChart size={48} className="text-gray-600" />
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-700">
                  <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
                    Recent Transactions
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Grocery Shopping",
                        amount: "-$150",
                        type: "expense",
                      },
                      {
                        name: "Salary Deposit",
                        amount: "+$3,000",
                        type: "income",
                      },
                      { name: "Netflix", amount: "-$15", type: "expense" },
                    ].map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 md:p-3 hover:bg-gray-700/50 rounded-lg transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              transaction.type === "income"
                                ? "bg-green-500/10"
                                : "bg-red-500/10"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <FiArrowUp className="text-green-500" />
                            ) : (
                              <FiArrowDown className="text-red-500" />
                            )}
                          </div>
                          <span className="text-white text-sm md:text-base">
                            {transaction.name}
                          </span>
                        </div>
                        <span
                          className={`font-semibold text-sm md:text-base ${
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

}