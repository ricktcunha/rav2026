import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, AlertCircle, Sparkles, Zap } from 'lucide-react';

interface Props {
  onCapture: (image: string) => void;
}

export const CaptureScreen: React.FC<Props> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [countingDown, setCountingDown] = useState(false);
  const [count, setCount] = useState(3);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // Animated scan line effect
  useEffect(() => {
    if (analyzing) {
      const interval = setInterval(() => {
        setScanLine(prev => (prev + 2) % 100);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [analyzing]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCaptureClick = () => {
    setCountingDown(true);
    let currentCount = 3;
    const timer = setInterval(() => {
      currentCount--;
      setCount(currentCount);
      if (currentCount === 0) {
        clearInterval(timer);
        captureImage();
      }
    }, 1000);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);

        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setAnalyzing(true);
        setTimeout(() => {
          onCapture(imageData);
        }, 2500);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black">

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-agro-green/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-50 bg-red-500/90 text-white p-6 rounded-xl flex items-center space-x-4 backdrop-blur-sm"
        >
          <AlertCircle size={32} />
          <p className="text-xl">{error}</p>
        </motion.div>
      )}

      {/* Analyzing Overlay */}
      <AnimatePresence>
        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/90 flex flex-col items-center justify-center space-y-6"
          >
            {/* Pulsing Circle */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-32 h-32 border-4 border-agro-green rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles size={48} className="text-agro-green" />
              </motion.div>
            </div>

            {/* Animated Text */}
            <div className="space-y-2 text-center">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl text-agro-green font-bold"
              >
                Analisando seu futuro...
              </motion.p>
              <div className="flex items-center justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-2 h-2 bg-agro-green rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Scan Line Effect */}
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-agro-green to-transparent opacity-50"
              style={{ top: `${scanLine}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Countdown Overlay */}
      <AnimatePresence>
        {countingDown && count > 0 && (
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
            exit={{ scale: 2, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute z-30"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-9xl font-black text-agro-green drop-shadow-[0_0_30px_rgba(57,255,20,0.8)]"
              >
                {count}
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Zap size={80} className="text-agro-green/30" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Feed & HUD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl"
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover transform -scale-x-100"
        />

        {/* HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent">
          {/* Animated Corners */}
          {[
            { pos: 'top-0 left-0', border: 'border-t-4 border-l-4', round: 'rounded-tl-xl' },
            { pos: 'top-0 right-0', border: 'border-t-4 border-r-4', round: 'rounded-tr-xl' },
            { pos: 'bottom-0 left-0', border: 'border-b-4 border-l-4', round: 'rounded-bl-xl' },
            { pos: 'bottom-0 right-0', border: 'border-b-4 border-r-4', round: 'rounded-br-xl' }
          ].map((corner, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className={`absolute ${corner.pos} w-16 h-16 ${corner.border} border-agro-green ${corner.round}`}
            />
          ))}

          {/* Center Crosshair with pulse */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 w-12 h-12 border-2 border-agro-green/50 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-agro-green transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
        </div>

        {/* Capture Button */}
        {!countingDown && !analyzing && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCaptureClick}
              className="relative w-20 h-20 bg-white rounded-full border-4 border-agro-green flex items-center justify-center shadow-[0_0_30px_rgba(57,255,20,0.5)]"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-agro-green/20 rounded-full"
              />
              <Camera className="w-8 h-8 text-black relative z-10" />
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Instruction Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-gray-400 text-lg text-center"
      >
        {countingDown ? (
          <span className="text-agro-green font-semibold">Prepare-se...</span>
        ) : analyzing ? (
          <span className="text-agro-green font-semibold">Revelando seu arquétipo...</span>
        ) : (
          <>
            Enquadre seu rosto e <span className="text-agro-green font-semibold">toque para capturar</span>
          </>
        )}
      </motion.p>
    </div>
  );
};
