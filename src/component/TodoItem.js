import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";



const TodoItem = ({ id, task, toggleCompleteBadge, deleteTodo, editTodo }) => {
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
                    // onChange={handleChange}
                    onChange={()=>toggleCompleteBadge(id)}
                />
                <p className="mb-0 px-2">{task.text}</p>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2">
                {task.completed && (
                    <span className="badge rounded-pill text-bg-success">Complete</span>
                )}
                {/* Buttons for deleting and editing todo */}
                <RiDeleteBin5Fill className="text-danger " role="button" onClick={() => deleteTodo(id)} />
                 <MdOutlineModeEditOutline role="button" className="text-md-danger fs-xl-1" onClick={() => editTodo(task)} />
            </div>
        </div>
    );
};

export default TodoItem;
