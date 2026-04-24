function Register() {
    return (
      <div className="bg-slate-900 h-screen flex items-center justify-center">
        <div className="bg-slate-800 flex flex-col items-center justify-center gap-11 h-96 w-80 rounded-lg ">
          <h1 className="text-white text-2xl font-semibold ">Cadastre-se</h1>
          <div className="p-4 flex flex-col gap-4 w-full  ">
            <input 
            type="text" 
            name="nome" 
            id="" 
            placeholder="Digite seu nome" 
            className=" max-w-xl p-2 box-border border text-white rounded 
            focus:outline-none focus:ring-2 focus:ring-blue-400 " />

            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Digite um email"
              className=" max-w-xl p-2 box-border border text-white rounded
              focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Digite uma senha"
              className=" max-w-xl  p-2 box-border border text-white rounded
              focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
          </div>
          <p className="text-white text-sm ">Já tem uma conta? <a href="/login" className="text-blue-400 hover:underline">Faça login</a></p>
        </div>
      </div>
    );
}

export default Register;