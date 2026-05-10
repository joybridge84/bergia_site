"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PlayerCardProps {
  name: string;
  university: string;
  bio: string;
  skills: string[];
  avatarUrl?: string;
}

export default function PlayerCard({ name, university, bio, skills, avatarUrl }: PlayerCardProps) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card w-[350px] h-[500px] rounded-3xl overflow-hidden relative group"
    >
      <div className="absolute inset-0 student-gradient opacity-10 group-hover:opacity-20 transition-opacity"></div>
      
      {/* Card Header */}
      <div className="p-xl text-center relative z-10">
        <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/50 overflow-hidden mb-md shadow-2xl shadow-primary/30">
          <Image 
            src={avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"} 
            alt={name}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <h2 className="font-display-xl text-headline-lg text-on-surface">{name}</h2>
        <p className="text-primary font-label-sm">{university}</p>
      </div>

      {/* Card Body */}
      <div className="px-lg pb-lg relative z-10">
        <p className="text-on-surface-variant text-body-md line-clamp-3 mb-md italic">
          "{bio}"
        </p>
        
        <div className="flex flex-wrap gap-xs justify-center">
          {skills.map((skill, i) => (
            <span key={i} className="px-md py-xs rounded-full bg-primary/20 text-primary text-label-sm border border-primary/30">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-0 w-full py-base bg-surface-container-highest text-center">
        <span className="font-headline-md text-label-sm tracking-widest text-on-surface opacity-50">BERGIA PLAYER CARD</span>
      </div>
    </motion.div>
  );
}
