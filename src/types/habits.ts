export type HabitWithTodayStatus = {
  id: string;
  name: string;
  completedToday: boolean;
  streak: number;
};

export type AddHabitProps = {
  habitValue: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

export type HabitProps = {
  habit: HabitWithTodayStatus;
  onToggle: (habitId: string, checked: boolean) => void;
  onDelete: (habitId: string) => void;
  onViewHistory: (habitId: string) => void;
};
