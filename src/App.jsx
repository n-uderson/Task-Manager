import { useState, useEffect } from 'react'
import Tarefas from "./assets/components/Tarefas"
import Nav from "./assets/components/Nav"



function App() {
  
   


  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await fetch('http://localhost:3001/tarefas', { method: 'GET' });
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        const data = await response.json();
        setTarefas(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    fetchTarefas();
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
