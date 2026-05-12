"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateStudentProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const fullName = formData.get("fullName") as string;
  const bio = formData.get("bio") as string;
  const university = formData.get("university") as string;
  const skillsInput = formData.get("skills") as string;

  if (!fullName || !university) {
    throw new Error("氏名と大学名は必須項目です。");
  }

  const skills = skillsInput.split(",").map(s => s.trim()).filter(s => s !== "");

  const { error } = await supabase.from("profiles").update({
    full_name: fullName,
    bio: bio,
    student_metadata: {
      university_name: university,
      skills: skills,
    },
    updated_at: new Date().toISOString(),
  }).eq("id", user.id);

  if (error) throw error;

  revalidatePath("/student/mypage");
}
