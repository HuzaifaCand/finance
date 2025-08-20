"use client";

import LoginComponent from "@/components/LoginComponent";
import { auth, db } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleGoogleSignIn() {
    try {
      setLoading(true);
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
      toast.success("Logged In Successfully!");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in cancelled");
        } else {
          console.error(err);
          toast.error(err.message);
        }
      } else {
        console.error(err);
        toast.error("Failed to sign in with Google");
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginComponent loading={loading} handleGoogleSignIn={handleGoogleSignIn} />
  );
}
