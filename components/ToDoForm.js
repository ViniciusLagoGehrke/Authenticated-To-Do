import React, {useState, useContext } from 'react'
import { ToDoContext } from '../contexts/ToDoContext';

export default function ToDoForm() {
  const [toDo, setToDo] = useState('');
  const { addToDo } = useContext(ToDoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToDo(toDo);
    setToDo('');
    console.log(toDo);
  }
  return (
    <Form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label className="font-bold mb-2 text-gray-800" htmlFor="toDo">ToDo</label>
        <input
          type="text"
          name="toDo"
          id="toDo"
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          placeholder="ex. Finish ToDo app"
          className="border border-gray-300 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"

      >
        Submit
      </button>
    </Form>
  )
}
