import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PlayerCard from "@/components/student/PlayerCard";
import Link from "next/link";
import EditProfileForm from "@/components/student/EditProfileForm";
import QRCodeWrapper from "@/components/student/QRCodeWrapper";

export default async function MyPage() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Profile fetch error:", profileError);
      redirect("/");
    }

    const studentMetadata = profile.student_metadata || {};
    const skills = studentMetadata.skills || ["Communication", "Problem Solving", "Strategy"];
    const university = studentMetadata.university_name || studentMetadata.university || "未設定";

    const profileUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/student/${user.id}`;

    return (
      <div className="min-h-screen bg-surface pt-[100px] pb-xl px-gutter">
        <div className="max-w-container-max mx-auto">
          <header className="mb-xl flex justify-between items-end">
            <div>
              <h1 className="font-display-xl text-display-xl text-on-surface mb-xs">My Page</h1>
              <p className="text-on-surface-variant text-body-lg">あなたの挑戦をデザインし、企業と繋がろう。</p>
            </div>
            <Link href="/" className="text-primary hover:underline">ホームへ戻る</Link>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
            {/* Left: Player Card Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <h2 className="font-headline-lg text-headline-lg mb-lg self-start">Player Card</h2>
              <PlayerCard 
                name={profile.full_name || "Name"}
                university={university}
                bio={profile.bio || "No bio yet."}
                skills={skills}
                avatarUrl={profile.avatar_url}
              />
            </div>

            {/* Right: Sharing & Settings */}
            <div className="lg:col-span-7 space-y-lg">
              <div className="glass-card p-xl rounded-2xl border-primary/20">
                <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-base">
                  <span className="material-symbols-outlined text-primary">qr_code</span>
                  Profile Share QR
                </h3>
                <p className="text-on-surface-variant mb-lg">このQRコードをイベント会場で企業に提示してください。</p>
                <QRCodeWrapper value={profileUrl} size={200} />
                <p className="mt-md font-label-sm text-outline-variant">{profileUrl}</p>
              </div>

              <div className="glass-card p-xl rounded-2xl border-primary/20">
                <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-base">
                  <span className="material-symbols-outlined text-primary">edit</span>
                  Edit Profile
                </h3>
                <EditProfileForm 
                  initialData={{
                    full_name: profile.full_name || "",
                    bio: profile.bio || "",
                    university: university,
                    skills: skills,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("MyPage render error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center p-xl">
        <div className="text-center">
          <h1 className="text-headline-lg mb-md">エラーが発生しました</h1>
          <p className="text-on-surface-variant mb-lg">{error.message}</p>
          <Link href="/" className="text-primary hover:underline">ホームへ戻る</Link>
        </div>
      </div>
    );
  }
}
  }
}
