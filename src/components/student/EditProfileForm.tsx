"use client";

import React, { useState } from "react";
import { updateStudentProfile } from "@/app/student/actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface EditProfileFormProps {
  initialData: {
    full_name: string;
    bio: string;
    university: string;
    skills: string[];
  };
}

export default function EditProfileForm({ initialData }: EditProfileFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await updateStudentProfile(formData);
      toast.success("プロフィールを更新しました！");
      setIsOpen(false);
    } catch (error: any) {
      toast.error("更新に失敗しました: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="student-gradient text-white px-lg py-md rounded-full font-label-sm text-label-sm hover:scale-105 transition-transform"
      >
        プロフィールを編集する
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-gutter">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card p-xl rounded-2xl w-full max-w-lg border-primary/30 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="font-headline-lg text-headline-lg mb-lg">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-md">
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-primary/80">Full Name / 氏名</label>
                  <input 
                    name="fullName" 
                    defaultValue={initialData.full_name}
                    required 
                    className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" 
                    type="text" 
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-primary/80">University / 大学名・学年</label>
                  <input 
                    name="university" 
                    defaultValue={initialData.university}
                    required 
                    className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" 
                    type="text" 
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-primary/80">Bio / 自己紹介</label>
                  <textarea 
                    name="bio" 
                    defaultValue={initialData.bio}
                    rows={4}
                    className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" 
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-primary/80">Skills / スキル (カンマ区切り)</label>
                  <input 
                    name="skills" 
                    defaultValue={initialData.skills.join(", ")}
                    className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" 
                    type="text" 
                    placeholder="Python, React, Design..."
                  />
                </div>

                <div className="flex gap-md mt-xl">
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-lg py-md rounded-xl border border-outline text-on-surface hover:bg-white/5 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="flex-1 student-gradient text-white py-md rounded-xl font-headline-md shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-base"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : "保存する"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
