// src/stores/user.js
import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc }  from 'firebase/firestore';

export const useUserStore = defineStore('user', {
  state: () => ({
    role:  'user',
    ready: false,
  }),
  actions: {
    init() {
      const auth = getAuth();
      const db   = getFirestore();

      onAuthStateChanged(auth, async user => {
        if (user) {
          const snap = await getDoc(doc(db, 'users', user.uid));
          this.role = snap.exists() ? snap.data().role : 'user';
        } else {
          this.role = 'user';
        }
        this.ready = true;
      });
    },
  },
});
