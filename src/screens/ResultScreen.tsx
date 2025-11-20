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
      console.log("Step 1: Generating canvas from card...");
      
      // Criar um elemento temporário com estilos simples para evitar problemas com CSS moderno
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '1080px';
      tempDiv.style.height = '1920px'; // 9:16 Full HD
      tempDiv.style.backgroundColor = '#111111';
      tempDiv.style.borderRadius = '0';
      tempDiv.style.overflow = 'hidden';
      tempDiv.style.border = `16px solid ${archetype.color}`; // Borda mais grossa para alta resolução
      tempDiv.style.display = 'flex';
      tempDiv.style.flexDirection = 'column';
      tempDiv.style.justifyContent = 'space-between';
      tempDiv.style.padding = '80px';
      tempDiv.style.fontFamily = 'Outfit, Inter, sans-serif';
      
      // Criar estrutura HTML simplificada
      const img = document.createElement('img');
      img.src = image;
      img.style.position = 'absolute';
      img.style.top = '0';
      img.style.left = '0';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.opacity = '0.7'; // Levemente mais visível
      tempDiv.appendChild(img);
      
      // Overlay gradient
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%)';
      tempDiv.appendChild(overlay);
      
      // Conteúdo
      const content = document.createElement('div');
      content.style.position = 'relative';
      content.style.zIndex = '10';
      content.style.display = 'flex';
      content.style.flexDirection = 'column';
      content.style.justifyContent = 'space-between';
      content.style.height = '100%';
      
      // Header
      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'flex-start';
      
      const titleDiv = document.createElement('div');
      titleDiv.style.textAlign = 'left';
      const title = document.createElement('h3');
      title.textContent = 'RAV 2026';
      title.style.fontWeight = 'bold';
      title.style.fontSize = '48px'; // Aumentado para 1080p
      title.style.letterSpacing = '0.1em';
      title.style.color = archetype.color;
      title.style.margin = '0';
      title.style.marginBottom = '12px';
      const subtitle = document.createElement('p');
      subtitle.textContent = 'VISÃO DE FUTURO';
      subtitle.style.color = 'white';
      subtitle.style.fontSize = '32px'; // Aumentado
      subtitle.style.opacity = '0.9';
      subtitle.style.margin = '0';
      titleDiv.appendChild(title);
      titleDiv.appendChild(subtitle);
      header.appendChild(titleDiv);
      
      // Corner decoration
      const corner = document.createElement('div');
      corner.style.width = '80px';
      corner.style.height = '80px';
      corner.style.borderTop = '6px solid rgba(255,255,255,0.6)';
      corner.style.borderRight = '6px solid rgba(255,255,255,0.6)';
      corner.style.borderTopRightRadius = '24px';
      header.appendChild(corner);
      
      // Footer
      const footer = document.createElement('div');
      footer.style.position = 'relative';
      footer.style.zIndex = '10';
      
      const badge = document.createElement('div');
      badge.style.display = 'inline-flex';
      badge.style.alignItems = 'center';
      badge.style.justifyContent = 'center';
      badge.style.padding = '20px 40px';
      badge.style.borderRadius = '9999px';
      badge.style.backgroundColor = archetype.color;
      badge.style.color = '#000000';
      badge.style.fontWeight = 'bold';
      badge.style.fontSize = '36px'; // Aumentado
      badge.style.textTransform = 'uppercase';
      badge.style.letterSpacing = '0.05em';
      badge.style.marginBottom = '48px';
      badge.style.boxShadow = `0 0 40px ${archetype.color}60`; // Glow simulado
      
      // Apenas o nome do arquétipo, sem emoji
      const nameSpan = document.createElement('span');
      nameSpan.textContent = archetype.name.toUpperCase();
      nameSpan.style.fontSize = '36px';
      nameSpan.style.fontWeight = 'bold';
      badge.appendChild(nameSpan);
      
      const quote = document.createElement('p');
      quote.textContent = `"${archetype.motivationalPhrase}"`;
      quote.style.color = 'white';
      quote.style.fontSize = '42px'; // Aumentado
      quote.style.fontWeight = '300';
      quote.style.lineHeight = '1.4';
      quote.style.marginBottom = '24px';
      quote.style.textShadow = '0 4px 8px rgba(0,0,0,0.8)';
      
      const name = document.createElement('p');
      name.textContent = participantName;
      name.style.color = '#39FF14';
      name.style.fontWeight = 'bold';
      name.style.fontSize = '32px';
      name.style.marginBottom = '48px';
      
      const bottomBar = document.createElement('div');
      bottomBar.style.paddingTop = '40px';
      bottomBar.style.borderTop = '2px solid rgba(255,255,255,0.2)';
      bottomBar.style.display = 'flex';
      bottomBar.style.justifyContent = 'space-between';
      bottomBar.style.alignItems = 'flex-end';
      
      const instagram = document.createElement('p');
      instagram.textContent = '@adubosreal';
      instagram.style.color = 'rgba(255,255,255,0.6)';
      instagram.style.fontSize = '28px';
      instagram.style.margin = '0';
      
      const yearDiv = document.createElement('div');
      yearDiv.style.textAlign = 'right';
      const prepare = document.createElement('p');
      prepare.textContent = 'PREPARE-SE';
      prepare.style.color = archetype.color;
      prepare.style.fontSize = '24px';
      prepare.style.fontWeight = 'bold';
      prepare.style.margin = '0';
      prepare.style.marginBottom = '8px';
      const year = document.createElement('p');
      year.textContent = '2026';
      year.style.color = 'white';
      year.style.fontWeight = 'bold';
      year.style.fontSize = '48px';
      year.style.margin = '0';
      yearDiv.appendChild(prepare);
      yearDiv.appendChild(year);
      
      bottomBar.appendChild(instagram);
      bottomBar.appendChild(yearDiv);
      
      footer.appendChild(badge);
      footer.appendChild(quote);
      footer.appendChild(name);
      footer.appendChild(bottomBar);
      
      content.appendChild(header);
      content.appendChild(footer);
      tempDiv.appendChild(content);
      
      document.body.appendChild(tempDiv);
      
      // Aguardar imagem carregar
      await new Promise((resolve) => {
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true); // Continuar mesmo se der erro
        }
      });
      
      // Aguardar um pouco para garantir renderização
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log("Step 2: Capturing with html2canvas...");
      const canvas = await html2canvas(tempDiv, {
        backgroundColor: '#111111',
        scale: 1, // Já estamos em alta resolução
        useCORS: true,
        allowTaint: false,
        logging: false,
        ignoreElements: () => {
          return false;
        },
      });
      
      // Remover elemento temporário
      document.body.removeChild(tempDiv);
      
      console.log("Step 3: Canvas generated, converting to data URL...");
      const finalImage = canvas.toDataURL('image/jpeg', 0.9);
      console.log("Step 4: Image data URL created, length:", finalImage.length);
      
      console.log("Step 5: Uploading image to Firebase Storage...");
      const downloadUrl = await uploadImage(finalImage);
      console.log("Step 6: Image uploaded, URL:", downloadUrl);
      
      console.log("Step 7: Generating QR Code...");
      
      // Usar URL direta da imagem para máxima compatibilidade
      console.log("Direct Image URL:", downloadUrl);
      
      const qr = await QRCode.toDataURL(downloadUrl, {
        errorCorrectionLevel: 'M',
        margin: 1,
      });
      console.log("Step 8: QR Code generated successfully");
      
      setQrCodeUrl(qr);
    } catch (error: any) {
      console.error("Error generating share:", error);
      console.error("Error details:", {
        code: error?.code,
        message: error?.message,
        stack: error?.stack,
      });
      
      let errorMessage = "Erro ao gerar compartilhamento. Tente novamente.";
      if (error?.code === 'storage/unauthorized') {
        errorMessage = "Erro de permissão. Verifique as regras de segurança do Storage.";
      } else if (error?.code === 'storage/quota-exceeded') {
        errorMessage = "Limite de armazenamento excedido.";
      } else if (error?.message) {
        errorMessage = `Erro: ${error.message}`;
      }
      
      alert(errorMessage);
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateShare}
                disabled={loading}
                className="w-full py-4 text-black font-bold text-lg rounded-full flex items-center justify-center space-x-3 disabled:opacity-50 shadow-lg transition-all"
                style={{ backgroundColor: archetype.color }}
              >
                {loading ? <RefreshCw className="animate-spin" /> : <><Share2 /><span>GERAR QR CODE</span></>}
              </motion.button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white p-6 rounded-3xl flex flex-col items-center space-y-4 shadow-[0_0_50px_rgba(255,255,255,0.1)] w-full"
              >
                <div className="p-2 bg-white rounded-xl shadow-inner">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mix-blend-multiply" />
                </div>
                <div className="text-center space-y-3">
                  <p className="text-black font-bold text-xl">Sua foto está pronta!</p>
                  <div className="text-gray-600 text-sm space-y-2 text-left bg-gray-50 p-4 rounded-xl">
                    <p className="flex items-center space-x-2">
                      <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                      <span>Escaneie o QR Code</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">2</span>
                      <span>Toque e segure na imagem</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">3</span>
                      <span>Compartilhe e marque <strong>@adubosreal</strong></span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-3 w-full">
              <button onClick={onShowStats} className="w-full py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center space-x-2">
                <BarChart3 size={16} />
                <span>Estatísticas</span>
              </button>
              <button onClick={onReset} className="w-full py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center space-x-2">
                <RefreshCw size={16} />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
