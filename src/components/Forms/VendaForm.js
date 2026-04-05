const VendaForm = ({ onSave, closeModal, register, handleSubmit, errors, clientes }) => (
  <form onSubmit={handleSubmit(onSave)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div>
      <label className="form-label">Cliente *</label>
      <select {...register("clienteId")} className="glass-input">
        <option value="">Selecione um cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>{c.nome}</option>
        ))}
      </select>
      {errors.clienteId && <p className="form-error">{errors.clienteId.message}</p>}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
      <div>
        <label className="form-label">Data da Venda *</label>
        <input type="date" {...register("dataVenda")} className="glass-input" />
        {errors.dataVenda && <p className="form-error">{errors.dataVenda.message}</p>}
      </div>
      <div>
        <label className="form-label">Valor *</label>
        <input type="number" step="0.01" {...register("valor")} className="glass-input" placeholder="0.00" />
        {errors.valor && <p className="form-error">{errors.valor.message}</p>}
      </div>
    </div>

    <div>
      <label className="form-label">Descrição</label>
      <textarea {...register("descricao")} className="glass-input" rows="2" placeholder="Descrição dos produtos" />
    </div>

    <div>
      <label className="form-label">Forma de Pagamento</label>
      <select {...register("formaPagamento")} className="glass-input">
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">PIX</option>
        <option value="cartao_credito">Cartão de Crédito</option>
        <option value="cartao_debito">Cartão de Débito</option>
      </select>
    </div>

    <hr className="form-divider" />
    <p className="form-section-title">Crédito para o Cliente</p>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
      <div>
        <label className="form-label">Valor do Crédito</label>
        <input type="number" step="0.01" {...register("credito")} className="glass-input" placeholder="0.00" />
        {errors.credito && <p className="form-error">{errors.credito.message}</p>}
      </div>
      <div>
        <label className="form-label">Validade do Crédito</label>
        <input type="date" {...register("validadeCredito")} className="glass-input" />
        {errors.validadeCredito && <p className="form-error">{errors.validadeCredito.message}</p>}
      </div>
    </div>

    <hr className="form-divider" />
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
      <button type="button" onClick={closeModal} className="btn-ghost">Cancelar</button>
      <button type="submit" className="btn-primary">Salvar Venda</button>
    </div>
  </form>
);

export default VendaForm;
