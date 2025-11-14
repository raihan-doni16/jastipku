import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'jastipku-auth';
const defaultState = { role: 'guest' };

const initialState = browser
  ? (() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : defaultState;
      } catch (error) {
        console.warn('Failed to read auth state from storage', error);
        return defaultState;
      }
    })()
  : defaultState;

export const authStore = writable(initialState);

if (browser) {
  authStore.subscribe((value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to persist auth state', error);
    }
  });
}

export const roles = {
  guest: { label: 'Guest', home: '/' },
  user: { label: 'User', home: '/browse' },
  jastiper: { label: 'Jastiper', home: '/jastiper' },
  admin: { label: 'Admin', home: '/admin' }
};
