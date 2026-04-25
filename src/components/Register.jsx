import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";




function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      console.log({ name, email, password });
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("Usuario criado com sucesso!");

        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          navigate("/login");
        }
      } else {
        alert(data.massage || "Erro ao cadastrar");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com servidor");
    }
  };



    return (
      <div className="bg-slate-900 h-screen flex items-center justify-center">
        <div className="bg-slate-800 flex flex-col items-center justify-center gap-4 p-2 w-80 rounded-lg ">
          <h1 className="text-white text-2xl font-semibold ">Cadastre-se</h1>
          <div className="p-4 flex flex-col gap-4 w-full  ">
            <input 
            type="text" 
            name="nome" 
            id="" 
            placeholder="Digite seu nome" 
            value={name}
            onChange={(e) => setName(e.target.value)}
             className=" max-w-xl p-2 box-border border text-white rounded
             focus:outline-none focus:ring-2 focus:ring-blue-400 " />
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Digite um email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" max-w-xl p-2 box-border border text-white rounded
              focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Digite uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" max-w-xl  p-2 box-border border text-white rounded
              focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
          </div>

          <button
          onClick={handleRegister}
           type="button" 
           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Cadastrar
          </button>

          <p className="text-white text-sm ">Já tem uma conta? <a href="/login" className="text-blue-400 hover:underline">Faça login</a></p>
        </div>
      </div>
    );
}

export default Register;