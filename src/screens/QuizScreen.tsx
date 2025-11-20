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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(57, 255, 20, 0.05)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.archetype, index)}
                disabled={selectedOption !== null}
                className={`
                  relative w-full p-6 md:p-8 text-left rounded-2xl
                  border transition-all duration-300 group
                  ${selectedOption === index
                    ? 'border-agro-green bg-agro-green/10'
                    : 'border-white/10 hover:border-agro-green/50 bg-white/5'
                  }
                  ${selectedOption !== null && selectedOption !== index ? 'opacity-40 grayscale' : ''}
                `}
              >
                <div className="flex items-center space-x-6">
                  <div className={`
                    flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border
                    font-bold text-sm transition-all duration-300
                    ${selectedOption === index
                      ? 'bg-agro-green border-agro-green text-black'
                      : 'border-white/30 text-white/60 group-hover:border-agro-green group-hover:text-agro-green'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  
                  <span className={`
                    text-lg md:text-xl font-medium leading-snug transition-colors
                    ${selectedOption === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                  `}>
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
