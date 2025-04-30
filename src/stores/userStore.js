// src/stores/user.js
import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Pinia store for authentication state and user role.
 * On init(), listens to Firebase Auth changes,
 * ensures a /users/{uid} profile doc exists (with default role),
 * then reads and exposes the user's role.
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    uid: null,         // Firebase Auth UID
    email: null,       // User email
    role: 'user',      // 'user' or 'admin'
    loggedIn: false,   // true if signed in
    ready: false,       // true when auth + profile loaded
  }),
  actions: {
    init() {
      const auth = getAuth();
      const db   = getFirestore();

      // Listen for sign-in / sign-out
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.loggedIn = true;
          this.uid      = user.uid;
          this.email    = user.email;

          // Ensure profile exists
          const userRef = doc(db, 'users', user.uid);
          const snap    = await getDoc(userRef);
          if (!snap.exists()) {
            await setDoc(userRef, {
              role:      'user',
              email:     user.email,
              createdAt: serverTimestamp(),
            });
            this.role = 'user';
          } else {
            const data = snap.data();
            this.role = data.role || 'user';
          }
        } else {
          // Signed out
          this.loggedIn = false;
          this.uid      = null;
          this.email    = null;
          this.role     = 'user';
        }

        // Auth and profile logic complete
        this.ready = true;
      });
    },
  },
});
