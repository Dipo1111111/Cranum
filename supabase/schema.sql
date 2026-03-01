-- FastView Database Schema

-- Enable Row Level Security
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS habit_completions ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Table (Keep simple)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Goals Table (New)
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  goal_id TEXT NOT NULL, -- 'hunter_eyes', 'forward_upward', etc.
  selected_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, goal_id)
);

-- 3. Habit Completions Table (Simplified)
CREATE TABLE IF NOT EXISTS habit_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  habit_id TEXT NOT NULL,
  completed_at DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, habit_id, completed_at)
);

-- RLS Policies

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- User Goals
CREATE POLICY "Users can manage own goals" ON user_goals
  FOR ALL USING (auth.uid() = user_id);

-- Habit Completions
CREATE POLICY "Users can manage own completions" ON habit_completions
  FOR ALL USING (auth.uid() = user_id);

-- Cleanup old Atomic XP tables if they exist (handled manually by user usually, but here for reference)
-- DROP TABLE IF EXISTS characters;
-- DROP TABLE IF EXISTS habits;
-- DROP TABLE IF EXISTS habit_completions_old; -- if renamed
-- DROP TABLE IF EXISTS plan_tasks;
-- DROP TABLE IF EXISTS analytics_events;
