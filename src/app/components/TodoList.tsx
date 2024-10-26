"use client";
import React, { useState, useEffect } from 'react';

interface Task {
  text: string;
  completed: boolean;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

export default function TodoList() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Incomplete'>('All');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (priority: 'Low' | 'Medium' | 'High') => {
    if (task) {
      const newTask = { text: task, completed: false, dueDate: "2024-10-31", priority }; // Set default due date
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || 
                          (filter === 'Completed' && t.completed) || 
                          (filter === 'Incomplete' && !t.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col items-center mt-10 bg-veryLightGray p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-5 text-darkGreen">To-Do List</h1>
      
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="px-4 py-2 border border-lightGreen rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-lightGreen"
          placeholder="New Task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')} className="border border-lightGreen rounded-lg">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={() => addTask(priority)}
          className="bg-lightGreen text-white px-4 py-2 rounded-lg hover:bg-darkGreen transition duration-200"
        >
          Add
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border border-lightGreen rounded-lg mb-4"
      />
      
      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select onChange={(e) => setFilter(e.target.value as 'All' | 'Completed' | 'Incomplete')} className="border border-lightGreen rounded-lg">
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <ul className="w-72">
        {filteredTasks.map((t, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 border border-gray-300 rounded-lg mb-2 ${t.completed ? "line-through text-gray-500 bg-lightGray" : "bg-white"}`}
          >
            <span onClick={() => toggleTaskCompletion(index)} className="cursor-pointer text-lg text-gray-800">
              {t.text} - <span className={`text-sm text-gray-500`}>{t.dueDate}</span>
            </span>
            <button onClick={() => removeTask(index)} className="text-red-500 hover:text-red-700 transition duration-200">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
