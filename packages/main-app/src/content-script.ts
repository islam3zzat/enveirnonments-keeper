chrome.runtime.onMessage.addListener(function contentScriptCallback(
  request,
  _sender,
  sendResponse
) {
  if (request.type === "save-enveironments") {
    chrome.storage.sync.set({ enveironments: request.enveironments });
    sendResponse({ enveironments: request.enveironments });
  }
});
