import Add from "./Add"

function Tarefas({tarefas, setTarefas}) {

  function onConfClick(tarefaId){
    const newConf = tarefas.map(tarefa => {
      if (tarefa.id === tarefaId) {
        return {...tarefa, conf: !tarefa.conf}

      }
      return tarefa
    })
    setTarefas(newConf);

  }

  function onDeleteClick(tarefaId){
    const newDelete = tarefas.filter(tarefa => tarefa.id !== tarefaId)
    setTarefas(newDelete);
  }

  



  return (
    <div>
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
                
              <div className="space-x-4 flex-shrink-0">
                
                <button className="cursor-pointer hover:text-blue-500" aria-label="Editar">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => onDeleteClick(tarefa.id)} className="cursor-pointer hover:text-red-500" aria-label="Excluir">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Add />
    </div>
  )
}
export default Tarefas;