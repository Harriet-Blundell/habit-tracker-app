import { firestore } from "../firebase-service/firebase-client";
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export type HabitType = {
  id: string;
  name: string;
};

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

  return habitData as HabitType[];
}

export async function setHabitCheckin(
  userId: string,
  habitId: string,
  date: string,
  checked: boolean
) {
  const checkinDoc = doc(
    firestore,
    "users",
    userId,
    "habits",
    habitId,
    "checkins",
    date
  );

  if (checked) {
    await setDoc(checkinDoc, {
      date,
      completed: true,
    });
  } else {
    await deleteDoc(checkinDoc);
  }
}

export async function deleteHabit(userId: string, habitId: string) {
  const docRef = doc(firestore, "users", userId, "habits", habitId);
  await deleteDoc(docRef);
}

export async function getHabitCheckInExists(
  userId: string,
  habitId: string,
  date: string
): Promise<boolean> {
  const docRef = doc(
    firestore,
    "users",
    userId,
    "habits",
    habitId,
    "checkins",
    date
  );

  const snapshot = await getDoc(docRef);

  return snapshot.exists();
}

// Habit service layer

/*

- addDoc() -> Firestore automatically generates an ID automatically
- collection() -> it does not write anything to the database
    - it is simply telling Firestore, 'This is the collection I want to interact with'

*/
