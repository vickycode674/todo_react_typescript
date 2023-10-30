import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"
import Navbar from "./components/navbar"
import "./App.css"
const App = () => {
  return (
  <main>
   
    <strong> <h1>Todo React + Tyepscript</h1> </strong>
    
    <Navbar/>
    <AddTodo/>
    <Todos/>
 
  </main>
  )
}

export default App
