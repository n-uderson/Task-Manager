function ButtonDeletee ({ tarefa, onDelete, onClose }) {
    return (
      <div className="fixed inset-0  flex items-center justify-center z-50 ">
        <div className=" bg-slate-600 rounded-lg shadow-lg p-6 w-72 max-w-md gap-4 flex flex-col">
          <h2 className="text-white">Excluir essa tarefa?</h2>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={onClose}
              className="text-white bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={() => onDelete(tarefa.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
}

export default ButtonDeletee;
