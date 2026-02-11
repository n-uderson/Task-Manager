import { Link } from "react-router-dom"

export default function NovaTarefa(){
    return(
        
         <div className="bg-gray-200  min-h-screen w-full space-y-4">
            <div className="bg-white flex  flex-row justify-between p-4 ">
                <Link to="/">
                    <button className="cursor-pointer">
                        <i className="fa-solid fa-x "></i>
                    </button>
                </Link>
                <h2 className=" ">Nova Tarefa </h2>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 
                h-8 w-20 rounded-lg cursor-pointer">Adicionar</button>
                
            </div>
              
              
           
            <div className="bg-white p-4">
                  <input className="w-full max-w-xl my-1 p-2 box-border border border-gray-300 rounded
                    focus:outline-none focus:ring-2 focus:ring-blue-400 "
                    type="text"
                    name="pesquisar"
                    id="pesquisar"
                    placeholder="Digite o nome da tarefa" />

                    <input type="date" name="" id="" />
            </div>
        </div>
            
    )
}