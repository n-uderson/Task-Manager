import { Link } from "react-router-dom"

export default function Add(){
 
    
    return(
        <div>
            <div className="min-h-screen flex items-end justify-end p-4  ">
              <Link to="/nova-tarefa">
                 <button className="fixed bottom-4 right-4 bg-blue-500
                 text-white rounded-4xl p-4 shadow-lg cursor-pointer hover:bg-blue-600 ">
                <i className="fa-solid fa-plus"></i>
                </button>
              </Link>
            </div>
             
        </div>
    )
}