import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, ArrowRight, AlertCircle } from 'lucide-react';
import type { Area } from '../types/participant';
import { areaNames } from '../types/participant';
import VirtualKeyboard from '../components/VirtualKeyboard';

interface Props {
  onComplete: (name: string, area: Area) => void;
}

export const RegistrationScreen: React.FC<Props> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState<Area | ''>('');
  const [errors, setErrors] = useState({ name: '', area: '' });
  const [showKeyboard, setShowKeyboard] = useState(false);

  const validateName = (value: string) => {
    if (!value.trim()) {
      return 'Por favor, digite seu nome';
    }
    if (value.trim().length < 3) {
      return 'Nome deve ter pelo menos 3 caracteres';
    }
    return '';
  };

  const validateArea = (value: string) => {
    if (!value) {
      return 'Por favor, selecione sua área';
    }
    return '';
  };

  const handleNameChange = (value: string) => {
    setName(value);
    const error = validateName(value);
    setErrors(prev => ({ ...prev, name: error }));
  };

  const handleKeyPress = (key: string) => {
    const newName = name + key;
    handleNameChange(newName);
  };

  const handleBackspace = () => {
    const newName = name.slice(0, -1);
    handleNameChange(newName);
  };

  const handleAreaChange = (value: Area | '') => {
    setArea(value);
    const error = validateArea(value);
    setErrors(prev => ({ ...prev, area: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(name);
    const areaError = validateArea(area);

    if (nameError || areaError) {
      setErrors({ name: nameError, area: areaError });
      return;
    }

    onComplete(name.trim(), area as Area);
  };

  const isValid = name.trim().length >= 3 && area !== '';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-4 md:space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Vamos começar!
          </h2>
          <p className="text-gray-400 text-lg">
            Precisamos de algumas informações
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-gray-700 rounded-3xl p-6 md:p-8 space-y-6"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-agro-green/20 to-green-500/20 rounded-3xl blur-xl opacity-50" />

          <div className="relative space-y-6">
            {/* Name Input */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <User size={16} className="text-agro-green" />
                <span>Nome Completo</span>
              </label>
              <div
                onClick={() => setShowKeyboard(true)}
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl
                  text-white text-lg placeholder-gray-500
                  focus:outline-none focus:border-agro-green
                  transition-colors duration-300 cursor-pointer min-h-[56px] flex items-center
                  ${errors.name ? 'border-red-500' : showKeyboard ? 'border-agro-green' : 'border-gray-700'}
                `}
              >
                {name || <span className="text-gray-500">Toque para digitar seu nome</span>}
              </div>
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-1 mt-2 text-red-400 text-sm"
                >
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </motion.div>
              )}
            </div>

            {/* Area Select */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Briefcase size={16} className="text-agro-green" />
                <span>Área de Atuação</span>
              </label>
              <select
                value={area}
                onChange={(e) => handleAreaChange(e.target.value as Area | '')}
                className={`
                  w-full px-4 py-4 bg-gray-800/50 border-2 rounded-xl
                  text-white text-lg
                  focus:outline-none focus:border-agro-green
                  transition-colors duration-300
                  cursor-pointer
                  ${errors.area ? 'border-red-500' : 'border-gray-700'}
                  ${!area ? 'text-gray-500' : ''}
                `}
              >
                <option value="">Selecione sua área</option>
                {(Object.keys(areaNames) as Area[]).map((areaKey) => (
                  <option key={areaKey} value={areaKey} className="text-white bg-gray-800">
                    {areaKey} - {areaNames[areaKey]}
                  </option>
                ))}
              </select>
              {errors.area && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-1 mt-2 text-red-400 text-sm"
                >
                  <AlertCircle size={14} />
                  <span>{errors.area}</span>
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
              className={`
                w-full py-4 rounded-xl font-bold text-lg
                flex items-center justify-center space-x-2
                transition-all duration-300
                ${isValid
                  ? 'bg-agro-green text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.form>

        {/* Virtual Keyboard */}
        <AnimatePresence>
          {showKeyboard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <VirtualKeyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm"
        >
          Suas informações serão usadas apenas para personalizar sua experiência
        </motion.p>
      </motion.div>
    </div>
  );
};
