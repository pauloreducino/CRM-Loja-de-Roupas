import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Auth from "./components/Auth";

import Header from "./components/UI/Header";
import NavigationBar from "./components/UI/NavigationBar";
import ClienteForm from "./components/Forms/ClienteForm";
import VendaForm from "./components/Forms/VendaForm";
import RegraForm from "./components/Forms/RegraForm";
import ClientesTab from "./components/Tabs/ClientesTab";
import VendasTab from "./components/Tabs/VendasTab";
import TarefasTab from "./components/Tabs/TarefasTab";
import AutomacaoTab from "./components/Tabs/AutomacaoTab";

import {
  clienteSchema,
  vendaSchema,
  regraSchema,
} from "./schemas/validationSchemas";

const CRMLoja = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(
    () => JSON.parse(localStorage.getItem("crm_usuario_logado")) || null
  );

  const handleLogin = (usuario) => setUsuarioLogado(usuario);

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair do sistema?")) {
      localStorage.removeItem("crm_usuario_logado");
      setUsuarioLogado(null);
    }
  };

  const [activeTab, setActiveTab] = useState("clientes");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const [clientes, setClientes] = useState(
    () => JSON.parse(localStorage.getItem("crm_clientes")) || []
  );
  const [vendas, setVendas] = useState(
    () => JSON.parse(localStorage.getItem("crm_vendas")) || []
  );
  const [tarefas, setTarefas] = useState(
    () => JSON.parse(localStorage.getItem("crm_tarefas")) || []
  );
  const [regrasAutomacao, setRegrasAutomacao] = useState(() => {
    const saved = localStorage.getItem("crm_regras");
    return saved && JSON.parse(saved).length > 0
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            nome: "Mensagem Pré-Aniversário",
            tipo: "aniversario",
            diasAntes: 7,
            mensagem:
              "Olá {nome}! Seu aniversário está chegando! 🎉 Preparamos um cupom especial de 15% de desconto para você. Válido até 7 dias após seu aniversário!",
            ativo: true,
          },
          {
            id: 2,
            nome: "Mensagem Aniversário",
            tipo: "aniversario",
            diasAntes: 0,
            mensagem:
              "Feliz Aniversário, {nome}! 🎂🎈 Que seu dia seja repleto de alegrias! Aproveite seu desconto especial de 15% em toda loja!",
            ativo: true,
          },
          {
            id: 3,
            nome: "Lembrete de Crédito",
            tipo: "credito",
            diasAntes: 7,
            mensagem:
              "Olá {nome}! Você tem R$ {credito} de crédito na nossa loja que expira em {dataExpiracao}. Não perca essa oportunidade!",
            ativo: true,
          },
          {
            id: 4,
            nome: "Cliente Inativo 90 dias",
            tipo: "inatividade",
            diasAntes: 90,
            mensagem:
              "Olá {nome}! Sentimos sua falta! 😊 Temos novidades incríveis na loja. Que tal dar uma passadinha? Temos uma surpresa especial para você!",
            ativo: true,
          },
        ];
  });

  const {
    register: registerCliente,
    handleSubmit: handleSubmitCliente,
    formState: { errors: errorsCliente },
    reset: resetCliente,
  } = useForm({ resolver: zodResolver(clienteSchema) });

  const {
    register: registerVenda,
    handleSubmit: handleSubmitVenda,
    formState: { errors: errorsVenda },
    reset: resetVenda,
  } = useForm({ resolver: zodResolver(vendaSchema) });

  const {
    register: registerRegra,
    handleSubmit: handleSubmitRegra,
    formState: { errors: errorsRegra },
    reset: resetRegra,
    watch: watchRegra,
  } = useForm({ resolver: zodResolver(regraSchema) });

  const tipoRegra = watchRegra("tipo", "aniversario");

  useEffect(() => { localStorage.setItem("crm_clientes", JSON.stringify(clientes)); }, [clientes]);
  useEffect(() => { localStorage.setItem("crm_vendas", JSON.stringify(vendas)); }, [vendas]);
  useEffect(() => { localStorage.setItem("crm_tarefas", JSON.stringify(tarefas)); }, [tarefas]);
  useEffect(() => { localStorage.setItem("crm_regras", JSON.stringify(regrasAutomacao)); }, [regrasAutomacao]);

  const gerarTarefasAutomaticas = useCallback(() => {
    const novasTarefas = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    clientes.forEach((cliente) => {
      if (cliente.dataNascimento) {
        const [, mes, dia] = cliente.dataNascimento.split("-");
        const aniversarioEsteAno = new Date(hoje.getFullYear(), parseInt(mes) - 1, parseInt(dia));
        aniversarioEsteAno.setHours(0, 0, 0, 0);

        regrasAutomacao.filter((r) => r.tipo === "aniversario" && r.ativo).forEach((regra) => {
          const dataExecucao = new Date(aniversarioEsteAno);
          dataExecucao.setDate(dataExecucao.getDate() - regra.diasAntes);
          const dataExecucaoStr = dataExecucao.toISOString().split("T")[0];
          const tarefaExistente = tarefas.find(
            (t) => t.clienteId === cliente.id && t.tipo === regra.tipo && t.dataExecucao === dataExecucaoStr
          );
          if (!tarefaExistente)
            novasTarefas.push({
              id: Date.now() + Math.random(),
              clienteId: cliente.id,
              clienteNome: cliente.nome,
              tipo: regra.tipo,
              mensagem: regra.mensagem.replace("{nome}", cliente.nome),
              dataExecucao: dataExecucaoStr,
              concluida: false,
              telefone: cliente.telefone,
            });
        });

        if (aniversarioEsteAno < hoje) {
          const aniversarioProximoAno = new Date(hoje.getFullYear() + 1, parseInt(mes) - 1, parseInt(dia));
          aniversarioProximoAno.setHours(0, 0, 0, 0);
          regrasAutomacao.filter((r) => r.tipo === "aniversario" && r.ativo).forEach((regra) => {
            const dataExecucao = new Date(aniversarioProximoAno);
            dataExecucao.setDate(dataExecucao.getDate() - regra.diasAntes);
            const dataExecucaoStr = dataExecucao.toISOString().split("T")[0];
            const tarefaExistente = tarefas.find(
              (t) => t.clienteId === cliente.id && t.tipo === regra.tipo && t.dataExecucao === dataExecucaoStr
            );
            if (!tarefaExistente)
              novasTarefas.push({
                id: Date.now() + Math.random(),
                clienteId: cliente.id,
                clienteNome: cliente.nome,
                tipo: regra.tipo,
                mensagem: regra.mensagem.replace("{nome}", cliente.nome),
                dataExecucao: dataExecucaoStr,
                concluida: false,
                telefone: cliente.telefone,
              });
          });
        }
      }

      const vendasCliente = vendas.filter((v) => v.clienteId === cliente.id)
        .sort((a, b) => new Date(b.dataVenda) - new Date(a.dataVenda));

      vendasCliente.forEach((venda) => {
        if (venda.credito > 0 && venda.validadeCredito) {
          const regraCredito = regrasAutomacao.find((r) => r.tipo === "credito" && r.ativo);
          if (regraCredito) {
            const dataExpiracao = new Date(venda.validadeCredito);
            const dataLembrete = new Date(dataExpiracao);
            dataLembrete.setDate(dataLembrete.getDate() - regraCredito.diasAntes);
            const tarefaExistente = tarefas.find(
              (t) => t.clienteId === cliente.id && t.tipo === "credito" && t.vendaId === venda.id
            );
            if (!tarefaExistente && dataLembrete >= hoje)
              novasTarefas.push({
                id: Date.now() + Math.random(),
                clienteId: cliente.id,
                clienteNome: cliente.nome,
                vendaId: venda.id,
                tipo: "credito",
                mensagem: regraCredito.mensagem
                  .replace("{nome}", cliente.nome)
                  .replace("{credito}", venda.credito.toFixed(2))
                  .replace("{dataExpiracao}", new Date(venda.validadeCredito).toLocaleDateString("pt-BR")),
                dataExecucao: dataLembrete.toISOString().split("T")[0],
                concluida: false,
                telefone: cliente.telefone,
              });
          }
        }
      });

      const ultimaVenda = vendasCliente[0];
      if (ultimaVenda) {
        const diasSemComprar = Math.floor((hoje - new Date(ultimaVenda.dataVenda)) / (1000 * 60 * 60 * 24));
        const regraInatividade = regrasAutomacao.find((r) => r.tipo === "inatividade" && r.ativo);
        if (regraInatividade && diasSemComprar >= regraInatividade.diasAntes) {
          const tarefaExistente = tarefas.find(
            (t) => t.clienteId === cliente.id && t.tipo === "inatividade" && !t.concluida
          );
          if (!tarefaExistente)
            novasTarefas.push({
              id: Date.now() + Math.random(),
              clienteId: cliente.id,
              clienteNome: cliente.nome,
              tipo: "inatividade",
              mensagem: regraInatividade.mensagem.replace("{nome}", cliente.nome),
              dataExecucao: hoje.toISOString().split("T")[0],
              concluida: false,
              telefone: cliente.telefone,
            });
        }
      }
    });

    if (novasTarefas.length > 0) setTarefas((prev) => [...prev, ...novasTarefas]);
  }, [clientes, vendas, regrasAutomacao, tarefas, setTarefas]);

  useEffect(() => { gerarTarefasAutomaticas(); }, [gerarTarefasAutomaticas]);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (type === "cliente")
      resetCliente(item || { nome: "", telefone: "", email: "", dataNascimento: "", endereco: "", observacoes: "" });
    else if (type === "venda")
      resetVenda(item || { clienteId: "", valor: "", descricao: "", dataVenda: new Date().toISOString().split("T")[0], formaPagamento: "dinheiro", credito: 0, validadeCredito: "" });
    else if (type === "regra")
      resetRegra(item || { nome: "", tipo: "aniversario", diasAntes: 7, mensagem: "", ativo: true });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveCliente = (data) => {
    if (editingItem) {
      setClientes(clientes.map((c) => c.id === editingItem.id ? { ...data, id: editingItem.id } : c));
      setTarefas(tarefas.map((t) => t.clienteId === editingItem.id ? { ...t, clienteNome: data.nome, telefone: data.telefone } : t));
    } else setClientes([...clientes, { ...data, id: Date.now() }]);
    closeModal();
  };

  const saveVenda = (data) => {
    const venda = { ...data, id: editingItem?.id || Date.now() };
    if (editingItem) setVendas(vendas.map((v) => v.id === editingItem.id ? venda : v));
    else setVendas([...vendas, venda]);
    closeModal();
  };

  const saveRegra = (data) => {
    const regra = { ...data, id: editingItem?.id || Date.now() };
    if (editingItem) setRegrasAutomacao(regrasAutomacao.map((r) => r.id === editingItem.id ? regra : r));
    else setRegrasAutomacao([...regrasAutomacao, regra]);
    closeModal();
  };

  const deleteItem = (type, id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    if (type === "cliente") {
      setClientes(clientes.filter((c) => c.id !== id));
      setVendas(vendas.filter((v) => v.clienteId !== id));
      setTarefas(tarefas.filter((t) => t.clienteId !== id));
    } else if (type === "venda") {
      setVendas(vendas.filter((v) => v.id !== id));
      setTarefas(tarefas.filter((t) => t.vendaId !== id));
    } else if (type === "regra") {
      setRegrasAutomacao(regrasAutomacao.filter((r) => r.id !== id));
    }
  };

  const enviarWhatsApp = (tarefa) => {
    const mensagem = encodeURIComponent(tarefa.mensagem);
    const telefone = tarefa.telefone.replace(/\D/g, "");
    window.open(`https://web.whatsapp.com/send?phone=55${telefone}&text=${mensagem}`, "_blank");
    setTarefas(tarefas.map((t) => t.id === tarefa.id ? { ...t, concluida: true } : t));
  };

  const getStatusTarefa = (dataExecucao, concluida) => {
    if (concluida) return { cor: "badge badge-success", texto: "Concluída" };
    const hoje = new Date().toISOString().split("T")[0];
    if (dataExecucao < hoje) return { cor: "badge badge-danger", texto: "Atrasada" };
    if (dataExecucao === hoje) return { cor: "badge badge-warning", texto: "Hoje" };
    return { cor: "badge badge-info", texto: "Futura" };
  };

  const getClienteNome = (id) =>
    clientes.find((c) => c.id === Number(id))?.nome || "Cliente não encontrado";

  const modalTitles = {
    cliente: editingItem ? "Editar Cliente" : "Novo Cliente",
    venda:   editingItem ? "Editar Venda"   : "Nova Venda",
    regra:   editingItem ? "Editar Regra"   : "Nova Regra",
  };

  if (!usuarioLogado) return <Auth onLogin={handleLogin} />;

  return (
    <>
      {/* Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="app-layout">
        <NavigationBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />

        <div className="app-content">
          <Header activeTab={activeTab} usuarioLogado={usuarioLogado} />

          <main className="page-content">
            {activeTab === "clientes" && (
              <ClientesTab clientes={clientes} openModal={openModal} deleteItem={deleteItem} />
            )}
            {activeTab === "vendas" && (
              <VendasTab vendas={vendas} openModal={openModal} deleteItem={deleteItem} getClienteNome={getClienteNome} />
            )}
            {activeTab === "tarefas" && (
              <TarefasTab tarefas={tarefas} getStatusTarefa={getStatusTarefa} enviarWhatsApp={enviarWhatsApp} />
            )}
            {activeTab === "automacao" && (
              <AutomacaoTab regrasAutomacao={regrasAutomacao} openModal={openModal} deleteItem={deleteItem} />
            )}
          </main>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                {modalTitles[modalType]}
              </h2>
              <button onClick={closeModal} className="btn-icon" style={{ color: "var(--text-muted)" }}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {modalType === "cliente" && (
                <ClienteForm onSave={saveCliente} closeModal={closeModal} register={registerCliente} handleSubmit={handleSubmitCliente} errors={errorsCliente} />
              )}
              {modalType === "venda" && (
                <VendaForm onSave={saveVenda} closeModal={closeModal} register={registerVenda} handleSubmit={handleSubmitVenda} errors={errorsVenda} clientes={clientes} />
              )}
              {modalType === "regra" && (
                <RegraForm onSave={saveRegra} closeModal={closeModal} register={registerRegra} handleSubmit={handleSubmitRegra} errors={errorsRegra} tipoRegra={tipoRegra} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CRMLoja;
