import { useState } from "react";
import TodoItem from "./component/TodoItem.js";
import Button from "react-bootstrap/Button";


function App() {
  // State variables
  const [todoList, setTodoList] = useState([]); // State for storing todo tasks
  const [inputText, setInputText] = useState(""); // State for input value
  const [inputError, setInputError] = useState(true); // State for input validation
  const [editTodoId, setEditTodoId] = useState(null); // State for tracking todo item id being updated

  // Function to toggle todo completion status
  const toggleCompleteBadge = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    // Validate input (not empty)
    setInputError(value.trim() !== "");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Validate input on submit
    if (inputText.trim() === "") {
      setInputError(false);
      return;
    }
    // Check if an existing todo is being updated
    if (editTodoId !== null) {
      // Update existing todo.
      setTodoList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTodoId ? { ...task, text: inputText.trim() } : task
        )
      );
      setInputText(""); // Clear input
      setEditTodoId(null); // Clear id
    } else {
      // Add new todo
      setTodoList((prev) => [
        {
          id: prev.length + 1,
          text: inputText.trim(),
          completed: false,
        },
        ...prev,
      ]);
      setInputText(""); // Clear input
    }
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodoList(todoList.filter((data) => data.id !== id));
    setEditTodoId(null);
    setInputText("");
  };

  // Function to update a todo
  const editTodo = (todo) => {
    setInputText(todo.text); // Set input value to todo text
    setEditTodoId(todo.id); // EditTodoId id to the id of the todo being updated
  };

  return (
    <>
      <div className="container ">
        <div className="my-4">
          <h1>Todo App</h1>
        </div>
        {/* Rendering todo items */}
        {todoList.map((task, index) => (
          
          <TodoItem
            key={index}
            id={task.id}
            task={task}
            toggleCompleteBadge={toggleCompleteBadge}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
        {/* Todo input form */}
        <div className="my-4">
        <div className="my-2">
          {editTodoId ? <h4>Update Todo</h4> : <h4>Todo</h4>}
        </div>
        <input
          type="text"
          className={` ${inputError ? "" : "border-danger border"
            } form-control w-100 p-2 my-2 shadow-none `}
          value={inputText}
          onChange={handleInputChange}
        />
        {/* Submit button */}
        <Button
          variant="light"
          className={ `${!inputError ? "opacity-10 " : "" }   border-1 border-secondary`}
          onClick={handleSubmit}
          disabled={!inputText.trim()}
          
        >
          {editTodoId ? "Update" : "Submit"}
        </Button>{" "}
        </div>
      </div>
    </>
  );
}

export default App;
