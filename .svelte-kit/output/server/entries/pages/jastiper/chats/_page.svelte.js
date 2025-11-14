import { Y as attr, X as ensure_array_like, Z as attr_class } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { c as chatHistory } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let chats, filteredChats, totalUnread;
    authStore.subscribe((val) => {
      val.role;
    });
    const currentJastiperId = "JST001";
    let selectedChat = null;
    let searchQuery = "";
    function formatTime(timestamp) {
      const date = new Date(timestamp);
      if (Number.isNaN(date.getTime())) {
        return timestamp;
      }
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
    chats = chatHistory.filter((chat) => chat.jastiperId === currentJastiperId);
    filteredChats = chats.filter((chat) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return chat.buyerName?.toLowerCase().includes(q) || chat.orderCode?.toLowerCase().includes(q) || chat.lastMessage?.toLowerCase().includes(q);
    });
    totalUnread = chats.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0);
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-18uwwr5"><div class="chat-layout svelte-18uwwr5"><div class="chat-list svelte-18uwwr5"><div class="chat-list-header svelte-18uwwr5"><h2 class="svelte-18uwwr5">Pesan Pembeli</h2> `);
    if (totalUnread > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="unread-badge svelte-18uwwr5">${escape_html(totalUnread)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="search-box svelte-18uwwr5"><span class="search-icon">🔍</span> <input type="text" placeholder="Cari pembeli atau order..."${attr("value", searchQuery)} class="svelte-18uwwr5"/></div> <div class="chat-items svelte-18uwwr5"><!--[-->`);
    const each_array = ensure_array_like(filteredChats);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let chat = each_array[$$index];
      $$renderer2.push(`<button${attr_class("chat-item svelte-18uwwr5", void 0, {
        "active": selectedChat?.id === chat.id,
        "unread": chat.unreadCount > 0
      })}><div class="chat-avatar svelte-18uwwr5">${escape_html(chat.buyerAvatar ?? "🛒")}</div> <div class="chat-info svelte-18uwwr5"><div class="chat-name-row svelte-18uwwr5"><span class="chat-name svelte-18uwwr5">${escape_html(chat.buyerName ?? "Pembeli")}</span> <span class="chat-time svelte-18uwwr5">${escape_html(formatTime(chat.lastMessageTime))}</span></div> <div class="chat-last-message svelte-18uwwr5">${escape_html(chat.lastMessage)}</div> `);
      if (chat.orderCode) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="chat-order-code svelte-18uwwr5">Order: ${escape_html(chat.orderCode)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (chat.unreadCount > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="unread-count svelte-18uwwr5">${escape_html(chat.unreadCount)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredChats.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-chat-list svelte-18uwwr5"><div class="empty-icon">💬</div> <p>Tidak ada percakapan ditemukan</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="chat-detail svelte-18uwwr5">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="no-chat-selected svelte-18uwwr5"><div class="no-chat-icon svelte-18uwwr5">💬</div> <h3>Pilih Chat</h3> <p>Pilih percakapan dari daftar untuk melihat pesan</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
