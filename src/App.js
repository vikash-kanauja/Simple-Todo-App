import { useState } from "react";
import Button from "react-bootstrap/Button";
import TodoItem from "./component/TodoItem.js";
import DeleteConfirmation from "./component/DeleteConfirmationPopup.js";
// import DeleteConfirmation from "./component/DeleteConfirmationModal.js";
function App() {
  // State variables
  const [todoList, setTodoList] = useState([]); // State for storing todo tasks
  const [todoInputText, setTodoInputText] = useState(""); // State for input value
  const [inputError, setInputError] = useState(true); // State for input validation
  const [editTodoId, setEditTodoId] = useState(null); // State for tracking todo item id being updated
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  // Function to toggle todo completion status
  const showOrHideCompleteBadge = (id) => {
    // showOrHideCompleteBadge
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
    setTodoInputText(value);
    // Validate input (not empty)
    setInputError(value.trim() !== "");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Check if an existing todo is being updated
    if (editTodoId) {
      // Update existing todo.
      setTodoList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTodoId ? { ...task, text: todoInputText.trim() } : task
        )
      );
      setTodoInputText("");
      setEditTodoId(null);
    } else {
      // Add new todo
      setTodoList((prev) => [
        {
          id: prev.length + 1,
          text: todoInputText.trim(),
          completed: false,
        },
        ...prev,
      ]);
      setTodoInputText(""); // Clear input
    }
  };

  // Function to update a todo
  const editTodo = (todo) => {
    setTodoInputText(todo.text); // Set input value to todo text
    setEditTodoId(todo.id); // EditTodoId id to the id of the todo being updated
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setDeleteTodoId(id);
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const deleteTodo = (id) => {
    setTodoList(todoList.filter((data) => data.id !== id));
    setEditTodoId(null);
    setTodoInputText("");
    setDisplayConfirmationModal(false);
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
            task={task}
            showOrHideCompleteBadge={showOrHideCompleteBadge}
            editTodo={editTodo}
            showDeleteModal={showDeleteModal}
          />
        ))}
        {/* Todo input form */}
        <div className="my-4">
          <div className="my-2">
            {editTodoId ? <h4>Update Todo</h4> : <h4>Todo</h4>}
          </div>
          <input
            type="text"
            placeholder=""
            className={` ${inputError ? "" : "border-danger border"
              } form-control w-100 p-2 my-2 shadow-none `}
            value={todoInputText}
            onChange={handleInputChange}
          />
          {/* Submit button */}
          <Button
            variant="light"
            className={`${!inputError ? "opacity-10 " : ""}   border-1 border-secondary`}
            onClick={handleSubmit}
            disabled={!todoInputText.trim()}
          >
            {editTodoId ? "Update" : "Submit"}
          </Button>{" "}
        </div>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={deleteTodo} hideModal={hideConfirmationModal} id={deleteTodoId} message={"Are you sure you want to delete the Task ?"} />
      </div>
    </>
  );
}

export default App;
