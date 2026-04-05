import { Users, ShoppingCart, CheckSquare, Settings, LogOut, Store } from "lucide-react";

const tabs = [
  { id: "clientes",  label: "Clientes",  icon: Users         },
  { id: "vendas",    label: "Vendas",    icon: ShoppingCart  },
  { id: "tarefas",   label: "Tarefas",   icon: CheckSquare   },
  { id: "automacao", label: "Automação", icon: Settings      },
];

const NavigationBar = ({ activeTab, setActiveTab, onLogout }) => (
  <nav className="sidebar">
    {/* Logo */}
    <div className="sidebar-logo">
      <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
        <div style={{
          width: "36px", height: "36px",
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
        }}>
          <Store size={18} color="white" />
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            CRM Roupas
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.25 }}>
            Gestão de Clientes
          </div>
        </div>
      </div>
    </div>

    {/* Nav Items */}
    <div className="sidebar-nav">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`sidebar-nav-item${activeTab === id ? " active" : ""}`}
        >
          <Icon size={17} />
          <span>{label}</span>
        </button>
      ))}
    </div>

    {/* Logout */}
    <div className="sidebar-footer">
      <button
        onClick={onLogout}
        className="sidebar-nav-item"
        style={{ color: "var(--danger)" }}
      >
        <LogOut size={17} />
        <span>Sair</span>
      </button>
    </div>
  </nav>
);

export default NavigationBar;
