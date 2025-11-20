import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { uploadImage } from '../utils/firebase';
import { RefreshCw, Share2, BarChart3 } from 'lucide-react';
import { archetypes, type ArchetypeId } from '../data/archetypes';
import ArchetypeCard from '../components/ArchetypeCard';

interface Props {
  image: string;
  archetypeId: ArchetypeId;
  participantName: string;
  onReset: () => void;
  onShowStats: () => void;
}

export const ResultScreen: React.FC<Props> = ({ image, archetypeId, participantName, onReset, onShowStats }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showReveal, setShowReveal] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const archetype = archetypes[archetypeId];

  // Hide reveal animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowReveal(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateShare = async () => {
    if (!cardRef.current) return;
    setLoading(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#111',
        scale: 2,
      });
      const finalImage = canvas.toDataURL('image/jpeg', 0.9);
      const downloadUrl = await uploadImage(finalImage);
      const qr = await QRCode.toDataURL(downloadUrl);
      setQrCodeUrl(qr);
    } catch (error) {
      console.error("Error generating share:", error);
      alert("Erro ao gerar compartilhamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 space-y-8 overflow-y-auto">
      {showReveal && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.div
              className="text-9xl mb-4"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5 }}
            >
              {archetype.icon}
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-5xl font-bold"
              style={{ color: archetype.color }}
            >
              {archetype.name}
            </motion.h1>
          </motion.div>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-7xl">
        <div className="w-full lg:w-1/2">
          <ArchetypeCard archetype={archetype} />
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <div ref={cardRef} className="relative w-full max-w-md mx-auto aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border-4" style={{ borderColor: archetype.color }}>
            <img src={image} alt="Captured" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h3 className="font-bold text-xl tracking-widest" style={{ color: archetype.color }}>RAV 2026</h3>
                  <p className="text-white text-sm opacity-80">VISÃO DE FUTURO</p>
                </div>
                <div className="w-8 h-8 border-t-2 border-r-2 border-white/50 rounded-tr-lg" />
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-black font-bold text-sm uppercase tracking-wider" style={{ backgroundColor: archetype.color }}>
                  <span className="text-2xl">{archetype.icon}</span>
                  <span>{archetype.name}</span>
                </div>
                <p className="text-white text-lg md:text-xl font-light leading-relaxed drop-shadow-md">
                  "{archetype.motivationalPhrase}"
                </p>
                <p className="text-agro-green font-semibold text-sm">{participantName}</p>
                <div className="pt-4 border-t border-white/20 flex justify-between items-end">
                  <p className="text-xs text-gray-400">@adubosreal</p>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: archetype.color }}>PREPARE-SE</p>
                    <p className="text-white font-bold">2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto">
            {!qrCodeUrl ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateShare}
                disabled={loading}
                className="w-full py-6 text-black font-bold text-xl rounded-xl flex items-center justify-center space-x-3 disabled:opacity-50"
                style={{ backgroundColor: archetype.color, boxShadow: `0 0 20px ${archetype.color}40` }}
              >
                {loading ? <RefreshCw className="animate-spin" /> : <><Share2 /><span>GERAR QR CODE</span></>}
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-xl flex flex-col items-center space-y-4 shadow-2xl">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                <div className="text-center space-y-2">
                  <p className="text-black font-bold text-lg">Compartilhe no Instagram!</p>
                  <p className="text-gray-700 text-sm">
                    Escaneie o QR Code para baixar sua imagem
                    <br />
                    e compartilhe nos stories marcando
                    <br />
                    <span className="font-bold text-green-600">@adubosreal</span>
                  </p>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col space-y-3 w-full">
              <button onClick={onShowStats} className="text-agro-green hover:text-white transition-colors flex items-center justify-center space-x-2 py-2 border border-agro-green/50 rounded-xl hover:bg-agro-green/10">
                <BarChart3 size={16} />
                <span>Ver Estatísticas</span>
              </button>
              <button onClick={onReset} className="text-gray-400 hover:text-white transition-colors flex items-center justify-center space-x-2">
                <RefreshCw size={16} />
                <span>Começar de novo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
