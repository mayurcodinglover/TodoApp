import React, { useContext, useState, useEffect } from 'react';
import { Authcontext } from '../Context/Authcontext';
import { gettodo, inserttodo, deletetodo, checktodo, updatetodo } from '../Services/api';

const Todo = () => {
  const { logout } = useContext(Authcontext);
  const [todos, settodos] = useState([]);
  const [text, settext] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const data = await gettodo();
      settodos(data || []);
    };
    fetchdata();
  }, []);

  const handleinsert = async () => {
    if (text === "") {
      alert("Please write some task");
    } else {
        const data = await inserttodo(text);
        settodos([...todos, data]);
        settext("");
    }
  };


  const handlechange = (e) => {
    settext(e.target.value);
  };

  const handledelete = async (id) => {
    const data = await deletetodo(id);
    alert(data);
    settodos(todos.filter(todo => todo._id !== id));
  };

  const handlecheck = async (id) => {
    const updatedTodos = todos.map(todo =>
      todo._id === id ? { ...todo, checked: !todo.checked } : todo
    );
    const updatedTodo = updatedTodos.find(todo => todo._id === id);
    try {
      const res = await checktodo(id, updatedTodo.checked);
      settodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo", error);
      settodos(todos);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="logout flex justify-end items-end w-full m-2 p-2">
        <button type="button" className='mx-1 px-4 py-1.5 bg-black rounded-md text-white' onClick={logout}>Logout</button>
      </div>
      <div className="todo bg-pink-300 m-6 p-6 rounded-lg">
        <h1 className='m-2 p-2 text-[2rem] text-center font-bold'>Todo App</h1>
        <div className='insert m-2 p-2 gap-3 flex justify-center items-center'>
          <input
            type="text"
            className='m-1 p-1 border-2 border-white border-solid rounded-lg w-full'
            onChange={handlechange}
            value={text}
          />
          <button
            type="button"
            className='mx-1 px-4 py-1.5 bg-black rounded-md text-white'
            onClick={handleinsert}
          >
          Insert
          </button>
        </div>
        <div>
          {todos.map((item, index) => (
            <div className="display flex justify-start items-center gap-2" key={index}>
              <div className="input">
                <input
                  type="checkbox"
                  className='h-5 w-5'
                  onClick={() => handlecheck(item._id)}
                  checked={item.checked}
                />
              </div>
              <div className="text w-full">
                <p className={`m-2 p-2 text-[1.5rem] font-bold ${item.checked ? 'line-through' : ''}`}>{item.text}</p>
              </div>
              <div className="button flex justify-center items-center">
                <button type="button" className='mx-1 px-2 py-1 bg-black rounded-md text-white' onClick={() => handledelete(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
