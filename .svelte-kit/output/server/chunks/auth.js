import { w as writable } from "./index.js";
const defaultState = { role: "guest" };
const initialState = defaultState;
const authStore = writable(initialState);
const roles = {
  guest: { label: "Guest", home: "/" },
  user: { label: "User", home: "/browse" },
  jastiper: { label: "Jastiper", home: "/jastiper" },
  admin: { label: "Admin", home: "/admin" }
};
export {
  authStore as a,
  roles as r
};
