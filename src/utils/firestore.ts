import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, Firestore } from 'firebase/firestore';
import type { Participant } from '../types/participant';

// Get Firestore instance (initialized in firebase.ts)
let db: Firestore | null = null;

export const initFirestore = (app: any) => {
  if (!db) {
    db = getFirestore(app);
  }
  return db;
};

/**
 * Save a participant to Firestore
 */
export const saveParticipant = async (participant: Omit<Participant, 'id'>): Promise<string> => {
  if (!db) {
    console.warn('Firestore not initialized, using mock');
    // Mock implementation for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`mock-id-${Date.now()}`);
      }, 500);
    });
  }

  try {
    const docRef = await addDoc(collection(db, 'participants'), participant);
    return docRef.id;
  } catch (error) {
    console.error('Error saving participant:', error);
    throw error;
  }
};

/**
 * Get all participants ordered by timestamp
 */
export const getAllParticipants = async (maxResults: number = 100): Promise<Participant[]> => {
  if (!db) {
    console.warn('Firestore not initialized, returning mock data');
    // Mock data for development
    return [];
  }

  try {
    const q = query(
      collection(db, 'participants'),
      orderBy('timestamp', 'desc'),
      limit(maxResults)
    );

    const querySnapshot = await getDocs(q);
    const participants: Participant[] = [];

    querySnapshot.forEach((doc) => {
      participants.push({
        id: doc.id,
        ...doc.data()
      } as Participant);
    });

    return participants;
  } catch (error) {
    console.error('Error getting participants:', error);
    throw error;
  }
};

/**
 * Get statistics about participants
 */
export const getParticipantStats = async () => {
  const participants = await getAllParticipants();

  const stats = {
    total: participants.length,
    byArchetype: {} as Record<string, number>,
    byArea: {} as Record<string, number>,
    recent: participants.slice(0, 10)
  };

  participants.forEach(p => {
    stats.byArchetype[p.archetype] = (stats.byArchetype[p.archetype] || 0) + 1;
    stats.byArea[p.area] = (stats.byArea[p.area] || 0) + 1;
  });

  return stats;
};
