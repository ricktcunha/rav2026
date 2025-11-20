import { useState } from 'react';
import { Layout } from './components/Layout';
import { RestingScreen } from './screens/RestingScreen';
import { RecapScreen } from './screens/RecapScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { QuizScreen } from './screens/QuizScreen';
import { CaptureScreen } from './screens/CaptureScreen';
import { ResultScreen } from './screens/ResultScreen';
import { StatsScreen } from './screens/StatsScreen';
import { AnimatePresence } from 'framer-motion';
import type { ArchetypeId } from './data/archetypes';
import type { Area } from './types/participant';
import { saveParticipant } from './utils/firestore';

type Screen = 'resting' | 'recap' | 'registration' | 'quiz' | 'capture' | 'result';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('resting');
  const [showStats, setShowStats] = useState(false);

  // Participant data
  const [participantName, setParticipantName] = useState('');
  const [participantArea, setParticipantArea] = useState<Area>('TXF');
  const [userArchetype, setUserArchetype] = useState<ArchetypeId>('pioneer');
  const [capturedImage, setCapturedImage] = useState<string>('');

  const handleStart = () => {
    setCurrentScreen('recap');
  };

  const handleRecapComplete = () => {
    setCurrentScreen('registration');
  };

  const handleRegistrationComplete = (name: string, area: Area) => {
    setParticipantName(name);
    setParticipantArea(area);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (archetypeId: ArchetypeId) => {
    setUserArchetype(archetypeId);
    setCurrentScreen('capture');
  };

  const handleCapture = async (image: string) => {
    setCapturedImage(image);
    setCurrentScreen('result');

    // Save participant to Firestore
    try {
      await saveParticipant({
        name: participantName,
        area: participantArea,
        archetype: userArchetype,
        timestamp: Date.now(),
        photoUrl: image
      });
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  const handleReset = () => {
    setCurrentScreen('resting');
    setParticipantName('');
    setParticipantArea('TXF');
    setUserArchetype('pioneer');
    setCapturedImage('');
  };

  const handleShowStats = () => {
    setShowStats(true);
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {currentScreen === 'resting' && (
          <RestingScreen key="resting" onStart={handleStart} onShowStats={handleShowStats} />
        )}
        {currentScreen === 'recap' && (
          <RecapScreen key="recap" onComplete={handleRecapComplete} />
        )}
        {currentScreen === 'registration' && (
          <RegistrationScreen key="registration" onComplete={handleRegistrationComplete} />
        )}
        {currentScreen === 'quiz' && (
          <QuizScreen key="quiz" onComplete={handleQuizComplete} />
        )}
        {currentScreen === 'capture' && (
          <CaptureScreen key="capture" onCapture={handleCapture} />
        )}
        {currentScreen === 'result' && (
          <ResultScreen
            key="result"
            image={capturedImage}
            archetypeId={userArchetype}
            participantName={participantName}
            onReset={handleReset}
            onShowStats={handleShowStats}
          />
        )}
      </AnimatePresence>

      {/* Stats Modal */}
      {showStats && (
        <StatsScreen onClose={() => setShowStats(false)} />
      )}
    </Layout>
  );
}

export default App;
