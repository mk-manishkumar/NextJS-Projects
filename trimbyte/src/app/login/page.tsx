"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type LoginFormData = {
  identifier: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ identifier: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const identifier = formData.identifier.trim();
    const password = formData.password;

    if (!identifier || !password) {
      toast.error("All fields are required");
      return;
    }

    const result = await signIn("credentials", { redirect: false, identifier, password });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Logged in successfully!");
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  return (
    <div className="p-5">
      <div className="container max-w-[1200px] mx-auto">
        {/* Login Card */}
        <div className="bg-white rounded-[20px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-[650px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2.5 text-[#333]">Welcome Back</h2>
          <p className="hidden sm:block text-center text-[#666] mb-[30px]">Sign in to access your account</p>

          {/* FORM START */}
          <form onSubmit={handleSubmit}>
            <div className="mb-5 mt-8 sm:mt-0">
              <label htmlFor="identifier" className="block mb-2 font-semibold text-[#333]">
                Email or Username
              </label>
              <input id="identifier" name="identifier" type="text" placeholder="Enter email or username" value={formData.identifier} onChange={handleChange} className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300" required />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 font-semibold text-[#333]">
                Password
              </label>
              <input id="password" name="password" value={formData.password} onChange={handleChange} type="password" className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300" placeholder="Enter password" required />
            </div>

            {/* Forgot Password */}
            <div className="mb-5 text-right">
              <Link href="/forgot-password" className="text-[#667eea] font-semibold text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="w-full py-3 sm:py-4 px-2 sm:px-10 bg-linear-to-br from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold text-base hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)] transition-all duration-300 border-none cursor-pointer">
              Sign In
            </button>
          </form>
          {/* FORM END */}

          {/* Google Button */}
          <button type="button" className="w-full py-3 sm:py-4 px-2 sm:px-10 bg-[#EA4335] sm:bg-white text-white sm:text-[#333] rounded-xl font-semibold text-sm sm:text-base hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all duration-300 border-2 border-[#e0e0e0] cursor-pointer mt-3 flex items-center justify-center gap-3">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:inline-block">
              <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z" fill="#4285F4" />
              <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853" />
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05" />
              <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="text-center mt-5 text-[#666]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#667eea] font-semibold no-underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
