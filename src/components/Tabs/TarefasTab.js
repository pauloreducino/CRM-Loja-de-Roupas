import React, { useState } from "react";
import { MessageCircle, Gift, Calendar, Clock } from "lucide-react";

const TarefasTab = ({ tarefas, getStatusTarefa, enviarWhatsApp }) => {
  const [filtroTarefa, setFiltroTarefa] = useState("todas");

  const getTarefasFiltradas = () => {
    const hoje = new Date().toISOString().split("T")[0];
    return tarefas.filter((t) => {
      if (filtroTarefa === "atrasadas")
        return t.dataExecucao < hoje && !t.concluida;
      if (filtroTarefa === "hoje")
        return t.dataExecucao === hoje && !t.concluida;
      if (filtroTarefa === "futuras")
        return t.dataExecucao > hoje && !t.concluida;
      if (filtroTarefa === "concluidas") return t.concluida;
      return true;
    });
  };

  const tarefasFiltradas = getTarefasFiltradas();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Minhas Tarefas
        </h2>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {[
            { value: "todas", label: "Todas" },
            { value: "atrasadas", label: "Atrasadas" },
            { value: "hoje", label: "Hoje" },
            { value: "futuras", label: "Futuras" },
            { value: "concluidas", label: "Concluídas" },
          ].map((filtro) => (
            <button
              key={filtro.value}
              onClick={() => setFiltroTarefa(filtro.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtroTarefa === filtro.value
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {tarefasFiltradas
          .sort((a, b) =>
            a.concluida !== b.concluida
              ? a.concluida
                ? 1
                : -1
              : new Date(a.dataExecucao) - new Date(b.dataExecucao)
          )
          .map((tarefa) => {
            const status = getStatusTarefa(
              tarefa.dataExecucao,
              tarefa.concluida
            );
            return (
              <div
                key={tarefa.id}
                className="bg-white rounded-lg shadow p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status.cor}`}
                      >
                        {status.texto}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(
                          tarefa.dataExecucao + "T00:00:00"
                        ).toLocaleDateString("pt-BR")}
                      </span>
                      {tarefa.tipo === "aniversario" && (
                        <Gift size={18} className="text-pink-500" />
                      )}
                      {tarefa.tipo === "credito" && (
                        <Calendar size={18} className="text-green-500" />
                      )}
                      {tarefa.tipo === "inatividade" && (
                        <Clock size={18} className="text-orange-500" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {tarefa.clienteNome}
                    </h3>
                    <p className="text-gray-600 mb-3">{tarefa.mensagem}</p>
                    <p className="text-sm text-gray-500">
                      📱 {tarefa.telefone}
                    </p>
                  </div>
                  <div className="w-full md:w-auto">
                    {!tarefa.concluida && (
                      <button
                        onClick={() => enviarWhatsApp(tarefa)}
                        className="w-full md:w-auto flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle size={18} />
                        <span>Enviar WhatsApp</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        {tarefasFiltradas.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
            Nenhuma tarefa encontrada neste filtro
          </div>
        )}
      </div>
    </div>
  );
};

export default TarefasTab;
