import { useDrag } from "react-dnd";
import UpdateTaskDialog from "./Task/UpdateTaskDialog";
import { useState } from "react";
import UpdateTaskIndicator from "./UpdateTaskIndicator";
import DeleteTaskIndicator from "./DeleteTaskIndicator";
import axios from "axios";
import { toast } from "sonner";

const Todo = props => {
  const { task, day } = props;
  const { title, description, timestamp, color, id } = task;
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const handleTaskNameClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const deleteTask = () => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/tasks/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('_user_access_token')
      }
    })
    .then(() => {
      toast.info('Task deleted successfully!');
      setTimeout(() => window.location.reload(), 200);
    }).catch(err => {
      console.error(err);
    });
  }

  return (
    <div
      ref={drag}
      className={`rounded-lg flex px-5 py-2 items-start justify-between mt-2 ${isDragging ? 'opacity-20' : 'opacity-100'}`}
      style={{backgroundColor: color, transform: 'translate(0, 0)'}}
    >
      <div className="text-start">
        <div className="text-xs mb-2">
          {day}
        </div>
        <div className="text-xl antialiased cursor-pointer" onClick={handleTaskNameClick}>
          {title}
        </div>
        <div className="text-xs antialiased text-wrap text-start mt-1 h-10 overflow-scroll">
          {description}
        </div>
        <div className="mt-3 text-xs font-medium">
          {timestamp}
        </div>
      </div>
      <div className="flex flex-col justify-between h-[100px]">
        <UpdateTaskIndicator openUpdateModal={() => setIsUpdateDialogOpen(true)} task={task} />
        <DeleteTaskIndicator deleteTask={deleteTask} />
      </div>
      <UpdateTaskDialog open={isUpdateDialogOpen} task={task} onClose={() => setIsUpdateDialogOpen(false)} />
    </div>
  )
}

export default Todo;
