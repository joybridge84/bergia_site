"use server";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const fullName = formData.get("fullName") as string;
  const metadataStr = formData.get("metadata") as string;

  if (!email || !password || !role || !fullName) {
    return { success: false, error: "すべての項目を入力してください。" };
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

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        role: role,
        full_name: fullName,
        [role === 'student' ? 'student_metadata' : 'company_metadata']: JSON.parse(metadataStr || '{}'),
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        return { success: false, error: "プロフィールの作成に失敗しました。" };
      }
    }
    
    return { success: true, role };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { success: false, error: error.message || "サインアップ中にエラーが発生しました。" };
  }
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "メールアドレスとパスワードを入力してください。" };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) throw profileError;
    
    return { success: true, role: profile?.role };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message || "ログインに失敗しました。" };
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // We can still use redirect here as it's not a complex flow
}
