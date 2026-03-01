export type CranumGoal = 'hunter_eyes' | 'forward_upward' | 'hollow_cheeks' | 'grow_taller' | 'jawline';

export type HabitFrequency = 'continuous' | 'daily' | '2_3x_weekly' | '1x_weekly' | 'as_needed';

export type TimeOfDay = 'morning' | 'throughout_day' | 'night';

export type CranumCategory = 'active' | 'continuous' | 'lifestyle';

export type CranumPhase = 1 | 2 | 3; // 1: Foundation, 2: Unlocking, 3: Hypertrophy

export interface BiologicalStack {
  id: string;
  name: string;
  description: string;
  phase: CranumPhase;
  timeOfDay: TimeOfDay;
  habitIds: string[]; // Sequential habits
}

export interface TechniqueBlueprint {
  howTo: string[];
  whyItMatters: string;
  commonMistakes?: string;
}

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

  // Biological Load Tracking
  phase?: CranumPhase;
  fatigueCost?: number; // 1-10 scale
  recoveryTimeHours?: number; // How long until safe to train again
  muscleGroup?: 'masseters' | 'neck' | 'cns' | 'fascia' | 'lymphatic';

  // Tactical Information
  blueprint?: TechniqueBlueprint;
}


export interface DayData {
  id: string;
  date: string;
  completed_habits: string[];
}
