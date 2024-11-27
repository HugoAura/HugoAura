if (!global.__HUGO_AURA__) {
  global.__HUGO_AURA__ = {
    hookedWindows: new Map(),
    hooks: null,
    configInit: false,
  };
}

const HooksManager = require("../aura/init/hook/hooksManager");
const configManager = require("../aura/init/shared/configManager");

module.exports = function ({ central, windowName, config }) {
  process.stdout.isTTY = true;
  process.stderr.isTTY = true;

  const electron = central(0);
  const app = electron.app;

  console.log("[HugoAura / Loaded] Aura is loaded!");

  const hooksManager = new HooksManager();
  configManager.ensureConfigExists();
  const loadedConfig = configManager.loadConfig();
  if (!global.__HUGO_AURA__.configInit) global.__HUGO_AURA__.configInit = true;
  const hooks = hooksManager.loadHooks();

  if (loadedConfig.devTools && !config.canOpenDevTool) {
    config.canOpenDevTool = true;
  }

  const webContentsCreatedListener = (_event, webContents) => {
    const hookConfig = hooks.get(windowName);
    if (hookConfig) {
      hooksManager.handleWindowHook(webContents, hookConfig, windowName);
    } else {
      console.debug(
        `[HugoAura / Init] Window ${windowName} has no corresponding hook, ignoring...`
      );
    }
  };

  app.once("web-contents-created", webContentsCreatedListener);

  return () => {
    app.removeListener("web-contents-created", webContentsCreatedListener);
  };
};
