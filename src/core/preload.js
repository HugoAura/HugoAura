(() => {
  if (!global.__HUGO_AURA__) {
    global.__HUGO_AURA__ = {
      configInit: true,
    };
  }
  const configManager = require("../aura/init/shared/configManager");
  const WebpackHook = require("../aura/init/preload/webpackHook");

  console.log(`[HugoAura / AppHook / Preload] Preparing...`);

  const createConfigProxy = (baseObj, path = []) => {
    return new Proxy(baseObj, {
      get(target, prop) {
        if (typeof target[prop] === "object" && target[prop] !== null) {
          return createConfigProxy(target[prop], [...path, prop]);
        }
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        console.log(
          `[HugoAura / Config] Config changed at path: ${[...path, prop].join(
            "."
          )}`
        );
        configManager.writeConfig(window.__HUGO_AURA_CONFIG__);
        return true;
      },
    });
  };

  const initialConfig = configManager.readConfig();
  window.__HUGO_AURA_CONFIG__ = createConfigProxy(initialConfig);

  window.__HUGO_AURA_HOOK__ = {};
  const webpackHook = new WebpackHook();
  webpackHook.installHook(window, initialConfig);

  console.log(`[HugoAura / AppHook / DONE] Hooks installed`);
})();
