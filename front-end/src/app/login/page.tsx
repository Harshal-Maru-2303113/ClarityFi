'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const cleanedValue = value.replace(/\s/g, '')
    setFormData(prev => ({
      ...prev,
      [name]: cleanedValue
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your login logic here
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-2xl shadow-xl p-8 space-y-8"
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <div className="space-y-6">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-12 py-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-3 font-semibold hover:opacity-90 transition transform hover:scale-[1.01]"
          >
            Login
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  )
}