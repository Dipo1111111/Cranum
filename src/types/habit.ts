export type CranumGoal = 'hunter_eyes' | 'forward_upward' | 'hollow_cheeks' | 'grow_taller' | 'jawline';

export type HabitFrequency = 'continuous' | 'daily' | '2_3x_weekly' | '1x_weekly' | 'as_needed';

export type TimeOfDay = 'morning' | 'throughout_day' | 'night';

export type CranumCategory = 'active' | 'continuous' | 'lifestyle';

export interface CranumHabit {
  id: string;
  category: CranumCategory;
  goals: CranumGoal[]; // Standardize to array for deduplication
  mechanism: string;
  name: string;
  instruction: string;
  knowledge: string;
  dos: string[];
  donts: string[];
  frequency: HabitFrequency;
  durationMinutes: number;
  timeOfDay: TimeOfDay;
  tips: string;
  priority: number;
  article?: string; // For Category L Lifestyle Principles
}

export interface DayData {
  id: string;
  date: string;
  completed_habits: string[];
}
