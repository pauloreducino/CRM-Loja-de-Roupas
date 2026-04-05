import { Plus, Edit2, Trash2, Info, Gift, Calendar, Clock } from "lucide-react";

const tipoConfig = {
  aniversario: { label: "Aniversário", icon: <Gift size={14} />,    color: "#ec4899" },
  credito:     { label: "Crédito",     icon: <Calendar size={14} />, color: "var(--success)" },
  inatividade: { label: "Inatividade", icon: <Clock size={14} />,   color: "var(--warning)" },
};

const AutomacaoTab = ({ regrasAutomacao, openModal, deleteItem }) => (
  <div className="animate-fade-up">
    <div className="page-header">
      <span />
      <button className="btn-primary" onClick={() => openModal("regra")}>
        <Plus size={16} />
        Nova Regra
      </button>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {regrasAutomacao.map((regra, i) => {
        const tipo = tipoConfig[regra.tipo] || {};
        return (
          <div
            key={regra.id}
            className="glass-card animate-fade-up"
            style={{ padding: "18px 20px", animationDelay: `${i * 40}ms` }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                    {regra.nome}
                  </h3>
                  <span className={`badge ${regra.ativo ? "badge-success" : "badge-gray"}`}>
                    {regra.ativo ? "Ativa" : "Inativa"}
                  </span>
                </div>

                {/* Type + days */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  <span style={{ color: tipo.color, display: "flex", alignItems: "center" }}>{tipo.icon}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                    <strong style={{ color: "var(--text-primary)" }}>{tipo.label}</strong>
                    {" · "}
                    <strong style={{ color: "var(--text-primary)" }}>{regra.diasAntes}</strong> dias
                  </span>
                </div>

                {/* Message */}
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                }}>
                  {regra.mensagem}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                <button className="btn-icon btn-icon-edit" onClick={() => openModal("regra", regra)} title="Editar">
                  <Edit2 size={15} />
                </button>
                <button className="btn-icon btn-icon-delete" onClick={() => deleteItem("regra", regra.id)} title="Excluir">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Info box */}
    <div className="info-box">
      <div className="info-box-title">
        <Info size={16} />
        Como funciona a automação
      </div>
      <ul>
        <li><strong>Aniversário:</strong> Tarefas criadas automaticamente pela data de nascimento do cliente</li>
        <li><strong>Crédito:</strong> Tarefas criadas quando há crédito cadastrado em uma venda</li>
        <li><strong>Inatividade:</strong> Tarefas para clientes que não compram há X dias</li>
        <li>Use <strong>{`{nome}`}</strong>, <strong>{`{credito}`}</strong>, <strong>{`{dataExpiracao}`}</strong> nas mensagens</li>
      </ul>
    </div>
  </div>
);

export default AutomacaoTab;
