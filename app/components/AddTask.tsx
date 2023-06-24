"use client";
import React, { FormEventHandler, useState } from "react";
import { BsFillClipboardPlusFill } from "react-icons/bs";
import { icons } from "react-icons";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModelOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModelOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setModelOpen(true)}
        className="btn btn-primary w-full"
      >
        {" "}
        Add New Task
        <BsFillClipboardPlusFill className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModelOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          <div className="modal-action">
            <input
              autoFocus
              className="input input-bordered w-full border  focus:border-blue-500 focus:outline-none focus:ring-blue-500 focus:ring-2 p-2 cursor-text"
              type="text"
              placeholder="Type here"
              value={newTaskValue}
              onChange={(event) => setNewTaskValue(event.target.value)}
            />
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
