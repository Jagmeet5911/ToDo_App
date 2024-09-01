import { useState } from "react";

import Navbar from "./assets/Components/Navbar";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), 
      todo, isCompleted: false }]);
    setTodo("");
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
  };
  const handleEdit = (e, id) => {
    let t= todos.filter(i=>i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
  };
  
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-100 min-h-[80vh]">
        <h2 className="text-lg font-bold">Add a To Do</h2>

        <div className="addTodo my-5">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-80"
          />
          <button
            onClick={handleAdd}
            className="bg-slate-800 hover:bg-slate-950 p-2 py-1 font-bold text-white rounded-md mx-6"
          >
            Save
          </button>
        </div>
        <h2 className="text-xl font-bold">Add your to do</h2>
        <div className="todos">
          {todos.length ===0 && <div className="m-5">No To Dos to Display </div>}
          {todos.map((item) => {
            return (
              <div key={item.id} className=" todo flex justify-between my-3 ">
                <div className="flex gap-7">

                  <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo} </div>
               
                </div>
                <div className="buttons ">
                  <button
                    onClick={(e)=>{handleEdit(e, item.id)}}
                    className="bg-slate-800 hover:bg-slate-950 p-2 py-1 font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                     onClick={(e)=>{handleDelete(e, item.id)}}
                    className="bg-slate-800 hover:bg-slate-950 p-2 py-1 font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
