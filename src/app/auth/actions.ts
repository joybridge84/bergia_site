"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const fullName = formData.get("fullName") as string;
  const metadata = formData.get("metadata") as string; // JSON string

  if (!email || !password || !role || !fullName) {
    throw new Error("すべての項目を入力してください。");
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) throw error;

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        role: role,
        full_name: fullName,
        [role === 'student' ? 'student_metadata' : 'company_metadata']: JSON.parse(metadata || '{}'),
      });

      if (profileError) {
        // If profile creation fails, we should probably delete the user or handle it
        console.error("Profile creation error:", profileError);
        throw new Error("プロフィールの作成に失敗しました。");
      }
    }
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    throw new Error(error.message || "サインアップ中にエラーが発生しました。");
  }

  redirect(role === 'student' ? '/student/mypage' : '/enterprise/dashboard');
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("メールアドレスとパスワードを入力してください。");
  }

  let role: string | null = null;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch profile to redirect
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) throw profileError;
    role = profile?.role;
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    throw new Error(error.message || "ログインに失敗しました。");
  }

  redirect(role === 'student' ? '/student/mypage' : '/enterprise/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
