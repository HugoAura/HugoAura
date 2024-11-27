module.exports = {
  targets: {
    "Aura.UI.Assistant.HeaderEntry": {
      active: true,
      pageURI: "ui/pages/headerIcon/headerIcon.html",
      pageScript: "ui/pages/headerIcon/headerIcon.js",
      pageSelector: ".index__feedback__2XvUK2qe",
      selectorMode: "insertAfter",
      pageCSS: "ui/pages/headerIcon/headerIcon.css",
      revive: true,
    },
    "Aura.UI.Assistant.Config": {
      active: false,
      pageURI: "ui/pages/config/config.html",
      pageScript: "ui/pages/config/config.js",
      pageSelector: ".index__homepage__KtQOPvrN",
      selectorMode: "appendChild",
      pageCSS: "ui/pages/config/config.css",
    },
  },
  globalStyles: ["ui/css/global.css", "ui/css/assistant.css", "ui/layui/css/layui.css"],
  globalJS: ["ui/layui/layui.js"],
  onLoaded: `
    console.log('[HugoAura / UI / Hooks / Assistant] Page loaded.');
  `,
};
