import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import axios from 'axios';
import { COLORS } from '../../constant';
import { toast } from 'sonner';

const TaskDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const description = e.target.description.value;
  
    axios.post('http://localhost:4000/api/v1/tasks', {
      title: name,
      description,
      status: 'todo',
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }, {
      headers: {
        'Authorization': localStorage.getItem('_user_access_token')
      }
    }).then(_ => {
      toast.success('Task created successfully!');
      setOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    }).catch(({ response }) => {
      console.log('error', response.data.errors);
      toast.error(response.data.errors.join(', '))
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="mt-5 text-violet11 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none border">
          Create Task
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none" data-state="open">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Create a new task
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Create task by adding name, description and due date
          </Dialog.Description>
          <form onSubmit={handleSubmit}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                Name
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                defaultValue="New Task"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="description">
                Description
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="description"
                defaultValue="Description for task"
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              {/* <Dialog.Close asChild> */}
                <button className="bg-green4 text-green11 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none border" type="submit">
                    Create
                </button>
              {/* </Dialog.Close> */}
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              type="button"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TaskDialog;
