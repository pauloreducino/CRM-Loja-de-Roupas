const pageTitles = {
  clientes:  "Clientes",
  vendas:    "Vendas Realizadas",
  tarefas:   "Minhas Tarefas",
  automacao: "Regras de Automação",
};

const Header = ({ activeTab, usuarioLogado }) => {
  const initials = usuarioLogado?.email
    ? usuarioLogado.email[0].toUpperCase()
    : "U";

  return (
    <div className="topbar">
      <h1 style={{
        fontSize: "17px",
        fontWeight: "700",
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
      }}>
        {pageTitles[activeTab] || "CRM Roupas"}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          {usuarioLogado?.email}
        </span>
        <div style={{
          width: "32px",
          height: "32px",
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: "600",
          color: "white",
          flexShrink: 0,
          boxShadow: "0 2px 10px rgba(124,58,237,0.35)",
        }}>
          {initials}
        </div>
      </div>
    </div>
  );
};

export default Header;
