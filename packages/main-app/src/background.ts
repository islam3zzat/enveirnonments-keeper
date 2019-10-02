import browser from "./utils";

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({ environments: [] });
  browser.runtime.onMessage.addListener(function contentScriptCallback(
    request,
    _sender,
    sendResponse
  ) {
    if (request.type === "save-environments") {
      browser.storage.sync.set({ environments: request.environments });
      sendResponse({ environments: request.environments });
    }
  });
});
