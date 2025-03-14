"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import { supabase } from "@/utils/supabaseClient";
import TaskForm from "@/components/TaskForm";

export default function EditTask() {
  const [task, setTask] = useState<string>('');  // State for task title
  const router = useRouter();
  const params = useParams();  // Get the task ID from URL params

  useEffect(() => {
    if (params?.id) {
      fetchTask();  // Fetch task if editing
    }
  }, [params?.id]);  // Dependency array ensures this runs when ID changes

  // Fetch the task from Supabase based on the task ID
  const fetchTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('title')
      .eq('id', params.id as string)
      .single();

    if (error) {
      console.error("Error fetching task:", error);
    } else {
      setTask(data?.title || '');  // Set task title to state
    }
  };

  // If ID exists, it's an edit; otherwise, it's a new task
  const isEditMode = Boolean(params?.id);

  const handleTaskSubmit = async (title: string) => {
    if (isEditMode) {
      await updateTask(title);
    } else {
      await addTask(title);
    }
  };

  const updateTask = async (title: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ title, is_edited: true })  // Mark task as edited
      .eq('id', params.id as string);
    
    if (!error) {
      router.push('/dashboard');
    } else {
      console.error("Error updating task:", error);
    }
  };

  const addTask = async (title: string) => {
    const { error } = await supabase
      .from('tasks')
      .insert({ title });

    if (!error) {
      router.push('/dashboard');
    } else {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{isEditMode ? "Edit Task" : "Add Task"}</h1>
      <TaskForm onSubmit={handleTaskSubmit} initialValue={task} />
    </div>
  );
}
