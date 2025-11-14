import { U as head, V as slot } from "../../chunks/index2.js";
function _layout($$renderer, $$props) {
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Jastipku - Jasa Titip Terpercaya</title>`);
    });
    $$renderer2.push(`<link rel="icon" href="/logo.svg" type="image/svg+xml"/> <link rel="apple-touch-icon" href="/logo.svg"/> <meta name="description" content="Jastipku - Platform jasa titip barang dari luar negeri yang terpercaya dan aman"/>`);
  });
  $$renderer.push(`<main class="svelte-12qhfyh"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></main>`);
}
export {
  _layout as default
};
