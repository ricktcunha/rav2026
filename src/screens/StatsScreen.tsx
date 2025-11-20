import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Users, BarChart3, TrendingUp, RefreshCw } from 'lucide-react';
import { getParticipantStats } from '../utils/firestore';
import StatsCard from '../components/StatsCard';
import ParticipantTable from '../components/ParticipantTable';
import { archetypes } from '../data/archetypes';
import { areaNames } from '../types/participant';

interface Props {
  onClose: () => void;
}

export const StatsScreen: React.FC<Props> = ({ onClose }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getParticipantStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-agro-green/20 rounded-xl">
              <BarChart3 size={24} className="text-agro-green" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Estatísticas RAV 2026</h2>
              <p className="text-gray-400 text-sm">Visão geral dos participantes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadStats}
              disabled={loading}
              className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
            >
              <RefreshCw size={20} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={40} className="text-agro-green animate-spin" />
            </div>
          ) : stats ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                  title="Total de Participantes"
                  value={stats.total}
                  icon={Users}
                  color="#39FF14"
                  delay={0}
                />
                <StatsCard
                  title="Arquétipos Identificados"
                  value={Object.keys(stats.byArchetype).length}
                  icon={TrendingUp}
                  color="#3b82f6"
                  delay={0.1}
                />
                <StatsCard
                  title="Áreas Representadas"
                  value={Object.keys(stats.byArea).length}
                  icon={BarChart3}
                  color="#f59e0b"
                  delay={0.2}
                />
              </div>

              {/* Archetype Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <span>Distribuição por Arquétipo</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(stats.byArchetype).map(([archetypeId, count], index) => {
                    const archetype = archetypes[archetypeId as keyof typeof archetypes];
                    const percentage = ((count as number / stats.total) * 100).toFixed(1);
                    return (
                      <motion.div
                        key={archetypeId}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{archetype.name}</p>
                            <p className="text-gray-400 text-xs">{count as number} participantes</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: archetype.color }}
                          />
                        </div>
                        <p className="text-right text-xs text-gray-400 mt-1">{percentage}%</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Area Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Distribuição por Área</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(stats.byArea).map(([area, count], index) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700"
                    >
                      <p className="text-2xl font-bold text-agro-green">{count as number}</p>
                      <p className="text-white font-medium text-sm mt-1">{area}</p>
                      <p className="text-gray-400 text-xs">{areaNames[area as keyof typeof areaNames]}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Participants Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Últimos Participantes</h3>
                <ParticipantTable participants={stats.recent} />
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              Erro ao carregar estatísticas
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
