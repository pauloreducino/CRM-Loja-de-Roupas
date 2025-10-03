CRM para Loja de Roupas
Um sistema de CRM (Customer Relationship Management) completo e responsivo, desenvolvido em React, para gerenciar clientes, vendas e automatizar o relacionamento com o cliente em uma loja de roupas. A aplicação é projetada para ser intuitiva, eficiente e adaptável a qualquer tamanho de tela.

✨ Funcionalidades Principais
O sistema é dividido em quatro módulos principais, acessíveis através de uma navegação por abas:

Clientes: Gestão completa da base de clientes.

Vendas: Registro e acompanhamento de todas as vendas.

Tarefas: Central de ações de relacionamento, geradas automaticamente.

Automação: Motor para criar regras personalizadas de engajamento.

👤 Gestão de Clientes
Nesta aba, você pode gerenciar todas as informações dos seus clientes de forma centralizada.

Cadastro e Edição: Adicione novos clientes ou atualize informações existentes através de um formulário intuitivo, incluindo nome, telefone, e-mail, data de nascimento e observações.

Listagem e Busca: Visualize todos os clientes em uma tabela organizada. Utilize a barra de busca para encontrar clientes rapidamente pelo nome ou telefone.

Exclusão Segura: Remova clientes da base. Ao excluir um cliente, todas as suas vendas e tarefas associadas também são removidas para manter a integridade dos dados.

🛒 Gestão de Vendas
Registre cada transação para manter um histórico completo do relacionamento comercial.

Registro de Vendas: Crie um novo registro de venda associando-o a um cliente existente, com data, valor e descrição.

Crédito ao Cliente: Adicione um valor de crédito para o cliente como parte de uma venda (ex: cashback, trocas) e defina uma data de validade para o mesmo.

Histórico Completo: Todas as vendas são listadas em ordem cronológica, facilitando a consulta.

✅ Sistema de Tarefas Automatizadas
O coração do relacionamento com o cliente. Esta aba organiza todas as ações de contato que precisam ser feitas.

Geração Automática: As tarefas são criadas automaticamente com base nas regras definidas na aba "Automação".

Filtros Inteligentes: Organize as tarefas por status: Atrasadas, Hoje, Futuras e Concluídas.

Envio de WhatsApp: Cada tarefa pendente possui um botão "Enviar WhatsApp" que abre o WhatsApp Web com o número do cliente e a mensagem personalizada já preenchida, otimizando o tempo.

Status Visual: As tarefas possuem indicadores visuais de status e tipo (Aniversário, Crédito, Inatividade).

⚙️ Motor de Automação
Configure as regras que darão vida ao seu CRM. Crie gatilhos para que o sistema trabalhe para você.

Criação de Regras: Defina novas regras de automação para três tipos de gatilhos:

Aniversário: Envia lembretes X dias antes do aniversário do cliente.

Crédito: Avisa o cliente sobre um crédito que está prestes a expirar.

Inatividade: Entra em contato com clientes que não compram há um determinado período.

Mensagens Personalizadas: Utilize variáveis dinâmicas como {nome}, {credito} e {dataExpiracao} nas mensagens para criar uma comunicação única e pessoal com cada cliente.

Gerenciamento de Regras: Edite, ative/desative ou exclua regras a qualquer momento.

🚀 Tecnologias Utilizadas
React: Biblioteca JavaScript para a construção da interface de usuário.

React Hooks (useState, useEffect): Para gerenciamento de estado e ciclo de vida dos componentes.

Tailwind CSS: Framework CSS para estilização rápida e responsiva.

Lucide React: Biblioteca de ícones open-source, leve e personalizável.

📱 Design Responsivo
A aplicação foi desenvolvida com a abordagem mobile-first, garantindo uma experiência de uso perfeita em qualquer dispositivo, seja em um celular, tablet ou desktop. Elementos como tabelas, formulários e a navegação se adaptam de forma inteligente ao tamanho da tela.
