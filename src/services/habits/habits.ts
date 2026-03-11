import { HabitType } from "@/app/(protected)/page";
import { firestore } from "../firebase-service/firebase-client";
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export async function createHabit(userId: string, name: string) {
  const habitsCollectionRef = collection(firestore, "users", userId, "habits");

  const habit = await addDoc(habitsCollectionRef, {
    name,
    createdAt: serverTimestamp(),
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

  return habitData as { id: string; name: string }[];
}

// Habit service layer

/*

- addDoc() -> Firestore automatically generates an ID automatically
- collection() -> it does not write anything to the database
    - it is simply telling Firestore, 'This is the collection I want to interact with'

*/
