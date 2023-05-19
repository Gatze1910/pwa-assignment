import React, { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todo")
      .select("*")
      .order("id", true);
    if (error) console.log("error", error);
    else setTodos(todos);
  };

  const addTodo = async (taskText) => {
    let task = taskText.trim();
    if (task.length) {
      let { data: todo, error } = await supabase
        .from("todo")
        .insert({ task, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
    setNewTaskText("");
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from("todo").delete().eq("id", id);
      setTodos(todos.filter((x) => x.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-heading">Your Todo List</h1>
      <div className="todo-input">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="Add a new todo"
          value={newTaskText}
          onChange={(e) => {
            setError("");
            setNewTaskText(e.target.value);
          }}
        />
        <button className="btn-black" onClick={() => addTodo(newTaskText)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="todo-list">
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Todo = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from("todo")
        .update({ is_complete: !isCompleted })
        .eq("id", todo.id)
        .single();
      if (error) {
        throw new Error(error);
      }
      setIsCompleted(data.is_complete);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <li
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
      className="todo-item"
    >
<div className="todo">
  <label className="checkbox">
    <input
      className="checkbox-input"
      onChange={(e) => toggle()}
      type="checkbox"
      checked={isCompleted ? true : ""}
    />
    {todo.task}
  </label>
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onDelete();
    }}
    className="delete-button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="delete-icon">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</div>

    </li>
  );
};

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);

export default Todos;
