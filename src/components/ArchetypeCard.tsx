import { motion } from 'framer-motion';
import type { Archetype } from '../data/archetypes';
import { CheckCircle2 } from 'lucide-react';
import ArchetypeIcon from './ArchetypeIcon';

interface ArchetypeCardProps {
  archetype: Archetype;
}

export default function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-3xl blur-2xl opacity-40"
        style={{ backgroundColor: archetype.color }}
      />

      {/* Main card */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
        {/* Animated border gradient */}
        <div
          className="absolute inset-0 rounded-3xl opacity-10"
          style={{
            background: `linear-gradient(135deg, ${archetype.color}, transparent, ${archetype.color})`
          }}
        />

        {/* Content */}
        <div className="relative space-y-8">
          {/* Icon and title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-4"
          >
            <motion.div
              className="inline-flex p-6 rounded-full bg-white/5 border border-white/10"
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  `0 0 0px ${archetype.color}00`,
                  `0 0 20px ${archetype.color}40`,
                  `0 0 0px ${archetype.color}00`
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArchetypeIcon iconName={archetype.icon} size={64} color={archetype.color} />
            </motion.div>
            
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-3 tracking-tight"
                style={{ color: archetype.color }}
              >
                {archetype.name}
              </h2>
              <p className="text-xl text-gray-300 italic font-light">
                "{archetype.motivationalPhrase}"
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-300 text-center leading-relaxed max-w-lg mx-auto"
          >
            {archetype.description}
          </motion.p>

          {/* Characteristics */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold text-white/60 text-center uppercase tracking-widest">
              Seus Superpoderes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {archetype.characteristics.map((char, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <CheckCircle2
                    className="flex-shrink-0"
                    size={20}
                    style={{ color: archetype.color }}
                  />
                  <span className="text-gray-200 font-medium">{char}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action tips */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 pt-4 border-t border-white/10"
          >
            <h3 className="text-sm font-bold text-white/60 text-center uppercase tracking-widest">
              Missões para 2026
            </h3>
            <div className="space-y-2">
              {archetype.actionTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start space-x-3 text-gray-300"
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ backgroundColor: `${archetype.color}20`, color: archetype.color }}
                  >
                    {index + 1}
                  </span>
                  <span>{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
