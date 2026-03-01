import { useState } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Trash2, Edit2, GripVertical, Save, X, Download, Copy, Upload, HelpCircle } from 'lucide-react';
import { Habit, CATEGORY_LABELS, CATEGORY_COLORS, HabitCategory } from '@/types/habit';
import { resetGuide } from '@/components/onboarding/OnboardingGuide';
import { CharacterSelect } from '@/components/CharacterSelect';

interface SettingsViewProps {
  habits: Habit[];
  onUpdateHabit: (id: string, updates: Partial<Omit<Habit, 'id'>>) => void;
  onDeleteHabit: (id: string) => void;
  onReorderHabits: (habits: Habit[]) => void;
}

const categories: HabitCategory[] = ['physical', 'spiritual', 'creator', 'mental', 'social'];

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const SortableHabitRow = ({
  habit,
  isEditing,
  onEditStart,
  onEditCancel,
  onUpdate,
  onDelete
}: {
  habit: Habit;
  isEditing: boolean;
  onEditStart: () => void;
  onEditCancel: () => void;
  onUpdate: (id: string, updates: Partial<Omit<Habit, 'id'>>) => void;
  onDelete: (id: string) => void;
}) => {
  const dragControls = useDragControls();
  const [editName, setEditName] = useState(habit.name);
  const [editXp, setEditXp] = useState(habit.xp);
  const [editCategory, setEditCategory] = useState<HabitCategory>(habit.category);
  const [editFrequency, setEditFrequency] = useState<number[]>(habit.frequency || []);

  const saveEdit = () => {
    if (editName.trim()) {
      onUpdate(habit.id, {
        name: editName.trim(),
        xp: editXp,
        category: editCategory,
        frequency: editFrequency.length > 0 ? editFrequency : undefined
      });
    }
  };

  const toggleDay = (dayIndex: number) => {
    setEditFrequency(prev => {
      if (prev.includes(dayIndex)) {
        return prev.filter(d => d !== dayIndex);
      } else {
        return [...prev, dayIndex].sort();
      }
    });
  };

  return (
    <Reorder.Item
      value={habit}
      dragListener={false}
      dragControls={dragControls}
      className="bg-secondary/50 rounded-lg p-3"
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="input-field"
            autoFocus
          />

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              XP: {editXp}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={editXp}
              onChange={(e) => setEditXp(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                       [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Frequency (Select days)
            </label>
            <div className="flex justify-between gap-1">
              {DAYS.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`
                    w-7 h-7 rounded text-xs font-medium transition-all
                    ${editFrequency.includes(index)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setEditCategory(cat)}
                className={`
                  px-2 py-1 rounded text-xs font-medium transition-all
                  ${editCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="flex-1 btn-primary flex items-center justify-center gap-1 py-2"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={onEditCancel}
              className="btn-ghost flex items-center justify-center gap-1 py-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <GripVertical
            size={18}
            className="text-muted-foreground/50 cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={(e) => dragControls.start(e)}
          />

          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{habit.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-1.5 py-0.5 rounded ${CATEGORY_COLORS[habit.category]}`}>
                {CATEGORY_LABELS[habit.category]}
              </span>
              <span className="text-xs text-primary font-medium">+{habit.xp} XP</span>
            </div>
          </div>

          <button
            onClick={onEditStart}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Edit2 size={16} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => onDelete(habit.id)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Trash2 size={16} className="text-destructive" />
          </button>
        </div>
      )}
    </Reorder.Item>
  );
};


export function SettingsView({ habits, onUpdateHabit, onDeleteHabit, onReorderHabits }: SettingsViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterDay, setFilterDay] = useState<number | null>(null);

  const visibleHabits = filterDay !== null
    ? habits.filter((h) => !h.frequency || h.frequency.length === 0 || h.frequency.includes(filterDay))
    : habits;

  const handleReorder = (newOrderedSplit: Habit[]) => {
    if (filterDay === null) {
      onReorderHabits(newOrderedSplit);
      return;
    }

    // Map the new order back to the global list
    const newGlobalHabits = [...habits];
    // Get indices of visible habits in the original list
    const visibleIndices = habits
      .map((h, i) => (visibleHabits.some(vh => vh.id === h.id) ? i : -1))
      .filter(i => i !== -1);

    // Assign new habits to those indices
    visibleIndices.forEach((globalIndex, i) => {
      newGlobalHabits[globalIndex] = newOrderedSplit[i];
    });

    onReorderHabits(newGlobalHabits);
  };

  const handleUpdate = (id: string, updates: Partial<Omit<Habit, 'id'>>) => {
    onUpdateHabit(id, updates);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <CharacterSelect />

      <div className="card-elevated">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground font-heading">Manage Habits</h3>
            {filterDay !== null && (
              <button
                onClick={() => setFilterDay(null)}
                className="text-xs text-primary hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by day:</span>
            <div className="flex gap-1">
              {DAYS.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setFilterDay(current => current === index ? null : index)}
                  className={`
                    w-6 h-6 rounded text-xs font-medium transition-all
                    ${filterDay === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Reorder.Group axis="y" values={visibleHabits} onReorder={handleReorder} className="space-y-3">
          {visibleHabits.map((habit) => (
            <SortableHabitRow
              key={habit.id}
              habit={habit}
              isEditing={editingId === habit.id}
              onEditStart={() => setEditingId(habit.id)}
              onEditCancel={() => setEditingId(null)}
              onUpdate={handleUpdate}
              onDelete={onDeleteHabit}
            />
          ))}
        </Reorder.Group>
      </div>

      <div className="card-elevated">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Data Management</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Export your data to transfer it to another device, or import a backup.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                const data = {
                  habits: localStorage.getItem('atomicxp_habits'),
                  history: localStorage.getItem('atomicxp_history'),
                  character: localStorage.getItem('atomicxp_character_v2')
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `atomicxp-backup-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="btn-secondary flex items-center justify-center gap-2 py-3"
            >
              <Download size={18} />
              Export File
            </button>

            <button
              onClick={() => {
                const data = {
                  habits: localStorage.getItem('atomicxp_habits'),
                  history: localStorage.getItem('atomicxp_history'),
                  character: localStorage.getItem('atomicxp_character_v2')
                };
                navigator.clipboard.writeText(JSON.stringify(data));
                alert('Data copied to clipboard!');
              }}
              className="btn-secondary flex items-center justify-center gap-2 py-3"
            >
              <Copy size={18} />
              Copy Data
            </button>
          </div>

          <div className="pt-2 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Import Data</h4>
            <textarea
              className="input-field min-h-[100px] mb-2 font-mono text-xs"
              placeholder="Paste your backup JSON here..."
              id="import-area"
            />
            <button
              onClick={() => {
                try {
                  const input = (document.getElementById('import-area') as HTMLTextAreaElement).value;
                  if (!input) return;

                  const data = JSON.parse(input);

                  if (data.habits) localStorage.setItem('atomicxp_habits', data.habits);
                  if (data.history) localStorage.setItem('atomicxp_history', data.history);
                  if (data.character) localStorage.setItem('atomicxp_character_v2', data.character);

                  alert('Data imported successfully! The app will now reload.');
                  window.location.reload();
                } catch (e) {
                  alert('Invalid data format. Please check your backup string.');
                  console.error(e);
                }
              }}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Upload size={18} />
              Import Data
            </button>
          </div>
        </div>
      </div>

      <div className="card-elevated">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Help & Support</h3>

        <button
          onClick={resetGuide}
          className="btn-secondary w-full flex items-center justify-center gap-2 py-3 mb-4"
        >
          <HelpCircle size={18} />
          Show Guided Tour
        </button>

        <h3 className="text-lg font-semibold text-foreground mb-2 mt-6 font-heading">About</h3>
        <p className="text-sm text-muted-foreground">
          AtomicXP helps you build better habits through gamification.
          Complete habits to earn XP and track your progress over time.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-4">
          Data is stored locally on your device.
        </p>
      </div>
    </div>
  );
}
