import {createContext,ReactNode, useContext, useState} from "react";

export type TodosProviderProps={
    children: ReactNode
}

export type Todo={
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}


export type todosContext={
    todos:Todo[];
    handleAddToDo:(task:string)=>void;  //explanation of the following pattern  (call singature)
    toggleTodoAsCompleted:(id:string) =>void;
    handleDeleteTodo:(id:string)=>void;
}

export const todosContext=createContext<todosContext|null>(null); //either data will be context or null

export const TodosProvider=({children}:TodosProviderProps)=>{

    const [todos,setTodos]=useState<Todo[]>(()=>{

      try{
        const newTodos=localStorage.getItem("todos")||"[]";
        return JSON.parse(newTodos) as Todo[]
      }

      catch(error)
      {return []}
    })

    const handleAddToDo=(task:string) =>{
        setTodos((prev)=>{
            const newTodos:Todo[]=[
              {
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt:new Date()
              },
              ...prev
            ]

            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
            // console.log("my previous data"+ prev);
            // console.log(newTodos);

            return newTodos;
        })
    }

    //mark completed //toooglingg

    const toggleTodoAsCompleted=(id:string)=>{
      setTodos((prev)=>{
        let newTodos=prev.map((todo)=>{
            if(todo.id===id){
                return {...todo,completed:!todo.completed}
            }
            return todo;
        })
        localStorage.setItem("todos",JSON.stringify(newTodos))

        return newTodos;
      })
    }

    //delete respective todo
     const  handleDeleteTodo=(id:string)=>{
       setTodos((prev)=>{
        let newTodos=prev.filter((filterTodo)=>filterTodo.id!=id);   //condition for matching respective 
        localStorage.setItem("todos",JSON.stringify(newTodos))

        return newTodos;
       })
     }

     return <todosContext.Provider value={{todos,handleAddToDo,toggleTodoAsCompleted,handleDeleteTodo}}>  
        {children}
     </todosContext.Provider>
}

//consumer

export const useTodos=()=>{
    const todosConsumer=useContext(todosContext);
    if(!todosConsumer){
        throw new Error("Use todo is out side of provider");      
    }
    return todosConsumer;
}