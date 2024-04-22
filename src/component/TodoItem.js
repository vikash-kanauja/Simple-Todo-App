import React from 'react'

const TodoItem = ({id,task,toggle}) => {
  const handleChange = () =>{
    toggle(id); 
  }
  console.log(task)
  return (
    <div className='list w-100 w-bg-light border align-middle p-2 d-flex justify-content-between' key={id}>
      <div className='d-flex pl-2'>
        <input type='checkbox'
        checked={task.completed}
        onChange = {handleChange}/>
        <p className='mb-0 px-2'>{task.text}</p>
        </div>
        {task.completed && <span className="badge rounded-pill text-bg-secondary">Complete</span>}
    </div>
  )
}

export default TodoItem;