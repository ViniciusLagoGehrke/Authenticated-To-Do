import React, {useContext} from 'react'
import {ToDoContext} from '../contexts/ToDoContext';

export default function ToDo({ toDo }) {

  const {updateToDo, deleteToDo} = useContext(ToDoContext);

  const handleToggleCompleted = () => {
    const updatedFields = {
      ...toDo.fields,
      completed: !toDo.fields.completed
    }
    const updatedToDo = {id: toDo.id, fields: updatedFields };
    updateToDo(updatedToDo);
  }

  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={toDo.fields.completed}
        className="mr-2 form-checkbox h-5 w-5"
        onChange={handleToggleCompleted}
      />
      <p className={`flex-1 text-gray-800 ${
        toDo.fields.completed ? 'line-through' : ''
        }`}
      >
        {toDo.fields.description}
      </p>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteToDo(ToDo.id)}
      >Delete</button>
    </li>
  )
}
