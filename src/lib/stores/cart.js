import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'jastipku-cart';
const defaultState = { items: [] };

const initialState = browser
  ? (() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : defaultState;
      } catch (error) {
        console.warn('Failed to read cart from storage', error);
        return defaultState;
      }
    })()
  : defaultState;

function createCartStore() {
  const { subscribe, set, update } = writable(initialState);

  if (browser) {
    subscribe((value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch (error) {
        console.warn('Failed to persist cart', error);
      }
    });
  }

  return {
    subscribe,
    addItem: (listing, quantity = 1, customDetails = {}) => {
      update((state) => {
        const existingIndex = state.items.findIndex(
          (item) => item.listingId === listing.id &&
          JSON.stringify(item.customDetails) === JSON.stringify(customDetails)
        );

        if (existingIndex >= 0) {
          // Update quantity if item exists
          state.items[existingIndex].quantity += quantity;
        } else {
          // Add new item
          state.items.push({
            id: Date.now().toString(),
            listingId: listing.id,
            listing: listing,
            quantity,
            customDetails, // untuk preloved atau custom order
            addedAt: new Date().toISOString()
          });
        }

        return state;
      });
    },
    updateQuantity: (itemId, quantity) => {
      update((state) => {
        const item = state.items.find((i) => i.id === itemId);
        if (item) {
          item.quantity = Math.max(1, quantity);
        }
        return state;
      });
    },
    removeItem: (itemId) => {
      update((state) => {
        state.items = state.items.filter((i) => i.id !== itemId);
        return state;
      });
    },
    clearCart: () => {
      set(defaultState);
    },
    getItemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    getTotalPrice: (state) => {
      return state.items.reduce((total, item) => {
        const listing = item.listing;
        let itemPrice = 0;

        if (listing.type === 'preloved') {
          itemPrice = listing.price * item.quantity;
        } else {
          // Untuk jastip/event, hitung dari estimasi + fee
          const estimatedPrice = item.customDetails.estimatedPrice || listing.minOrder || 0;
          const fee = (estimatedPrice * (listing.fee || 0)) / 100;
          itemPrice = (estimatedPrice + fee) * item.quantity;
        }

        return total + itemPrice;
      }, 0);
    }
  };
}

export const cartStore = createCartStore();
