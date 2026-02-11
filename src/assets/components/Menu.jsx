export default function Menu({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  const listNav = ["Tarefas Concluidas", "Pendentes", "Atrasado"];

  return (
    <div className="flex flex-row shadow-lg fixed inset-0 z-50 md:hidden top-14 w-full h-full">
      <div className="bg-white p-4 space-y-6">
        <p className="space-y-5">Menu</p>
        <div className="space-y-3">
          {listNav.map((item, index) => (
            <div key={index}>
              <button className=" hover:border-b-2 hover:to-blue-400 text-[#474747] hover:text-blue-400 cursor-pointer">{item}</button>
            </div>
          ))}
        </div>
      </div> 
      <div className="bg-[rgba(0,0,0,0.6)] flex-1 p-4 min-h-25" onClick={onClose}></div>
    </div>
  );
}