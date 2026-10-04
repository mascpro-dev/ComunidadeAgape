"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nhaqognbizjswdmfoahx.supabase.co")
  .trim()
  .replace(/\/rest\/v1\/?$/, "")
  .replace(/\/$/, "");

const SUPABASE_ANON_KEY = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYXFvZ25iaXpqc3dkbWZvYWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNDA5ODAsImV4cCI6MjEwNjcxNjk4MH0.x-ffpEFsjJ23LjOsUkiLAEUbqCszghknI5zjy-MgiQs"
).trim();

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

let client: SupabaseClient | null = null;

export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}
