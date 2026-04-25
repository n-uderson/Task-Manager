import { useState } from 'react';

export default function Nav() {
  const [navopen, setNavOpen] = useState(false);

  return (
    <div className='relative'>
      <button onClick={() => setNavOpen(!navopen)} className="cursor-pointer" aria-label="Alternar menu">
        <i className="fa-solid fa-list" />
      </button>

      {navopen && (
        <div className='md:hidden fixed inset-0 z-50 top-14 flex '>
            <div className='bg-white  h-full w-40 shadow-lg p-4 '>
                <div>
                    <ul className='space-y-2.5'>
                      <li>Concluido</li>
                      <li>Pendente</li>
                      <li>Cancelado</li>
                    </ul>
                </div>
            </div>
                <div
                    className=" flex-1   bg-[rgba(0,0,0,0.6)]"
                    onClick={() => setNavOpen(false)}
                    role="button"
                    aria-label="Fechar"
                />
        </div>
      )}
    </div>
  );
}