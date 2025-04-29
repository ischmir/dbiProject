// src/composables/useUserProfile.js
import { ref, onUnmounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

/*
 * When called, this:
 * 1) Listens for auth state changes
 * 2) Ensures a /users/{uid} doc exists (with default role:user)
 * 3) Exposes `profileReady` so you know when it’s done
 */

export function useUserProfile() {
  const profileReady = ref(false);
  const auth        = getAuth();
  const db          = getFirestore();

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      profileReady.value = true;
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const snap    = await getDoc(userRef);

    if (!snap.exists()) {
      // create default profile
      await setDoc(userRef, {
        role:      'user',
        email:     user.email,
        createdAt: serverTimestamp(),
      });
    }

    profileReady.value = true;
  });

  // clean up listener if needed
  onUnmounted(() => unsubscribe());

  return { profileReady };
}
