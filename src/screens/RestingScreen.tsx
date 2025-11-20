import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Leaf, Target, BarChart3 } from 'lucide-react';

interface Props {
  onStart: () => void;
  onShowStats?: () => void;
}

export const RestingScreen: React.FC<Props> = ({ onStart, onShowStats }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-agro-green/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />

        {/* Floating icons */}
        {[Sparkles, Leaf, Target].map((Icon, index) => (
          <motion.div
            key={index}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              delay: index * 0.5
            }}
            className="absolute"
            style={{
              left: `${20 + index * 30}%`,
              top: `${30 + index * 15}%`
            }}
          >
            <Icon size={40} className="text-agro-green/30" />
          </motion.div>
        ))}
      </div>

      {/* Stats Button - Top Right */}
      {onShowStats && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          onClick={onShowStats}
          className="absolute top-6 right-6 z-10 flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-agro-green/30 rounded-xl transition-colors backdrop-blur-sm"
        >
          <BarChart3 size={20} className="text-agro-green" />
          <span className="text-white text-sm font-medium">Estatísticas</span>
        </motion.button>
      )}

      {/* Content */}
      <div className="z-10 flex flex-col items-center space-y-8 text-center px-6 max-w-4xl">

        {/* Logo/Brand Area */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center space-x-2 text-agro-green">
            <Leaf size={32} />
            <h3 className="text-2xl font-bold tracking-wider">ADUBOS REAL</h3>
          </div>
          <p className="text-gray-400 text-sm">Mais de 45 anos cultivando confiança</p>
        </motion.div>

        {/* Year Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="inline-flex flex-col items-center px-8 py-4 bg-gradient-to-r from-agro-green/20 to-green-500/20 border-2 border-agro-green/50 rounded-2xl"
        >
          <span className="text-5xl font-bold text-white">2024/25</span>
          <span className="text-agro-green font-semibold text-lg mt-1">O ano que plantamos inovação</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight"
        >
          RAV <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-green to-emerald-400">2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl"
        >
          Comprometidos com o fortalecimento do agronegócio brasileiro,
          <br />
          oferecemos soluções de excelência com <span className="text-agro-green font-semibold">inovação</span> e <span className="text-agro-green font-semibold">sustentabilidade</span>.
        </motion.p>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 text-sm"
        >
          {[
            { icon: Sparkles, text: 'Inovação' },
            { icon: TrendingUp, text: 'Excelência' },
            { icon: Target, text: 'Sustentabilidade' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
              <item.icon size={16} className="text-agro-green" />
              <span className="text-gray-300">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm max-w-2xl"
        >
          <h3 className="text-agro-green font-bold text-lg mb-4 flex items-center space-x-2">
            <Sparkles size={20} />
            <span>Como Funciona</span>
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-agro-green/20 border border-agro-green flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-agro-green text-xs font-bold">1</span>
              </div>
              <p className="text-gray-300 text-sm">Responda <span className="text-white font-semibold">6 perguntas</span> sobre seu estilo de trabalho</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-agro-green/20 border border-agro-green flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-agro-green text-xs font-bold">2</span>
              </div>
              <p className="text-gray-300 text-sm">Tire uma <span className="text-white font-semibold">foto</span> para personalizar seu resultado</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-agro-green/20 border border-agro-green flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-agro-green text-xs font-bold">3</span>
              </div>
              <p className="text-gray-300 text-sm">Descubra seu <span className="text-white font-semibold">arquétipo</span> e compartilhe no Instagram</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
          className="pt-4"
        >
          <p className="text-gray-400 mb-4 text-lg">
            Descubra seu perfil e prepare-se para
            <br />
            <span className="text-agro-green font-semibold">a maior safra da sua carreira!</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative px-12 py-6 bg-agro-green text-black rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] transition-shadow"
          >
            <motion.div
              animate={{ x: [-100, 100] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span className="relative text-2xl md:text-3xl font-bold tracking-wide flex items-center space-x-3">
              <span>VER MEU FUTURO</span>
              <Sparkles className="w-8 h-8" />
            </span>
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};
