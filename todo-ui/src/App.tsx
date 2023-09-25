import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form';
import Options from './Options';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState(false);
  const [options, setOptions] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4200/api/task/get-tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [form, options, update]);

  const closeForm = () => {
    setForm(false);
  }

  return (
    <div>
      <button onClick={() => setForm(!form)}>Add task</button>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            border: '1px solid grey',
            borderRadius: '10px',
            padding: '10px',
            margin: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 400,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span>{task.title}</span>
            <span>{task.description}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span>{task.status}</span>
            <button onClick={() => setOptions(!options)}>Options</button>
          </div>
          {options && <Options id={task.id} close={() => setOptions(false)} update={() => setUpdate(!update)}/>}
        </div>
      ))}
      {form && <Form onClick={closeForm}/>}
    </div>
  );
}

export default App;
