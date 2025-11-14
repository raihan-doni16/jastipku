import { X as ensure_array_like, Z as attr_class, a1 as bind_props } from "./index2.js";
import { w as fallback } from "./context.js";
function RatingStars($$renderer, $$props) {
  let value = fallback($$props["value"], 0);
  const stars = [1, 2, 3, 4, 5];
  $$renderer.push(`<div class="stars svelte-j68xmq"><!--[-->`);
  const each_array = ensure_array_like(stars);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let star = each_array[$$index];
    $$renderer.push(`<span${attr_class(value >= star ? "filled" : "", "svelte-j68xmq")}>★</span>`);
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, { value });
}
export {
  RatingStars as R
};
