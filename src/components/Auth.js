import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [mensagem, setMensagem] = useState({ erro: "", sucesso: "" });

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
  });

  const resetForm = useForm({
    resolver: zodResolver(
      z.object({ email: z.string().email("E-mail inválido") })
    ),
  });

  const onLoginHandler = (data) => {
    setMensagem({ erro: "", sucesso: "" });
    const usuarios = JSON.parse(localStorage.getItem("crm_usuarios") || "[]");
    const usuario = usuarios.find(
      (u) => u.email === data.email && u.senha === data.senha
    );

    if (usuario) {
      localStorage.setItem("crm_usuario_logado", JSON.stringify(usuario));
      onLogin(usuario);
    } else {
      setMensagem({ erro: "E-mail ou senha incorretos" });
    }
  };

  const onRegisterHandler = (data) => {
    setMensagem({ erro: "", sucesso: "" });
    const usuarios = JSON.parse(localStorage.getItem("crm_usuarios") || "[]");
    const usuarioExiste = usuarios.find((u) => u.email === data.email);

    if (usuarioExiste) {
      setMensagem({ erro: "Este e-mail já está cadastrado" });
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      email: data.email,
      senha: data.senha,
    };
    usuarios.push(novoUsuario);
    localStorage.setItem("crm_usuarios", JSON.stringify(usuarios));
    setMensagem({ sucesso: "Cadastro realizado com sucesso! Faça login." });
    setModo("login");
    registerForm.reset();
  };

  const onResetHandler = (data) => {
    setMensagem({ erro: "", sucesso: "" });
    const usuarios = JSON.parse(localStorage.getItem("crm_usuarios") || "[]");
    const usuario = usuarios.find((u) => u.email === data.email);

    if (usuario) {
      setMensagem({
        sucesso: `Instruções de recuperação foram enviadas para ${data.email}`,
      });
      setTimeout(() => {
        setModo("login");
        setMensagem({ erro: "", sucesso: "" });
      }, 3000);
      resetForm.reset();
    } else {
      setMensagem({ erro: "E-mail não encontrado" });
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
                setMensagem({ erro: "", sucesso: "" });
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
                setMensagem({ erro: "", sucesso: "" });
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

          {mensagem.erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {mensagem.erro}
            </div>
          )}
          {mensagem.sucesso && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              {mensagem.sucesso}
            </div>
          )}

          {modo === "login" && (
            <form
              onSubmit={loginForm.handleSubmit(onLoginHandler)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  {...loginForm.register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  {...loginForm.register("senha")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                {loginForm.formState.errors.senha && (
                  <p className="text-red-600 text-sm mt-1">
                    {loginForm.formState.errors.senha.message}
                  </p>
                )}
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setModo("reset")}
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
            <form
              onSubmit={registerForm.handleSubmit(onRegisterHandler)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  {...registerForm.register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  {...registerForm.register("senha")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                />
                {registerForm.formState.errors.senha && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerForm.formState.errors.senha.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  {...registerForm.register("confirmarSenha")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite a senha novamente"
                />
                {registerForm.formState.errors.confirmarSenha && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerForm.formState.errors.confirmarSenha.message}
                  </p>
                )}
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
            <form
              onSubmit={resetForm.handleSubmit(onResetHandler)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  {...resetForm.register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
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
                onClick={() => setModo("login")}
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
