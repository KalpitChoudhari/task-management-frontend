import { useDrop } from "react-dnd";
import Indicator from "./Indicator";
import Todo from "./Todo";
import axios from "axios";

const Section = props => {
  const { name, setTasks, inProgressTasks, completedTasks, todoTasks, sectionColor } = props;

  let currentTasks = [];

  if (name === 'todo') {
    currentTasks = todoTasks;
  } else if (name === 'in_progress') {
    currentTasks = inProgressTasks;
  } else if (name === 'completed') {
    currentTasks = completedTasks;
  }

  const addItemToColumn = id => {
    setTasks(prev => {
      const mTasks = prev.map(task => {
        if (task.id === id) {
          return { ...task, status: name };
        }
        return task;
      })
      return mTasks;
    });

    axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, {
      id: id,
      status: name,
      color: sectionColor
    },
    {
      headers: {
        'Authorization': localStorage.getItem('_user_access_token')
      }
    }
    ).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToColumn(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  return (
    <div className="h-full" ref={drop}>
      <div className="bg-white rounded-md flex justify-between px-5 py-1 items-center mb-5 top-0 z-50">
        <span className="antialiased text-sm capitalize">{name.replace("_"," ")}</span>
        <Indicator color={sectionColor} />
      </div>
      {
        currentTasks.map(task => (
          <Todo key={task.id} task={task} day="Today" />
        ))
      }
    </div>
  )
}

export default Section;
