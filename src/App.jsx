import { useState, useEffect } from 'react'
import Tarefas from "./assets/components/Tarefas"


function App() {
  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setTarefas(data.tarefas))
  }, [])
  
  return (
    <div className='min-h-screen bg-gray-200'>
      <div className='bg-blue-400 flex justify-between items-center p-4'>
        
        <h1>Task Manager</h1>
        <i className="fa-regular fa-bell cursor-pointer"></i>
      </div>
      <Tarefas tarefas={tarefas} setTarefas={setTarefas}/>
    </div>
  )
}

export default App
