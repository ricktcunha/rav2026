import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-400">
          Pergunta {current} de {total}
        </span>
        <span className="text-sm font-bold text-agro-green">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="w-full h-2 bg-agro-gray rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-agro-green to-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)'
          }}
        />
      </div>
    </div>
  );
}
