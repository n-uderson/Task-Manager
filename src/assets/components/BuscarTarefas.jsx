import { useState } from "react";



function BuscarTarefas({filtro, setFiltro, buscar, setBuscar}) {
    


    return (
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="pesquisar"
          id="pesquisar"
          placeholder="Buscar tarefa..."
          value={buscar}
          onChange={() => setBuscar(event.target.value)}
          className="w-full max-w-xl my-1 p-2 box-border border text-white rounded
          focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-around ">
          <button
            type="button"
            onClick={() => setFiltro("todos")}
            className={
              filtro === "todos"
                ? "h-8 w-20 rounded-lg cursor-pointer bg-blue-500 text-white"
                : "bg-slate-700 h-8 w-20 rounded-lg cursor-pointer"
            }
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setFiltro("pendentes")}
            className={
              filtro === "pendentes"
                ? "h-8 w-25 rounded-lg cursor-pointer bg-blue-500 text-white"
                : "bg-slate-700 h-8 w-25 rounded-lg cursor-pointer"
            }
          >
            Pendentes
          </button>

          <button
            type="button"
            onClick={() => setFiltro("concluidas")}
            className={
              filtro === "concluidas"
                ? "h-8 w-25 rounded-lg cursor-pointer bg-blue-500 text-white"
                : "bg-slate-700 h-8 w-25 rounded-lg cursor-pointer"
            }
          >
            Concluídas
          </button>
        </div>
        <hr className="text-slate-300" />
      </div>
    );
}

export default BuscarTarefas;