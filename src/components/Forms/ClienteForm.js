import React from "react";

const ClienteForm = ({
  onSave,
  closeModal,
  register,
  handleSubmit,
  errors,
}) => (
  <form onSubmit={handleSubmit(onSave)} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nome *
      </label>
      <input
        type="text"
        {...register("nome")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Nome completo"
      />
      {errors.nome && (
        <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Telefone *
      </label>
      <input
        type="text"
        {...register("telefone")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="(00) 00000-0000"
      />
      {errors.telefone && (
        <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        {...register("email")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="email@exemplo.com"
      />
      {errors.email && (
        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Data de Nascimento
      </label>
      <input
        type="date"
        {...register("dataNascimento")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Endereço
      </label>
      <input
        type="text"
        {...register("endereco")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Rua, número, bairro"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Observações
      </label>
      <textarea
        {...register("observacoes")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows="3"
        placeholder="Informações adicionais sobre o cliente"
      />
    </div>
    <div className="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        onClick={closeModal}
        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Salvar
      </button>
    </div>
  </form>
);

export default ClienteForm;
