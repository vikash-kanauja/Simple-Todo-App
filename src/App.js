import TodoItem from "./component/TodoItem.js";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctor Appointment',
      completed: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      completed: false
    }
  ]);
  
  const toggle = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };
  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        {tasks.map((task) => {
          return (
            <TodoItem key={task.id} id={task.id} task={task} toggle={toggle} />
          );
        })}

        <h2>Todo</h2>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e)=>e.target.value}
          />
        </InputGroup>
        <Button variant="light" className="border-1 border-secondary" >Submit</Button>{' '}
      </div>
    </>
  );
}

export default App;