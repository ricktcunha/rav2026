import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface Props {
  imageUrl: string;
}

export const ShareScreen: React.FC<Props> = ({ imageUrl }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Método 1: Fetch e Blob (Melhor compatibilidade)
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `RAV2026-Visao-de-Futuro.jpg`; // Nome fixo e limpo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Download error, trying fallback:", error);
      // Método 2: Link direto (Fallback)
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = '_blank';
      link.download = 'RAV2026-Visao-de-Futuro.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 text-center"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-agro-green text-2xl font-bold">RAV 2026</span>
          <div className="h-6 w-[1px] bg-white/30"></div>
          <span className="text-white/80">VISÃO DE FUTURO</span>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
          <img 
            src={imageUrl} 
            alt="Seu Arquétipo" 
            className="w-full h-auto object-contain"
            crossOrigin="anonymous"
          />
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-lg font-medium">Sua visão de futuro foi revelada!</p>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full py-4 bg-agro-green text-black font-bold text-lg rounded-xl flex items-center justify-center space-x-2 hover:bg-green-400 transition-colors"
          >
            {isDownloading ? (
              <span className="animate-pulse">Baixando...</span>
            ) : (
              <>
                <Download size={24} />
                <span>BAIXAR FOTO</span>
              </>
            )}
          </button>

          <p className="text-sm text-gray-400 mt-4">
            Se o botão não funcionar, pressione e segure na imagem para salvar na galeria.
          </p>
          
          <div className="pt-8 pb-4 border-t border-white/10">
            <p className="text-sm font-bold text-white/60 mb-2">COMPARTILHE NO INSTAGRAM</p>
            <p className="text-agro-green font-bold text-xl">@adubosreal</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

