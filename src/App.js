import TodoItem from "./component/TodoItem.js"; 
import Button from "react-bootstrap/Button"; 
import { useState } from "react"; 

function App() {
  // State variables
  const [todos, setTodos] = useState([]); // State for storing todo tasks
  const [todoText, setTodoText] = useState(""); // State for input value
  const [inputValid, setInputValid] = useState(true); // State for input validation
  const [id, setId] = useState(null); // State for tracking todo item id being updated

  // Function to toggle todo completion status
  const toggle = (id) => {
    setTodos(
      todos.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  // Function to handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setTodoText(value);
    // Validate input (not empty)
    setInputValid(value.trim() !== "");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input on submit
    if (todoText.trim() === "") {
      setInputValid(false);
      return;
    }
    // Check if an existing todo is being updated
    if (id !== null) {
      // Update existing todo
      setTodos((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, text: todoText.trim() } : task
        )
      );
      setTodoText(""); // Clear input
      setId(null); // Clear id
    } else {
      // Add new todo
      setTodos((prev) => [
        {
          id: prev.length + 1,
          text: todoText.trim(),
          completed: false,
        },
        ...prev,
      ]);
      setTodoText(""); // Clear input
    }
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((data) => data.id !== id));
    setId(null);
    setTodoText(""); 
  };

  // Function to update a todo
  const updateTodo = (id) => {
    const newData = todos.filter((data) => data.id === id);
    setTodoText(newData[0].text); // Set input value to todo text
    setId(newData[0].id); // Set id to the id of the todo being updated
  };

  return (
    <>
      <div className="container ">
        {/* Conditional rendering based on todo list length */}
        <div className="my-4">
        {todos.length < 1 ? <h1>Todo is empty</h1> : <h1>Todo App</h1>}
        </div>
        {/* Rendering todo items */}
        {todos.map((task, index) => (
          <TodoItem
            key={index}
            id={task.id}
            task={task}
            toggle={toggle}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
        {/* Todo input form */}
        <div className="my-2">
       { id ?<h4>Update Todo</h4>:<h4>Todo</h4>} 
       </div>
        <input
          type="text"
          className={` ${
            inputValid ? "" : "border-danger border"
          } form-control w-100 p-2 my-2 shadow-none `}
          value={todoText}
          onChange={handleChange}
        />
        {/* Submit button */}
        <Button
          variant="light"
          className="border-1 border-secondary"
          onClick={handleSubmit}
        >
         {id  ? "Update" : "Submit"} 
        </Button>{" "}
      </div>
    </>
  );
}

export default App;
