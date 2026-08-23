import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  X as XIcon,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic Password Validation Rules
  const hasMinLength = password.length >= 8 && password.length <= 16;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasSpecialChar;

  // Name Validation
  const isNameLengthValid = name.trim().length >= 20 && name.trim().length <= 60;

  // Address Validation
  const isAddressValid = address.trim().length > 0 && address.trim().length <= 400;

  // Confirm Password Match
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = 'Full name is required.';
    } else if (name.trim().length < 20 || name.trim().length > 60) {
      errs.name = 'Full name must be between 20 and 60 characters.';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!address.trim()) {
      errs.address = 'Address is required.';
    } else if (address.trim().length > 400) {
      errs.address = 'Address must not exceed 400 characters.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (!isPasswordValid) {
      errs.password = 'Password must meet all 3 security requirements.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const res = await register({
        name,
        email,
        address,
        password,
      });

      if (!res.success) {
        setErrors({ general: res.error || 'Registration failed. Please try again.' });
      } else {
        setIsSuccess(true);
      }
    } catch {
      setErrors({ general: 'Something went wrong. Please check your details.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col lg:flex-row selection:bg-purple-100 selection:text-purple-900 font-sans">
      {/* LEFT PANEL: Editorial Storytelling & Community Constellation */}
      <div className="lg:w-[48%] xl:w-[45%] bg-[#F5F1EA] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-200/70">
        {/* Soft pastel layered ambient glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E9D5FF]/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#FED7AA]/40 blur-3xl pointer-events-none" />
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

        {/* Middle: Editorial Narrative & Rating Visuals */}
        <div className="my-10 lg:my-auto relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] border border-brand/20/70 text-purple-900 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span>Public Explorer Community</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-stone-900 tracking-tight leading-[1.12] mb-5">
              Find places <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800">
                worth talking about.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8">
              Create your account and start discovering, rating, and championing great local spots with verified transparency.
            </p>
          </motion.div>

          {/* Connected Asymmetric Floating Visual Composition */}
          <div className="relative pt-2 pb-6">
            {/* Rating Card 1: Reviewer impact pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-stone-200/80 shadow-soft mb-3.5 max-w-sm -rotate-1 hover:rotate-0 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-amber-900 flex items-center justify-center font-bold text-sm">
                  ★ 5.0
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Add your voice to the community</h4>
                  <p className="text-[11px] text-stone-500">Every score guides real people to authentic local experiences.</p>
                </div>
              </div>
            </motion.div>

            {/* Rating Card 2: Community Store Snippet */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="p-5 rounded-2xl bg-[#FFFDF9]/95 backdrop-blur-sm border border-stone-200/80 shadow-soft max-w-md rotate-1 hover:rotate-0 transition-transform ml-2 sm:ml-4"
            >
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 bg-[#EDE9FE] px-2 py-0.5 rounded-md">
                    Bookstore & Gifts
                  </span>
                  <h3 className="font-heading font-bold text-stone-900 text-sm mt-1">The Illustrated Bookshop</h3>
                  <p className="text-xs text-stone-500">Westside Arts Quarter</p>
                </div>
                <div className="flex items-center gap-1 bg-[#FEF3C7] px-2 py-1 rounded-lg">
                  <span className="font-heading font-bold text-xs text-amber-950">4.9</span>
                  <Star className="w-3 h-3 fill-rating text-rating" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-[11px] text-stone-500 font-medium ml-1">98 community ratings</span>
              </div>
              <p className="text-xs italic text-stone-600 bg-stone-50/70 p-2.5 rounded-xl border border-stone-100">
                “Curated architectural journals and cozy sunlit corners. A true neighborhood gem.”
              </p>
            </motion.div>

            {/* Pill 3: Community stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7]/90 border border-emerald-200 text-emerald-950 text-xs font-medium shadow-2xs"
            >
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>Over 1,280+ active ratings submitted this month</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom Trust Note */}
        <div className="relative z-10 pt-4 flex items-center gap-2 text-xs text-stone-500">
          <ShieldCheck className="w-4 h-4 text-stone-400" />
          <span>Independent, transparent, and fair ratings standard.</span>
        </div>
      </div>

      {/* RIGHT PANEL: Registration Form Area */}
      <div className="lg:w-[52%] xl:w-[55%] p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center bg-[#FAF8F5]">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* Success State Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-soft text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#DCFCE7] text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mb-2">
                  You’re all set.
                </h2>
                <p className="text-sm sm:text-base text-stone-600 max-w-md mx-auto mb-6">
                  Your account has been created successfully. You can now sign in with your email to discover and rate stores.
                </p>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/70 text-left mb-6 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Name:</span>
                    <span className="font-semibold text-stone-800">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Email:</span>
                    <span className="font-semibold text-stone-800">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Account Type:</span>
                    <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Normal User</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/login', { state: { prefilledEmail: email } })}
                  className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-heading font-semibold text-sm shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Continue to Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              /* Registration Form */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-soft"
              >
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 tracking-tight mb-1.5">
                    Create your account
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Sign up as a community reviewer to explore and rate stores in your area.
                  </p>
                </div>

                {/* General error message */}
                {errors.general && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-center gap-2.5">
                    <XIcon className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{errors.general}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-stone-700">Full Name *</label>
                      <span
                        className={`text-[11px] font-medium ${
                          isNameLengthValid
                            ? 'text-success'
                            : name.length > 60
                            ? 'text-rose-500'
                            : 'text-stone-400'
                        }`}
                      >
                        {name.length} / 60 chars (min 20)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Maya Robertson Lin"
                      className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                        errors.name
                          ? 'border-rose-400 bg-rose-50/30'
                          : isNameLengthValid
                          ? 'border-emerald-300 bg-white'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="you@example.com"
                      className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                        errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.email}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-stone-700">Address *</label>
                      <span
                        className={`text-[11px] font-medium ${
                          address.length > 400 ? 'text-rose-500 font-bold' : 'text-stone-400'
                        }`}
                      >
                        {address.length} / 400 chars max
                      </span>
                    </div>
                    <textarea
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                      }}
                      rows={2}
                      placeholder="Street address, apartment/unit, city"
                      className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none ${
                        errors.address
                          ? 'border-rose-400 bg-rose-50/30'
                          : isAddressValid
                          ? 'border-stone-200 bg-white'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.address}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                        }}
                        placeholder="••••••••"
                        className={`w-full rounded-2xl border px-3.5 py-2.5 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                          errors.password ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Live Visual Password Requirements Checklist */}
                    <div className="mt-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-1 text-xs">
                      <p className="text-[11px] font-semibold text-stone-600 mb-1">Password requirements:</p>
                      <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {hasMinLength ? (
                          <Check className="w-3.5 h-3.5 text-success stroke-[3]" />
                        ) : (
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-stone-300">•</span>
                        )}
                        <span>8–16 characters</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${hasUppercase ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {hasUppercase ? (
                          <Check className="w-3.5 h-3.5 text-success stroke-[3]" />
                        ) : (
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-stone-300">•</span>
                        )}
                        <span>At least one uppercase letter</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${hasSpecialChar ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {hasSpecialChar ? (
                          <Check className="w-3.5 h-3.5 text-success stroke-[3]" />
                        ) : (
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-stone-300">•</span>
                        )}
                        <span>At least one special character</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Confirm Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                        }}
                        placeholder="••••••••"
                        className={`w-full rounded-2xl border px-3.5 py-2.5 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                          errors.confirmPassword || passwordsMismatch
                            ? 'border-rose-400 bg-rose-50/30'
                            : passwordsMatch
                            ? 'border-emerald-400 bg-white'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Live Match Feedback */}
                    {passwordsMatch && (
                      <p className="text-[11px] text-success mt-1 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Passwords match
                      </p>
                    )}
                    {passwordsMismatch && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1">
                        <XIcon className="w-3 h-3" /> Passwords do not match
                      </p>
                    )}
                    {errors.confirmPassword && !passwordsMismatch && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-5 py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-heading font-semibold text-sm shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 text-stone-200">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      <>
                        <span>Create account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Switch to Login */}
                <div className="text-center mt-6 pt-5 border-t border-stone-100">
                  <span className="text-xs text-stone-500">Already have an account? </span>
                  <Link
                    to="/login"
                    className="text-xs font-heading font-bold text-stone-900 hover:text-purple-700 transition-colors ml-1"
                  >
                    Sign in
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
