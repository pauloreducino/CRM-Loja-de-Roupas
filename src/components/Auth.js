import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Store, Mail, Lock, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const registerSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmarSenha: z.string().min(6, "Confirme sua senha"),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

const PasswordInput = ({ placeholder, formRegister, error }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex" }}>
        <Lock size={15} />
      </div>
      <input
        type={show ? "text" : "password"}
        {...formRegister}
        className="glass-input"
        placeholder={placeholder}
        style={{ paddingLeft: "36px", paddingRight: "40px" }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
      {error && <p className="form-error">{error.message}</p>}
    </div>
  );
};

const Auth = ({ onLogin }) => {
  const [modo, setModo] = useState("login");
  const [mensagem, setMensagem] = useState({ erro: "", sucesso: "" });

  const loginForm    = useForm({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm({ resolver: zodResolver(registerSchema) });
  const resetForm    = useForm({ resolver: zodResolver(z.object({ email: z.string().email("E-mail inválido") })) });

  const onLoginHandler = (data) => {
    setMensagem({ erro: "", sucesso: "" });
    const usuarios = JSON.parse(localStorage.getItem("crm_usuarios") || "[]");
    const usuario  = usuarios.find((u) => u.email === data.email && u.senha === data.senha);
    if (usuario) { localStorage.setItem("crm_usuario_logado", JSON.stringify(usuario)); onLogin(usuario); }
    else setMensagem({ erro: "E-mail ou senha incorretos" });
  };

  const onRegisterHandler = (data) => {
    setMensagem({ erro: "", sucesso: "" });
    const usuarios = JSON.parse(localStorage.getItem("crm_usuarios") || "[]");
    if (usuarios.find((u) => u.email === data.email)) { setMensagem({ erro: "Este e-mail já está cadastrado" }); return; }
    const novoUsuario = { id: Date.now(), email: data.email, senha: data.senha };
    usuarios.push(novoUsuario);
    localStorage.setItem("crm_usuarios", JSON.stringify(usuarios));
    setMensagem({ sucesso: "Cadastro realizado! Faça login." });
    setModo("login");
    registerForm.reset();
  };

  const onResetHandler = (data) => {
    setMensagem({ erro: "", sucesso: "" });
    const usuarios = JSON.parse(localStorage.getItem("crm_usuarios") || "[]");
    if (usuarios.find((u) => u.email === data.email)) {
      setMensagem({ sucesso: `Instruções enviadas para ${data.email}` });
      setTimeout(() => { setModo("login"); setMensagem({ erro: "", sucesso: "" }); }, 3000);
      resetForm.reset();
    } else setMensagem({ erro: "E-mail não encontrado" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", position: "relative" }}>
      {/* Aurora */}
      <div className="aurora-container">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "420px" }} className="animate-fade-up">
        {/* Logo area */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "56px", height: "56px",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
          }}>
            <Store size={26} color="white" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "-0.03em", marginBottom: "6px" }}>
            CRM Loja de Roupas
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Gestão completa de clientes
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(12,12,28,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--border-glass-strong)",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.1)",
        }}>
          {/* Tabs */}
          {modo !== "reset" && (
            <div style={{ display: "flex", borderBottom: "1px solid var(--border-glass)", marginBottom: "24px" }}>
              {[{ id: "login", label: "Login" }, { id: "registro", label: "Registrar" }].map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setModo(t.id); setMensagem({ erro: "", sucesso: "" }); }}
                  style={{
                    flex: 1, padding: "10px 0",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "14px", fontWeight: "600",
                    color: modo === t.id ? "var(--accent-light)" : "var(--text-muted)",
                    borderBottom: `2px solid ${modo === t.id ? "var(--accent-light)" : "transparent"}`,
                    transition: "color 0.15s, border-color 0.15s",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "-1px",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {mensagem.erro && (
            <div style={{ background: "var(--danger-bg)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "13px", color: "var(--danger)" }}>
              {mensagem.erro}
            </div>
          )}
          {mensagem.sucesso && (
            <div style={{ background: "var(--success-bg)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "13px", color: "var(--success)" }}>
              {mensagem.sucesso}
            </div>
          )}

          {/* Login Form */}
          {modo === "login" && (
            <form onSubmit={loginForm.handleSubmit(onLoginHandler)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label">E-mail</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex" }}><Mail size={15} /></div>
                  <input type="email" {...loginForm.register("email")} className="glass-input" placeholder="seu@email.com" style={{ paddingLeft: "36px" }} />
                </div>
                {loginForm.formState.errors.email && <p className="form-error">{loginForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <label className="form-label">Senha</label>
                <PasswordInput placeholder="••••••••" formRegister={loginForm.register("senha")} error={loginForm.formState.errors.senha} />
              </div>
              <div style={{ textAlign: "right" }}>
                <button type="button" onClick={() => setModo("reset")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "var(--accent-light)", fontFamily: "Inter, sans-serif" }}>
                  Esqueceu a senha?
                </button>
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                Entrar
              </button>
            </form>
          )}

          {/* Register Form */}
          {modo === "registro" && (
            <form onSubmit={registerForm.handleSubmit(onRegisterHandler)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label">E-mail</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex" }}><Mail size={15} /></div>
                  <input type="email" {...registerForm.register("email")} className="glass-input" placeholder="seu@email.com" style={{ paddingLeft: "36px" }} />
                </div>
                {registerForm.formState.errors.email && <p className="form-error">{registerForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <label className="form-label">Senha</label>
                <PasswordInput placeholder="Mínimo 6 caracteres" formRegister={registerForm.register("senha")} error={registerForm.formState.errors.senha} />
              </div>
              <div>
                <label className="form-label">Confirmar Senha</label>
                <PasswordInput placeholder="Digite a senha novamente" formRegister={registerForm.register("confirmarSenha")} error={registerForm.formState.errors.confirmarSenha} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                Criar Conta
              </button>
            </form>
          )}

          {/* Reset Form */}
          {modo === "reset" && (
            <form onSubmit={resetForm.handleSubmit(onResetHandler)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ textAlign: "center", marginBottom: "8px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "6px" }}>Recuperar senha</p>
                <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Enviaremos instruções para seu e-mail</p>
              </div>
              <div>
                <label className="form-label">E-mail</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex" }}><Mail size={15} /></div>
                  <input type="email" {...resetForm.register("email")} className="glass-input" placeholder="seu@email.com" style={{ paddingLeft: "36px" }} />
                </div>
                {resetForm.formState.errors.email && <p className="form-error">{resetForm.formState.errors.email.message}</p>}
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                Recuperar Senha
              </button>
              <button type="button" onClick={() => setModo("login")} className="btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                Voltar ao Login
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)", marginTop: "20px" }}>
          Sistema de Gestão de Clientes v1.0
        </p>
      </div>
    </div>
  );
};

export default Auth;
