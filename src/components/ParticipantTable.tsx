import { motion } from 'framer-motion';
import type { Participant } from '../types/participant';
import { archetypes, type ArchetypeId } from '../data/archetypes';
import { areaNames } from '../types/participant';

interface ParticipantTableProps {
  participants: Participant[];
}

export default function ParticipantTable({ participants }: ParticipantTableProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Nome</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Arquétipo</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Área</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => {
            const archetype = archetypes[participant.archetype as ArchetypeId];
            return (
              <motion.tr
                key={participant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-3 px-4 text-white font-medium">{participant.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{archetype.icon}</span>
                    <span className="text-gray-300">{archetype.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                    {participant.area} - {areaNames[participant.area]}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400 text-sm">
                  {formatDate(participant.timestamp)}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {participants.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nenhum participante ainda
        </div>
      )}
    </div>
  );
}
