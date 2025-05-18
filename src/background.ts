import { getCurrentTab } from "./helper";

async function check(): Promise<void> {
  const result = await chrome.storage.local.get(["blockedUrls"]);
  const blockedUrls: string[] = result?.blockedUrls;
  if (!blockedUrls) return;

  const currentTab = await getCurrentTab();
  const currentUrl = currentTab?.url;

  if (!currentUrl) return;

  const deserializedUrl = new URL(currentUrl);
  const domain = deserializedUrl.hostname;

  if (!domain) return;

  if (blockedUrls.some((url) => domain.includes(url))) {
    if (currentTab.id) {
      chrome.tabs.update(currentTab.id, { url: './static/blocked.html' });
    }
  }
}

chrome.webNavigation.onBeforeNavigate.addListener(async () => {
  await check();
});

chrome.tabs.onActivated.addListener(async () => {
  await check();
}); 