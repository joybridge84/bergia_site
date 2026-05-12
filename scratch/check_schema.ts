import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Checking profiles table...");
  const { data: profiles, error: pError } = await supabase.from("profiles").select("*").limit(1);
  if (pError) console.error("Profiles error:", pError);
  else console.log("Profiles sample:", profiles);

  console.log("\nChecking draft_entries table...");
  const { data: entries, error: eError } = await supabase.from("draft_entries").select("*").limit(1);
  if (eError) console.error("Draft entries error:", eError);
  else console.log("Draft entries sample:", entries);
}

checkSchema();
