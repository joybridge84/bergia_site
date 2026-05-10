import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NominateButton from "@/components/enterprise/NominateButton";

export default async function EnterpriseDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Verify enterprise role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== 'enterprise') {
    redirect("/");
  }

  // Fetch all student profiles
  const { data: students } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "student")
    .order("updated_at", { ascending: false });

  return (
    <div className="min-h-screen bg-surface pt-[100px] pb-xl px-gutter">
      <div className="max-w-container-max mx-auto">
        <header className="mb-xl">
          <h1 className="font-display-xl text-display-xl text-on-surface mb-xs">Enterprise Dashboard</h1>
          <p className="text-on-surface-variant text-body-lg">未来を担う才能を見つけ、共に挑戦を創りましょう。</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {students?.map((student) => {
            const metadata = student.student_metadata || {};
            const skills = metadata.skills || [];
            
            return (
              <div key={student.id} className="glass-card p-lg rounded-2xl border-secondary/20 hover:border-secondary/50 transition-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center gap-md mb-md relative z-10">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary/30">
                    <Image 
                      src={student.avatar_url || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop"} 
                      alt={student.full_name || ""} 
                      width={64} 
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{student.full_name}</h3>
                    <p className="text-secondary font-label-sm">{metadata.university || "University"}</p>
                  </div>
                </div>

                <p className="text-on-surface-variant text-body-md line-clamp-2 mb-md relative z-10">
                  {student.bio || "No bio provided."}
                </p>

                <div className="flex flex-wrap gap-xs mb-lg relative z-10">
                  {skills.slice(0, 3).map((skill: string, i: number) => (
                    <span key={i} className="px-base py-xs rounded-full bg-secondary/10 text-secondary text-label-sm border border-secondary/20">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-base relative z-10">
                  <NominateButton studentId={student.id} />
                  <Link href={`/enterprise/student/${student.id}`} className="px-md py-base rounded-xl border border-secondary/30 text-secondary hover:bg-secondary/10 transition-colors">
                    詳細
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {students?.length === 0 && (
          <div className="text-center py-xl glass-card rounded-2xl">
            <p className="text-on-surface-variant">現在、登録されている学生はいません。</p>
          </div>
        )}
      </div>
    </div>
  );
}
