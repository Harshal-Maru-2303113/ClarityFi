"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "#/components/Navigation";
import { categories,subcategories } from "#/utils/categories";
  

export default function TransactionPage() {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("credit");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission logic
    console.log({
      amount,
      transactionType,
      description,
      categoryId,
      subcategoryId,
    });
    alert("Transaction added successfully!");
    // Reset form
    setAmount("");
    setTransactionType("credit");
    setDescription("");
    setCategoryId("");
    setSubcategoryId("");
  };

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.category_id.toString() === categoryId
  );

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[600px] mx-auto"
      >
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Add New Transaction
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Transaction Type</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Subcategory</label>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select a subcategory</option>
                {filteredSubcategories.map((sub) => (
                  <option key={sub.subcategory_id} value={sub.subcategory_id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-4 py-3 font-semibold hover:opacity-90 transition"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
