"use client";

import LoginComponent from "@/components/LoginComponent";
import { auth, db } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      if (!firebaseUser.email) throw new Error("No email returned from Google");

      // Firestore user doc
      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          username: firebaseUser.displayName,
          email: firebaseUser.email,
          createdAt: serverTimestamp(),
        });
      }

      router.push("/tracker");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
        toast.error(err.message);
      } else {
        console.error(err);
        toast.error("Failed to sign in with Google");
      }
    }
  }

  return <LoginComponent handleGoogleSignIn={handleGoogleSignIn} />;
}
