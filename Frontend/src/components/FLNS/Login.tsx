import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLoginUser } from "./login/hook";
import { useAuth } from "@/AuthContext";

const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const loginMutation = useLoginUser();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { userName, password },
      {
        onSuccess: (data) => {
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            toast.success("Login Successful!");
            login();
            navigate("/app/home");
          }
        },
        onError: () => {
          setError("Invalid username or password.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left image section */}
      <div className="hidden md:block w-1/2">
        <img
          src="/images/crm1.jpeg"
          alt="Login Illustration"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right login section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 bg-gray-100 dark:bg-gray-950">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Logo and Heading */}
          <div className="text-center mb-6">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="mx-auto h-16 w-16 mb-2"
            />
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please login to your account
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="dark:bg-gray-800 dark:text-white pr-10"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={20} className="text-gray-400" />
                  ) : (
                    <FaEye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
