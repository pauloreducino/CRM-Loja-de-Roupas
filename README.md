# CRM para Loja de Roupas

Um sistema de CRM (Customer Relationship Management) completo e responsivo, desenvolvido em React, para gerenciar clientes, vendas e automatizar o relacionamento com o cliente em uma loja de roupas. A aplicação é projetada para ser intuitiva, eficiente e adaptável a qualquer tamanho de tela.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)

  - [Gestão de Clientes](#-gestão-de-clientes)
  - [Gestão de Vendas](#-gestão-de-vendas)
  - [Sistema de Tarefas Automatizadas](#-sistema-de-tarefas-automatizadas)
  - [Motor de Automação](#-motor-de-automação)

- [Design Responsivo](#-design-responsivo)
- [Telas da Aplicação](#-telas-da-aplicação)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Começando](#-começando)

  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)

- [Licença](#-licença)

## Sobre o Projeto

Este CRM foi criado para simplificar a gestão de uma loja de roupas, focando no que mais importa: o relacionamento com o cliente. Através de uma interface limpa e organizada, é possível centralizar informações de clientes, registrar vendas e, o mais importante, criar um sistema de relacionamento automatizado que trabalha para você, gerando tarefas de contato em momentos estratégicos.

## ✨ Funcionalidades Principais

O sistema é dividido em quatro módulos principais, acessíveis através de uma navegação por abas:

### 👤 Gestão de Clientes

Gestão completa da base de clientes.

- **Cadastro e Edição:** Adicione novos clientes ou atualize informações existentes através de um formulário intuitivo (nome, telefone, e-mail, data de nascimento e observações).
- **Listagem e Busca:** Visualize todos os clientes em uma tabela organizada e utilize a barra de busca para encontrar clientes rapidamente.
- **Exclusão Segura:** Remova clientes da base. Todas as vendas e tarefas associadas são removidas para manter a integridade dos dados.

### 🛒 Gestão de Vendas

Registre cada transação para manter um histórico completo.

- **Registro de Vendas:** Crie um novo registro de venda associado a um cliente existente, com data, valor e descrição.
- **Crédito ao Cliente:** Adicione um valor de crédito para o cliente (ex: cashback, trocas) e defina uma data de validade.
- **Histórico Completo:** Todas as vendas são listadas em ordem cronológica para fácil consulta.

### ✅ Sistema de Tarefas Automatizadas

O coração do relacionamento com o cliente, organizando todas as ações de contato.

- **Geração Automática:** As tarefas são criadas com base nas regras definidas na aba "Automação".
- **Filtros Inteligentes:** Organize as tarefas por status: Atrasadas, Hoje, Futuras e Concluídas.
- **Envio de WhatsApp:** Um botão "Enviar WhatsApp" abre o WhatsApp Web com o número do cliente e a mensagem personalizada já preenchida.
- **Status Visual:** Indicadores visuais de status e tipo (Aniversário, Crédito, Inatividade).

### ⚙️ Motor de Automação

Configure as regras que darão vida ao seu CRM.

- **Criação de Regras:** Defina gatilhos para três tipos de eventos: Aniversário, Crédito Expirando e Inatividade de Cliente.
- **Mensagens Personalizadas:** Utilize variáveis dinâmicas como `{nome}`, `{credito}` e `{dataExpiracao}` para criar uma comunicação única.
- **Gerenciamento de Regras:** Edite, ative, desative ou exclua regras a qualquer momento.

## 📱 Design Responsivo

Desenvolvido com a abordagem **mobile-first**, garantindo uma experiência de uso perfeita em qualquer dispositivo, seja em um celular, tablet ou desktop. Elementos como tabelas, formulários e a navegação se adaptam de forma inteligente ao tamanho da tela.

## 📸 Telas da Aplicação

_(Aqui você pode adicionar imagens ou GIFs demonstrando a interface do CRM.)_

## 🚀 Tecnologias Utilizadas

- **[React](https://reactjs.org/):** Biblioteca JavaScript para a construção da interface de usuário.
- **[React Hooks (useState, useEffect)](https://reactjs.org/docs/hooks-intro.html):** Para gerenciamento de estado e ciclo de vida dos componentes.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS para estilização rápida e responsiva.
- **[Lucide React](https://lucide.dev/):** Biblioteca de ícones open-source, leve e personalizável.

## 🏁 Começando

Siga estas instruções para obter uma cópia do projeto em funcionamento na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (que inclui o npm, gerenciador de pacotes)
- [Git](https://git-scm.com/)

### Instalação

1. **Clone o repositório**

```sh
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. **Navegue até o diretório do projeto**

```sh
cd nome-do-repositorio
```

3. **Instale as dependências**

```sh
npm install
```

_ou, se você utilizar Yarn:_

```sh
yarn install
```

4. **Execute a aplicação**

```sh
npm start
```

_ou, se você utilizar Yarn:_

```sh
yarn start
```

5. **Abra no navegador**

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ❤️ por [Paulo Reducino](https://github.com/pauloreducino)
