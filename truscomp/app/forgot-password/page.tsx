"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import { CompanyLogo } from "@/components/ui/company-logo";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/forget-password", {
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email");
      } else {
        toast.error(response.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Branding - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-base-50">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-xl space-y-8 z-10 transition-all">
            <CompanyLogo width={160} height={80} className="mb-8" />
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-base-900 leading-[1.15]">
              Account Recovery Simplified
            </h1>
            <p className="text-lg text-base-600 leading-relaxed">
              We'll help you get back to managing your compliance needs securely
              and quickly.
            </p>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-primary-50/50 blur-3xl" />
            <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex mb-8">
            <CompanyLogo width={128} height={48} />
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-base-600 hover:text-primary-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-base-900">
                  Forgot password?
                </h2>
                <p className="text-base-500">
                  No worries! Enter your email and we&apos;ll send you reset
                  instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base-700 font-medium">
                    Email Address{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-11 bg-base-50 border-base-200 focus:ring-primary-500/20"
                      required
                      disabled={loading}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-400">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Sending Instructions...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-base-900 mb-2">
                Check your email
              </h3>
              <p className="text-base-600 mb-8 max-w-sm mx-auto">
                We&apos;ve sent a password reset link to <br />
                <span className="font-semibold text-base-900">{email}</span>
              </p>

              <div className="bg-base-50 rounded-xl p-4 mb-8 text-sm text-base-600">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                >
                  try another email address
                </button>
              </div>

              <Button variant="outline" className="w-full h-12" asChild>
                <Link href="/login">Back to Login</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
