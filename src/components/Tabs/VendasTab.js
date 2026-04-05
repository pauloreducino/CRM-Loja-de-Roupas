import { Plus, Edit2, Trash2, ShoppingCart } from "lucide-react";

const formaPagamentoLabel = {
  dinheiro:       "Dinheiro",
  pix:            "PIX",
  cartao_credito: "Crédito",
  cartao_debito:  "Débito",
};

const VendasTab = ({ vendas, openModal, deleteItem, getClienteNome }) => {
  const vendasOrdenadas = [...vendas].sort(
    (a, b) => new Date(b.dataVenda) - new Date(a.dataVenda)
  );

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <span /> {/* spacer */}
        <button className="btn-primary" onClick={() => openModal("venda")}>
          <Plus size={16} />
          Nova Venda
        </button>
      </div>

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="glass-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th className="hide-mobile">Descrição</th>
                <th>Valor</th>
                <th className="hide-mobile">Pagamento</th>
                <th className="hide-mobile">Crédito</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendasOrdenadas.map((venda) => (
                <tr key={venda.id}>
                  <td>
                    {new Date(venda.dataVenda + "T00:00:00").toLocaleDateString("pt-BR")}
                  </td>
                  <td className="td-primary">{getClienteNome(venda.clienteId)}</td>
                  <td className="hide-mobile" style={{ maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {venda.descricao || "—"}
                  </td>
                  <td className="td-primary" style={{ color: "var(--success) !important", fontWeight: "600" }}>
                    <span style={{ color: "var(--success)" }}>
                      R$ {Number(venda.valor).toFixed(2)}
                    </span>
                  </td>
                  <td className="hide-mobile">
                    {formaPagamentoLabel[venda.formaPagamento] || venda.formaPagamento}
                  </td>
                  <td className="hide-mobile">
                    {venda.credito > 0
                      ? <span style={{ color: "var(--accent-cyan)" }}>R$ {Number(venda.credito).toFixed(2)}</span>
                      : "—"}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "4px" }}>
                      <button
                        className="btn-icon btn-icon-edit"
                        onClick={() => openModal("venda", venda)}
                        title="Editar"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="btn-icon btn-icon-delete"
                        onClick={() => deleteItem("venda", venda.id)}
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

          {vendas.length === 0 && (
            <div className="empty-state">
              <ShoppingCart size={32} style={{ margin: "0 auto 12px", color: "var(--text-muted)", display: "block", opacity: 0.5 }} />
              Nenhuma venda registrada
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendasTab;
