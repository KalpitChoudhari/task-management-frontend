import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import axios from 'axios';
import { toast } from 'sonner';
import SelectDemo from '../CustomSelect';
import { COLORS } from '../../constant';

const UpdateTaskDialog = props => {
  const { task, open, onClose } = props;
  const { title: name, description, id, status } = task;
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleUpdate = e => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const description = e.target.description.value;
    const status = selectedStatus;

    axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, {
      title: name,
      description,
      color: COLORS[status],
      status: status
    }, {
      headers: {
        'Authorization': localStorage.getItem('_user_access_token')
      }
    }).then(_ => {
      toast.success('Task updated successfully!');
      onClose(false);
      setTimeout(() => window.location.reload(), 200);
    }).catch(({ response }) => {
      if (response.status === 404) {
        toast.error('Task not found!');
      } else {
        console.log('error', response);
        toast.error(response.data?.errors?.join(', '))
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none" data-state="open">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Update task
          </Dialog.Title>
          <form onSubmit={handleUpdate}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                Name
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                defaultValue={name}
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="description">
                Description
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="description"
                defaultValue={description}
              />
            </fieldset>
            <fieldset className="ml-2 mt-5 mb-[15px] flex items-center gap-5">
              <SelectDemo selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button className="bg-green4 text-green11 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none border" type="submit">
                Update
              </button>
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

export default UpdateTaskDialog;
