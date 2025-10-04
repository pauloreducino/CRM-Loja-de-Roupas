import React from "react";

const ClienteForm = ({
  onSave,
  closeModal,
  register,
  handleSubmit,
  errors,
}) => {
  // Função para aplicar máscara de telefone - SOMENTE NÚMEROS
  const handleTelefoneChange = (e) => {
    // Remove TUDO que não é número
    let value = e.target.value.replace(/\D/g, "");

    // Limita a 11 dígitos
    value = value.slice(0, 11);

    // Aplica a máscara (00) 00000-0000
    if (value.length === 0) {
      e.target.value = "";
    } else if (value.length <= 2) {
      e.target.value = `(${value}`;
    } else if (value.length <= 7) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(
        2,
        7
      )}-${value.slice(7, 11)}`;
    }
  };

  // Função para bloquear letras no telefone
  const handleTelefoneKeyPress = (e) => {
    // Bloqueia QUALQUER coisa que não seja número
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo *
        </label>
        <input
          type="text"
          {...register("nome")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Digite o nome completo"
          maxLength={100}
        />
        {errors.nome && (
          <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone (WhatsApp) *
        </label>
        <input
          type="tel"
          {...register("telefone", {
            onChange: (e) => handleTelefoneChange(e),
          })}
          onKeyPress={handleTelefoneKeyPress}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="(00) 00000-0000"
          maxLength={15}
          inputMode="numeric"
        />
        {errors.telefone && (
          <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          ⚠️ Digite APENAS os 11 números (com DDD)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="email@exemplo.com"
          maxLength={100}
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
          max={new Date().toISOString().split("T")[0]}
        />
        <p className="text-gray-500 text-xs mt-1">
          Para envio de mensagens de aniversário
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Endereço Completo
        </label>
        <input
          type="text"
          {...register("endereco")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Rua, número, bairro, cidade"
          maxLength={200}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observações
        </label>
        <textarea
          {...register("observacoes")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows="3"
          placeholder="Preferências, alergias, informações importantes..."
          maxLength={500}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={closeModal}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Salvar Cliente
        </button>
      </div>
    </form>
  );
};

export default ClienteForm;
