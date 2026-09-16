-- Migration SQL untuk enable RLS dan auth pada applications table
-- Jalankan di Supabase SQL Editor

-- 1. Tambah kolom user_id
ALTER TABLE applications 
ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- 2. Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 3. Policy: User hanya bisa SELECT data miliknya
CREATE POLICY "Users can view own applications"
ON applications FOR SELECT
USING (auth.uid() = user_id);

-- 4. Policy: User hanya bisa INSERT data untuk dirinya
CREATE POLICY "Users can insert own applications"
ON applications FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 5. Policy: User hanya bisa UPDATE data miliknya
CREATE POLICY "Users can update own applications"
ON applications FOR UPDATE
USING (auth.uid() = user_id);

-- 6. Policy: User hanya bisa DELETE data miliknya
CREATE POLICY "Users can delete own applications"
ON applications FOR DELETE
USING (auth.uid() = user_id);
