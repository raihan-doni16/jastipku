import { W as store_get, X as ensure_array_like, Z as attr_class, Y as attr, _ as unsubscribe_stores, a1 as bind_props } from "./index2.js";
import { w as fallback, e as escape_html } from "./context.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
import { p as page } from "./stores.js";
import { r as roles, a as authStore } from "./auth.js";
import { w as writable } from "./index.js";
const defaultState = { items: [] };
const initialState = defaultState;
function createCartStore() {
  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    addItem: (listing, quantity = 1, customDetails = {}) => {
      update((state) => {
        const existingIndex = state.items.findIndex(
          (item) => item.listingId === listing.id && JSON.stringify(item.customDetails) === JSON.stringify(customDetails)
        );
        if (existingIndex >= 0) {
          state.items[existingIndex].quantity += quantity;
        } else {
          state.items.push({
            id: Date.now().toString(),
            listingId: listing.id,
            listing,
            quantity,
            customDetails,
            // untuk preloved atau custom order
            addedAt: (/* @__PURE__ */ new Date()).toISOString()
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
        if (listing.type === "preloved") {
          itemPrice = listing.price * item.quantity;
        } else {
          const estimatedPrice = item.customDetails.estimatedPrice || listing.minOrder || 0;
          const fee = estimatedPrice * (listing.fee || 0) / 100;
          itemPrice = (estimatedPrice + fee) * item.quantity;
        }
        return total + itemPrice;
      }, 0);
    }
  };
}
const cartStore = createCartStore();
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentRole, isAuthenticated, currentPath, cart, cartItemCount;
    let showLanguage = fallback($$props["showLanguage"], false);
    let language = fallback($$props["language"], "id");
    let languages = fallback(
      $$props["languages"],
      () => [
        { value: "id", label: "Indonesia" },
        { value: "en", label: "English" }
      ],
      true
    );
    const navItems = [
      { label: "Browse", href: "/browse", allowedRoles: ["user"] },
      {
        label: "Pesanan Saya",
        href: "/orders",
        allowedRoles: ["user"]
      },
      { label: "Chat", href: "/chats", allowedRoles: ["user"] },
      {
        label: "Ulasan Saya",
        href: "/reviews",
        allowedRoles: ["user"]
      },
      { label: "Profil", href: "/profile", allowedRoles: ["user"] },
      {
        label: "Dashboard",
        href: "/jastiper",
        allowedRoles: ["jastiper"]
      },
      {
        label: "Pesanan",
        href: "/jastiper/orders",
        allowedRoles: ["jastiper"]
      },
      {
        label: "Postingan Saya",
        href: "/jastiper/listings",
        allowedRoles: ["jastiper"]
      },
      {
        label: "Chat",
        href: "/jastiper/chats",
        allowedRoles: ["jastiper"]
      },
      {
        label: "Wallet",
        href: "/jastiper/wallet",
        allowedRoles: ["jastiper"]
      },
      {
        label: "Profil",
        href: "/jastiper/profile",
        allowedRoles: ["jastiper"]
      }
    ];
    let selectedLanguage = language;
    let auth = { role: "guest" };
    selectedLanguage = language;
    auth = store_get($$store_subs ??= {}, "$authStore", authStore);
    currentRole = auth.role ?? "guest";
    isAuthenticated = currentRole !== "guest";
    currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    cart = store_get($$store_subs ??= {}, "$cartStore", cartStore);
    cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    $$renderer2.push(`<nav class="navbar svelte-rfuq4y"><a class="brand svelte-rfuq4y" href="/"><img src="/logo.svg" alt="Jastipku" class="svelte-rfuq4y"/> <span>Jastipku</span></a> <div class="nav-actions svelte-rfuq4y"><!--[-->`);
    const each_array = ensure_array_like(navItems.filter((item) => item.allowedRoles.includes(currentRole)));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr_class("nav-link svelte-rfuq4y", void 0, {
        "active": currentPath === item.href || currentPath.startsWith(item.href + "/")
      })}${attr("href", item.href)}>${escape_html(item.label)}</a>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (currentRole === "user") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a class="cart-button svelte-rfuq4y" href="/cart"><span class="cart-icon svelte-rfuq4y">🛒</span> `);
      if (cartItemCount > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="cart-badge svelte-rfuq4y">${escape_html(cartItemCount)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <span class="spacer svelte-rfuq4y"></span> `);
    if (!isAuthenticated) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a class="ghost svelte-rfuq4y" href="/login">Login</a> <button class="primary svelte-rfuq4y" type="button">Daftar</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="role-indicator svelte-rfuq4y"><span>${escape_html(roles[currentRole]?.label ?? currentRole)}</span></div> <button class="ghost svelte-rfuq4y" type="button">Logout</button>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (showLanguage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="language svelte-rfuq4y"><span>🌐</span> `);
      $$renderer2.select(
        { value: selectedLanguage, class: "" },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(languages);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let item = each_array_1[$$index_1];
            $$renderer3.option({ value: item.value }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(item.label)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        },
        "svelte-rfuq4y"
      );
      $$renderer2.push(`</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { showLanguage, language, languages });
  });
}
export {
  Navbar as N,
  cartStore as c
};
