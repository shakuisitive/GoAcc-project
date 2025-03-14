"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList"; // Update path if needed
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  const addTask = async (title: string) => {
    try {
      await supabase
        .from("tasks")
        .insert({ task_name: title, user_id: session?.user.id });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Tasks
      </h1>
      <TaskForm onSubmit={addTask} />
      <div className="mt-4">
        <TaskList />
      </div>
    </div>
  );
}