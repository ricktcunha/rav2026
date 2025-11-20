# RAV 2026 - Visão de Futuro - Walkthrough

## Overview
This is a functional prototype of the interactive totem application for the RAV 2026 event. It features a complete user flow from attraction to engagement and sharing.

## Features Implemented

### 1. Resting Screen ("O Imã")
- **Visuals**: Animated background with "Agro Tech" elements (glowing blobs, neon green).
- **Interaction**: Flashing "Pronto para o próximo nível?" text and a giant "TOCAR" button.
- **Tech**: Framer Motion for continuous background animations.

### 2. Recap Screen ("O Recap Emocional")
- **Flow**: Auto-advancing sequence (4s per step).
- **Content**:
    - Step 1: 2024/25 Achievements.
    - Step 2: Record Numbers (+150%).
    - Step 3: Call to Action for 2026.
- **Tech**: `AnimatePresence` for smooth transitions between text blocks.

### 3. Quiz Screen ("O Quiz Inspiracional")
- **Logic**: 3 Questions with no "wrong" answers.
- **Profiling**: Calculates user profile (Innovator, Warrior, Strategist) based on majority answers.
- **UI**: Interactive cards with hover effects.

### 4. Capture Screen ("A Captura")
- **Camera**: Accesses webcam via `navigator.mediaDevices`.
- **Overlay**: Futuristic HUD with corner markers and crosshair.
- **Interaction**: 3-second countdown before capture.
- **Feedback**: "Analyzing..." animation after capture.

### 5. Result Screen ("O Resultado")
- **Composition**: Displays captured photo with a generated overlay (Gradient + Text + Logo).
- **Personalization**: Shows the user's profile and a specific motivational phrase.
- **Sharing**:
    - Generates a high-quality image using `html2canvas`.
    - Mocks upload to Firebase (returns a dummy URL).
    - Generates a QR Code pointing to the "uploaded" image.

## How to Run
1. Ensure dependencies are installed: `npm install`
2. Start the development server: `npm run dev`
3. Open the local URL (usually `http://localhost:5173`)
4. **Important**: Allow camera permissions when prompted.

## Configuration
- **Firebase**: Update `src/utils/firebase.ts` with your actual Firebase config to enable real image uploads.
- **Phrases**: Edit `src/screens/ResultScreen.tsx` to change the motivational text.
- **Theme**: Edit `tailwind.config.js` to adjust colors (currently set to Neon Green `#39FF14`).
