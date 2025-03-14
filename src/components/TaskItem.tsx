import Link from "next/link";
import { Trash2, Edit } from "lucide-react";

interface TaskItemProps {
  id: string;
  title: string;
  onDelete: (id: string) => Promise<void>;
  isEdited?: boolean;  // Added prop to check if task was edited
}

export default function TaskItem({ id, title, onDelete, isEdited }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <span>{title}</span>
        {isEdited && (
          <span className="ml-2 text-sm text-green-500">(Edited)</span>  // Display "Edited"
        )}
      </div>
      <div className="flex gap-2">
        <Link href={`/dashboard/edit/${id}`}>
          <Edit className="w-5 h-5 text-blue-500 cursor-pointer" />
        </Link>
        <Trash2
          className="w-5 h-5 text-red-500 cursor-pointer"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
}
