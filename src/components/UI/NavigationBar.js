import React from "react";
import { Users, ShoppingCart, CheckSquare, Settings } from "lucide-react";

const NavigationBar = ({ activeTab, setActiveTab }) => (
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
);

export default NavigationBar;
