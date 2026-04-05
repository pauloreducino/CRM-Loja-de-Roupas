const ClienteForm = ({ onSave, closeModal, register, handleSubmit, errors }) => {
  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (value.length === 0) e.target.value = "";
    else if (value.length <= 2) e.target.value = `(${value}`;
    else if (value.length <= 7) e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    else e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  };

  const handleTelefoneKeyPress = (e) => {
    if (!/[0-9]/.test(e.key) && !["Backspace","Delete","Tab","ArrowLeft","ArrowRight"].includes(e.key))
      e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSave)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label className="form-label">Nome Completo *</label>
        <input type="text" {...register("nome")} className="glass-input" placeholder="Digite o nome completo" maxLength={100} />
        {errors.nome && <p className="form-error">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="form-label">Telefone (WhatsApp) *</label>
        <input
          type="tel"
          {...register("telefone", { onChange: handleTelefoneChange })}
          onKeyDown={handleTelefoneKeyPress}
          className="glass-input"
          placeholder="(00) 00000-0000"
          maxLength={15}
          inputMode="numeric"
        />
        {errors.telefone && <p className="form-error">{errors.telefone.message}</p>}
        <p className="form-hint">Digite os 11 números com DDD</p>
      </div>

      <div>
        <label className="form-label">E-mail</label>
        <input type="email" {...register("email")} className="glass-input" placeholder="email@exemplo.com" maxLength={100} />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div>
        <label className="form-label">Data de Nascimento</label>
        <input type="date" {...register("dataNascimento")} className="glass-input" max={new Date().toISOString().split("T")[0]} />
        <p className="form-hint">Para envio de mensagens de aniversário</p>
      </div>

      <div>
        <label className="form-label">Endereço</label>
        <input type="text" {...register("endereco")} className="glass-input" placeholder="Rua, número, bairro, cidade" maxLength={200} />
      </div>

      <div>
        <label className="form-label">Observações</label>
        <textarea {...register("observacoes")} className="glass-input" rows="3" placeholder="Preferências, informações importantes..." maxLength={500} />
      </div>

      <hr className="form-divider" />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button type="button" onClick={closeModal} className="btn-ghost">Cancelar</button>
        <button type="submit" className="btn-primary">Salvar Cliente</button>
      </div>
    </form>
  );
};

export default ClienteForm;
