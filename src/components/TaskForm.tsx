import { useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string) => Promise<void>;
  initialValue?: string;
}

export default function TaskForm({ onSubmit, initialValue = '' }: TaskFormProps) {
  const [title, setTitle] = useState(initialValue);  // Set initial value from props

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;  // Prevent empty task submission
    await onSubmit(title);  // Call onSubmit passed as prop
    setTitle('');  // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}  // Bind input value to state
        onChange={(e) => setTitle(e.target.value)}  // Update state on input change
        placeholder="Enter a new task"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {initialValue ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
