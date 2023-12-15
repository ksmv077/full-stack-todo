import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, completedTodo, deleteTodo, fetchTodos } from "./features/todoSlice"

function App() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const todos = useSelector((state) => state.todoSlice.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleAdd = (text) => {
    dispatch(addTodo(text))
  }

  const handleCompleted = (id, completed) => {
    dispatch(completedTodo({ id, completed }))
  }


  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => handleAdd(text)}>add</button>
      <ul>
        {todos.map((item) => {
          return <li>
            <input type="checkbox" 
            checked={item.completed} 
            onChange={() => handleCompleted(item._id, item.completed)} />
            {item.title}
            <button onClick={() => handleDelete(item._id)}>del</button>
          </li>
        })}
      </ul>
    </div>
  )
}

export default App
