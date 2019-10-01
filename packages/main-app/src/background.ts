import browser from "./utils";

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({ enveironments: [] });
  browser.runtime.onMessage.addListener(function contentScriptCallback(
    request,
    _sender,
    sendResponse
  ) {
    if (request.type === "save-enveironments") {
      browser.storage.sync.set({ enveironments: request.enveironments });
      sendResponse({ enveironments: request.enveironments });
    }
  });
});
