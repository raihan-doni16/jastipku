import { Y as attr, X as ensure_array_like, Z as attr_class } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { a as authStore } from "../../../chunks/auth.js";
import { c as chatHistory } from "../../../chunks/mockData.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredChats, totalUnread;
    authStore.subscribe((val) => {
      val.role;
    });
    let selectedChat = null;
    let searchQuery = "";
    function formatTime(timestamp) {
      const date = new Date(timestamp);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      if (days === 0) {
        return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      } else if (days === 1) {
        return "Kemarin";
      } else if (days < 7) {
        return date.toLocaleDateString("id-ID", { weekday: "long" });
      } else {
        return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      }
    }
    filteredChats = chatHistory.filter((chat) => searchQuery === "");
    totalUnread = chatHistory.reduce((sum, chat) => sum + chat.unreadCount, 0);
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-cmz2yo"><div class="chat-layout svelte-cmz2yo"><div class="chat-list svelte-cmz2yo"><div class="chat-list-header svelte-cmz2yo"><h2 class="svelte-cmz2yo">Pesan</h2> `);
    if (totalUnread > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="unread-badge svelte-cmz2yo">${escape_html(totalUnread)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="search-box svelte-cmz2yo"><span class="search-icon svelte-cmz2yo">🔍</span> <input type="text" placeholder="Cari pesan..."${attr("value", searchQuery)} class="svelte-cmz2yo"/></div> <div class="chat-items svelte-cmz2yo"><!--[-->`);
    const each_array = ensure_array_like(filteredChats);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let chat = each_array[$$index];
      $$renderer2.push(`<button${attr_class("chat-item svelte-cmz2yo", void 0, {
        "active": selectedChat?.id === chat.id,
        "unread": chat.unreadCount > 0
      })}><div class="chat-avatar svelte-cmz2yo">${escape_html(chat.jastiperAvatar)}</div> <div class="chat-info svelte-cmz2yo"><div class="chat-name-row svelte-cmz2yo"><span class="chat-name svelte-cmz2yo">${escape_html(chat.jastiperName)}</span> <span class="chat-time svelte-cmz2yo">${escape_html(formatTime(chat.lastMessageTime))}</span></div> <div class="chat-last-message svelte-cmz2yo">${escape_html(chat.lastMessage)}</div> `);
      if (chat.orderCode) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="chat-order-code svelte-cmz2yo">📦 ${escape_html(chat.orderCode)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (chat.unreadCount > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="unread-count svelte-cmz2yo">${escape_html(chat.unreadCount)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredChats.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-chat-list svelte-cmz2yo"><div class="empty-icon svelte-cmz2yo">💬</div> <p class="svelte-cmz2yo">Tidak ada pesan ditemukan</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="chat-detail svelte-cmz2yo">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="no-chat-selected svelte-cmz2yo"><div class="no-chat-icon svelte-cmz2yo">💬</div> <h3 class="svelte-cmz2yo">Pilih Chat</h3> <p class="svelte-cmz2yo">Pilih percakapan dari daftar untuk melihat pesan</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
