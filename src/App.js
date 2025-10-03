import React, { useState, useEffect } from "react";
import {
  Plus,
  Users,
  ShoppingCart,
  CheckSquare,
  Calendar,
  Edit2,
  Trash2,
  Search,
  MessageCircle,
  Gift,
  Clock,
  AlertCircle,
  X,
  Settings,
} from "lucide-react";

// Componente principal do CRM
const CRMLoja = () => {
  // --- ESTADOS ---
  const [activeTab, setActiveTab] = useState("clientes");
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [regrasAutomacao, setRegrasAutomacao] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTarefa, setFiltroTarefa] = useState("todas");

  // Estados dos formulários para o modal
  const [formCliente, setFormCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    endereco: "",
    observacoes: "",
  });
  const [formVenda, setFormVenda] = useState({
    clienteId: "",
    valor: "",
    descricao: "",
    dataVenda: new Date().toISOString().split("T")[0],
    formaPagamento: "dinheiro",
    credito: 0,
    validadeCredito: "",
  });
  const [formRegra, setFormRegra] = useState({
    nome: "",
    tipo: "aniversario",
    diasAntes: 7,
    mensagem: "",
    ativo: true,
  });

  // --- EFEITOS (LÓGICA) ---

  // Carrega dados iniciais (regras de automação padrão)
  useEffect(() => {
    const regrasPadrao = [
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
    setRegrasAutomacao(regrasPadrao);
  }, []);

  // Gera tarefas automáticas quando clientes, vendas ou regras mudam
  useEffect(() => {
    gerarTarefasAutomaticas();
  }, [vendas, clientes, regrasAutomacao]);

  // Função para gerar tarefas baseadas nas regras de automação
  const gerarTarefasAutomaticas = () => {
    const novasTarefas = [];
    const hoje = new Date();

    clientes.forEach((cliente) => {
      // Tarefas de aniversário
      if (cliente.dataNascimento) {
        const [ano, mes, dia] = cliente.dataNascimento.split("-");
        const aniversarioEsteAno = new Date(
          hoje.getFullYear(),
          parseInt(mes) - 1,
          parseInt(dia)
        );
        if (aniversarioEsteAno < hoje)
          aniversarioEsteAno.setFullYear(hoje.getFullYear() + 1);

        regrasAutomacao
          .filter((r) => r.tipo === "aniversario" && r.ativo)
          .forEach((regra) => {
            const dataExecucao = new Date(aniversarioEsteAno);
            dataExecucao.setDate(dataExecucao.getDate() - regra.diasAntes);
            const dataExecucaoStr = dataExecucao.toISOString().split("T")[0];

            const tarefaExistente = tarefas.find(
              (t) =>
                t.clienteId === cliente.id &&
                t.tipo === regra.tipo &&
                t.dataExecucao === dataExecucaoStr
            );
            if (!tarefaExistente) {
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
            }
          });
      }

      // Tarefas de crédito e inatividade
      const vendasCliente = vendas
        .filter((v) => v.clienteId === cliente.id)
        .sort((a, b) => new Date(b.dataVenda) - new Date(a.dataVenda));
      vendasCliente.forEach((venda) => {
        if (venda.credito > 0 && venda.validadeCredito) {
          const regraCredito = regrasAutomacao.find(
            (r) => r.tipo === "credito" && r.ativo
          );
          if (regraCredito) {
            const dataExpiracao = new Date(venda.validadeCredito);
            const dataLembrete = new Date(dataExpiracao);
            dataLembrete.setDate(
              dataLembrete.getDate() - regraCredito.diasAntes
            );
            const tarefaExistente = tarefas.find(
              (t) =>
                t.clienteId === cliente.id &&
                t.tipo === "credito" &&
                t.vendaId === venda.id
            );

            if (!tarefaExistente && dataLembrete >= hoje) {
              novasTarefas.push({
                id: Date.now() + Math.random(),
                clienteId: cliente.id,
                clienteNome: cliente.nome,
                vendaId: venda.id,
                tipo: "credito",
                mensagem: regraCredito.mensagem
                  .replace("{nome}", cliente.nome)
                  .replace("{credito}", venda.credito.toFixed(2))
                  .replace(
                    "{dataExpiracao}",
                    new Date(venda.validadeCredito).toLocaleDateString("pt-BR")
                  ),
                dataExecucao: dataLembrete.toISOString().split("T")[0],
                concluida: false,
                telefone: cliente.telefone,
              });
            }
          }
        }
      });

      const ultimaVenda = vendasCliente[0];
      if (ultimaVenda) {
        const diasSemComprar = Math.floor(
          (hoje - new Date(ultimaVenda.dataVenda)) / (1000 * 60 * 60 * 24)
        );
        const regraInatividade = regrasAutomacao.find(
          (r) => r.tipo === "inatividade" && r.ativo
        );
        if (regraInatividade && diasSemComprar >= regraInatividade.diasAntes) {
          const tarefaExistente = tarefas.find(
            (t) =>
              t.clienteId === cliente.id &&
              t.tipo === "inatividade" &&
              !t.concluida
          );
          if (!tarefaExistente) {
            novasTarefas.push({
              id: Date.now() + Math.random(),
              clienteId: cliente.id,
              clienteNome: cliente.nome,
              tipo: "inatividade",
              mensagem: regraInatividade.mensagem.replace(
                "{nome}",
                cliente.nome
              ),
              dataExecucao: hoje.toISOString().split("T")[0],
              concluida: false,
              telefone: cliente.telefone,
            });
          }
        }
      }
    });

    if (novasTarefas.length > 0) {
      setTarefas((prev) => [...prev, ...novasTarefas]);
    }
  };

  // --- FUNÇÕES DE MANIPULAÇÃO DO MODAL E DADOS ---

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (type === "cliente")
      setFormCliente(
        item || {
          nome: "",
          telefone: "",
          email: "",
          dataNascimento: "",
          endereco: "",
          observacoes: "",
        }
      );
    else if (type === "venda")
      setFormVenda(
        item || {
          clienteId: "",
          valor: "",
          descricao: "",
          dataVenda: new Date().toISOString().split("T")[0],
          formaPagamento: "dinheiro",
          credito: 0,
          validadeCredito: "",
        }
      );
    else if (type === "regra")
      setFormRegra(
        item || {
          nome: "",
          tipo: "aniversario",
          diasAntes: 7,
          mensagem: "",
          ativo: true,
        }
      );
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveCliente = () => {
    if (!formCliente.nome || !formCliente.telefone)
      return alert("Nome e telefone são obrigatórios!");
    if (editingItem)
      setClientes(
        clientes.map((c) =>
          c.id === editingItem.id ? { ...formCliente, id: editingItem.id } : c
        )
      );
    else setClientes([...clientes, { ...formCliente, id: Date.now() }]);
    closeModal();
  };

  const saveVenda = () => {
    if (!formVenda.clienteId || !formVenda.valor)
      return alert("Cliente e valor são obrigatórios!");
    const venda = {
      ...formVenda,
      valor: parseFloat(formVenda.valor),
      credito: parseFloat(formVenda.credito) || 0,
      id: editingItem?.id || Date.now(),
    };
    if (editingItem)
      setVendas(vendas.map((v) => (v.id === editingItem.id ? venda : v)));
    else setVendas([...vendas, venda]);
    closeModal();
  };

  const saveRegra = () => {
    if (!formRegra.nome || !formRegra.mensagem)
      return alert("Nome e mensagem são obrigatórios!");
    const regra = {
      ...formRegra,
      diasAntes: parseInt(formRegra.diasAntes) || 0,
      id: editingItem?.id || Date.now(),
    };
    if (editingItem)
      setRegrasAutomacao(
        regrasAutomacao.map((r) => (r.id === editingItem.id ? regra : r))
      );
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
    window.open(
      `https://web.whatsapp.com/send?phone=55${telefone}&text=${mensagem}`,
      "_blank"
    );
    setTarefas(
      tarefas.map((t) => (t.id === tarefa.id ? { ...t, concluida: true } : t))
    );
  };

  // --- FUNÇÕES AUXILIARES DE RENDERIZAÇÃO ---

  const getTarefasFiltradas = () => {
    const hoje = new Date().toISOString().split("T")[0];
    return tarefas.filter((t) => {
      if (filtroTarefa === "atrasadas")
        return t.dataExecucao < hoje && !t.concluida;
      if (filtroTarefa === "hoje")
        return t.dataExecucao === hoje && !t.concluida;
      if (filtroTarefa === "futuras")
        return t.dataExecucao > hoje && !t.concluida;
      if (filtroTarefa === "concluidas") return t.concluida;
      return true;
    });
  };

  const getStatusTarefa = (dataExecucao, concluida) => {
    if (concluida)
      return { cor: "bg-green-100 text-green-800", texto: "Concluída" };
    const hoje = new Date().toISOString().split("T")[0];
    if (dataExecucao < hoje)
      return { cor: "bg-red-100 text-red-800", texto: "Atrasada" };
    if (dataExecucao === hoje)
      return { cor: "bg-yellow-100 text-yellow-800", texto: "Hoje" };
    return { cor: "bg-blue-100 text-blue-800", texto: "Futura" };
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefone.includes(searchTerm)
  );
  const getClienteNome = (id) =>
    clientes.find((c) => c.id === Number(id))?.nome || "Cliente não encontrado";

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 md:p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          CRM Loja de Roupas
        </h1>
        <p className="text-purple-100 mt-1 text-center md:text-left text-sm md:text-base">
          Sistema de Gestão de Clientes e Vendas
        </p>
      </div>

      {/* Navegação - Responsiva */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex justify-around md:justify-start md:space-x-8">
            {[
              { id: "clientes", label: "Clientes", icon: Users },
              { id: "vendas", label: "Vendas", icon: ShoppingCart },
              { id: "tarefas", label: "Tarefas", icon: CheckSquare },
              { id: "automacao", label: "Automação", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center flex-1 md:flex-initial space-x-2 py-3 md:py-4 px-2 border-b-2 font-medium transition-colors text-sm ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon size={20} />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {activeTab === "clientes" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="w-full md:flex-1 md:max-w-md">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={() => openModal("cliente")}
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus size={20} />
                <span>Novo Cliente</span>
              </button>
            </div>
            {/* Tabela de clientes responsiva */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Nome
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Telefone
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Aniversário
                    </th>
                    <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {cliente.nome}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-600">
                        {cliente.telefone}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-600">
                        {cliente.email}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-600">
                        {cliente.dataNascimento
                          ? new Date(
                              cliente.dataNascimento + "T00:00:00"
                            ).toLocaleDateString("pt-BR")
                          : "-"}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => openModal("cliente", cliente)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteItem("cliente", cliente.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {clientesFiltrados.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Nenhum cliente cadastrado
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "vendas" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Vendas Realizadas
              </h2>
              <button
                onClick={() => openModal("venda")}
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus size={20} />
                <span>Nova Venda</span>
              </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Data
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Cliente
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Descrição
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Valor
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Crédito
                    </th>
                    <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendas
                    .sort(
                      (a, b) => new Date(b.dataVenda) - new Date(a.dataVenda)
                    )
                    .map((venda) => (
                      <tr key={venda.id} className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-900">
                          {new Date(
                            venda.dataVenda + "T00:00:00"
                          ).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {getClienteNome(venda.clienteId)}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 text-gray-600 max-w-xs truncate">
                          {venda.descricao}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                          R$ {venda.valor.toFixed(2)}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-600">
                          {venda.credito > 0
                            ? `R$ ${venda.credito.toFixed(2)}`
                            : "-"}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right space-x-2">
                          <button
                            onClick={() => openModal("venda", venda)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteItem("venda", venda.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {vendas.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Nenhuma venda registrada
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "tarefas" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Minhas Tarefas
              </h2>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {[
                  { value: "todas", label: "Todas" },
                  { value: "atrasadas", label: "Atrasadas" },
                  { value: "hoje", label: "Hoje" },
                  { value: "futuras", label: "Futuras" },
                  { value: "concluidas", label: "Concluídas" },
                ].map((filtro) => (
                  <button
                    key={filtro.value}
                    onClick={() => setFiltroTarefa(filtro.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filtroTarefa === filtro.value
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {getTarefasFiltradas()
                .sort((a, b) =>
                  a.concluida !== b.concluida
                    ? a.concluida
                      ? 1
                      : -1
                    : new Date(a.dataExecucao) - new Date(b.dataExecucao)
                )
                .map((tarefa) => {
                  const status = getStatusTarefa(
                    tarefa.dataExecucao,
                    tarefa.concluida
                  );
                  return (
                    <div
                      key={tarefa.id}
                      className="bg-white rounded-lg shadow p-4 md:p-6"
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mb-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${status.cor}`}
                            >
                              {status.texto}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(
                                tarefa.dataExecucao + "T00:00:00"
                              ).toLocaleDateString("pt-BR")}
                            </span>
                            {tarefa.tipo === "aniversario" && (
                              <Gift size={18} className="text-pink-500" />
                            )}
                            {tarefa.tipo === "credito" && (
                              <Calendar size={18} className="text-green-500" />
                            )}
                            {tarefa.tipo === "inatividade" && (
                              <Clock size={18} className="text-orange-500" />
                            )}
                          </div>
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {tarefa.clienteNome}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {tarefa.mensagem}
                          </p>
                          <p className="text-sm text-gray-500">
                            📱 {tarefa.telefone}
                          </p>
                        </div>
                        <div className="w-full md:w-auto">
                          {!tarefa.concluida && (
                            <button
                              onClick={() => enviarWhatsApp(tarefa)}
                              className="w-full md:w-auto flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                              <MessageCircle size={18} />
                              <span>Enviar WhatsApp</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {getTarefasFiltradas().length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
                  Nenhuma tarefa encontrada neste filtro
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "automacao" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Regras de Automação
              </h2>
              <button
                onClick={() => openModal("regra")}
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus size={20} />
                <span>Nova Regra</span>
              </button>
            </div>
            <div className="space-y-4">
              {regrasAutomacao.map((regra) => (
                <div
                  key={regra.id}
                  className="bg-white rounded-lg shadow p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {regra.nome}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            regra.ativo
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {regra.ativo ? "Ativa" : "Inativa"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Tipo:</strong>{" "}
                        {regra.tipo === "aniversario"
                          ? "Aniversário"
                          : regra.tipo === "credito"
                          ? "Crédito"
                          : "Inatividade"}{" "}
                        | <strong>Dias:</strong> {regra.diasAntes}
                      </p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                        {regra.mensagem}
                      </p>
                    </div>
                    <div className="flex space-x-2 self-start md:self-center">
                      <button
                        onClick={() => openModal("regra", regra)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteItem("regra", regra.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <AlertCircle size={20} className="mr-2" />
                Como funciona a automação
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
                <li>
                  <strong>Aniversário:</strong> Tarefas são criadas
                  automaticamente baseadas na data de nascimento do cliente
                </li>
                <li>
                  <strong>Crédito:</strong> Tarefas são criadas quando há
                  crédito cadastrado em uma venda
                </li>
                <li>
                  <strong>Inatividade:</strong> Tarefas são criadas para
                  clientes que não compram há X dias
                </li>
                <li>
                  Use{" "}
                  <strong>
                    {`{nome}`}, {`{credito}`}, {`{dataExpiracao}`}
                  </strong>{" "}
                  nas mensagens para personalização automática
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Modal Responsivo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-6 border-b">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {editingItem ? "Editar" : "Novo"}{" "}
                {modalType === "cliente"
                  ? "Cliente"
                  : modalType === "venda"
                  ? "Venda"
                  : "Regra"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 md:p-6">
              {modalType === "cliente" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={formCliente.nome}
                      onChange={(e) =>
                        setFormCliente({ ...formCliente, nome: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="text"
                      value={formCliente.telefone}
                      onChange={(e) =>
                        setFormCliente({
                          ...formCliente,
                          telefone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formCliente.email}
                      onChange={(e) =>
                        setFormCliente({
                          ...formCliente,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={formCliente.dataNascimento}
                      onChange={(e) =>
                        setFormCliente({
                          ...formCliente,
                          dataNascimento: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={formCliente.endereco}
                      onChange={(e) =>
                        setFormCliente({
                          ...formCliente,
                          endereco: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Rua, número, bairro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      value={formCliente.observacoes}
                      onChange={(e) =>
                        setFormCliente({
                          ...formCliente,
                          observacoes: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Informações adicionais"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveCliente}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              )}
              {modalType === "venda" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cliente *
                    </label>
                    <select
                      value={formVenda.clienteId}
                      onChange={(e) =>
                        setFormVenda({
                          ...formVenda,
                          clienteId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Selecione um cliente</option>
                      {clientes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data da Venda *
                    </label>
                    <input
                      type="date"
                      value={formVenda.dataVenda}
                      onChange={(e) =>
                        setFormVenda({
                          ...formVenda,
                          dataVenda: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formVenda.valor}
                      onChange={(e) =>
                        setFormVenda({ ...formVenda, valor: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={formVenda.descricao}
                      onChange={(e) =>
                        setFormVenda({
                          ...formVenda,
                          descricao: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Descrição dos produtos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Forma de Pagamento
                    </label>
                    <select
                      value={formVenda.formaPagamento}
                      onChange={(e) =>
                        setFormVenda({
                          ...formVenda,
                          formaPagamento: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="dinheiro">Dinheiro</option>
                      <option value="pix">PIX</option>
                      <option value="cartao_credito">Cartão de Crédito</option>
                      <option value="cartao_debito">Cartão de Débito</option>
                    </select>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Crédito para o Cliente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Valor do Crédito
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formVenda.credito}
                          onChange={(e) =>
                            setFormVenda({
                              ...formVenda,
                              credito: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Validade do Crédito
                        </label>
                        <input
                          type="date"
                          value={formVenda.validadeCredito}
                          onChange={(e) =>
                            setFormVenda({
                              ...formVenda,
                              validadeCredito: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveVenda}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              )}
              {modalType === "regra" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Regra *
                    </label>
                    <input
                      type="text"
                      value={formRegra.nome}
                      onChange={(e) =>
                        setFormRegra({ ...formRegra, nome: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ex: Lembrete de Aniversário"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Automação *
                    </label>
                    <select
                      value={formRegra.tipo}
                      onChange={(e) =>
                        setFormRegra({ ...formRegra, tipo: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="aniversario">Aniversário</option>
                      <option value="credito">Crédito</option>
                      <option value="inatividade">Inatividade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formRegra.tipo === "aniversario"
                        ? "Dias antes do aniversário"
                        : formRegra.tipo === "credito"
                        ? "Dias antes da expiração"
                        : "Dias sem comprar"}
                    </label>
                    <input
                      type="number"
                      value={formRegra.diasAntes}
                      onChange={(e) =>
                        setFormRegra({
                          ...formRegra,
                          diasAntes: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem *
                    </label>
                    <textarea
                      value={formRegra.mensagem}
                      onChange={(e) =>
                        setFormRegra({ ...formRegra, mensagem: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="4"
                      placeholder="Use {nome}, {credito}, {dataExpiracao}"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Variáveis: {"{nome}"}, {"{credito}"}, {"{dataExpiracao}"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formRegra.ativo}
                      onChange={(e) =>
                        setFormRegra({ ...formRegra, ativo: e.target.checked })
                      }
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Regra ativa
                    </label>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveRegra}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMLoja;
