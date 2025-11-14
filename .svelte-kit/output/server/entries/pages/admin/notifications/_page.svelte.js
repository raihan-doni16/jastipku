import { Z as attr_class, Y as attr, X as ensure_array_like } from "../../../../chunks/index2.js";
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
    let selectedAudience, estimatedRecipients;
    authStore.subscribe((val) => {
      val.role;
    });
    const notificationHistory = [
      {
        id: "notif-1",
        title: "Promo Flash Sale Akhir Tahun",
        message: "Dapatkan diskon hingga 50% untuk semua produk jastip! Buruan sebelum kehabisan!",
        type: "promo",
        targetAudience: "all_users",
        status: "sent",
        sentAt: "2024-01-17T10:00:00",
        totalRecipients: 1250,
        openRate: 45.6
      },
      {
        id: "notif-2",
        title: "Maintenance Terjadwal",
        message: "Sistem akan maintenance pada tanggal 20 Januari 2024 pukul 01:00 - 03:00 WIB.",
        type: "announcement",
        targetAudience: "all",
        status: "sent",
        sentAt: "2024-01-16T15:30:00",
        totalRecipients: 2500,
        openRate: 78.4
      },
      {
        id: "notif-3",
        title: "Verifikasi Akun Jastiper",
        message: "Segera lengkapi dokumen verifikasi Anda untuk mulai berjualan.",
        type: "reminder",
        targetAudience: "unverified_jastiper",
        status: "sent",
        sentAt: "2024-01-15T09:00:00",
        totalRecipients: 45,
        openRate: 62.2
      },
      {
        id: "notif-4",
        title: "Update Fitur Baru",
        message: "Fitur chat langsung dengan jastiper telah tersedia! Coba sekarang.",
        type: "feature_update",
        targetAudience: "all_users",
        status: "scheduled",
        sentAt: "2024-01-20T08:00:00",
        totalRecipients: 0,
        openRate: 0
      }
    ];
    let notificationForm = {
      title: "",
      message: "",
      type: "announcement",
      targetAudience: "all",
      sendNow: true
    };
    const notificationTypes = [
      { value: "announcement", label: "Pengumuman", icon: "📢" },
      { value: "promo", label: "Promosi", icon: "🎉" },
      { value: "reminder", label: "Pengingat", icon: "⏰" },
      { value: "feature_update", label: "Update Fitur", icon: "✨" },
      { value: "maintenance", label: "Maintenance", icon: "🔧" }
    ];
    const targetAudienceOptions = [
      { value: "all", label: "Semua Pengguna", count: 2500 },
      { value: "all_users", label: "Semua Pembeli", count: 1250 },
      { value: "all_jastiper", label: "Semua Jastiper", count: 850 },
      {
        value: "verified_jastiper",
        label: "Jastiper Terverifikasi",
        count: 720
      },
      {
        value: "unverified_jastiper",
        label: "Jastiper Belum Verifikasi",
        count: 130
      },
      {
        value: "active_users",
        label: "User Aktif (30 hari)",
        count: 980
      },
      {
        value: "inactive_users",
        label: "User Tidak Aktif",
        count: 270
      }
    ];
    let selectedTab = "create";
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
    selectedAudience = targetAudienceOptions.find((a) => a.value === notificationForm.targetAudience);
    estimatedRecipients = selectedAudience?.count || 0;
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
      $$renderer3.push(`<!----> <div class="container svelte-11ejrir"><div class="header svelte-11ejrir"><h1 class="svelte-11ejrir">Notifikasi &amp; Broadcast</h1> <p class="svelte-11ejrir">Kirim pengumuman dan promosi ke pengguna</p></div> <div class="stats-cards svelte-11ejrir"><div class="stat-card svelte-11ejrir"><div class="stat-icon svelte-11ejrir" style="background: #d1fae5;">📤</div> <div class="stat-content svelte-11ejrir"><div class="stat-value svelte-11ejrir">${escape_html(notificationHistory.filter((n) => n.status === "sent").length)}</div> <div class="stat-label svelte-11ejrir">Notifikasi Terkirim</div></div></div> <div class="stat-card svelte-11ejrir"><div class="stat-icon svelte-11ejrir" style="background: #fef3c7;">⏰</div> <div class="stat-content svelte-11ejrir"><div class="stat-value svelte-11ejrir">${escape_html(notificationHistory.filter((n) => n.status === "scheduled").length)}</div> <div class="stat-label svelte-11ejrir">Terjadwal</div></div></div> <div class="stat-card svelte-11ejrir"><div class="stat-icon svelte-11ejrir" style="background: #dbeafe;">👥</div> <div class="stat-content svelte-11ejrir"><div class="stat-value svelte-11ejrir">${escape_html(notificationHistory.reduce((sum, n) => sum + n.totalRecipients, 0))}</div> <div class="stat-label svelte-11ejrir">Total Penerima</div></div></div> <div class="stat-card svelte-11ejrir"><div class="stat-icon svelte-11ejrir" style="background: #e9d5ff;">��</div> <div class="stat-content svelte-11ejrir"><div class="stat-value svelte-11ejrir">${escape_html(Math.round(notificationHistory.filter((n) => n.status === "sent").reduce((sum, n) => sum + n.openRate, 0) / notificationHistory.filter((n) => n.status === "sent").length || 0))}%</div> <div class="stat-label svelte-11ejrir">Avg. Open Rate</div></div></div></div> <div class="tabs svelte-11ejrir"><button${attr_class("tab-button svelte-11ejrir", void 0, { "active": selectedTab === "create" })}>Buat Notifikasi</button> <button${attr_class("tab-button svelte-11ejrir", void 0, { "active": selectedTab === "history" })}>Riwayat Pengiriman</button></div> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="section svelte-11ejrir"><div class="section-header svelte-11ejrir"><h2 class="svelte-11ejrir">Buat Notifikasi Baru</h2></div> <div class="notification-form svelte-11ejrir"><div class="form-group svelte-11ejrir"><label for="title" class="svelte-11ejrir">Judul Notifikasi <span class="required svelte-11ejrir">*</span></label> <input id="title" type="text"${attr("value", notificationForm.title)} placeholder="Masukkan judul notifikasi..." maxlength="100" class="svelte-11ejrir"/> <div class="char-count svelte-11ejrir">${escape_html(notificationForm.title.length)}/100</div></div> <div class="form-group svelte-11ejrir"><label for="message" class="svelte-11ejrir">Pesan <span class="required svelte-11ejrir">*</span></label> <textarea id="message" placeholder="Tulis pesan notifikasi di sini..." rows="5" maxlength="500" class="svelte-11ejrir">`);
        const $$body = escape_html(notificationForm.message);
        if ($$body) {
          $$renderer3.push(`${$$body}`);
        }
        $$renderer3.push(`</textarea> <div class="char-count svelte-11ejrir">${escape_html(notificationForm.message.length)}/500</div></div> <div class="form-row svelte-11ejrir"><div class="form-group svelte-11ejrir"><label for="type" class="svelte-11ejrir">Tipe Notifikasi</label> `);
        $$renderer3.select(
          { id: "type", value: notificationForm.type, class: "" },
          ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array = ensure_array_like(notificationTypes);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let type = each_array[$$index];
              $$renderer4.option({ value: type.value }, ($$renderer5) => {
                $$renderer5.push(`${escape_html(type.icon)} ${escape_html(type.label)}`);
              });
            }
            $$renderer4.push(`<!--]-->`);
          },
          "svelte-11ejrir"
        );
        $$renderer3.push(`</div> <div class="form-group svelte-11ejrir"><label for="audience" class="svelte-11ejrir">Target Penerima <span class="required svelte-11ejrir">*</span></label> `);
        $$renderer3.select(
          {
            id: "audience",
            value: notificationForm.targetAudience,
            class: ""
          },
          ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array_1 = ensure_array_like(targetAudienceOptions);
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let option = each_array_1[$$index_1];
              $$renderer4.option({ value: option.value }, ($$renderer5) => {
                $$renderer5.push(`${escape_html(option.label)} (${escape_html(option.count)})`);
              });
            }
            $$renderer4.push(`<!--]-->`);
          },
          "svelte-11ejrir"
        );
        $$renderer3.push(`</div></div> <div class="recipients-info svelte-11ejrir"><div class="info-icon svelte-11ejrir">👥</div> <div class="info-text svelte-11ejrir"><strong>Estimasi Penerima:</strong> ${escape_html(estimatedRecipients)} pengguna</div></div> <div class="form-group svelte-11ejrir"><label class="checkbox-label svelte-11ejrir"><input type="checkbox"${attr("checked", notificationForm.sendNow, true)} class="svelte-11ejrir"/> Kirim sekarang</label></div> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <div class="form-actions svelte-11ejrir"><button class="btn-secondary svelte-11ejrir">Simpan Draft</button> <button class="btn-secondary svelte-11ejrir">Preview</button> <button class="btn-primary svelte-11ejrir">${escape_html("Kirim Sekarang")}</button></div></div></div>`);
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
