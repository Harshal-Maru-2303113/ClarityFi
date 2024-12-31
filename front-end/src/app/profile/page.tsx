"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiLogOut, FiUser, FiSave, FiX } from "react-icons/fi";
import Image from "next/image";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);
  const [ageError, setAgeError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "john.doe@example.com",
    age: "",
    gender: "",
    photoUrl: "/default-avatar.png",
  });
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  const handlePhotoClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    } else {
      setShowEnlargedImage(true);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPhoto(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, photoUrl: imageUrl }));
    }
  };

  // Update the handleInputChange function
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "username") {
      const cleanedValue = value.replace(/\s/g, "");
      setProfileData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else if (name === "age") {
      setProfileData((prev) => ({ ...prev, age: value }));
      const ageValue = parseInt(value);
      if (value && (ageValue < 16 || ageValue > 150)) {
        setAgeError("Age must be between 16 and 150");
      } else {
        setAgeError("");
      }
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (ageError) {
      alert("Please fix the age error before saving");
      return;
    }
    setIsEditing(false);
    // Add your save logic here
  };

  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Profile
            </h1>
            <div className="group relative">
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FiLogOut size={24} />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition">
                Logout
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div
                className={`w-32 h-32 rounded-full overflow-hidden ${
                  isEditing ? "cursor-pointer" : ""
                } border-4 border-blue-500/30 hover:border-blue-500/50 transition`}
                onClick={handlePhotoClick}
              >
                <Image
                  src={profileData.photoUrl}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition"
            >
              {isEditing ? (
                <>
                  <FiSave size={20} />
                  Save Changes
                </>
              ) : (
                <>
                  <FiEdit2 size={20} />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-400 text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 text-sm">Email</label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 opacity-50 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Age</label>
                <input
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full bg-gray-800 text-white rounded-lg px-4 py-3 border ${
                    ageError ? "border-red-500" : "border-gray-700"
                  } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition disabled:opacity-50`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Gender</label>
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition disabled:opacity-50"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
            </div>
            {ageError && (
              <p className="text-red-500 text-sm mt-1">{ageError}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Enlarged Image Modal */}
      <AnimatePresence>
        {showEnlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEnlargedImage(false)}
          >
            <div className="relative max-w-2xl w-full">
              <button
                onClick={() => setShowEnlargedImage(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <FiX size={24} />
              </button>
              <Image
                src={profileData.photoUrl}
                alt="Profile"
                width={600}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}