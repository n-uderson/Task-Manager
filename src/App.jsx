import {Routes, Route} from "react-router-dom"
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import Tarefas from "./assets/components/Tarefas";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />      
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Tarefas />} />
    </Routes>
  );
}

export default App;




// import { useState, useEffect } from "react";
// import Tarefas from "./assets/components/Tarefas";
// import Nav from "./assets/components/Nav";

// function App() {
//   const [tarefas, setTarefas] = useState([]);

//   useEffect(() => {
//     const fetchTarefas = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/tasks", {
//           method: "GET",
//         });
//         if (!response.ok) throw new Error("Erro ao buscar tarefas");
//         const data = await response.json();
//         setTarefas(data);
//       } catch (error) {
//         console.error("Erro:", error);
//       }
//     };
//     fetchTarefas();
//   }, []);

//   return (
//     <div className=" min-h-screen bg-slate-900">
//       <div className="bg-slate-800  p-4">
//         <h1 className="flex justify-center items-center text-white text-xl font-bold">Task Manager</h1>
//         {/* <i className="fa-regular fa-bell cursor-pointer text-white"></i> */}
//       </div>
//       <Tarefas tarefas={tarefas} setTarefas={setTarefas} />
//     </div>
//   );
// }

// export default App;
