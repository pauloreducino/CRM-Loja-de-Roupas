import { useState } from "react";
import { MessageCircle, Gift, Calendar, Clock, CheckSquare } from "lucide-react";

const filtros = [
  { value: "todas",     label: "Todas"     },
  { value: "atrasadas", label: "Atrasadas" },
  { value: "hoje",      label: "Hoje"      },
  { value: "futuras",   label: "Futuras"   },
  { value: "concluidas",label: "Concluídas"},
];

const tipoIcon = {
  aniversario: <Gift    size={15} style={{ color: "#ec4899" }} />,
  credito:     <Calendar size={15} style={{ color: "var(--success)" }} />,
  inatividade: <Clock   size={15} style={{ color: "var(--warning)" }} />,
};

const TarefasTab = ({ tarefas, getStatusTarefa, enviarWhatsApp }) => {
  const [filtro, setFiltro] = useState("todas");

  const hoje = new Date().toISOString().split("T")[0];

  const tarefasFiltradas = tarefas
    .filter((t) => {
      if (filtro === "atrasadas")  return t.dataExecucao < hoje && !t.concluida;
      if (filtro === "hoje")       return t.dataExecucao === hoje && !t.concluida;
      if (filtro === "futuras")    return t.dataExecucao > hoje && !t.concluida;
      if (filtro === "concluidas") return t.concluida;
      return true;
    })
    .sort((a, b) =>
      a.concluida !== b.concluida
        ? a.concluida ? 1 : -1
        : new Date(a.dataExecucao) - new Date(b.dataExecucao)
    );

  return (
    <div className="animate-fade-up">
      {/* Filter bar */}
      <div className="page-header" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {filtros.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={`btn-ghost${filtro === f.value ? " active" : ""}`}
              style={{ padding: "7px 14px", fontSize: "13px" }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {tarefasFiltradas.map((tarefa, i) => {
          const status = getStatusTarefa(tarefa.dataExecucao, tarefa.concluida);
          return (
            <div
              key={tarefa.id}
              className="glass-card animate-fade-up"
              style={{
                padding: "18px 20px",
                opacity: tarefa.concluida ? 0.6 : 1,
                animationDelay: `${i * 40}ms`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Meta row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <span className={status.cor}>{status.texto}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      {new Date(tarefa.dataExecucao + "T00:00:00").toLocaleDateString("pt-BR")}
                    </span>
                    {tipoIcon[tarefa.tipo]}
                  </div>

                  {/* Client name */}
                  <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "6px", letterSpacing: "-0.01em" }}>
                    {tarefa.clienteNome}
                  </h3>

                  {/* Message */}
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "8px" }}>
                    {tarefa.mensagem}
                  </p>

                  {/* Phone */}
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    📱 {tarefa.telefone}
                  </p>
                </div>

                {/* Action */}
                {!tarefa.concluida && (
                  <button
                    className="btn-success"
                    onClick={() => enviarWhatsApp(tarefa)}
                    style={{ flexShrink: 0, fontSize: "13px", padding: "9px 16px" }}
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </button>
                )}

                {tarefa.concluida && (
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--success)", flexShrink: 0 }}>
                    <CheckSquare size={14} /> Enviado
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {tarefasFiltradas.length === 0 && (
          <div className="glass-card empty-state">
            Nenhuma tarefa encontrada neste filtro
          </div>
        )}
      </div>
    </div>
  );
};

export default TarefasTab;
