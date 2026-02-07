// Step 1: Import React (this allows us to use JSX)
import React, { useState } from "react";
import "./App.css";

// Step 2: Create our main App component
function App() {
  // Step 3: Create state to store our todos
  // useState is like a memory box for our component
  const [todos, setTodos] = useState([
    //todos = current state (read-only) - setTodos = function to update state
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a To-Do app", completed: true }, //default(Scrached)
    { id: 3, text: "Understand components", completed: false },
  ]);

  // Step 4: State for new todo input
  const [newTodo, setNewTodo] = useState("");

  // Step 5: Function to add a new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(), // Creates a unique ID using timestamp
        text: newTodo,
        completed: false,
      };

      // Update todos state by adding new todo
      setTodos([...todos, newTodoItem]);

      // Clear the input field
      setNewTodo("");
    }
  };

  // Step 6: Function to toggle todo completion
  const toggleTodo = (id) => {
    // Create a new array with the updated todo
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  // Step 7: Function to delete a todo
  const deleteTodo = (id) => {
    // Filter out the todo with the matching id
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  // Step 8: Render our component
  return (
    <div className="App">
      <h1>My Simple To-Do List</h1>

      {/* Step 9: Add todo form */}
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()} //works when you press enter key or add-to-do button
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* Step 10: Display todo list */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Step 11: Display stats */}
      <div className="stats">
        <p>
          Total: {todos.length} | Completed:{" "}
          {todos.filter((todo) => todo.completed).length} | Pending:{" "}
          {todos.filter((todo) => !todo.completed).length}
        </p>
      </div>
    </div>
  );
}

export default App;
