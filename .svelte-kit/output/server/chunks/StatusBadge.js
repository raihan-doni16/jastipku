import { $ as attr_style, a1 as bind_props } from "./index2.js";
import { e as escape_html } from "./context.js";
function StatusBadge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let statusMeta = $$props["statusMeta"];
    let status = $$props["status"];
    const meta = statusMeta[status] ?? statusMeta.Draft;
    $$renderer2.push(`<span class="badge svelte-12nqn7t"${attr_style(`--badge-color: ${meta.color}`)}>${escape_html(meta.label)}</span>`);
    bind_props($$props, { statusMeta, status });
  });
}
export {
  StatusBadge as S
};
