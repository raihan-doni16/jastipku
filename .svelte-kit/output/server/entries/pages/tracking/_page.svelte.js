import { Y as attr } from "../../../chunks/index2.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let code = "";
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <section class="tracking svelte-1rqn552"><header class="svelte-1rqn552"><h1 class="svelte-1rqn552">Tracking Publik</h1> <p class="svelte-1rqn552">Masukkan kode pesanan untuk melihat status terbaru.</p></header> <div class="form svelte-1rqn552"><input placeholder="Contoh: JP-240102-001"${attr("value", code)} class="svelte-1rqn552"/> <button class="primary svelte-1rqn552">Lacak</button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
export {
  _page as default
};
