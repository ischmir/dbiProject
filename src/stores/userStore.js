import { defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/configs/firebase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null,
    profileReady: false,
    loggedIn: false,
    role: null,
    ready: false,
  }),
  actions: {
    async init() {
      return new Promise((resolve) => {
        console.log('Initializing user store...');
        onAuthStateChanged(auth, async (user) => {
          try {
            console.log('Auth state changed:', user);
            this.user = user;
            if (user) {
              const userRef = doc(db, 'users', user.uid);
              const snap = await getDoc(userRef);
              console.log('User document snapshot:', snap.exists());
              if (!snap.exists()) {
                console.log('User profile does not exist. Creating a new profile...');
                const profile = {
                  role: 'user',
                  email: user.email,
                  createdAt: serverTimestamp(),
                };
                await setDoc(userRef, profile);
                this.profile = profile;
              } else {
                console.log('User profile exists. Loading profile...');
                this.profile = snap.data();
              }
              this.loggedIn = true;
              this.role = this.profile.role || 'user';
            } else {
              console.log('No user is logged in.');
              this.profile = null;
              this.loggedIn = false;
              this.role = null;
            }
            this.profileReady = true;
            this.ready = true;
            console.log('User store initialization complete.');
            resolve();
          } catch (error) {
            console.error('Error during user store initialization:', error);
            resolve();
          }
        });
      });
    },
  },
});
