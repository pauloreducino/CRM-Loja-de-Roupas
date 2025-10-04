import React from "react";

const VendaForm = ({
  onSave,
  closeModal,
  register,
  handleSubmit,
  errors,
  clientes,
}) => (
  <form onSubmit={handleSubmit(onSave)} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Cliente *
      </label>
      <select
        {...register("clienteId")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="">Selecione um cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>
      {errors.clienteId && (
        <p className="text-red-500 text-xs mt-1">{errors.clienteId.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Data da Venda *
      </label>
      <input
        type="date"
        {...register("dataVenda")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      {errors.dataVenda && (
        <p className="text-red-500 text-xs mt-1">{errors.dataVenda.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Valor *
      </label>
      <input
        type="number"
        step="0.01"
        {...register("valor")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="0.00"
      />
      {errors.valor && (
        <p className="text-red-500 text-xs mt-1">{errors.valor.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Descrição
      </label>
      <textarea
        {...register("descricao")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows="2"
        placeholder="Descrição dos produtos"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Forma de Pagamento
      </label>
      <select
        {...register("formaPagamento")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">PIX</option>
        <option value="cartao_credito">Cartão de Crédito</option>
        <option value="cartao_debito">Cartão de Débito</option>
      </select>
    </div>
    <div className="border-t pt-4">
      <h3 className="font-semibold text-gray-900 mb-3">
        Crédito para o Cliente
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor do Crédito
          </label>
          <input
            type="number"
            step="0.01"
            {...register("credito")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Validade do Crédito
          </label>
          <input
            type="date"
            {...register("validadeCredito")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
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

export default VendaForm;
