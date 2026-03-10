import { firestore } from "../firebase-service/firebase-client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function createHabit(userId: string, name: string) {
  const habitsCollectionRef = collection(firestore, "users", userId, "habits");

  await addDoc(habitsCollectionRef, { name, createdAt: serverTimestamp });
}

// Habit service layer

/*

- addDoc() -> Firestore automatically generates an ID automatically
- collection() -> it does not write anything to the database
    - it is simply telling Firestore, 'This is the collection I want to interact with'

*/
