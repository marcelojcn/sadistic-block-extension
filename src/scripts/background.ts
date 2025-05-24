import { checkBlockedUrl } from "@/common/utils";

console.log("Initializing service worker...");

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  console.log("onBeforeNavigate triggered", details);
  if (details.frameId === 0) {
    // Only check main frame navigation
    await checkBlockedUrl();
  }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.log("onActivated triggered", activeInfo);
  await checkBlockedUrl();
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("onUpdated triggered", { tabId, changeInfo, tab });
  if (changeInfo.status === "complete" && tab.active) {
    await checkBlockedUrl();
  }
});

// Initial check
console.log("Running initial check...");
checkBlockedUrl().catch(console.error);
