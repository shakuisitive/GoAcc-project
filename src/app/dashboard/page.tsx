"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin"); // Faster redirect
    }
  }, [status, router]);

  // Fetch tasks if user is authenticated
  useEffect(() => {
    if (session?.user?.id) {
      fetchTasks();
    }
  }, [session?.user?.id]);

  const fetchTasks = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("tasks")
      .select()
      .eq("user_id", session?.user?.id)
      .order("created_at", { ascending: false });

    setTasks(data || []);
    setIsLoading(false);
  };

  const addTask = async (title: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert({ title, user_id: session?.user?.id })
      .select();
    if (!error && data) {
      setTasks([data[0], ...tasks]); // Add new task to the top
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // **Show loader while checking authentication or fetching tasks**
  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Tasks</h1>
      <TaskForm onSubmit={addTask} />
      <div className="space-y-2 mt-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              onDelete={deleteTask}
              isEdited={task.is_edited} // Mark if edited
            />
          ))
        )}
      </div>
    </div>
  );
}
