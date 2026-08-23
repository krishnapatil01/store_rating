import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Star,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Users,
  MapPin,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ name: string; roleText: string } | null>(null);
  const [showDemoHelper, setShowDemoHelper] = useState(false);

  // Check if redirected from registration with prefilled email
  useEffect(() => {
    if (location.state && (location.state as any).prefilledEmail) {
      setEmail((location.state as any).prefilledEmail);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(cleanEmail, cleanPassword);

      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Email or password doesn’t match. Please try again.');
        setIsLoading(false);
        return;
      }

      // Display brief smooth success transition before redirecting
      const roleText =
        res.role === 'SYSTEM_ADMIN'
          ? 'System Administrator'
          : res.role === 'STORE_OWNER'
          ? 'Store Owner'
          : 'Community Explorer';

      setSuccessInfo({ name: res.user.name, roleText });

      setTimeout(() => {
        if (res.role === 'SYSTEM_ADMIN') {
          navigate('/admin');
        } else if (res.role === 'STORE_OWNER') {
          navigate('/store-owner');
        } else {
          navigate('/discovery');
        }
      }, 700);
    } catch {
      setErrorMessage('Unable to connect right now. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const fillQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col lg:flex-row selection:bg-purple-100 selection:text-purple-900 font-sans">
      {/* LEFT PANEL: Editorial Brand, Storytelling & Floating Rating Constellation */}
      <div className="lg:w-[50%] xl:w-[48%] bg-[#F5F1EA] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-200/70">
        {/* Soft pastel layered ambient glows */}
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#EDE9FE]/50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#FFEDD5]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-[#DCFCE7]/40 blur-3xl pointer-events-none" />

        {/* Top: Brand Header */}
        <div className="relative z-10">
          <Link to="/login" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-bold text-xl tracking-tight text-stone-900">Shop</span>
              <span className="font-heading font-light text-xl text-stone-500">Score</span>
            </div>
          </Link>
        </div>

        {/* Middle: Editorial Narrative & Visual Rating Constellation */}
        <div className="my-10 lg:my-auto relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] border border-brand/20/70 text-purple-900 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span>Authentic Store Reputation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-heading font-extrabold text-stone-900 tracking-tight leading-[1.12] mb-5">
              Good places <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800">
                deserve to be
              </span>{' '}
              <br />
              <span className="text-purple-950 italic font-serif font-normal">discovered.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8">
              Discover what people really think, share your experience, and understand the reputation behind every store.
            </p>
          </motion.div>

          {/* Organic Editorial Floating Rating Composition */}
          <div className="relative pt-2 pb-6">
            {/* Constellation Rating Dot / Micro-badge */}
            <div className="absolute -top-3 right-8 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-amber-200/70 text-amber-900 text-xs font-bold shadow-2xs rotate-3 animate-pulse">
              <Star className="w-3 h-3 fill-rating text-rating" />
              <span>4.9 / 5.0 Community Standard</span>
            </div>

            {/* Hero Floating Rating Card (Croma Pune style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-soft -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-stone-900 text-base">Croma Store</h3>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    Aundh, Pune
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-[#FEF3C7] px-2.5 py-1 rounded-xl shadow-2xs">
                  <span className="font-heading font-bold text-xs text-amber-950">4.8</span>
                  <Star className="w-3.5 h-3.5 fill-rating text-rating" />
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-xs text-stone-500 font-medium ml-1.5">(324 ratings)</span>
              </div>

              <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-2xl border border-stone-100/90 leading-relaxed italic">
                “Outstanding electronics collection and helpful product specialists. The best tech retail experience in the city.”
              </p>
            </motion.div>

            {/* Secondary Layered Pastel Pill 1: Soft Peach */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: 15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFEDD5] border border-orange-200/80 text-orange-950 text-xs font-semibold shadow-2xs rotate-1 ml-2"
            >
              <span>“Excellent service & warm atmosphere”</span>
              <span className="text-amber-600 flex items-center">★★★★★</span>
            </motion.div>

            {/* Secondary Layered Pastel Pill 2: Muted Mint */}
            <motion.div
              initial={{ opacity: 0, x: 15, y: 15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-2.5 flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#DCFCE7] border border-emerald-200/80 text-emerald-950 text-xs font-semibold shadow-2xs -rotate-1 ml-6 max-w-xs"
            >
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>1,284 people rated local stores this week</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom Editorial Note */}
        <div className="relative z-10 pt-4 flex items-center gap-2 text-xs text-stone-500">
          <ShieldCheck className="w-4 h-4 text-stone-400" />
          <span>Unified authentication for Admin, Store Owners, and Community Reviewers.</span>
        </div>
      </div>

      {/* RIGHT PANEL: Calm, Intentional Common Sign-In */}
      <div className="lg:w-[50%] xl:w-[52%] p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center bg-[#FAF8F5]">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200/80 shadow-soft">
            <AnimatePresence mode="wait">
              {successInfo ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-stone-900 mb-1">
                    Welcome back, {successInfo.name}!
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Authenticated as <span className="font-semibold text-stone-700">{successInfo.roleText}</span>.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs text-stone-400">
                    <span className="w-3.5 h-3.5 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin" />
                    <span>Redirecting to your dashboard...</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Header */}
                  <div className="mb-7">
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 tracking-tight mb-1.5">
                      Welcome back.
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500">
                      Sign in to continue exploring stores and your ratings.
                    </p>
                  </div>

                  {/* Elegant Inline Error Callout */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/90 text-rose-700 text-xs flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                      <span className="leading-relaxed">{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Common Login Form: No Role Selector */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-purple-100 hover:border-stone-300"
                      />
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-semibold text-stone-700">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setErrorMessage('Please contact your administrator or sign in with your preset credentials.');
                          }}
                          className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 pr-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-purple-100 hover:border-stone-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors p-1"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Submit CTA Button with Hover Arrow Animation */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-heading font-semibold text-sm shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2 text-stone-200">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing in...
                        </span>
                      ) : (
                        <>
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Register Link */}
                  <div className="text-center mt-6 pt-5 border-t border-stone-100">
                    <span className="text-xs text-stone-500">New here? </span>
                    <Link
                      to="/register"
                      className="text-xs font-heading font-bold text-stone-900 hover:text-purple-700 transition-colors ml-1"
                    >
                      Create a free account
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Discreet Demo Helper Popover for seamless evaluation */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowDemoHelper(!showDemoHelper)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-400 hover:text-stone-600 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showDemoHelper ? 'Hide evaluation test logins' : 'Need quick test account credentials?'}</span>
            </button>

            <AnimatePresence>
              {showDemoHelper && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2.5 p-3.5 rounded-2xl bg-[#F5F1EA] border border-stone-200/80 text-left text-xs space-y-2 overflow-hidden shadow-2xs"
                >
                  <p className="text-[11px] font-semibold text-stone-600">
                    Click any account below to populate credentials:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => fillQuickDemo('admin@storeratings.io', 'Admin@1234')}
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-purple-300 text-left transition-all"
                    >
                      <p className="font-bold text-stone-800 text-[11px]">System Admin</p>
                      <p className="text-[10px] text-stone-500 truncate">admin@storeratings.io</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => fillQuickDemo('julian@artisancoffee.co', 'Owner@1234')}
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-orange-300 text-left transition-all"
                    >
                      <p className="font-bold text-stone-800 text-[11px]">Store Owner</p>
                      <p className="text-[10px] text-stone-500 truncate">julian@artisancoffee.co</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => fillQuickDemo('maya.lin@gmail.com', 'User@1234')}
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-300 text-left transition-all"
                    >
                      <p className="font-bold text-stone-800 text-[11px]">Normal User</p>
                      <p className="text-[10px] text-stone-500 truncate">maya.lin@gmail.com</p>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
