"use client";

import React, { useState } from "react";
import { nominateStudent } from "@/app/enterprise/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface NominateButtonProps {
  studentId: string;
  eventId?: string; // Placeholder for now
}

export default function NominateButton({ studentId, eventId = "00000000-0000-0000-0000-000000000000" }: NominateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleNominate = async () => {
    setLoading(true);
    try {
      await nominateStudent(studentId, eventId);
      toast.success("指名しました！ドラフト会議での対面を楽しみにしましょう。");
    } catch (error) {
      toast.error("指名に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleNominate}
      disabled={loading}
      className="flex-1 bg-secondary text-on-secondary py-base rounded-xl font-label-sm hover:scale-105 transition-transform shadow-lg shadow-secondary/20 flex items-center justify-center gap-base disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "気になる！"}
    </button>
  );
}
