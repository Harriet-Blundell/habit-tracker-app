import { firestore } from "../firebase-service/firebase-client";
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

export type HabitType = {
  id: string;
  name: string;
  completed: boolean;
};

export async function createHabit(userId: string, name: string) {
  const habitsCollectionRef = collection(firestore, "users", userId, "habits");

  const habit = await addDoc(habitsCollectionRef, {
    name,
    createdAt: serverTimestamp(),
    completed: false,
  });

  return habit;
}

export async function getHabits(userId: string): Promise<HabitType[]> {
  const habitsCollectionRef = collection(firestore, "users", userId, "habits");

  const snapshots = await getDocs(habitsCollectionRef);

  const habitData = snapshots.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return habitData as HabitType[];
}

export async function updateHabitCompletion(
  userId: string,
  habitId: string,
  completed: boolean
) {
  const docRef = doc(firestore, "users", userId, "habits", habitId);

  await updateDoc(docRef, { completed });
}

// Habit service layer

/*

- addDoc() -> Firestore automatically generates an ID automatically
- collection() -> it does not write anything to the database
    - it is simply telling Firestore, 'This is the collection I want to interact with'

*/
