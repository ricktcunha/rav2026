import { motion } from 'framer-motion';
import type { Archetype } from '../data/archetypes';
import { CheckCircle2 } from 'lucide-react';

interface ArchetypeCardProps {
  archetype: Archetype;
}

export default function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-3xl blur-2xl opacity-50"
        style={{ backgroundColor: archetype.color }}
      />

      {/* Main card */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 rounded-3xl p-8 md:p-12 overflow-hidden">
        {/* Animated border gradient */}
        <div
          className="absolute inset-0 rounded-3xl opacity-20"
          style={{
            background: `linear-gradient(135deg, ${archetype.color}, transparent, ${archetype.color})`
          }}
        />

        {/* Content */}
        <div className="relative space-y-6">
          {/* Icon and title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              className="text-8xl mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              {archetype.icon}
            </motion.div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: archetype.color }}
            >
              {archetype.name}
            </h2>
            <p className="text-xl text-gray-300 italic">
              "{archetype.motivationalPhrase}"
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-200 text-center leading-relaxed"
          >
            {archetype.description}
          </motion.p>

          {/* Characteristics */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <h3 className="text-xl font-bold text-white text-center mb-4">
              Suas Características
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {archetype.characteristics.map((char, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-gray-800/50 rounded-xl p-3"
                >
                  <CheckCircle2
                    className="flex-shrink-0"
                    size={20}
                    style={{ color: archetype.color }}
                  />
                  <span className="text-gray-200">{char}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action tips */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-3 pt-4"
          >
            <h3 className="text-xl font-bold text-white text-center mb-4">
              Próximos Passos
            </h3>
            <div className="space-y-2">
              {archetype.actionTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-start space-x-3 text-gray-300"
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: archetype.color, color: '#000' }}
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
