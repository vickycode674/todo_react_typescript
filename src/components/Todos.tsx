import React from 'react'
import { useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom'

const Todos = () => {

    const {todos,toggleTodoAsCompleted,handleDeleteTodo}=useTodos();

    const [searchParams]=useSearchParams();

    let todosData=searchParams.get("todos");  //get values of the particular elements 

    console.log("file is ",todosData)


    let filterData=todos;

    if(todosData==="active"){
        filterData=filterData.filter((task)=>!task.completed)
    }

    if(todosData==="completed"){
        filterData=filterData.filter((task)=>task.completed)
    }
    return (
    <ul className='main-task'>
        {
            filterData.map((todo)=>{
                return <li key={todo.id}>
                    <input type="checkbox" id={`todo-${todo.id}`}   //input type 
                    checked={todo.completed}
                    onChange={()=>toggleTodoAsCompleted(todo.id)}     //on touch its ticks down or toggles the value
                    />
                    <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

                    {
                        todo.completed &&(
                            <button type='button' onClick={()=>handleDeleteTodo(todo.id)}>Delete</button>  //creating button element
                        )
                    }
                </li>
           })
        }  
    </ul>
    )
}

export default Todos
