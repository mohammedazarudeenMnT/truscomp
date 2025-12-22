"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { login as apiLogin } from "@/lib/auth-api";
import { toast } from "sonner";
import { CompanyLogo } from "@/components/ui/company-logo";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiLogin(email, password);

      if (response.success && response.data?.user) {
        login(response.data.user);
        toast.success("Login successful");

        // Redirect based on role
        if (response.data.user.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image/Branding - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-base-50">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-xl space-y-8 z-10">
            <CompanyLogo width={160} height={80} className="mb-8" />
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-base-900 leading-[1.15]">
              Compliance Management Simplified
            </h1>
            <p className="text-lg text-base-600 leading-relaxed">
              TrusComp is your dedicated partner in navigating the complex
              landscape of statutory compliance in India.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-200">
                <h3 className="font-semibold text-lg text-primary-600 mb-2">
                  100%
                </h3>
                <p className="text-sm text-base-600">
                  Compliance accuracy with automated tools
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-200">
                <h3 className="font-semibold text-lg text-primary-600 mb-2">
                  24/7
                </h3>
                <p className="text-sm text-base-600">
                  Expert support for your compliance needs
                </p>
              </div>
            </div>
          </div>

          {/* Background decoration elements similar to current site style */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-primary-50/50 blur-3xl" />
            <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex mb-8">
            <CompanyLogo width={128} height={48} />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-base-900">
              Welcome back
            </h2>
            <p className="text-base-500">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base-700 font-medium">
                  Email Address{" "}
                  <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-base-50 border-base-200 focus:ring-primary-500/20"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-base-700 font-medium"
                  >
                    Password <span className="text-red-500 font-bold">*</span>
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-base-50 border-base-200 focus:ring-primary-500/20 pr-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-400 hover:text-base-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
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
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-center text-sm text-base-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-600 hover:text-primary-700"
              >
                Contact us
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
