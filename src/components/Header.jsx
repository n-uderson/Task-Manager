import {useState, useEffect,} from "react";
import { useNavigate } from "react-router-dom";

import imglogo from "../assets/imglogo.png";


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
      <div className="bg-slate-800  p-4 md:relative flex  items-center">
        
        <img
          src={imglogo}
          alt="Logo"
          className="w-40 md:absolute md:left-1/2 md:-translate-x-1/2 text-white text-xl font-bold"
        />
        <div className=" flex gap-4 items-center ml-auto">
          <p className="text-white">Olá, {user?.name} </p>
          <button onClick={handleLogout}>
            <i class="fa-solid fa-arrow-right-to-bracket text-white  hover:text-red-500 cursor-pointer"></i>
          </button>
        </div>
        {/* <i className="fa-regular fa-bell cursor-pointer text-white"></i> */}
      </div>
    );
}

export default Header;