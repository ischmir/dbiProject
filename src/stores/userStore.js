// Importerer Pinia store-funktioner og Firebase Auth / Firestore / konfiguration
import { defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/configs/firebase';

// Definerer 'user'-store til håndtering af brugerdata og autentificering
export const useUserStore = defineStore('user', {
	// Initialiserer store-state med bruger, profil og status
	state: () => ({
		user: null,
		profile: null,
		profileReady: false,
		loggedIn: false,
		role: null,
		ready: false,
	}),
	// Definerer actions
	actions: {
		async init() {
			return new Promise(resolve => {
				console.log('Initializing user store...');
				// Starter en observer, der reagerer på ændringer i brugerens login-status
				onAuthStateChanged(auth, async user => {
					try {
						console.log('Auth state changed:', user);
						this.user = user;
						if (user) {
							// Henter dokument referencen til brugerens profil i Firestore
							const userRef = doc(db, 'users', user.uid);
							const snap = await getDoc(userRef);
							console.log('User document snapshot:', snap.exists());
							if (!snap.exists()) {
								console.log('User profile does not exist. Creating a new profile...');
								// Opretter en ny profil i Firestore, hvis den ikke findes
								const profile = {
									role: 'user',
									email: user.email,
									createdAt: serverTimestamp(),
								};

								await setDoc(userRef, profile);
								this.profile = profile;
							} else {
								console.log('User profile exists. Loading profile...');
								// Profil findes i Firestore – indlæser data
								this.profile = snap.data();
							}
							this.loggedIn = true;
							this.role = this.profile.role || 'user';
						} else {
							console.log('No user is logged in.');
							// Ingen bruger er logget ind – nulstiller brugerdata
							this.profile = null;
							this.loggedIn = false;
							this.role = null;
						}

						this.profileReady = true;
						this.ready = true;
						console.log('User store initialization complete.');
						// Brugerstore er færdiginitialiseret
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
