import React, { useState } from "react";

function ButtonEdit({ tarefa, onSave, data }) {
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState(tarefa?.title ?? "");
  const [draftData, setDraftData] = useState(tarefa?.date ?? "");

  const saveEdit = () => {
    if (draft.trim() && draftData.trim()) {
      onSave(tarefa.id, draft.trim(), draftData.trim());
    }
    setEditOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditOpen(!editOpen);
          setDraft(tarefa.title);
          setDraftData(tarefa.date ? tarefa.date.split("T")[0] : "");
        }}
        className="cursor-pointer hover:text-blue-500"
        aria-label="Editar"
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      {editOpen && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-slate-600 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-white text-lg font-semibold mb-4">
              Editar Tarefa
            </h2>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              type="text"
              name="editar"
              id="editar"
              placeholder="Editar tarefa"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
            />
            <div className="text-white flex flex-col gap-1 mb-4 scheme-dark">
              <input
                type="date"
                name="date"
                id="date"
                value={draftData}
                onChange={(e) => setDraftData(e.target.value)}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditOpen(false)}
                className="text-white bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  saveEdit();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonEdit;
