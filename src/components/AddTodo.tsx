import React, { FormEvent, useState } from 'react'
import { useTodos} from '../store/todos';

const AddTodo = () => {
    //now to store respective data value we need to use useState
    const [todo,setTodo]=useState(""); //store
    const {handleAddToDo}=useTodos();


const handleFormSubmit=(e:FormEvent<HTMLElement>)=>{   //changes after submit values
 e.preventDefault();
 handleAddToDo(todo);
 setTodo("");
    }

  return (
<form onSubmit={handleFormSubmit}>
    <input type="text" value={todo} onChange={(e) =>setTodo(e.target.value)} />  
    <button type="submit">Add</button>
    </form>
  )
}

export default AddTodo
