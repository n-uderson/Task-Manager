function Header() {
    return (
      <div className="bg-slate-800  p-4 ">
        <h1 className="flex justify-center items-center text-white text-xl font-bold">
          Task Manager
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Sair
        </button>
        {/* <i className="fa-regular fa-bell cursor-pointer text-white"></i> */}
      </div>
    );
}

export default Header;