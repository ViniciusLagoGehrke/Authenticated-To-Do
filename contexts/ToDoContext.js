import { createContext, useState } from 'react';

const ToDoContext = createContext();

const ToDoProvider = ({children}) => {
  
  const [toDos, setToDos] = useState([]);

  const refreshToDo = async () => {
    try{
      const res = await fetch('/api/getToDos');
      const latestToDos = await res.json();
      setToDos(latestToDos)
    } catch(err) {
      console.error(err);
    }
  }

  const addToDo = async (description) => {
    try{
      const res = await fetch('/api/createToDo', {
        method: 'POST',
        body: JSON.stringify({description}),
        headers: {'Content-Type': 'application/json'}
      });
      const newToDo = await res.json();
      setToDos((prevToDos) => {
        return [newToDo, ...prevToDos];
      })
    } catch(err) {
      console.error(err);
    }
  }
  
  const updateToDo = async (updatedToDo) => {
    try{
      const res = await fetch('/api/updateToDo', {
        method: 'POST',
        body: JSON.stringify(updatedToDo),
        headers: {'Content-Type': 'application/json'}
      });
      await res.json();
      setToDos((prevToDos) => {
        const existingToDos = [...prevToDos];
        const existingToDo = existingToDos.find(toDo => toDo.id === updatedToDo.id);
        existingToDo.fields = updatedToDo.fiels;
        return existingToDos;
      })
    } catch(err) {
      console.error(err);
    }
  }

  const deleteToDo = async (id) => {
    try{
      const res = await fetch('/api/deleteToDo', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {'Content-Type': 'application/json'}
      });

      setToDos((prevToDos) => {
        return prevToDos.filter((toDo) => toDo.id !== id);  
      });
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <ToDoContext.Provider
      value={{
        toDos,
        setToDos,
        refreshToDo,
        updateToDo,
        deleteToDo,
        addToDo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

export {ToDoProvider, ToDoContext }