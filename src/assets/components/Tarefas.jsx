import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonEdit from "./ButtonEdit";
import BuscarTarefas from "./BuscarTarefas";
import Header from "./header";
import ButtonDeletee from "./buttonDelete";

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
    <div className="bg-slate-900 h-screen">
      
      <Header />
      <div className=" mt-8 md:flex md:flex-row ">
        <div className="bg-slate-800 rounded-lg m-2 p-4 gap-2 flex flex-col md:w-1/3 md:h-62  ">
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
            className="text-white box-border border w-full max-w-xl my-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 scheme-dark"
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
                         h-8 w-25 rounded-lg cursor-pointer"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="bg-slate-800  m-2 p-4 rounded-lg space-y-6 md:w-full  ">
          <h2 className="text-white">Minhas tarefas</h2>
          <hr className="text-slate-300" />
          <BuscarTarefas
            filtro={filtro}
            setFiltro={setFiltro}
            buscar={buscar}
            setBuscar={setBuscar}
          />
          <div className="  flex flex-col space-y-5">
            {tarefasFiltradas.map((tarefa) => {
              const isAtrasada =
                tarefa.date &&
                !tarefa.completed &&
                new Date(tarefa.date) < new Date();
              return (
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
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-sm text-slate-300 font-light">
                          {tarefa.date
                            ? new Date(tarefa.date).toLocaleDateString()
                            : ""}
                        </span>
                        {isAtrasada && (
                          <span className="flex items-center justify-center text-sm bg-red-500 text-white h-8 w-15 rounded-lg font-light ml-2">
                            Atrasada
                          </span>
                        )}
                        {tarefa.completed && !isAtrasada && (
                          <span className="flex items-center justify-center text-sm bg-green-500 text-white h-8 w-18 rounded-lg font-light ml-2">
                            Concluída
                          </span>
                        )}
                        {!tarefa.completed && !isAtrasada && (
                          <span className="flex items-center justify-center text-sm bg-yellow-500 text-white h-8 w-18 rounded-lg font-light ml-2">
                            Pendente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-300 space-x-4 flex flex-row">
                    <ButtonEdit tarefa={tarefa} onSave={handleSaveEdit} />
                    <button onClick={() => {
                      setOpenDel(true);
                      setTarefaSelecionada(tarefa);
                    }} className="cursor-pointer " aria-label="Excluir">
                      <i className="text-slate-300 fa-solid fa-trash hover:text-red-500"></i>
                    </button>
                    {openDel && (
                      <ButtonDeletee 
                      tarefa={tarefaSelecionada}
                      onDelete={onDeleteClick}
                      onClose={() => setOpenDel(false)} />
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
