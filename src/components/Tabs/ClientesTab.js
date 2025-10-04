import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

const ClientesTab = ({ clientes, openModal, deleteItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefone.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full md:flex-1 md:max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={() => openModal("cliente")}
          className="w-full md:w-auto flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          <span>Novo Cliente</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Telefone
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aniversário
              </th>
              <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {cliente.nome}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-600">
                  {cliente.telefone}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-600">
                  {cliente.email}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-600">
                  {cliente.dataNascimento
                    ? new Date(
                        cliente.dataNascimento + "T00:00:00"
                      ).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => openModal("cliente", cliente)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteItem("cliente", cliente.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clientesFiltrados.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum cliente cadastrado
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientesTab;
