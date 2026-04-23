function Login() {
  return (
    <div className="bg-slate-900 h-screen flex items-center justify-center">
      <div className="bg-slate-800 flex flex-col items-center justify-center h-60 w-64 rounded-lg ">
        <h1>Login</h1>
        <div>
          <input
           type="email"
           name="Email"
           id="Email"
           placeholder="Digite seu email" />
          <input
          type="password"
           name="Password"
            id="Password"
            placeholder="Digite sua senha" />
        </div>
        <p>Cadastre-se</p>
      </div> 
    </div>
  );
}

export default Login;
