import { useEffect, useState } from "react";
import withAuth from "./withAuth";
import axios from "axios";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Section from "./Section";
import TaskDialog from "./Task/TaskDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const authToken = localStorage.getItem('_user_access_token');
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/tasks`, {
            headers: {
              'Authorization': authToken
            }
          });
          setTasks(response.data);
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem('_user_access_token');
            toast.error('You need to sign in to access this page');
          }
          console.log(error);
        }
      }
      fetchTasks();
    }
  }, [authToken])

  const handleSignOut = () => {
    const token = localStorage.getItem('_user_access_token');
    axios.delete(`${process.env.REACT_APP_BASE_URL}/users/sign_out`, {
      headers: {
        'Authorization': token
      }
    }
    ).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('_user_access_token');
        navigate('/sign-in');
      }
    }).catch((error) => {
      console.log(error);
    })
  }

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
      <div className="flex justify-between items-center">
        <TaskDialog />
        <button className="mt-5 text-violet11 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none border" onClick={handleSignOut}>
            Sign Out
        </button>
      </div>
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
