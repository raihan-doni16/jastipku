import { Z as attr_class, Y as attr, X as ensure_array_like, $ as attr_style, a0 as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredEvents, activeEvents, fullEvents, totalQueue, totalSlots;
    authStore.subscribe((val) => {
      val.role;
    });
    const events = [
      {
        id: "event-1",
        title: "Flash Sale Sepatu Nike",
        jastiperName: "Rina Travel",
        location: "Bangkok, Thailand",
        startDate: "2024-01-20T08:00:00",
        endDate: "2024-01-25T20:00:00",
        totalSlots: 50,
        filledSlots: 42,
        waitingQueue: 15,
        status: "active",
        type: "flash_sale",
        description: "Flash sale sepatu Nike dengan diskon hingga 50%",
        createdAt: "2024-01-15T10:00:00"
      },
      {
        id: "event-2",
        title: "Pre-Order iPhone 15 Pro",
        jastiperName: "Yuki Japan",
        location: "Tokyo, Japan",
        startDate: "2024-01-18T00:00:00",
        endDate: "2024-01-30T23:59:00",
        totalSlots: 30,
        filledSlots: 30,
        waitingQueue: 25,
        status: "full",
        type: "pre_order",
        description: "Pre-order iPhone 15 Pro dari Jepang dengan harga spesial",
        createdAt: "2024-01-12T09:30:00"
      },
      {
        id: "event-3",
        title: "Kosmetik Korea Festival",
        jastiperName: "Korea Stuff",
        location: "Seoul, South Korea",
        startDate: "2024-01-22T10:00:00",
        endDate: "2024-01-28T18:00:00",
        totalSlots: 100,
        filledSlots: 65,
        waitingQueue: 8,
        status: "active",
        type: "limited_event",
        description: "Festival kosmetik Korea dengan berbagai brand ternama",
        createdAt: "2024-01-16T14:20:00"
      },
      {
        id: "event-4",
        title: "Clearance Sale Fashion",
        jastiperName: "Sinta Shop",
        location: "Singapore",
        startDate: "2024-01-10T00:00:00",
        endDate: "2024-01-15T23:59:00",
        totalSlots: 40,
        filledSlots: 40,
        waitingQueue: 0,
        status: "closed",
        type: "flash_sale",
        description: "Clearance sale fashion items dengan harga miring",
        createdAt: "2024-01-05T11:00:00"
      }
    ];
    const queueDetails = [
      {
        id: "queue-1",
        eventId: "event-2",
        eventTitle: "Pre-Order iPhone 15 Pro",
        buyerName: "Ahmad Hidayat",
        buyerEmail: "ahmad@example.com",
        queuePosition: 1,
        joinedAt: "2024-01-17T15:30:00",
        status: "waiting",
        notified: false
      },
      {
        id: "queue-2",
        eventId: "event-2",
        eventTitle: "Pre-Order iPhone 15 Pro",
        buyerName: "Dewi Lestari",
        buyerEmail: "dewi@example.com",
        queuePosition: 2,
        joinedAt: "2024-01-17T16:45:00",
        status: "waiting",
        notified: false
      },
      {
        id: "queue-3",
        eventId: "event-2",
        eventTitle: "Pre-Order iPhone 15 Pro",
        buyerName: "Budi Santoso",
        buyerEmail: "budi@example.com",
        queuePosition: 3,
        joinedAt: "2024-01-17T17:20:00",
        status: "waiting",
        notified: false
      },
      {
        id: "queue-4",
        eventId: "event-1",
        eventTitle: "Flash Sale Sepatu Nike",
        buyerName: "Siti Nurhaliza",
        buyerEmail: "siti@example.com",
        queuePosition: 1,
        joinedAt: "2024-01-16T10:15:00",
        status: "waiting",
        notified: false
      }
    ];
    let selectedTab = "events";
    let filterStatus = "all";
    let searchQuery = "";
    const statusOptions = [
      { value: "all", label: "Semua Status" },
      { value: "active", label: "Aktif" },
      { value: "full", label: "Penuh" },
      { value: "closed", label: "Ditutup" }
    ];
    let modalConfig = {
      isOpen: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "OK",
      cancelText: "Batal",
      showCancel: false,
      inputValue: "",
      inputPlaceholder: ""
    };
    function formatDate(dateString) {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function getStatusBadge(status) {
      const badges = {
        active: { label: "Aktif", color: "#10b981" },
        full: { label: "Penuh", color: "#f59e0b" },
        closed: { label: "Ditutup", color: "#94a3b8" },
        waiting: { label: "Menunggu", color: "#f59e0b" },
        notified: { label: "Sudah Dinotifikasi", color: "#0ea5e9" }
      };
      return badges[status] || { label: status, color: "#64748b" };
    }
    function getEventTypeBadge(type) {
      const types = {
        flash_sale: { label: "Flash Sale", color: "#ef4444" },
        pre_order: { label: "Pre-Order", color: "#8b5cf6" },
        limited_event: { label: "Limited Event", color: "#f59e0b" }
      };
      return types[type] || { label: type, color: "#64748b" };
    }
    filteredEvents = events.filter((event) => {
      const matchSearch = searchQuery === "";
      return matchSearch;
    });
    activeEvents = events.filter((e) => e.status === "active").length;
    fullEvents = events.filter((e) => e.status === "full").length;
    totalQueue = queueDetails.filter((q) => q.status === "waiting").length;
    totalSlots = events.reduce((sum, e) => sum + e.totalSlots, 0);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Modal($$renderer3, {
        type: modalConfig.type,
        title: modalConfig.title,
        message: modalConfig.message,
        confirmText: modalConfig.confirmText,
        cancelText: modalConfig.cancelText,
        showCancel: modalConfig.showCancel,
        inputPlaceholder: modalConfig.inputPlaceholder,
        get isOpen() {
          return modalConfig.isOpen;
        },
        set isOpen($$value) {
          modalConfig.isOpen = $$value;
          $$settled = false;
        },
        get inputValue() {
          return modalConfig.inputValue;
        },
        set inputValue($$value) {
          modalConfig.inputValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div class="container svelte-15oiike"><div class="header svelte-15oiike"><h1 class="svelte-15oiike">Event &amp; Kuota</h1> <p class="svelte-15oiike">Kelola slot dan sistem antrian untuk event terbatas</p></div> <div class="stats-cards svelte-15oiike"><div class="stat-card svelte-15oiike"><div class="stat-icon svelte-15oiike" style="background: #d1fae5;">✅</div> <div class="stat-content svelte-15oiike"><div class="stat-value svelte-15oiike">${escape_html(activeEvents)}</div> <div class="stat-label svelte-15oiike">Event Aktif</div></div></div> <div class="stat-card svelte-15oiike"><div class="stat-icon svelte-15oiike" style="background: #fef3c7;">⚠️</div> <div class="stat-content svelte-15oiike"><div class="stat-value svelte-15oiike">${escape_html(fullEvents)}</div> <div class="stat-label svelte-15oiike">Event Penuh</div></div></div> <div class="stat-card svelte-15oiike"><div class="stat-icon svelte-15oiike" style="background: #dbeafe;">⏳</div> <div class="stat-content svelte-15oiike"><div class="stat-value svelte-15oiike">${escape_html(totalQueue)}</div> <div class="stat-label svelte-15oiike">Total Antrian</div></div></div> <div class="stat-card svelte-15oiike"><div class="stat-icon svelte-15oiike" style="background: #e9d5ff;">🎟️</div> <div class="stat-content svelte-15oiike"><div class="stat-value svelte-15oiike">${escape_html(totalSlots)}</div> <div class="stat-label svelte-15oiike">Total Slot</div></div></div></div> <div class="tabs svelte-15oiike"><button${attr_class("tab-button svelte-15oiike", void 0, { "active": selectedTab === "events" })}>Daftar Event</button> <button${attr_class("tab-button svelte-15oiike", void 0, { "active": selectedTab === "queue" })}>Antrian Waiting List</button></div> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="section svelte-15oiike"><div class="section-header svelte-15oiike"><h2 class="svelte-15oiike">Daftar Event</h2> <div class="filters svelte-15oiike"><div class="search-box svelte-15oiike"><span class="search-icon svelte-15oiike">🔍</span> <input type="text" placeholder="Cari event, jastiper, atau lokasi..."${attr("value", searchQuery)} class="svelte-15oiike"/></div> `);
        $$renderer3.select(
          { value: filterStatus, class: "" },
          ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array = ensure_array_like(statusOptions);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let option = each_array[$$index];
              $$renderer4.option({ value: option.value }, ($$renderer5) => {
                $$renderer5.push(`${escape_html(option.label)}`);
              });
            }
            $$renderer4.push(`<!--]-->`);
          },
          "svelte-15oiike"
        );
        $$renderer3.push(`</div></div> <div class="results-info svelte-15oiike">Menampilkan ${escape_html(filteredEvents.length)} dari ${escape_html(events.length)} event</div> <div class="events-list svelte-15oiike"><!--[-->`);
        const each_array_1 = ensure_array_like(filteredEvents);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let event = each_array_1[$$index_1];
          $$renderer3.push(`<div class="event-card svelte-15oiike"><div class="event-header svelte-15oiike"><div class="event-title-section svelte-15oiike"><h3 class="event-title svelte-15oiike">${escape_html(event.title)}</h3> <div class="event-badges svelte-15oiike"><span class="type-badge svelte-15oiike"${attr_style(`background-color: ${stringify(getEventTypeBadge(event.type).color)};`)}>${escape_html(getEventTypeBadge(event.type).label)}</span> <span class="status-badge svelte-15oiike"${attr_style(`background-color: ${stringify(getStatusBadge(event.status).color)};`)}>${escape_html(getStatusBadge(event.status).label)}</span></div></div></div> <div class="event-content svelte-15oiike"><div class="info-section svelte-15oiike"><div class="info-label svelte-15oiike">Jastiper</div> <div class="info-value svelte-15oiike">${escape_html(event.jastiperName)}</div></div> <div class="info-section svelte-15oiike"><div class="info-label svelte-15oiike">Lokasi</div> <div class="info-value svelte-15oiike">${escape_html(event.location)}</div></div> <div class="info-section svelte-15oiike"><div class="info-label svelte-15oiike">Periode</div> <div class="info-subvalue svelte-15oiike">${escape_html(formatDate(event.startDate))}</div> <div class="info-subvalue svelte-15oiike">s/d ${escape_html(formatDate(event.endDate))}</div></div> <div class="info-section svelte-15oiike"><div class="info-label svelte-15oiike">Slot</div> <div class="slot-info svelte-15oiike"><div class="slot-bar svelte-15oiike"><div class="slot-fill svelte-15oiike"${attr_style(`width: ${stringify(event.filledSlots / event.totalSlots * 100)}%`)}></div></div> <div class="slot-text svelte-15oiike">${escape_html(event.filledSlots)} / ${escape_html(event.totalSlots)} terisi</div></div></div> `);
          if (event.waitingQueue > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="info-section svelte-15oiike"><div class="info-label svelte-15oiike">Antrian</div> <div class="info-value queue svelte-15oiike">${escape_html(event.waitingQueue)} orang menunggu</div></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> <div class="info-section full-width svelte-15oiike"><div class="info-label svelte-15oiike">Deskripsi</div> <div class="info-subvalue svelte-15oiike">${escape_html(event.description)}</div></div></div> <div class="event-actions svelte-15oiike"><button class="btn-secondary svelte-15oiike">Lihat Detail</button> `);
          if (event.status === "active" || event.status === "full") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<button class="btn-primary svelte-15oiike">Tambah Slot</button>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (event.status === "active") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<button class="btn-close svelte-15oiike">Tutup Event</button>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></div>`);
        }
        $$renderer3.push(`<!--]--></div> `);
        if (filteredEvents.length === 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="empty-state svelte-15oiike"><div class="empty-icon svelte-15oiike">🎪</div> <h3 class="svelte-15oiike">Tidak ada event</h3> <p class="svelte-15oiike">Event dengan kuota terbatas akan muncul di sini</p></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
