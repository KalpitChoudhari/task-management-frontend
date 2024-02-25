import { useEffect, useState } from "react";
import withAuth from "./withAuth";
import axios from "axios";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Section from "./Section";

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

  const sections = ['todo', 'in_progress', 'completed'];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#f4f4f4] rounded" style={{ height: '700px' }}>
        <div className="grid grid-cols-3 grid-flow-col gap-3 p-2">
          {
            sections.map(section => {
              return (
                <Section
                  key={section}
                  name={section}
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
