import { useState,  } from "react";
import ButtonEdit from "./ButtonEdit";

function Tarefas({tarefas, setTarefas}) {
  // Confrima uma tarefa concluida
  async function onConfClick(tarefaId){
    try {
      const tarefa = tarefas.find(t => t.id === tarefaId);
      const novoStatus = !tarefa.conf;
      
      const response = await fetch(`http://localhost:3001/tarefas/${tarefaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tarefa, conf: novoStatus })
      });
      if (!response.ok) throw new Error('Erro ao atualizar tarefa');
      
      const newConf = tarefas.map(t => 
        t.id === tarefaId ? {...t, conf: novoStatus} : t
      );
      setTarefas(newConf);
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  // Deleta uma tarefa
  async function onDeleteClick(tarefaId){
    try {
      const response = await fetch(`http://localhost:3001/tarefas/${tarefaId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Erro ao deletar tarefa');
      const newDelete = tarefas.filter(tarefa => tarefa.id !== tarefaId);
      setTarefas(newDelete);
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  // Adiciona uma nova tarefa na lista de tarefas
  async function onAddSubmit (titulo, data){
    try {
      const response = await fetch('http://localhost:3001/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: titulo,
          data: data,
          conf: false
        })
      });
      if (!response.ok) throw new Error('Erro ao adicionar tarefa');
      const newTarefa = await response.json();
      setTarefas([...tarefas, newTarefa]);
    } catch (error) {
      console.error('Erro:', error);
    }
  }
    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState("");

    // Edita uma tarefa 
    const handleSaveEdit = async (id, novoTitulo, novaData) => {
      try {
        const tarefa = tarefas.find(t => t.id === id);
        const response = await fetch(`http://localhost:3001/tarefas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...tarefa, titulo: novoTitulo, data: novaData })
        });
        if (!response.ok) throw new Error('Erro ao editar tarefa');
        
        const atualizadas = tarefas.map((t) => 
          t.id === id ? { ...t, titulo: novoTitulo, data: novaData } : t
        );
        setTarefas(atualizadas);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    



  return (
    <div>
      
      <div className="bg-white rounded-lg m-2 p-4">
                  <input className="w-full max-w-xl my-1 p-2 box-border border border-gray-300 rounded
                    focus:outline-none focus:ring-2 focus:ring-blue-400 "
                    type="text"
                    name="pesquisar"
                    id="pesquisar"
                    placeholder="Digite o nome da tarefa"
                     value={titulo}
                     onChange={(event) => setTitulo(event.target.value)} />

                    <input type="date" 
                    name="" 
                    id="" 
                    value={data} 
                    onChange={(event) => setData(event.target.value)} />
                    
                    <div className="flex items-center justify-center mt-2">
                      <button onClick={() => {
                        if (!titulo.trim() || !data.trim()) {
                           return alert("Por favor, preencha todos os campos.");
                         
                        }
                        onAddSubmit(titulo, data);
                        setTitulo("");
                        setData("");
                      }}
                      type="button"
                      className=" bg-blue-500 hover:bg-blue-600
                       h-8 w-20 rounded-lg cursor-pointer" >Adicionar</button>
                    </div>
            </div> 



      <div className="bg-white m-2 p-4 rounded-lg space-y-6">
        <h2>Minhas tarefas</h2>
        <hr />
        <div className="flex flex-col space-y-5">
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className="flex justify-between items-start gap-4 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 flex-1">
                
                <div className="flex flex-col gap-1">
                  <label onClick={() => onConfClick(tarefa.id)} className={`cursor-pointer ${tarefa.conf &&  "line-through"}`}>
                    {tarefa.titulo}
              
                    
                  </label>
                  <span className="text-sm text-gray-500 font-light">
                    {tarefa.data ? new Date(tarefa.data).toLocaleDateString() : ""}
                  </span>
                </div>
              </div>
                
              <div className="space-x-4 flex flex-row">
                
               <ButtonEdit tarefa={tarefa} onSave={handleSaveEdit}/>

                <button onClick={() => onDeleteClick(tarefa.id)} className="cursor-pointer hover:text-red-500" aria-label="Excluir">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  )
}
export default Tarefas;