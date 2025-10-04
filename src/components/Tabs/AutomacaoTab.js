import React from "react";
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react";

const AutomacaoTab = ({ regrasAutomacao, openModal, deleteItem }) => (
  <div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800">
        Regras de Automação
      </h2>
      <button
        onClick={() => openModal("regra")}
        className="w-full md:w-auto flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Plus size={20} />
        <span>Nova Regra</span>
      </button>
    </div>
    <div className="space-y-4">
      {regrasAutomacao.map((regra) => (
        <div key={regra.id} className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mb-2">
                <h3 className="font-semibold text-lg text-gray-900">
                  {regra.nome}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    regra.ativo
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {regra.ativo ? "Ativa" : "Inativa"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Tipo:</strong>{" "}
                {regra.tipo === "aniversario"
                  ? "Aniversário"
                  : regra.tipo === "credito"
                  ? "Crédito"
                  : "Inatividade"}{" "}
                | <strong>Dias:</strong> {regra.diasAntes}
              </p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                {regra.mensagem}
              </p>
            </div>
            <div className="flex space-x-2 self-start md:self-center">
              <button
                onClick={() => openModal("regra", regra)}
                className="text-blue-600 hover:text-blue-800 p-1"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deleteItem("regra", regra.id)}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
        <AlertCircle size={20} className="mr-2" />
        Como funciona a automação
      </h3>
      <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
        <li>
          <strong>Aniversário:</strong> Tarefas são criadas automaticamente
          baseadas na data de nascimento do cliente
        </li>
        <li>
          <strong>Crédito:</strong> Tarefas são criadas quando há crédito
          cadastrado em uma venda
        </li>
        <li>
          <strong>Inatividade:</strong> Tarefas são criadas para clientes que
          não compram há X dias
        </li>
        <li>
          Use{" "}
          <strong>
            {`{nome}`}, {`{credito}`}, {`{dataExpiracao}`}
          </strong>{" "}
          nas mensagens para personalização automática
        </li>
      </ul>
    </div>
  </div>
);

export default AutomacaoTab;
