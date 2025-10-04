import React, { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const registerSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

const Auth = ({ onLogin }) => {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErro("");

    try {
      loginSchema.parse({ email, senha });

      const usuarios = JSON.parse(localStorage.getItem("crm_usuarios")) || [];
      const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuario) {
        localStorage.setItem("crm_usuario_logado", JSON.stringify(usuario));
        onLogin(usuario);
      } else {
        setErro("E-mail ou senha incorretos");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErro(err.errors[0].message);
      }
    }
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      registerSchema.parse({ email, senha, confirmarSenha });

      const usuarios = JSON.parse(localStorage.getItem("crm_usuarios")) || [];
      const usuarioExiste = usuarios.find((u) => u.email === email);

      if (usuarioExiste) {
        setErro("Este e-mail já está cadastrado");
        return;
      }

      const novoUsuario = { id: Date.now(), email, senha };
      usuarios.push(novoUsuario);
      localStorage.setItem("crm_usuarios", JSON.stringify(usuarios));

      setSucesso("Cadastro realizado com sucesso! Faça login.");
      setModo("login");
      setSenha("");
      setConfirmarSenha("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErro(err.errors[0].message);
      }
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!email || !z.string().email().safeParse(email).success) {
      setErro("Digite um e-mail válido");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("crm_usuarios")) || [];
    const usuario = usuarios.find((u) => u.email === email);

    if (usuario) {
      setSucesso(`Instruções de recuperação foram enviadas para ${email}`);
      setTimeout(() => {
        setModo("login");
        setSucesso("");
      }, 3000);
    } else {
      setErro("E-mail não encontrado");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            CRM Loja de Roupas
          </h1>
          <p className="text-purple-200">Gestão completa de clientes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex border-b mb-6">
            <button
              onClick={() => {
                setModo("login");
                setErro("");
                setSucesso("");
              }}
              className={`flex-1 pb-3 text-center font-medium transition-colors ${
                modo === "login"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setModo("registro");
                setErro("");
                setSucesso("");
              }}
              className={`flex-1 pb-3 text-center font-medium transition-colors ${
                modo === "registro"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              Registrar
            </button>
          </div>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {erro}
            </div>
          )}

          {sucesso && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              {sucesso}
            </div>
          )}

          {modo === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setModo("reset");
                    setErro("");
                    setSucesso("");
                  }}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Entrar
              </button>
            </form>
          )}

          {modo === "registro" && (
            <form onSubmit={handleRegistro} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Criar Conta
              </button>
            </form>
          )}

          {modo === "reset" && (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enviaremos instruções para recuperar sua senha
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Recuperar Senha
              </button>
              <button
                type="button"
                onClick={() => {
                  setModo("login");
                  setErro("");
                  setSucesso("");
                }}
                className="w-full text-purple-600 hover:text-purple-700 font-medium"
              >
                Voltar ao Login
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-purple-200 text-sm mt-6">
          Sistema de Gestão de Clientes v1.0
        </p>
      </div>
    </div>
  );
};

export default Auth;
