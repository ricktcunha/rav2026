import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const RecapScreen: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 2) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [onComplete]);

  const variants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.2, filter: "blur(10px)" },
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-agro-green/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <AnimatePresence mode="wait">

        {step === 0 && (
          <motion.div
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="space-y-6 relative z-10"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="flex justify-center mb-6"
            >
              <Sparkles size={64} className="text-agro-green" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white">
              2024/25
            </h2>
            <p className="text-2xl md:text-4xl text-gray-300">
              O ano que plantamos <span className="text-agro-green font-bold">inovação</span>.
            </p>

            {/* Animated Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-3 h-3 bg-agro-green rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="space-y-6 relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-6"
            >
              <TrendingUp size={64} className="text-yellow-400" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold text-white">
              Colhemos <span className="text-yellow-400">Recordes</span>
            </h2>
            <div className="flex justify-center items-baseline space-x-2">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-t from-agro-green to-white"
              >
                +150%
              </motion.span>
              <span className="text-2xl text-gray-400">em produtividade</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto h-2 bg-gray-800 rounded-full overflow-hidden mt-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-agro-green to-yellow-400"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="flex justify-center mb-6"
            >
              <Zap size={64} className="text-red-500" />
            </motion.div>

            <p className="text-3xl text-gray-300">
              Mas a Adubos Real não para.
            </p>
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter"
            >
              2026 EXIGE{' '}
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 10px rgba(239, 68, 68, 0.5)",
                    "0 0 20px rgba(239, 68, 68, 0.8)",
                    "0 0 10px rgba(239, 68, 68, 0.5)"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                MAIS
              </motion.span>
            </motion.h1>

            {/* Pulsing Circle */}
            <div className="flex justify-center mt-8">
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 border-4 border-red-500 rounded-full"
              />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
