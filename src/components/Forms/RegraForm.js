const diasLabel = {
  aniversario: "Dias antes do aniversário",
  credito:     "Dias antes da expiração",
  inatividade: "Dias sem comprar",
};

const RegraForm = ({ onSave, closeModal, register, handleSubmit, errors, tipoRegra }) => (
  <form onSubmit={handleSubmit(onSave)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div>
      <label className="form-label">Nome da Regra *</label>
      <input type="text" {...register("nome")} className="glass-input" placeholder="Ex: Lembrete de Aniversário" />
      {errors.nome && <p className="form-error">{errors.nome.message}</p>}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
      <div>
        <label className="form-label">Tipo de Automação *</label>
        <select {...register("tipo")} className="glass-input">
          <option value="aniversario">Aniversário</option>
          <option value="credito">Crédito</option>
          <option value="inatividade">Inatividade</option>
        </select>
      </div>
      <div>
        <label className="form-label">{diasLabel[tipoRegra] || "Dias"}</label>
        <input type="number" {...register("diasAntes")} className="glass-input" placeholder="0" />
        {errors.diasAntes && <p className="form-error">{errors.diasAntes.message}</p>}
      </div>
    </div>

    <div>
      <label className="form-label">Mensagem *</label>
      <textarea {...register("mensagem")} className="glass-input" rows="4" placeholder="Use {nome}, {credito}, {dataExpiracao}" />
      <p className="form-hint">Variáveis: {"{nome}"}, {"{credito}"}, {"{dataExpiracao}"}</p>
      {errors.mensagem && <p className="form-error">{errors.mensagem.message}</p>}
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input type="checkbox" {...register("ativo")} className="form-checkbox" id="ativo" />
      <label htmlFor="ativo" style={{ fontSize: "14px", color: "var(--text-secondary)", cursor: "pointer" }}>
        Regra ativa
      </label>
    </div>

    <hr className="form-divider" />
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
      <button type="button" onClick={closeModal} className="btn-ghost">Cancelar</button>
      <button type="submit" className="btn-primary">Salvar Regra</button>
    </div>
  </form>
);

export default RegraForm;
