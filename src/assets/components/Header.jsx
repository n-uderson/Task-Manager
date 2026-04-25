import {useState, useEffect,} from "react";
import { useNavigate } from "react-router-dom";


function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
      const userStorage = localStorage.getItem("user");      
      if (userStorage) setUser(JSON.parse(userStorage));
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    };
    

    return (
      <div className="bg-slate-800  p-4 ">
        <h1 className="flex justify-center items-center text-white text-xl font-bold">
          Task Manager
        </h1>
        <p className="text-white">Olá, {user?.name} 👋</p>
        <button
          onClick={handleLogout}
            
          
        >
          Sair
        </button> 
         {/* <i className="fa-regular fa-bell cursor-pointer text-white"></i> */}
      </div>
    );
}

export default Header;