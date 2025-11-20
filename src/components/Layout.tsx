import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-agro-dark text-white overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background Elements (Placeholder for now) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-agro-green blur-[150px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-agro-green blur-[150px] rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 w-full h-full max-w-4xl mx-auto flex flex-col"
      >
        {children}
      </motion.main>
    </div>
  );
};
