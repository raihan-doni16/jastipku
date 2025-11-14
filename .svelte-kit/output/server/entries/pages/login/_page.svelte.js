import { X as ensure_array_like, a1 as bind_props } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    const roleOptions = [
      { value: "user", label: "User - Pembeli" },
      { value: "jastiper", label: "Jastiper - Penjual" },
      { value: "admin", label: "Admin" }
    ];
    data.redirect;
    let selectedRole = data.expected?.includes("admin") ? "admin" : data.expected?.includes("jastiper") ? "jastiper" : "user";
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <section class="login svelte-1x05zx6"><div class="card svelte-1x05zx6"><h1 class="svelte-1x05zx6">Masuk ke Jastipku</h1> <p class="svelte-1x05zx6">Pilih jenis akun untuk mengakses dashboard sesuai kebutuhanmu.</p> <label for="role" class="svelte-1x05zx6">Masuk sebagai</label> `);
    $$renderer2.select(
      { id: "role", value: selectedRole, class: "" },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(roleOptions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1x05zx6"
    );
    $$renderer2.push(` <button class="primary svelte-1x05zx6">Login</button> <div class="hint svelte-1x05zx6">`);
    if (selectedRole === "user") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`Setelah login sebagai <strong class="svelte-1x05zx6">user</strong>, kamu dapat browse postingan jastiper, membuat
        pesanan, dan memantau status pesanan di halaman <em class="svelte-1x05zx6">Browse</em> dan <em class="svelte-1x05zx6">Pesanan Saya</em>.`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (selectedRole === "jastiper") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`Login sebagai <strong class="svelte-1x05zx6">jastiper</strong> memberikan akses ke dashboard untuk membuat
        postingan, kelola pesanan, dan manajemen wallet pada halaman <em class="svelte-1x05zx6">Dashboard Jastiper</em>.`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Login sebagai <strong class="svelte-1x05zx6">admin</strong> memberikan akses ke dashboard dan review permintaan
        pengguna pada halaman <em class="svelte-1x05zx6">Admin</em>.`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
