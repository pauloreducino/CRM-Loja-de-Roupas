import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Users } from "lucide-react";

const ClientesTab = ({ clientes, openModal, deleteItem }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefone.includes(searchTerm)
  );

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <div className="search-wrapper" style={{ width: "100%", maxWidth: "340px" }}>
          <span className="search-icon"><Search size={15} /></span>
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input search-input"
          />
        </div>
        <button className="btn-primary" onClick={() => openModal("cliente")}>
          <Plus size={16} />
          Novo Cliente
        </button>
      </div>

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="glass-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th className="hide-mobile">E-mail</th>
                <th className="hide-mobile">Aniversário</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente, i) => (
                <tr key={cliente.id} style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="td-primary">{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td className="hide-mobile">{cliente.email || "—"}</td>
                  <td className="hide-mobile">
                    {cliente.dataNascimento
                      ? new Date(cliente.dataNascimento + "T00:00:00").toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "4px" }}>
                      <button
                        className="btn-icon btn-icon-edit"
                        onClick={() => openModal("cliente", cliente)}
                        title="Editar"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="btn-icon btn-icon-delete"
                        onClick={() => deleteItem("cliente", cliente.id)}
                        title="Excluir"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {clientesFiltrados.length === 0 && (
            <div className="empty-state">
              <Users size={32} style={{ margin: "0 auto 12px", color: "var(--text-muted)", display: "block", opacity: 0.5 }} />
              {searchTerm ? "Nenhum cliente encontrado para essa busca" : "Nenhum cliente cadastrado"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientesTab;
