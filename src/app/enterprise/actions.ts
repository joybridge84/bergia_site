"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function nominateStudent(studentId: string, eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("draft_entries").upsert({
    student_id: studentId,
    event_id: eventId,
    status: "nominated",
  }, {
    onConflict: "event_id,student_id"
  });

  if (error) throw error;

  revalidatePath("/enterprise/dashboard");
}
