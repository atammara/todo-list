import Image from "next/image";

import TodoList from './components/TodoList';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <TodoList />
    </main>
  );
}
