import { AddHabitProps } from "@/types/habits";

export function AddHabit({
  habitValue,
  handleOnChange,
  handleSubmit,
}: AddHabitProps) {
  return (
    <div className="flex flex-col items-center">
      <input
        className="my-4 w-full max-w-xs rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add habit here..."
        onChange={handleOnChange}
        value={habitValue}
        required
      />
      <button
        className="w-full max-w-xs bg-blue-500 text-white rounded p-2 mb-2 hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        Add habit
      </button>
    </div>
  );
}
