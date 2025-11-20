import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, onBackspace }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2 p-4 bg-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-sm">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((key) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onKeyPress(key)}
              className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg rounded-lg border border-gray-600 transition-colors"
            >
              {key}
            </motion.button>
          ))}
        </div>
      ))}

      {/* Bottom Row with Space and Backspace */}
      <div className="flex justify-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onKeyPress(' ')}
          className="flex-1 max-w-md h-12 md:h-14 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg border border-gray-600 transition-colors"
        >
          ESPAÇO
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackspace}
          className="w-20 h-12 md:h-14 bg-red-900/50 hover:bg-red-800/50 text-white font-bold rounded-lg border border-red-700 transition-colors flex items-center justify-center"
        >
          <Delete size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
