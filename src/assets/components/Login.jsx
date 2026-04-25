import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("✓ Login realizado com sucesso!");
          console.log(
            "✓ Token armazenado:",
            data.token.substring(0, 20) + "...",
          );
          localStorage.setItem("user", JSON.stringify(data.user))
          navigate("/");
        } else {
          console.error("✗ Token não encontrado na resposta:", data);
          alert("Erro: Token não recebido do servidor");
        }
      } else {
        console.error("✗ Erro ao fazer login:", data.message);
        alert("Erro ao fazer login: " + (data.message || response.statusText));
      }
    } catch (error) {
      console.error("✗ Erro na requisição de login:", error);
      alert("Erro ao conectar: " + error.message);
    }
  };

  return (
    <div className="bg-slate-900 h-screen flex items-center justify-center">
      <div className="bg-slate-800 flex flex-col items-center justify-center gap-11 h-96 w-80 rounded-lg ">
        <h1 className="text-white text-3xl font-semibold ">Login</h1>
        <div className="p-4 flex flex-col gap-4 w-full  ">
          <input
            type="email"
            name="Email"
            id="Email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" max-w-xl p-2 box-border border text-white rounded
                    focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
          <input
            type="password"
            name="Password"
            id="Password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" max-w-xl  p-2 box-border border text-white rounded
                    focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
        </div>
        <button
          onClick={handleLogin}
          type="button"
          className="bg-blue-500 hover:bg-blue-600  h-8 w-25 rounded-lg cursor-pointer"
        >
          Entrar
        </button>
        <p 
        onClick={() => navigate("/register")}
        className="text-white text-sm cursor-pointer hover:underline">
          Não tem uma conta? Cadastre-se
       
          </p>
      </div>
    </div>
  );
}

export default Login;
