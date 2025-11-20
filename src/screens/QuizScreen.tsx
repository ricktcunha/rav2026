import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import type { ArchetypeId } from '../data/archetypes';
import ProgressBar from '../components/ProgressBar';

interface Props {
  onComplete: (archetypeId: ArchetypeId) => void;
}

export const QuizScreen: React.FC<Props> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<ArchetypeId, number>>({
    pioneer: 0,
    strategist: 0,
    connector: 0,
    executor: 0,
    cultivator: 0,
    visionary: 0
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (archetypeId: ArchetypeId, optionIndex: number) => {
    // Visual feedback
    setSelectedOption(optionIndex);

    // Update scores
    const newScores = { ...scores };
    newScores[archetypeId]++;

    setTimeout(() => {
      setScores(newScores);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        calculateArchetype(newScores);
      }
    }, 600);
  };

  const calculateArchetype = (finalScores: Record<ArchetypeId, number>) => {
    const dominantArchetype = (Object.keys(finalScores) as ArchetypeId[]).reduce((a, b) =>
      finalScores[a] > finalScores[b] ? a : b
    );

    onComplete(dominantArchetype);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8 max-w-5xl mx-auto">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full space-y-8"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white text-center mb-12 leading-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentQ.question}
          </motion.h2>

          <div className="grid gap-4 md:gap-6">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.archetype, index)}
                disabled={selectedOption !== null}
                className={`
                  relative w-full p-5 md:p-6 text-left rounded-2xl
                  border-2 transition-all duration-300 group overflow-hidden
                  ${selectedOption === index
                    ? 'border-agro-green bg-agro-green/20 scale-105'
                    : 'border-gray-700 hover:border-agro-green/50'
                  }
                  ${selectedOption !== null && selectedOption !== index ? 'opacity-50' : ''}
                `}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-agro-green/0 via-agro-green/10 to-agro-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center space-x-4">
                  <span className={`
                    flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full
                    font-bold text-lg transition-all duration-300
                    ${selectedOption === index
                      ? 'bg-agro-green text-black scale-110'
                      : 'bg-gray-800 text-agro-green group-hover:bg-agro-green/20'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={`
                    text-lg md:text-xl font-medium transition-colors duration-300
                    ${selectedOption === index
                      ? 'text-white'
                      : 'text-gray-300 group-hover:text-white'
                    }
                  `}>
                    {option.text}
                  </span>
                </div>

                {/* Selection pulse effect */}
                {selectedOption === index && (
                  <motion.div
                    className="absolute inset-0 border-2 border-agro-green rounded-2xl"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
