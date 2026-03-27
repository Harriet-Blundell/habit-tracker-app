import { HabitProps } from "@/types/habits";

export default function Habit({ habit, onToggle, onDelete }: HabitProps) {
  const { id, completedToday, name, streak } = habit;
  return (
    <div className="flex items-center gap-3 py-2">
      <input
        type="checkbox"
        checked={completedToday}
        onChange={(e) => {
          const { checked } = e.target;
          onToggle(id, checked);
        }}
        className="w-5 h-5 accent-blue-500 rounded-full focus:ring-0 focus:ring-blue-500 border border-gray-300"
      />
      <span
        className={`${
          completedToday ? "line-through text-gray-400" : "text-white"
        }`}
      >
        {name}
      </span>
      {streak > 0 && (
        <>
          <span className="">🔥</span>
          <span className="">{streak}</span>
        </>
      )}
      <button
        className="ml-auto shrink-0 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}
