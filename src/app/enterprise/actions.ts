"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function nominateStudent(studentId: string, eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("ログインが必要です。");

  if (!studentId || !eventId) {
    throw new Error("学生IDまたはイベントIDが不足しています。");
  }

  try {
    const { error } = await supabase.from("draft_entries").upsert({
      student_id: studentId,
      event_id: eventId,
      status: "nominated",
      updated_at: new Date().toISOString(),
    }, {
      onConflict: "event_id,student_id"
    });

    if (error) throw error;
  } catch (error: any) {
    console.error("Nomination error:", error);
    throw new Error("指名処理に失敗しました。時間をおいて再度お試しください。");
  }

  revalidatePath("/enterprise/dashboard");
}

