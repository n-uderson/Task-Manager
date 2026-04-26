import { useState } from "react";
import { useNavigate } from "react-router-dom";

import imgmobile from "../assets/imagem-login.png";
import imglogo from "../assets/imglogo.png";

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
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
          alert("Token não recebido");
        }
      } else {
        alert(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      alert("Erro ao conectar: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 flex items-center justify-center">
        <img
          src={imgmobile}
          alt="Ilustração"
          className="w-full md:h-full md:w-full object-cover md:object-left "
        />

        <div
          className="absolute bottom-0 left-0 w-full h-32 
          bg-linear-to-b from-transparent to-slate-900 md:hidden"
        ></div>

        <div
          className="hidden  md:block absolute top-0 right-0 h-full w-40
          bg-linear-to-r from-transparent to-slate-900"
        ></div>
      </div>

      <div className="w-full  md:w-1/2 flex items-center justify-center px-6 ">
        <div className="w-full max-w-sm  md:p-8 md:h-[700px] md:max-w-lg md:flex md:flex-col md:justify-center">
          <img
            src={imglogo}
            alt="Logo"
            className="w-64 mx-auto md:w-96 transition-transform duration-500 hover:scale-105"
          />

          <p className="text-slate-400 text-center  mb-6">
            Organize. Planeje. Conquiste.
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-6 p-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 cursor-pointer"
          >
            Entrar
          </button>

          <p className="text-center  text-sm text-slate-400 mt-6">
            Não tem uma conta?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
