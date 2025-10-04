import React from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const VendasTab = ({ vendas, openModal, deleteItem, getClienteNome }) => (
  <div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Vendas Realizadas</h2>
      <button
        onClick={() => openModal("venda")}
        className="w-full md:w-auto flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Plus size={20} />
        <span>Nova Venda</span>
      </button>
    </div>
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Data
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cliente
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Descrição
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Valor
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Crédito
            </th>
            <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendas
            .sort((a, b) => new Date(b.dataVenda) - new Date(a.dataVenda))
            .map((venda) => (
              <tr key={venda.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-900">
                  {new Date(venda.dataVenda + "T00:00:00").toLocaleDateString(
                    "pt-BR"
                  )}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {getClienteNome(venda.clienteId)}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-gray-600 max-w-xs truncate">
                  {venda.descricao}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                  R$ {venda.valor.toFixed(2)}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-600">
                  {venda.credito > 0 ? `R$ ${venda.credito.toFixed(2)}` : "-"}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => openModal("venda", venda)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteItem("venda", venda.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {vendas.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nenhuma venda registrada
        </div>
      )}
    </div>
  </div>
);

export default VendasTab;
