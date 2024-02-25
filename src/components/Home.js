import { useEffect, useState } from "react";
import withAuth from "./withAuth";
import axios from "axios";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Section from "./Section";
import TaskDialog from "./Task/TaskDialog";

const Home = () => {
  const authToken = localStorage.getItem('_user_access_token');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (authToken) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/v1/tasks', {
            headers: {
              'Authorization': authToken
            }
          });
          setTasks(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchTasks();
    }
  }, [authToken])

  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const todoTasks = tasks.filter(task => task.status === 'todo');

  const sections = [
    {
      name: 'todo',
      color: '#ff8949'
    },
    {
      name: 'in_progress',
      color: '#ffcc00'
    },
    {
      name: 'completed',
      color: '#00cc66'
    }
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <TaskDialog />
      <div className="bg-[#f4f4f4] rounded mt-2">
        <div className="grid grid-cols-3 grid-flow-col gap-3 p-2 overflow-y-auto" style={{ height: '680px' }}>
          {
            sections.map(section => {
              return (
                <Section
                  key={section.name}
                  name={section.name}
                  sectionColor={section.color}
                  setTasks={setTasks}
                  inProgressTasks={inProgressTasks}
                  completedTasks={completedTasks}
                  todoTasks={todoTasks}
                />
              )
            })
          }
      </div>
    </div>
  </DndProvider>
  );
}

export default withAuth(Home);
