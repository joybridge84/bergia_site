"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { signup } from "@/app/auth/actions";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, role: 'student' | 'enterprise') => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('role', role);
    
    // Construct metadata
    const metadata: Record<string, any> = {};
    if (role === 'student') {
      metadata.university = formData.get('university');
      metadata.skills = ["Communication", "Strategy"]; // Defaults
    } else {
      metadata.company_name = formData.get('company');
    }
    formData.append('metadata', JSON.stringify(metadata));
    formData.append('password', 'TemporaryPassword123!'); // For demo/simplicity, or add password field

    try {
      await signup(formData);
      toast.success(role === 'student' ? "挑戦への第一歩、エントリー完了！" : "資料請求を承りました。");
    } catch (error: any) {
      toast.error("エラーが発生しました: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter py-base max-w-container-max mx-auto bg-surface/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-base">
          <span className="text-headline-md font-headline-md font-bold tracking-tighter text-on-surface">BERGIA</span>
        </div>
        <div className="hidden md:flex items-center gap-lg">
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#students">Students</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#enterprise">Enterprise</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#mission">Mission</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#benefits">Benefits</Link>
        </div>
        <div className="flex items-center gap-md">
          <button className="hidden sm:block text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm">Login</button>
          <button className="student-gradient text-white px-md py-xs rounded-full font-label-sm text-label-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden pt-[60px]">
        {/* Background Flowing Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 1000">
          <path className="flowing-line" d="M0,500 C200,300 400,700 600,500 C800,300 1000,700 1200,500" fill="none" stroke="url(#lineGradient)" strokeWidth="4"></path>
          <path className="flowing-line" d="M0,600 C300,400 500,800 700,600 C900,400 1100,800 1300,600" fill="none" opacity="0.5" stroke="url(#lineGradient)" strokeWidth="2" style={{ animationDelay: "-2s" }}></path>
          <defs>
            <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#ff71b2", stopOpacity: 1 }}></stop>
              <stop offset="50%" style={{ stopColor: "#6d28d9", stopOpacity: 1 }}></stop>
              <stop offset="100%" style={{ stopColor: "#ff71b2", stopOpacity: 1 }}></stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Left: Students */}
        <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-full flex items-center justify-center p-xl group" id="students">
          <div className="absolute inset-0 student-gradient opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-block px-md py-xs rounded-full bg-primary/30 text-white font-label-sm text-label-sm mb-md uppercase tracking-widest border border-primary/40 backdrop-blur-md">For Students</span>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-lg">
              君の挑戦に、<br />
              <span className="text-primary vibrant-glow">スポットライト</span>を。
            </h1>
            <button className="student-gradient text-white px-lg py-md rounded-full font-headline-md text-headline-md hover:scale-102 transition-transform shadow-2xl shadow-primary/40 border border-white/20">
              挑戦を始める
            </button>
          </div>
        </div>

        {/* Center: Floating Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="glass-card p-md rounded-full glow-purple">
            <div className="w-32 h-32 relative">
               <Image 
                alt="Bergia Logo" 
                fill
                className="object-contain filter drop-shadow-lg" 
                src="/logo.png"
               />
            </div>
          </div>
        </div>

        {/* Right: Enterprises */}
        <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-full flex items-center justify-center p-xl group border-l border-white/5" id="enterprise">
          <div className="absolute inset-0 bg-surface group-hover:bg-surface-container transition-colors duration-700"></div>
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-block px-md py-xs rounded-full bg-secondary/30 text-secondary font-label-sm text-label-sm mb-md uppercase tracking-widest border border-secondary/40 backdrop-blur-md">For Enterprises</span>
            <h2 className="font-display-xl text-display-xl text-on-surface mb-lg">
              地域の未来を、<br />
              <span className="text-secondary vibrant-glow">共に創る</span>。
            </h2>
            <button className="bg-secondary text-on-secondary px-lg py-md rounded-full font-headline-md text-headline-md hover:scale-102 transition-transform shadow-2xl shadow-secondary/40">
              パートナー参画
            </button>
          </div>
        </div>
      </header>

      {/* MVV Section */}
      <section className="py-xl px-gutter max-w-container-max mx-auto relative" id="mission">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-center relative z-10">
          <div className="lg:col-span-5">
            <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-base">Brand Story</h3>
            <h2 className="font-headline-lg text-headline-lg mb-lg">誰もが挑戦を<br />循環させられる社会へ</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-md leading-relaxed">
              「一人では動くことができない人々を支えたい」<br />
              代表・Joyのそんな想いからBergiaは誕生しました。硬い蕾が花開くように、隠れた才能が正しい場所で評価されるプラットフォームを目指します。
            </p>
            <div className="glass-card p-lg rounded-xl border-primary/30 bg-primary/5">
              <h4 className="font-headline-md text-headline-md text-primary mb-base">Vision</h4>
              <p className="font-body-md text-body-md">すべての価値が正しく評価され、挑戦が循環する社会を創る</p>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md">
            {/* Value Cards */}
            {[
              { icon: "verified", title: "誠実", desc: "真摯に向き合う姿勢" },
              { icon: "track_changes", title: "目的", desc: "本質を見失わない" },
              { icon: "volunteer_activism", title: "利他", desc: "他者の成功を喜ぶ" },
              { icon: "groups", title: "ワンチーム", desc: "個を活かし全体へ" },
              { icon: "rocket_launch", title: "挑戦", desc: "未知への一歩を" },
            ].map((value, i) => (
              <div key={i} className="glass-card p-md rounded-xl hover:translate-y-[-8px] transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                <span className="material-symbols-outlined text-primary text-headline-md mb-base">{value.icon}</span>
                <h5 className="font-headline-md text-headline-md mb-xs">{value.title}</h5>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Draft Pillars */}
      <section className="py-xl bg-surface-container-low relative overflow-hidden" id="benefits">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="text-center mb-xl">
            <h2 className="font-display-xl text-display-xl mb-md bg-clip-text text-transparent student-gradient">Career Draft</h2>
            <p className="text-on-surface-variant font-body-lg">未来を掴む、4つの圧倒的な体験</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            {[
              { icon: "stadium", title: "圧倒的な「打席」", desc: "8社からの本気1on1フィードバックが、君の武器を磨き上げる。" },
              { icon: "bolt", title: "早期オファー", desc: "優秀者には選考ショートカットの特別ルート。最速で内定へ。" },
              { icon: "redeem", title: "報酬とエンタメ", desc: "1〜2万円相当の豪華景品を用意。真剣勝負を、最高のエンタメに。" },
              { icon: "diversity_3", title: "戦友との出会い", desc: "厳選された12名の学生コミュニティ。生涯続く繋がりがここに。" },
            ].map((pillar, i) => (
              <div key={i} className="glass-card p-lg rounded-xl flex flex-col items-center text-center hover:border-primary/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-md border border-primary/30">
                  <span className="material-symbols-outlined text-primary text-[32px]">{pillar.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-base">{pillar.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Dinner Party Card */}
          <div className="mt-lg relative rounded-2xl overflow-hidden group border border-orange-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 group-hover:opacity-50 transition-opacity"></div>
            <div className="glass-card p-xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-lg">
              <div className="md:w-2/3">
                <h3 className="font-headline-lg text-headline-lg mb-base flex items-center gap-base">
                  <span className="material-symbols-outlined text-orange-400">restaurant</span>
                  Dinner Party
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  ドラフト後は、企業担当者との交流会を開催。
                  肩書きを脱ぎ捨て、未来について語り合う温かい時間を提供します。
                </p>
              </div>
              <div className="md:w-1/3 text-right">
                <button className="bg-surface/60 backdrop-blur-md p-base rounded-full border border-orange-500/50 text-orange-400 font-label-sm text-label-sm px-lg py-md hover:bg-orange-500 hover:text-white transition-all shadow-lg">
                  当日の詳細を見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Enterprises Section */}
      <section className="py-xl px-gutter max-w-container-max mx-auto">
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="md:col-span-2 glass-card p-xl rounded-2xl border-secondary/30 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
            <h2 className="font-display-xl text-display-xl mb-lg">For Enterprises</h2>
            <p className="font-body-lg text-body-lg mb-xl text-on-surface-variant max-w-2xl">
              Bergiaは、単なる採用媒体ではありません。学生の「素」の能力と熱意が可視化される4時間の濃厚なマッチング体験を提供します。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
              <div className="p-md bg-white/5 rounded-xl border-l-4 border-secondary/80">
                <h4 className="font-headline-md text-headline-md mb-xs">早期接触</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">27/28卒の優秀層へリーチ</p>
              </div>
              <div className="p-md bg-white/5 rounded-xl border-l-4 border-secondary/80">
                <h4 className="font-headline-md text-headline-md mb-xs">4時間の深掘り</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">選考では見えない本質を見抜く</p>
              </div>
              <div className="p-md bg-white/5 rounded-xl border-l-4 border-secondary/80">
                <h4 className="font-headline-md text-headline-md mb-xs">コスト削減</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">エージェント比で高い投資対効果</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-lg rounded-2xl flex flex-col justify-center items-center text-center overflow-hidden relative border-secondary/20">
            <Image 
              fill
              className="object-cover opacity-30 mix-blend-overlay" 
              alt="Professional team meeting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB45FW-X90_ILxsaQcAa6hJOzsGa9Smp81sHo6Xgiva7VBrvm-qQArgBP9wS7V0PzyWmxTlRc4T75joYM3BRC_5zVWoxf7KvDG1rl3MzOdkyndsC2vsAdAGMVY60k1I_phUQDd1lDMElca7LOH1iG6ghHrq5NF3PpZdqlSmitkIUABFRGYq8HqMk7RUMPE3wDnVlpTt_6WtloVto_7T3mGBLL4B6phMfcT0k7DeQd78wtmrMGFbxNIPv7KXJ00BYh3qK6s8S7IA7uY"
            />
            <div className="relative z-10 p-md bg-surface/40 backdrop-blur-md rounded-xl">
              <h3 className="font-headline-md text-headline-md mb-md">採用ブランディングを<br />加速させる</h3>
              <button className="bg-secondary text-on-secondary px-lg py-md rounded-full hover:scale-105 transition-transform shadow-lg shadow-secondary/30">資料ダウンロード</button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-xl bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/10 blur-[150px] rounded-full"></div>
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            {/* Student Form */}
            <div className="glass-card p-xl rounded-2xl border-primary/40 shadow-2xl shadow-primary/10 relative">
              <AnimatePresence>
                {loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-surface/80 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                  >
                    <div className="text-center relative">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.5, 1],
                          rotate: [0, 180, 360],
                          borderRadius: ["20%", "50%", "20%"]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary blur-sm mb-md mx-auto"
                      />
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-primary font-headline-md font-bold tracking-widest"
                      >
                        開花中...
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <h3 className="font-headline-lg text-headline-lg mb-base bg-clip-text text-transparent student-gradient">Challenge Entry</h3>
              <p className="text-on-surface-variant mb-lg">学生の方はこちらからエントリー。あなたの可能性を広げましょう。</p>
              <form className="space-y-md" onSubmit={(e) => handleFormSubmit(e, 'student')}>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-primary/80">Name / 氏名</label>
                  <input name="fullName" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" placeholder="山田 太郎" type="text" />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-primary/80">Email / メールアドレス</label>
                  <input name="email" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" placeholder="your@email.com" type="email" />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-primary/80">University / 大学名・学年</label>
                  <input name="university" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface transition-colors p-base" placeholder="〇〇大学 3年" type="text" />
                </div>
                <button className="w-full student-gradient text-white py-md rounded-xl font-headline-md text-headline-md mt-md shadow-xl shadow-primary/20 hover:brightness-110 transition-all" type="submit">エントリーする</button>
              </form>
            </div>

            {/* Enterprise Form */}
            <div className="glass-card p-xl rounded-2xl border-secondary/40 shadow-2xl shadow-secondary/10 relative">
              <h3 className="font-headline-lg text-headline-lg mb-base text-secondary">Partner Participation</h3>
              <p className="text-on-surface-variant mb-lg">企業の方はこちら。導入のご相談や詳細資料のご請求を承ります。</p>
              <form className="space-y-md" onSubmit={(e) => handleFormSubmit(e, 'enterprise')}>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-secondary/80">Company / 貴社名</label>
                  <input name="company" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface transition-colors p-base" placeholder="株式会社〇〇" type="text" />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-secondary/80">Work Email / 担当者メールアドレス</label>
                  <input name="email" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface transition-colors p-base" placeholder="biz@company.com" type="email" />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm mb-xs text-secondary/80">Message / お問い合わせ内容</label>
                  <textarea name="message" required className="w-full bg-white/5 border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 text-on-surface transition-colors p-base" rows={3}></textarea>
                </div>
                <button className="w-full bg-secondary text-on-secondary py-md rounded-xl font-headline-md text-headline-md mt-md shadow-xl shadow-secondary/20 hover:brightness-110 transition-all" type="submit">資料請求・お問い合わせ</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-lg px-gutter flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto border-t border-white/10 bg-surface-container-lowest text-tertiary">
        <div className="mb-md md:mb-0">
          <span className="font-headline-md text-headline-md text-on-surface">BERGIA</span>
          <p className="font-label-sm text-label-sm text-outline-variant mt-xs">© 2024 Bergia Career Draft Platform. All rights reserved.</p>
        </div>
        <div className="flex gap-lg">
          <Link className="text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Privacy Policy</Link>
          <Link className="text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Terms of Service</Link>
          <Link className="text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Contact Us</Link>
          <Link className="text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Careers</Link>
        </div>
      </footer>
    </div>
  );
}
