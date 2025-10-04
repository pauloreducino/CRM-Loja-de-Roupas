import React from "react";

const RegraForm = ({
  onSave,
  closeModal,
  register,
  handleSubmit,
  errors,
  tipoRegra,
}) => (
  <form onSubmit={handleSubmit(onSave)} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nome da Regra *
      </label>
      <input
        type="text"
        {...register("nome")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Ex: Lembrete de Aniversário"
      />
      {errors.nome && (
        <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tipo de Automação *
      </label>
      <select
        {...register("tipo")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="aniversario">Aniversário</option>
        <option value="credito">Crédito</option>
        <option value="inatividade">Inatividade</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {tipoRegra === "aniversario"
          ? "Dias antes do aniversário"
          : tipoRegra === "credito"
          ? "Dias antes da expiração"
          : "Dias sem comprar"}
      </label>
      <input
        type="number"
        {...register("diasAntes")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="0"
      />
      {errors.diasAntes && (
        <p className="text-red-500 text-xs mt-1">{errors.diasAntes.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Mensagem *
      </label>
      <textarea
        {...register("mensagem")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows="4"
        placeholder="Use {nome}, {credito}, {dataExpiracao}"
      />
      <p className="text-xs text-gray-500 mt-1">
        Variáveis: {"{nome}"}, {"{credito}"}, {"{dataExpiracao}"}
      </p>
      {errors.mensagem && (
        <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>
      )}
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        {...register("ativo")}
        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-700">Regra ativa</label>
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

export default RegraForm;
