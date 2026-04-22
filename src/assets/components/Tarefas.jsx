import { useState } from "react";
import ButtonEdit from "./ButtonEdit";

function Tarefas({ tarefas, setTarefas }) {
  // Confrima uma tarefa concluida
  async function onConfClick(tarefaId) {
    try {
      const tarefa = tarefas.find((t) => t.id === tarefaId);
      const novoStatus = !tarefa.completed;

      const response = await fetch(`http://localhost:3000/tasks/${tarefaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...tarefa, completed: novoStatus }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar tarefa");

      const newConf = tarefas.map((t) =>
        t.id === tarefaId ? { ...t, completed: novoStatus } : t,
      );
      setTarefas(newConf);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // Deleta uma tarefa
  async function onDeleteClick(tarefaId) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${tarefaId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Erro ao deletar tarefa");
      const newDelete = tarefas.filter((tarefa) => tarefa.id !== tarefaId);
      setTarefas(newDelete);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // Adiciona uma nova tarefa na lista de tarefas
  async function onAddSubmit(titulo, data) {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titulo,
          date: data,
          completed: false,
        }),
      });
      if (!response.ok) throw new Error("Erro ao adicionar tarefa");
      const newTarefa = await response.json();
      setTarefas([...tarefas, newTarefa]);
    } catch (error) {
      console.error("Erro:", error);
    }
  }
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");

  // Edita uma tarefa
  const handleSaveEdit = async (id, novoTitulo, novaData) => {
    try {
      const tarefa = tarefas.find((t) => t.id === id);
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tarefa,
          title: novoTitulo,
          date: novaData,
        }),
      });
      if (!response.ok) throw new Error("Erro ao editar tarefa");

      const atualizadas = tarefas.map((t) =>
        t.id === id ? { ...t, title: novoTitulo, date: novaData } : t,
      );
      setTarefas(atualizadas);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div >
      <div className="bg-slate-800 rounded-lg m-2 p-4 gap-2 flex flex-col">
        <h2 className="text-white">Nova Tarefa</h2>
        <input
          className="w-full max-w-xl my-1 p-2 box-border border text-white rounded
                    focus:outline-none focus:ring-2 focus:ring-blue-400 "
          type="text"
          name="pesquisar"
          id="pesquisar"
          placeholder="Digite o nome da tarefa"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />

        <input
          className="text-white box-border border w-full max-w-xl my-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="date"
          name=""
          id=""
          value={data}
          onChange={(event) => setData(event.target.value)}
        />

        <div className="flex items-center justify-center mt-2">
          <button
            onClick={() => {
              if (!titulo.trim() || !data.trim()) {
                return alert("Por favor, preencha todos os campos.");
              }
              onAddSubmit(titulo, data);
              setTitulo("");
              setData("");
            }}
            type="button"
            className=" bg-blue-500 hover:bg-blue-600
                       h-8 w-20 rounded-lg cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="bg-slate-800  m-2 p-4 rounded-lg space-y-6">
        <h2 className="text-white">Minhas tarefas</h2>
        <hr className="text-slate-300" />
        <div className="  flex flex-col space-y-5">
          {tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className=" flex justify-between items-start gap-4 border-b border-slate-300 pb-4"
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="flex flex-col gap-1">
                  <label
                    onClick={() => onConfClick(tarefa.id)}
                    className={`text-white  cursor-pointer ${tarefa.completed && "line-through"}`}
                  >
                    {tarefa.title}
                  </label>
                  <span className="text-sm text-slate-300 font-light">
                    {tarefa.date
                      ? new Date(tarefa.date).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>

              <div className="text-slate-300 space-x-4 flex flex-row">
                <ButtonEdit tarefa={tarefa} onSave={handleSaveEdit} />

                <button
                  onClick={() => onDeleteClick(tarefa.id)}
                  className="cursor-pointer hover:text-red-500"
                  aria-label="Excluir"
                >
                  <i className="text-slate-300 fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Tarefas;
