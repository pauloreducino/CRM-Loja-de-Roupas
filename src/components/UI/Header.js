import React from "react";

const Header = () => (
  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 md:p-6 shadow-lg">
    <div className="flex flex-col md:flex-row items-center md:items-center md:gap-4">
      {/* Logo */}
      <img
        src="/logo-loja.webp"
        alt="Logo da Loja de Roupas"
        className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg shadow-md mb-2 md:mb-0"
      />

      {/* Textos */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold">CRM Loja de Roupas</h1>
        <p className="text-purple-100 mt-1 text-sm md:text-base">
          Sistema de Gestão de Clientes e Vendas
        </p>
      </div>
    </div>
  </div>
);

export default Header;
