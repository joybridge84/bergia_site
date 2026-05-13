"use client";

import React, { useState } from "react";
import Link from "next/link";
import { login } from "@/app/auth/actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await login(formData);
      if (result.success) {
        toast.success("ログインしました。おかえりなさい！");
        setTimeout(() => {
          router.push(result.role === 'student' ? '/student/mypage' : '/enterprise/dashboard');
        }, 1000);
      } else {
        toast.error("ログインに失敗しました: " + result.error);
      }
    } catch (error: any) {
      toast.error("システムエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-gutter relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full student-gradient opacity-10 blur-[100px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-xl rounded-2xl w-full max-w-md border-primary/20 shadow-2xl relative z-10"
      >
        <div className="text-center mb-xl">
          <Link href="/" className="text-display-xl font-headline-md font-bold tracking-tighter text-on-surface mb-md block">BERGIA</Link>
          <h1 className="text-headline-md font-headline-md">Login to Platform</h1>
          <p className="text-on-surface-variant">あなたの挑戦を再開しましょう。</p>
        </div>

        <form className="space-y-md" onSubmit={handleSubmit}>
          <div>
            <label className="block font-label-sm text-label-sm mb-xs text-primary/80">Email / メールアドレス</label>
            <input name="email" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" placeholder="your@email.com" type="email" />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm mb-xs text-primary/80">Password / パスワード</label>
            <input name="password" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" placeholder="••••••••" type="password" />
          </div>
          
          <button 
            disabled={loading}
            className="w-full student-gradient text-white py-md rounded-xl font-headline-md text-headline-md mt-md shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-base"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "ログイン"}
          </button>
        </form>

        <div className="mt-xl text-center">
          <p className="text-on-surface-variant font-label-sm">
            アカウントをお持ちでないですか？{" "}
            <Link href="/#registration" className="text-primary hover:underline">今すぐ登録</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
