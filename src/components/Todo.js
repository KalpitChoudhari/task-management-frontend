import { useDrag } from "react-dnd";

const Todo = props => {
  const { day, title, description, timestamp, color, id } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div ref={drag} className={`rounded-lg flex px-5 py-2 items-start flex-col justify-start mt-2 ${isDragging ? 'opacity-20' : 'opacity-100'}`} style={{backgroundColor: color}}>
      <div className="text-xs mb-2">
        {day}
      </div>
      <div className="text-xl antialiased">
        {title}
      </div>
      <div className="text-xs antialiased text-wrap text-start mt-1 h-10 overflow-scroll">
        {description}
      </div>
      <div className="mt-3 text-xs font-medium">
        {timestamp}
      </div>
    </div>
  )
}

export default Todo;
