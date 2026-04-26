import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonEdit from "./ButtonEdit";
import BuscarTarefas from "./BuscarTarefas";
import Header from "./Header";
import ButtonDelete from "./ButtonDelete";

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login");
    const fetchTarefas = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar tarefas");
        const data = await response.json();
        setTarefas(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchTarefas();
  }, [token, navigate]);

  // Confrima uma tarefa concluida
  async function onConfClick(tarefaId) {
    try {
      const tarefa = tarefas.find((t) => t.id === tarefaId);
      const novoStatus = !tarefa.completed;

      const response = await fetch(`http://localhost:3001/tasks/${tarefaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
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
      const response = await fetch(`http://localhost:3001/tasks/${tarefaId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...authHeaders },
      });
      if (!response.ok) throw new Error("Erro ao deletar tarefa");
      const newDelete = tarefas.filter((tarefa) => tarefa.id !== tarefaId);
      setTarefas(newDelete);

      setOpenDel(false);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  // Adiciona uma nova tarefa na lista de tarefas
  async function onAddSubmit(titulo, data) {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
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
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
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

  // Filtra as tarefas de acordo com o filtro selecionado
  const [filtro, setFiltro] = useState("todos");
  const [buscar, setBuscar] = useState("");

  const tarefasFiltradas = tarefas
    .filter((t) => t.title.toLowerCase().includes(buscar.toLowerCase()))

    .filter((t) => {
      const isAtrasada =
        t.date && !t.completed && new Date(t.date) < new Date();
      if (filtro === "pendentes")
        return !t.completed && new Date(t.date) >= new Date();
      if (filtro === "concluidas") return t.completed;
      if (filtro === "atrasadas") return isAtrasada;
      return true;
    });

  // Função de abrir p delete
  const [openDel, setOpenDel] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

 return (
   <div className="bg-slate-900 min-h-screen">
     <Header />

     <div className="mt-8 px-4 md:px-10 flex flex-col md:flex-row md:items-start gap-6">
       {/* NOVA TAREFA */}
       <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 flex flex-col gap-4 md:w-1/3 shadow-lg">
         <h2 className="text-white text-lg font-semibold">Nova Tarefa</h2>

         <input
           className="w-full p-3 rounded-lg bg-slate-900 text-white outline-none focus:ring-2 focus:ring-blue-500"
           type="text"
           placeholder="Digite o nome da tarefa"
           value={titulo}
           onChange={(event) => setTitulo(event.target.value)}
         />

         <input
           className="w-full p-3 rounded-lg bg-slate-900 text-white outline-none focus:ring-2 focus:ring-blue-500"
           type="date"
           value={data}
           onChange={(event) => setData(event.target.value)}
         />

         <button
           onClick={() => {
             if (!titulo.trim() || !data.trim()) {
               return alert("Por favor, preencha todos os campos.");
             }
             onAddSubmit(titulo, data);
             setTitulo("");
             setData("");
           }}
           className="w-full mt-2 p-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition cursor-pointer"
         >
           Adicionar
         </button>
       </div>

       {/* LISTA */}
       <div className="bg-slate-800/80 backdrop-blur p-6 rounded-2xl space-y-6 md:w-full shadow-lg">
         <h2 className="text-white text-xl font-semibold">Minhas tarefas</h2>

         <BuscarTarefas
           filtro={filtro}
           setFiltro={setFiltro}
           buscar={buscar}
           setBuscar={setBuscar}
         />

         <div className="flex flex-col gap-4">
           {tarefasFiltradas.map((tarefa) => {
             const isAtrasada =
               tarefa.date &&
               !tarefa.completed &&
               new Date(tarefa.date) < new Date();

             return (
               <div
                 key={tarefa.id}
                 className="flex justify-between items-start gap-4 bg-slate-900/70 p-4 rounded-xl hover:bg-slate-700 transition-all duration-200"
               >
                 <div className="flex flex-col gap-2 flex-1">
                   <label
                     onClick={() => onConfClick(tarefa.id)}
                     className={`text-white cursor-pointer text-lg ${
                       tarefa.completed && "line-through text-slate-400"
                     }`}
                   >
                     {tarefa.title}
                   </label>

                   <div className="flex items-center gap-2 text-sm">
                     <span className="text-slate-400">
                       {tarefa.date
                         ? new Date(tarefa.date).toLocaleDateString()
                         : ""}
                     </span>

                     {/* STATUS */}
                     {isAtrasada && (
                       <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                         Atrasada
                       </span>
                     )}

                     {tarefa.completed && !isAtrasada && (
                       <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                         Concluída
                       </span>
                     )}

                     {!tarefa.completed && !isAtrasada && (
                       <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                         Pendente
                       </span>
                     )}
                   </div>
                 </div>

                 {/* AÇÕES */}
                 <div className="flex items-center gap-4 text-slate-400">
                   <ButtonEdit tarefa={tarefa} onSave={handleSaveEdit} />

                   <button
                     onClick={() => {
                       setOpenDel(true);
                       setTarefaSelecionada(tarefa);
                     }}
                     className="hover:text-red-500 transition cursor-pointer"
                   >
                     <i className="fa-solid fa-trash"></i>
                   </button>

                   {openDel && (
                     <ButtonDelete
                       tarefa={tarefaSelecionada}
                       onDelete={onDeleteClick}
                       onClose={() => setOpenDel(false)}
                     />
                   )}
                 </div>
               </div>
             );
           })}
         </div>
       </div>
     </div>
   </div>
 );
}
export default Tarefas;
