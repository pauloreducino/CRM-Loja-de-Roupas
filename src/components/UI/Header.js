import React, { useState, useEffect } from "react";
import { Paintbrush, LogOut } from "lucide-react";

const Header = ({ onLogout }) => {
  const [showPalette, setShowPalette] = useState(false);

  // Carrega cores do localStorage ou usa padrão
  const [startColor, setStartColor] = useState(
    () => localStorage.getItem("crm_startColor") || "#7c3aed"
  );
  const [endColor, setEndColor] = useState(
    () => localStorage.getItem("crm_endColor") || "#ec4899"
  );

  const bgGradient = `linear-gradient(to right, ${startColor}, ${endColor})`;

  // Sempre que mudar a cor, salva no localStorage
  useEffect(() => {
    localStorage.setItem("crm_startColor", startColor);
  }, [startColor]);

  useEffect(() => {
    localStorage.setItem("crm_endColor", endColor);
  }, [endColor]);

  return (
    <div
      className="relative text-white p-4 md:p-6 shadow-xl transition-all duration-500"
      style={{ background: bgGradient }}
    >
      {/* Botões no canto superior direito */}
      <div className="absolute top-3 right-3 md:top-5 md:right-5 flex items-center gap-2">
        {/* Botão de Logout (só aparece se onLogout existir) */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/20 transition-all"
            aria-label="Sair do sistema"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Botão de Paleta de Cores */}
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/20 transition-all"
          aria-label="Abrir paleta de cores"
        >
          <Paintbrush className="w-5 h-5 text-white" />
        </button>

        {/* Menu de Seleção de Cores */}
        {showPalette && (
          <div className="absolute right-0 mt-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 w-56 z-50 top-12">
            <p className="text-sm font-semibold text-white mb-2">
              🎨 Escolha seu gradiente
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-black text-sm mb-1">Cor Inicial</label>
                <input
                  type="color"
                  value={startColor}
                  onChange={(e) => setStartColor(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer border border-white/20"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black text-sm mb-1">Cor Final</label>
                <input
                  type="color"
                  value={endColor}
                  onChange={(e) => setEndColor(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer border border-white/20"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo principal do Header */}
      <div className="flex flex-col md:flex-row items-center md:gap-4">
        <img
          src="/logo-loja.webp"
          alt="Logo da Loja de Roupas"
          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg shadow-md mb-2 md:mb-0"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">CRM Loja de Roupas</h1>
          <p className="text-purple-100 mt-1 text-sm md:text-base">
            Sistema de Gestão de Clientes e Vendas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
