import { a2 as sanitize_slots, $ as attr_style, Z as attr_class, V as slot, Y as attr, a1 as bind_props, a0 as stringify } from "./index2.js";
import { w as fallback, e as escape_html } from "./context.js";
function Modal($$renderer, $$props) {
  const $$slots = sanitize_slots($$props);
  $$renderer.component(($$renderer2) => {
    let isOpen = fallback($$props["isOpen"], false);
    let title = fallback($$props["title"], "");
    let message = fallback($$props["message"], "");
    let type = fallback(
      $$props["type"],
      "info"
      // 'info', 'confirm', 'prompt', 'success', 'error', 'warning'
    );
    let confirmText = fallback($$props["confirmText"], "OK");
    let cancelText = fallback($$props["cancelText"], "Batal");
    let showCancel = fallback($$props["showCancel"], false);
    let inputValue = fallback($$props["inputValue"], "");
    let inputPlaceholder = fallback($$props["inputPlaceholder"], "");
    let inputType = fallback($$props["inputType"], "text");
    let maxWidth = fallback($$props["maxWidth"], "500px");
    let autoCloseOnConfirm = fallback($$props["autoCloseOnConfirm"], true);
    let hasCustomBody = false;
    hasCustomBody = !!$$slots.default;
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="modal-backdrop svelte-ta60gp" role="presentation"><div class="modal-content svelte-ta60gp"${attr_style(`max-width: ${stringify(maxWidth)}`)}><div${attr_class("modal-header svelte-ta60gp", void 0, {
        "info": type === "info",
        "confirm": type === "confirm",
        "success": type === "success",
        "error": type === "error",
        "warning": type === "warning",
        "prompt": type === "prompt"
      })}><div class="modal-icon svelte-ta60gp">`);
      if (type === "success") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`✅`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (type === "error") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`❌`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (type === "warning") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`⚠️`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (type === "confirm") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`❓`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (type === "prompt") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`📝`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`ℹ️`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<h3 class="modal-title svelte-ta60gp">${escape_html(title)}</h3>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="modal-close svelte-ta60gp">×</button></div> <div class="modal-body svelte-ta60gp">`);
      if (message) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="modal-message svelte-ta60gp">${escape_html(message)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (hasCustomBody) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (type === "prompt") {
          $$renderer2.push("<!--[-->");
          if (inputType === "textarea") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<textarea${attr("placeholder", inputPlaceholder)} class="modal-input svelte-ta60gp" rows="4" autofocus>`);
            const $$body = escape_html(inputValue);
            if ($$body) {
              $$renderer2.push(`${$$body}`);
            }
            $$renderer2.push(`</textarea>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<input type="text"${attr("value", inputValue)}${attr("placeholder", inputPlaceholder)} class="modal-input svelte-ta60gp" autofocus/>`);
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="modal-footer svelte-ta60gp">`);
      if (showCancel || type === "confirm" || type === "prompt") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="btn-cancel svelte-ta60gp">${escape_html(cancelText)}</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="btn-confirm svelte-ta60gp">${escape_html(confirmText)}</button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, {
      isOpen,
      title,
      message,
      type,
      confirmText,
      cancelText,
      showCancel,
      inputValue,
      inputPlaceholder,
      inputType,
      maxWidth,
      autoCloseOnConfirm
    });
  });
}
export {
  Modal as M
};
