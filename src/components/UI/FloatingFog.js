import React from "react";

const FloatingFog = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-teal-400/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-gradient-to-tr from-pink-400/40 via-orange-300/30 to-yellow-300/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-gradient-to-bl from-indigo-400/30 via-sky-400/20 to-cyan-300/30 rounded-full blur-2xl animate-float-slow delay-1000" />
    </div>
  );
};

export default FloatingFog;
