import React, { useState } from 'react';

function ButtomEdit() {
    const [editOpen, setEditOpen] = useState(false);
  return (
    <div >
        <button onClick={() => setEditOpen(!editOpen)} 
        className="cursor-pointer hover:text-blue-500" 
        aria-label="Editar">
             <i className="fa-solid fa-pen-to-square"></i>
        </button>
        {editOpen && (
        <div className=' fixed bg-white h-40  shadow-lg
              inset-0  top-80 flex items-center justify-center flex-col
             gap-4 p-4 rounded-lg m-2 '>
            <input className="w-full max-w-xl my-1 p-2 box-border border border-gray-300 rounded
                    focus:outline-none focus:ring-2 focus:ring-blue-400 "
                     type="text"
                      name="editar" 
                      id="editar"
                       placeholder="Editar"/>
            <div className='space-x-4'>
                <button className=" bg-red-500 hover:bg-red-600
                       h-8 w-20 rounded-lg cursor-pointer">
                    Cancelar
                </button>
                <button className=" bg-blue-500 hover:bg-blue-600
                       h-8 w-20 rounded-lg cursor-pointer ">
                    Salvar
                </button>
            </div>
        </div>
        )}
    </div>
  );
}

export default ButtomEdit;