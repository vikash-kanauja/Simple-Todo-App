import React from "react";
import { MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

const TodoItem = ({ id, task, toggle, deleteTodo, updateTodo }) => {
    // Function to handle checkbox change
    const handleChange = () => {
        toggle(id);
    };
    return (
        // Container for todo item
        <div
            className="list w-100 w-bg-light border align-middle p-2 d-flex justify-content-between"
            key={id} >
            {/* Todo content */}
            <div className="d-flex pl-2">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleChange}
                />
                <p className="mb-0 px-2">{task.text}</p>
            </div>
            <div className="d-flex justify-content-cente .align-items-center gap-2">
                {task.completed && (
                    <span className="badge rounded-pill text-bg-secondary">Complete</span>
                )}
                {/* Buttons for deleting and editing todo */}

                <MdDelete onClick={() => deleteTodo(id)} />
                <RiEditBoxFill onClick={() => updateTodo(id)} /> 
            </div>
        </div>
    );
};

export default TodoItem;
